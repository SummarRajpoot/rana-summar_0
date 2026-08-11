# Portfolio Project

This is a monorepo containing a Next.js frontend and a FastAPI backend.

## Getting Started

### Frontend

The frontend runs on `localhost:3000`.

```bash
cd frontend
npm run dev
```

### Backend

The backend runs on `localhost:8000`.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Backend API

- `GET /health` - Health check endpoint returning `{"status": "ok"}`
