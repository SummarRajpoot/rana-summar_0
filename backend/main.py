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

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # App startup
    yield
    # App shutdown: close MongoDB client connection
    close_client()


app = FastAPI(title="Portfolio API", lifespan=lifespan)

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
# Tracks submission timestamps per IP (max 5 submissions per 10 minutes)
_ip_submission_history = defaultdict(list)
RATE_LIMIT_WINDOW_SECONDS = 600  # 10 minutes
RATE_LIMIT_MAX_REQUESTS = 5


def check_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()

    # Clean old records outside the window
    _ip_submission_history[client_ip] = [
        t for t in _ip_submission_history[client_ip] if now - t < RATE_LIMIT_WINDOW_SECONDS
    ]

    if len(_ip_submission_history[client_ip]) >= RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. Please wait a few minutes before trying again.",
        )

    _ip_submission_history[client_ip].append(now)


def strip_html_tags(text: Optional[str]) -> str:
    """Removes HTML tags and unescapes entities to prevent XSS / markup injection."""
    if not text:
        return ""
    clean = re.sub(r"<[^>]*>", "", text)
    return html.unescape(clean).strip()


# ── Schemas ───────────────────────────────────────────────────────────────────
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    message: str = Field(..., min_length=5, max_length=600)
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
    approved: bool = False
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
    """Returns only approved testimonials, newest first. Private fields are omitted."""
    collection = get_testimonials_collection()
    if collection is None:
        return []

    try:
        cursor = collection.find({"approved": True}).sort("created_at", -1).limit(50)
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
    Submits a new testimonial.
    - Always saved with approved = False.
    - Input is sanitized and validated.
    - Rate-limited and includes honeypot detection.
    """
    # Rate limit check
    check_rate_limit(request)

    # Honeypot spam check: if filled, pretend success without saving
    if payload.website and payload.website.strip():
        return TestimonialResponse(
            id=str(ObjectId()),
            name=strip_html_tags(payload.name),
            message=strip_html_tags(payload.message),
            role=strip_html_tags(payload.role) if payload.role else None,
            company=strip_html_tags(payload.company) if payload.company else None,
            rating=payload.rating or 5,
            created_at=datetime.now(timezone.utc).isoformat(),
        )

    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    now_iso = datetime.now(timezone.utc).isoformat()
    clean_name = strip_html_tags(payload.name)
    clean_message = strip_html_tags(payload.message)
    clean_role = strip_html_tags(payload.role) if payload.role else None
    clean_company = strip_html_tags(payload.company) if payload.company else None
    rating = payload.rating if payload.rating and 1 <= payload.rating <= 5 else 5

    doc = {
        "name": clean_name,
        "message": clean_message,
        "role": clean_role,
        "company": clean_company,
        "rating": rating,
        "approved": False,  # Pending approval by admin
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
async def admin_get_testimonials(approved: Optional[bool] = None):
    """Admin: List all testimonials (with approval status). Can filter by ?approved=true|false."""
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    query = {}
    if approved is not None:
        query["approved"] = approved

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
                    approved=bool(doc.get("approved", False)),
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
    "/admin/testimonials/{testimonial_id}/approve",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_approve_testimonial(testimonial_id: str):
    """Admin: Approve a testimonial so it appears publicly."""
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

    result = await collection.update_one({"_id": oid}, {"$set": {"approved": True}})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found",
        )

    return {"success": True, "id": testimonial_id, "approved": True}


@app.patch(
    "/admin/testimonials/{testimonial_id}/reject",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_reject_testimonial(testimonial_id: str):
    """Admin: Reject / unapprove a testimonial."""
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

    result = await collection.update_one({"_id": oid}, {"$set": {"approved": False}})
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found",
        )

    return {"success": True, "id": testimonial_id, "approved": False}


@app.delete(
    "/admin/testimonials/{testimonial_id}",
    dependencies=[Depends(verify_admin_auth)],
)
async def admin_delete_testimonial(testimonial_id: str):
    """Admin: Permanently delete a testimonial."""
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
        msg["Subject"] = f"[Portfolio Contact] {payload.subject.strip()}"

        body = (
            f"New Portfolio Contact Form Submission\n\n"
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
