from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load trained model
import os
model_path = os.path.join(os.path.dirname(__file__), "..", "models", "model.pkl")
model = joblib.load(model_path)

app = FastAPI(title="Waterborne Disease Predictor", description="ML API for predicting waterborne diseases based on symptoms", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Waterborne Disease Predictor API", "status": "running", "docs": "/docs"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Define input data model
class PatientSymptoms(BaseModel):
    Diarrhea: int = 0
    Dehydration: int = 0
    Abdominal_Pain: int = 0
    Watery_Diarrhea: int = 0
    Vomiting: int = 0
    Fatigue: int = 0
    Nausea: int = 0
    Fever: int = 0
    Jaundice: int = 0
    Loss_of_Appetite: int = 0
    Headache: int = 0
    Muscle_Pain: int = 0

@app.post("/predict")
def predict_disease(symptoms: PatientSymptoms):
    # Convert input to DataFrame
    input_data = pd.DataFrame([symptoms.dict()])
    # Predict disease
    prediction = model.predict(input_data)[0]
    return {"predicted_disease": prediction}
