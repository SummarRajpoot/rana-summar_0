import os
from datetime import datetime, timezone
from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import get_testimonials_collection

app = FastAPI(title="Portfolio API")

# ── CORS ──────────────────────────────────────────────────────────────────────
cors_env = os.getenv("CORS_ORIGINS", "*")
allowed_origins = [o.strip() for o in cors_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
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
