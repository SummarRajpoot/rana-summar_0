"""
database.py -- Async MongoDB connection manager using Motor.

Exposes helpers to access database collections cleanly across the FastAPI app.
New collections (e.g. clients, feedback) can be retrieved via get_collection(name).
"""

import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "")
DB_NAME = os.getenv("MONGODB_DB_NAME", "portfolio")

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient | None:
    global _client
    if not MONGODB_URI:
        return None
    if _client is None:
        _client = AsyncIOMotorClient(
            MONGODB_URI,
            tlsCAFile=certifi.where(),        # explicit CA bundle — fixes SSL issues on Python 3.14
            serverSelectionTimeoutMS=15000,    # 15s to find a server
            connectTimeoutMS=15000,            # 15s TCP connect
            socketTimeoutMS=30000,             # 30s per socket op
            retryWrites=True,
        )
    return _client


def get_db():
    client = get_client()
    if client is None:
        return None
    return client[DB_NAME]


def get_collection(name: str):
    database = get_db()
    if database is None:
        return None
    return database[name]


# Collection accessors for easy imports
def get_testimonials_collection():
    return get_collection("testimonials")


def get_clients_collection():
    return get_collection("clients")


def get_feedback_collection():
    return get_collection("feedback")
