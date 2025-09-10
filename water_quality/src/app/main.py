from typing import Dict, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, ConfigDict
import joblib
import numpy as np
import os
import pandas as pd

# -------------------------------------------------------------------
# Config
# -------------------------------------------------------------------
MODEL_PATH = os.environ.get("MODEL_PATH", "models/model.pkl")

# -------------------------------------------------------------------
# Schemas
# -------------------------------------------------------------------
class SampleInput(BaseModel):
    ph: float = Field(..., description="pH value of water sample")
    Hardness: float = Field(..., description="Water hardness (mg/L)")
    Solids: float = Field(..., description="Total dissolved solids (ppm)")
    Chloramines: float = Field(..., description="Chloramine concentration (ppm)")
    Sulfate: float = Field(..., description="Sulfate concentration (mg/L)")
    Conductivity: float = Field(..., description="Electrical conductivity (μS/cm)")
    Organic_carbon: float = Field(..., description="Organic carbon (ppm)")
    Trihalomethanes: float = Field(..., description="Trihalomethanes (μg/L)")
    Turbidity: float = Field(..., description="Turbidity (NTU)")

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "ph": 7.1,
                    "Hardness": 204.0,
                    "Solids": 20000.0,
                    "Chloramines": 9.2,
                    "Sulfate": 330.0,
                    "Conductivity": 460.0,
                    "Organic_carbon": 12.5,
                    "Trihalomethanes": 60.0,
                    "Turbidity": 3.0,
                }
            ]
        }
    )

class PredictionResponse(BaseModel):
    predicted_class: int = Field(..., description="Predicted class label")
    probabilities: Dict[str, float] = Field(
        ..., description="Per-class probabilities keyed by class label (as string)"
    )

# -------------------------------------------------------------------
# App
# -------------------------------------------------------------------
app = FastAPI(
    title="Waterborne Disease Risk Predictor",
    version="0.1.0",
    description="Predict risk class from water quality features. POST /predict with JSON.",
)

# -------------------------------------------------------------------
# Load model bundle
# Supports either:
# 1) sklearn Pipeline with predict_proba and classes_
# 2) dict with keys {'model', 'scaler'}
# -------------------------------------------------------------------
model_bundle = joblib.load(MODEL_PATH)
pipeline = None
model = None
scaler = None

if hasattr(model_bundle, "predict_proba"):
    pipeline = model_bundle
else:
    try:
        model = model_bundle["model"]
        scaler = model_bundle["scaler"]
    except Exception as e:
        raise RuntimeError(
            f"Unsupported model bundle at {MODEL_PATH}. Expect a Pipeline or a dict with keys 'model' and 'scaler'. Error: {e}"
        )

# Define features in training order
features = [
    "ph",
    "Hardness",
    "Solids",
    "Chloramines",
    "Sulfate",
    "Conductivity",
    "Organic_carbon",
    "Trihalomethanes",
    "Turbidity",
]

# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------
@app.get("/")
def read_root():
    return {"message": "Waterborne disease risk predictor. POST /predict with JSON."}

@app.post(
    "/predict",
    response_model=PredictionResponse,
    responses={
        200: {
            "description": "Prediction with class and probabilities",
            "content": {
                "application/json": {
                    "example": {
                        "predicted_class": 1,
                        "probabilities": {"0": 0.12, "1": 0.78, "2": 0.10},
                    }
                }
            },
        },
        422: {"description": "Validation error - missing or invalid inputs"},
        500: {"description": "Internal server error - inference failure"},
    },
)
def predict(sample: SampleInput):
    try:
        # Preserve training order and types
        row = [getattr(sample, f) for f in features]
        input_df = pd.DataFrame([row], columns=features).astype(float)

        # Early guard for NaNs
        if input_df.isna().any().any():
            raise HTTPException(status_code=422, detail="Missing or null feature values")

        # Inference
        if pipeline is not None:
            proba = pipeline.predict_proba(input_df)[0]
            classes = pipeline.classes_.tolist()
        else:
            X_t = scaler.transform(input_df)
            proba = model.predict_proba(X_t)[0]
            classes = model.classes_.tolist()

        # Compose response
        top_idx = int(np.argmax(proba))
        return {
            "predicted_class": int(classes[top_idx]),
            "probabilities": {str(c): float(p) for c, p in zip(classes, proba)},
        }

    except HTTPException:
        raise
    except Exception as e:
        # Surface common sklearn/pandas/type errors clearly
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")
