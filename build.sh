#!/bin/bash
# Build script for Render

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Generating training data..."
python src/generate_data.py

echo "Training the model..."
python src/train.py

echo "Build completed successfully!"
