# Portfolio Project

A modern portfolio application featuring a Next.js (React 19, Tailwind CSS, Framer Motion) frontend and a FastAPI (Python, Motor / MongoDB) backend.

---

## 📁 Repository Structure

```text
.
├── frontend/             # Next.js frontend application
│   ├── src/              # React components and App Router pages
│   ├── .env.local.example # Frontend environment variable template
│   └── package.json
├── backend/              # FastAPI backend application
│   ├── main.py           # FastAPI app & routes (Health & Testimonials)
│   ├── database.py       # Async MongoDB connection manager (Motor)
│   ├── Dockerfile        # Hugging Face Spaces Docker configuration
│   ├── .env.example      # Backend environment variable template
│   └── requirements.txt  # Python dependencies
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create & activate a virtual environment (optional)
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/macOS: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env from template and configure credentials
cp .env.example .env
# Set MONGODB_URI and MONGODB_DB_NAME in .env

# Run development server (runs on http://localhost:8000)
uvicorn main:app --reload
```

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local from template
cp .env.local.example .env.local
# Ensure NEXT_PUBLIC_API_URL points to http://localhost:8000

# Run development server (runs on http://localhost:3000)
npm run dev
```

---

## 🔌 Backend API Endpoints

- **`GET /health`** - Health check endpoint returning `{"status": "ok"}`
- **`GET /testimonials`** - Fetch recent testimonials stored in MongoDB
- **`POST /testimonials`** - Post a new testimonial `{ "name": "...", "message": "..." }`

---

## 🌐 Deployment Instructions

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: URL of your deployed backend (e.g., `https://your-username-portfolio-api.hf.space`)
4. Deploy!

### Backend Deployment (Hugging Face Spaces - Docker)

1. Create a new Space on [Hugging Face](https://huggingface.co/spaces).
2. Choose **Docker SDK** (Blank / Existing Dockerfile).
3. Push the contents of the `backend/` directory or connect your repository.
4. Add **Repository Secrets** in HF Space Settings:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `MONGODB_DB_NAME`: Database name (e.g., `portfolio`)
   - `CORS_ORIGINS`: Allowed origins (e.g., `https://your-portfolio.vercel.app`)
5. The container exposes port `7860` automatically via `backend/Dockerfile`.
