import html
import os
import re
import smtplib
import time
from collections import defaultdict
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List, Optional

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import close_client, get_testimonials_collection
from profanity_filter import contains_profanity

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # App startup
    yield
    # App shutdown: close MongoDB client connection
    close_client()


app = FastAPI(title="Rana Summar API", lifespan=lifespan)

# ── CORS Configuration ────────────────────────────────────────────────────────
default_origins = [
    "https://rana-summar-0.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

allowed_origins = list(default_origins)
for env_var in ["FRONTEND_URL", "CORS_ORIGINS", "ALLOWED_ORIGINS"]:
    val = os.getenv(env_var, "")
    if val.strip():
        for origin in val.split(","):
            origin_clean = origin.strip().rstrip("/")
            if origin_clean and origin_clean not in allowed_origins:
                allowed_origins.append(origin_clean)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── In-Memory Rate Limiting for Submissions ───────────────────────────────────
# Max 2 submissions per IP per hour (3600 seconds)
_ip_submission_history = defaultdict(list)
RATE_LIMIT_WINDOW_SECONDS = 3600  # 1 hour
RATE_LIMIT_MAX_REQUESTS = 2


def check_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()

    # Clean old records outside the 1-hour window
    _ip_submission_history[client_ip] = [
        t for t in _ip_submission_history[client_ip] if now - t < RATE_LIMIT_WINDOW_SECONDS
    ]

    if len(_ip_submission_history[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. You can submit up to 2 reviews per hour.",
        )

    _ip_submission_history[client_ip].append(now)


# ── Validation & Sanitization Helpers ─────────────────────────────────────────
def contains_links_or_urls(text: Optional[str]) -> bool:
    """Checks for URLs, schemes, www, or web domains."""
    if not text:
        return False
    # Match http, https, or www
    if re.search(r"(?:https?://|www\.)\S+", text, re.IGNORECASE):
        return True
    # Match domain names with common TLDs (e.g. site.com, link.net, portfolio.io)
    domain_pattern = r"\b[a-zA-Z0-9-]+\.(?:com|net|org|io|ai|co|app|xyz|dev|me|info|biz|site|online|tech|pk|in|uk|us|ca)\b"
    if re.search(domain_pattern, text, re.IGNORECASE):
        return True
    return False


def contains_html_or_script(text: Optional[str]) -> bool:
    """Detects HTML tags, script elements, or markup injections."""
    if not text:
        return False
    if re.search(r"<\s*script\b[^>]*>", text, re.IGNORECASE):
        return True
    if re.search(r"<\s*/?[a-zA-Z][^>]*>", text):
        return True
    return False


def sanitize_text(text: Optional[str]) -> str:
    """Strips leading/trailing whitespace and unescapes standard entities."""
    if not text:
        return ""
    clean = re.sub(r"<[^>]*>", "", text)
    return html.unescape(clean).strip()


# ── Schemas ───────────────────────────────────────────────────────────────────
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=60)
    message: str = Field(..., min_length=20, max_length=500)
    role: Optional[str] = Field(None, max_length=80)
    company: Optional[str] = Field(None, max_length=80)
    rating: Optional[int] = Field(5, ge=1, le=5)
    website: Optional[str] = Field(None, max_length=100)  # Honeypot field for bot detection


class TestimonialResponse(BaseModel):
    id: str
    name: str
    message: str
    role: Optional[str] = None
    company: Optional[str] = None
    rating: Optional[int] = 5
    created_at: str


class AdminTestimonialResponse(BaseModel):
    id: str
    name: str
    message: str
    role: Optional[str] = None
    company: Optional[str] = None
    rating: Optional[int] = 5
    approved: bool = True
    hidden: bool = False
    created_at: str


class ContactCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=80)
    last_name: str = Field(..., min_length=1, max_length=80)
    email: str = Field(..., min_length=1, max_length=120)
    subject: str = Field(..., min_length=1, max_length=150)
    message: str = Field(..., min_length=1, max_length=2000)


# ── Admin Auth Dependency ─────────────────────────────────────────────────────
def verify_admin_auth(
    x_admin_secret: Optional[str] = Header(None, alias="X-Admin-Secret"),
    authorization: Optional[str] = Header(None, alias="Authorization"),
) -> bool:
    admin_secret = os.getenv("ADMIN_SECRET", "").strip()
    if not admin_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ADMIN_SECRET environment variable is not configured on the backend server.",
        )

    token = x_admin_secret
    if not token and authorization:
        if authorization.lower().startswith("bearer "):
            token = authorization[7:].strip()
        else:
            token = authorization.strip()

    if not token or token != admin_secret:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: invalid or missing admin secret.",
        )
    return True


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    return {"status": "ok"}


# ── Public Testimonials Endpoints ─────────────────────────────────────────────
@app.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials():
    """
    Returns only approved and non-hidden testimonials, newest first.
    Private fields (IP, email, etc.) are strictly excluded.
    """
    collection = get_testimonials_collection()
    if collection is None:
        return []

    try:
        # approved = True AND hidden != True
        cursor = collection.find(
            {"approved": True, "hidden": {"$ne": True}}
        ).sort("created_at", -1).limit(50)

        items = []
        async for doc in cursor:
            items.append(
                TestimonialResponse(
                    id=str(doc.get("_id", "")),
                    name=doc.get("name", "Anonymous"),
                    message=doc.get("message", ""),
                    role=doc.get("role"),
                    company=doc.get("company"),
                    rating=doc.get("rating", 5),
                    created_at=str(doc.get("created_at", datetime.now(timezone.utc).isoformat())),
                )
            )
        return items
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@app.post("/testimonials", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
async def create_testimonial(payload: TestimonialCreate, request: Request):
    """
    Submits a new testimonial with AUTO-APPROVAL:
    - Auto-approved (approved = True, hidden = False).
    - Rate limited to 2 per hour per IP.
    - Safety filters: blocks URLs/links, HTML/scripts, profanity, and duplicates.
    """
    # 1. Honeypot check: if filled by a spam bot, silently return fake success without saving
    if payload.website and payload.website.strip():
        return TestimonialResponse(
            id=str(ObjectId()),
            name=sanitize_text(payload.name),
            message=sanitize_text(payload.message),
            role=sanitize_text(payload.role) if payload.role else None,
            company=sanitize_text(payload.company) if payload.company else None,
            rating=payload.rating or 5,
            created_at=datetime.now(timezone.utc).isoformat(),
        )

    # 2. Rate limiting check (max 2 submissions / hour)
    check_rate_limit(request)

    # 3. HTML and script tags check
    for field_name, value in [
        ("name", payload.name),
        ("role", payload.role),
        ("company", payload.company),
        ("message", payload.message),
    ]:
        if contains_html_or_script(value):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="HTML and script tags are not allowed in testimonials.",
            )

    # 4. Links and URLs check
    for field_name, value in [
        ("name", payload.name),
        ("role", payload.role),
        ("company", payload.company),
        ("message", payload.message),
    ]:
        if contains_links_or_urls(value):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Links and URLs are not allowed in testimonials.",
            )

    # 5. Review length check (min 20, max 500)
    clean_message = sanitize_text(payload.message)
    if len(clean_message) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review message must be at least 20 characters long.",
        )
    if len(clean_message) > 500:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review message must be 500 characters or fewer.",
        )

    clean_name = sanitize_text(payload.name)
    clean_role = sanitize_text(payload.role) if payload.role else None
    clean_company = sanitize_text(payload.company) if payload.company else None

    # 6. Profanity / Abuse check (English & Roman Urdu/Hindi)
    for field_val in [clean_name, clean_role, clean_company, clean_message]:
        if field_val and contains_profanity(field_val):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Your submission contains prohibited or offensive language.",
            )

    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    # 7. Duplicate submission detection (same name & message)
    existing_duplicate = await collection.find_one(
        {
            "name": {"$regex": f"^{re.escape(clean_name)}$", "$options": "i"},
            "message": clean_message,
        }
    )
    if existing_duplicate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A testimonial with this name and message has already been submitted.",
        )

    now_iso = datetime.now(timezone.utc).isoformat()
    rating = payload.rating if payload.rating and 1 <= payload.rating <= 5 else 5

    # 8. Save with approved = True (Auto-Approved) and hidden = False
    doc = {
        "name": clean_name,
        "message": clean_message,
        "role": clean_role,
        "company": clean_company,
        "rating": rating,
        "approved": True,  # Auto-approved!
        "hidden": False,   # Publicly visible
        "created_at": now_iso,
    }

    try:
        result = await collection.insert_one(doc)
        return TestimonialResponse(
            id=str(result.inserted_id),
            name=doc["name"],
            message=doc["message"],
            role=doc["role"],
            company=doc["company"],
            rating=doc["rating"],
            created_at=doc["created_at"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save testimonial: {str(e)}",
        )


# ── Protected Admin Endpoints ─────────────────────────────────────────────────
@app.get(
    "/admin/testimonials",
    response_model=List[AdminTestimonialResponse],
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_get_testimonials(hidden: Optional[bool] = None):
    """Admin: List all testimonials (with hidden/approved status). Filter by ?hidden=true|false."""
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    query = {}
    if hidden is not None:
        query["hidden"] = hidden

    try:
        cursor = collection.find(query).sort("created_at", -1).limit(100)
        items = []
        async for doc in cursor:
            items.append(
                AdminTestimonialResponse(
                    id=str(doc.get("_id", "")),
                    name=doc.get("name", "Anonymous"),
                    message=doc.get("message", ""),
                    role=doc.get("role"),
                    company=doc.get("company"),
                    rating=doc.get("rating", 5),
                    approved=bool(doc.get("approved", True)),
                    hidden=bool(doc.get("hidden", False)),
                    created_at=str(doc.get("created_at", datetime.now(timezone.utc).isoformat())),
                )
            )
        return items
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@app.patch(
    "/admin/testimonials/{testimonial_id}/hide",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_hide_testimonial(testimonial_id: str):
    """Admin: Hide a testimonial so it no longer appears publicly."""
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    try:
        oid = ObjectId(testimonial_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid testimonial ID format",
        )

    result = await collection.update_one({"_id": oid}, {"$set": {"hidden": True}})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found",
        )

    return {"success": True, "id": testimonial_id, "hidden": True}


@app.patch(
    "/admin/testimonials/{testimonial_id}/unhide",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_unhide_testimonial(testimonial_id: str):
    """Admin: Unhide a previously hidden testimonial."""
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    try:
        oid = ObjectId(testimonial_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid testimonial ID format",
        )

    result = await collection.update_one({"_id": oid}, {"$set": {"hidden": False, "approved": True}})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found",
        )

    return {"success": True, "id": testimonial_id, "hidden": False}


@app.delete(
    "/admin/testimonials/{testimonial_id}",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_delete_testimonial(testimonial_id: str):
    """Admin: Permanently delete a testimonial from the database."""
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    try:
        oid = ObjectId(testimonial_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid testimonial ID format",
        )

    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found",
        )

    return {"success": True, "id": testimonial_id, "deleted": True}


# ── Contact Endpoint ──────────────────────────────────────────────────────────
@app.post("/contact", status_code=status.HTTP_200_OK)
async def submit_contact(payload: ContactCreate):
    # Store contact message in database if MongoDB is configured
    collection = get_testimonials_collection()
    if collection is not None:
        try:
            db = collection.database
            contact_col = db.get_collection("contact_messages")
            await contact_col.insert_one(
                {
                    "first_name": payload.first_name.strip(),
                    "last_name": payload.last_name.strip(),
                    "email": payload.email.strip(),
                    "subject": payload.subject.strip(),
                    "message": payload.message.strip(),
                    "created_at": datetime.now(timezone.utc).isoformat(),
                }
            )
        except Exception:
            pass

    gmail_address = os.getenv("GMAIL_ADDRESS")
    gmail_app_password = os.getenv("GMAIL_APP_PASSWORD")

    if not gmail_address or not gmail_app_password:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Gmail credentials (GMAIL_ADDRESS / GMAIL_APP_PASSWORD) are not configured on backend server.",
        )

    try:
        msg = MIMEMultipart()
        msg["From"] = gmail_address
        msg["To"] = gmail_address
        msg["Reply-To"] = payload.email.strip()
        msg["Subject"] = f"[Website Contact] {payload.subject.strip()}"

        body = (
            f"New Website Contact Form Submission\n\n"
            f"Name: {payload.first_name.strip()} {payload.last_name.strip()}\n"
            f"Email: {payload.email.strip()}\n"
            f"Subject: {payload.subject.strip()}\n\n"
            f"Message:\n"
            f"----------------------------------------\n"
            f"{payload.message.strip()}\n"
            f"----------------------------------------\n"
        )
        msg.attach(MIMEText(body, "plain", "utf-8"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(gmail_address, gmail_app_password)
            server.send_message(msg)

        return {"success": True, "message": "Message sent successfully."}
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="SMTP Authentication failed. Please verify GMAIL_ADDRESS and GMAIL_APP_PASSWORD (Gmail App Password required).",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
