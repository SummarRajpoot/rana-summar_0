# NOTE: This Dockerfile is kept for reference/alternative containerized deployments.
# FastAPI Cloud uses `fastapi deploy` CLI directly and does not require this Dockerfile.

FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY . .

# Expose port
EXPOSE 8000

# Start FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
