#!/bin/bash
# Start script for Render deployment
python -m uvicorn src.app:app --host 0.0.0.0 --port $PORT
