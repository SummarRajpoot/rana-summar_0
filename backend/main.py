import os
import smtplib
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import get_testimonials_collection

load_dotenv()

app = FastAPI(title="Portfolio API")

# ── CORS ──────────────────────────────────────────────────────────────────────
default_origins = [
    "https://rana-summar-0.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
cors_env = os.getenv("CORS_ORIGINS", "")
if cors_env.strip():
    env_origins = [o.strip() for o in cors_env.split(",") if o.strip()]
    allowed_origins = list(set(default_origins + env_origins))
else:
    allowed_origins = default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────────────────────
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    message: str = Field(..., min_length=1, max_length=500)


class TestimonialResponse(BaseModel):
    id: str
    name: str
    message: str
    created_at: str


class ContactCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=80)
    last_name: str = Field(..., min_length=1, max_length=80)
    email: str = Field(..., min_length=1, max_length=120)
    subject: str = Field(..., min_length=1, max_length=150)
    message: str = Field(..., min_length=1, max_length=2000)


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials():
    collection = get_testimonials_collection()
    if collection is None:
        return []

    try:
        cursor = collection.find().sort("created_at", -1).limit(50)
        items = []
        async for doc in cursor:
            items.append(
                TestimonialResponse(
                    id=str(doc.get("_id", "")),
                    name=doc.get("name", "Anonymous"),
                    message=doc.get("message", ""),
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
async def create_testimonial(payload: TestimonialCreate):
    collection = get_testimonials_collection()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection not configured or unavailable",
        )

    now_iso = datetime.now(timezone.utc).isoformat()
    doc = {
        "name": payload.name.strip(),
        "message": payload.message.strip(),
        "created_at": now_iso,
    }

    try:
        result = await collection.insert_one(doc)
        return TestimonialResponse(
            id=str(result.inserted_id),
            name=doc["name"],
            message=doc["message"],
            created_at=doc["created_at"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save testimonial: {str(e)}",
        )


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

        return {"success": True}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}",
        )
