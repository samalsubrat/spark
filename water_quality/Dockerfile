# Base image
FROM python:3.11-bookworm-slim

# Environment settings
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install system dependencies (needed for XGBoost, curl, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
      curl ca-certificates build-essential libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first (layer caching)
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of the code
COPY . /app

# Expose container port
EXPOSE 8000

# Create a non-root user
RUN useradd -m appuser
USER appuser

# Start the FastAPI app with Gunicorn + Uvicorn
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "src.app.main:app", "-b", "0.0.0.0:8000", "--workers", "2"]
