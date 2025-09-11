# Waterborne Disease Predictor API

A machine learning API that predicts waterborne diseases based on patient symptoms.

## Features

- Predicts 5 different waterborne diseases:
  - Acute Diarrheal Disease
  - Cholera
  - Hepatitis A
  - Hepatitis E
  - Leptospirosis

- FastAPI-based REST API
- Interactive API documentation
- Health check endpoints

## API Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint
- `POST /predict` - Predict disease based on symptoms
- `GET /docs` - Interactive API documentation

## Deployment

This application is designed to be deployed on Render.com

### Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Generate training data:
   ```bash
   python src/generate_data.py
   ```

3. Train the model:
   ```bash
   python src/train.py
   ```

4. Run the API:
   ```bash
   uvicorn src.app:app --reload
   ```

### Testing

Use the interactive docs at `/docs` or send POST requests to `/predict` with symptom data:

```json
{
  "Diarrhea": 1,
  "Dehydration": 1,
  "Abdominal_Pain": 0,
  "Watery_Diarrhea": 1,
  "Vomiting": 0,
  "Fatigue": 1,
  "Nausea": 0,
  "Fever": 0,
  "Jaundice": 0,
  "Loss_of_Appetite": 0,
  "Headache": 0,
  "Muscle_Pain": 0
}
```

## Built With

- FastAPI
- scikit-learn
- pandas
- uvicorn
