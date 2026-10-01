import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="FarmHub Intelligence Engine",
    description="Agronomic ML Inference & Hybrid Decision Microservice for FarmHub Demo",
    version="1.0.0"
)

# Configurable CORS for Production vs Local Development
allowed_origins_env = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if os.getenv("NODE_ENV") == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
DATA_PATH = os.path.join(os.path.dirname(__file__), "crop_data.csv")

# Load model safely
ml_model = None
if os.path.exists(MODEL_PATH) and os.path.getsize(MODEL_PATH) > 0:
    try:
        ml_model = joblib.load(MODEL_PATH)
    except Exception as e:
        print(f"Warning: Failed to load model from {MODEL_PATH}: {e}")

if ml_model is None:
    from train_model import train_and_save
    train_and_save()
    ml_model = joblib.load(MODEL_PATH)

# Market Benchmarks (Agra / Western UP CACP norms)
MARKET_BENCHMARKS = {
    "mustard": {"yield_acre": 8.5, "cost_acre": 14500, "base_price": 5600, "base_supply": 420000, "demand_idx": 0.88, "weather_fragility": 0.35},
    "chickpea": {"yield_acre": 7.2, "cost_acre": 13000, "base_price": 5300, "base_supply": 210000, "demand_idx": 0.76, "weather_fragility": 0.30},
    "potato": {"yield_acre": 110.0, "cost_acre": 48000, "base_price": 920, "base_supply": 2400000, "demand_idx": 0.82, "weather_fragility": 0.80},
    "wheat": {"yield_acre": 18.0, "cost_acre": 19000, "base_price": 2275, "base_supply": 3200000, "demand_idx": 0.70, "weather_fragility": 0.25},
    "pea": {"yield_acre": 14.0, "cost_acre": 16000, "base_price": 3200, "base_supply": 160000, "demand_idx": 0.65, "weather_fragility": 0.50},
    "maize": {"yield_acre": 16.0, "cost_acre": 17500, "base_price": 2090, "base_supply": 580000, "demand_idx": 0.68, "weather_fragility": 0.40},
}

class FarmAnalysisRequest(BaseModel):
    location: str = Field(..., description="Farmer district/location name")
    area: float = Field(..., gt=0, le=500, description="Farm size in acres (must be > 0)")
    soil: str = Field(..., description="Soil classification (e.g. Loamy, Sandy Loam)")
    waterAvailability: str = Field(..., description="Irrigation status")
    previousCrop: str = Field(..., description="Previous season harvested crop")
    season: Optional[str] = "Rabi"
    extraSupplyPct: Optional[float] = Field(0.0, ge=0, le=100, description="Simulated district adoption surge percentage")

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "FarmHub Intelligence Engine",
        "modelLoaded": ml_model is not None,
        "mode": "Demo Baseline"
    }

@app.post("/api/analyze")
def analyze_farm(req: FarmAnalysisRequest):
    if ml_model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ML Model service currently unavailable"
        )

    # 1. Map Farmer Qualitative Inputs to NPK & Weather Parameters
    soil_map = {
        "Loamy": {"n": 65, "p": 45, "k": 40, "ph": 7.1},
        "Sandy Loam": {"n": 50, "p": 35, "k": 30, "ph": 6.8},
        "Clayey": {"n": 80, "p": 50, "k": 60, "ph": 7.5},
        "Clay": {"n": 80, "p": 50, "k": 60, "ph": 7.5},
        "Black Soil": {"n": 75, "p": 55, "k": 50, "ph": 7.4},
        "Alluvial": {"n": 70, "p": 40, "k": 45, "ph": 7.2},
    }
    s = soil_map.get(req.soil, soil_map["Loamy"])
    rain = 65.0 if "Irrigated" in req.waterAvailability or "Borewell" in req.waterAvailability else 35.0
    temp = 20.5
    humidity = 62.0

    # 2. ML Inference via predict_proba
    features = pd.DataFrame([{
        "N": s["n"], "P": s["p"], "K": s["k"],
        "temperature": temp, "humidity": humidity, "ph": s["ph"], "rainfall": rain
    }])
    probs = ml_model.predict_proba(features)[0]
    classes = ml_model.classes_

    # Get top 5 agronomic matches
    sorted_indices = np.argsort(probs)[::-1][:5]

    recommendations = []
    for idx in sorted_indices:
        crop_name = str(classes[idx]).lower()
        agronomic_prob = float(probs[idx])
        ml_prob_pct = int(round(agronomic_prob * 100))

        b = MARKET_BENCHMARKS.get(crop_name, {
            "yield_acre": 8.0, "cost_acre": 15000, "base_price": 4500,
            "base_supply": 300000, "demand_idx": 0.60, "weather_fragility": 0.40
        })

        total_yield = b["yield_acre"] * req.area
        total_cost = b["cost_acre"] * req.area

        # Supply feedback price dampener
        price_dampener = max(0.70, 1.0 - (req.extraSupplyPct * 0.005))
        effective_price = b["base_price"] * price_dampener

        min_price = round(effective_price * 0.90)
        expected_price = round(effective_price)
        max_price = round(effective_price * 1.10)

        profit_min = round(total_yield * min_price - total_cost)
        profit_expected = round(total_yield * expected_price - total_cost)
        profit_max = round(total_yield * max_price - total_cost)

        # Explainable Composite Score calculation
        agronomic_score = int(agronomic_prob * 40)
        demand_score = 25 if b["demand_idx"] > 0.8 else 15
        profit_score = 25 if profit_expected > 30000 else 15
        rotation_bonus = 10 if req.previousCrop.lower() == "wheat" and crop_name in ["mustard", "chickpea"] else 0
        supply_penalty = 12 if req.extraSupplyPct > 15 else (6 if req.extraSupplyPct > 5 else 0)

        composite_score = min(98, agronomic_score + demand_score + profit_score + rotation_bonus - supply_penalty)

        # Risk scoring
        risk_composite = b["weather_fragility"] + (0.3 if req.extraSupplyPct > 15 else 0.0)
        risk_label = "High" if risk_composite > 0.65 else ("Medium" if risk_composite > 0.35 else "Low")

        recommendations.append({
            "crop": crop_name.capitalize(),
            "mlProbabilityPct": ml_prob_pct,
            "suitabilityScore": round(composite_score / 100, 2),
            "suitabilityLabel": "High" if composite_score > 75 else ("Medium" if composite_score > 50 else "Low"),
            "expectedYieldQuintals": round(total_yield, 1),
            "costTotal": total_cost,
            "profitMin": profit_min,
            "profitExpected": profit_expected,
            "profitMax": profit_max,
            "profitFormattedRange": f"₹{profit_min:,} – ₹{profit_max:,}",
            "demandTrend": "High" if b["demand_idx"] > 0.8 else "Medium",
            "projectedSupplyQuintals": int(b["base_supply"] * (1 + req.extraSupplyPct / 100)),
            "riskLevel": risk_label,
            "riskReasons": [
                f"ML Prediction Probability: {ml_prob_pct}%",
                f"Ideal for {req.soil.lower()} soil & {req.waterAvailability.lower()} conditions",
                f"Upfront operational cost: ₹{int(total_cost):,}"
            ]
        })

    # Return top 3 sorted by composite score
    recommendations.sort(key=lambda x: x["suitabilityScore"], reverse=True)
    return {
        "recommendations": recommendations[:3],
        "supplyFeedback": {
            "adoptionRatePct": req.extraSupplyPct,
            "projectedRegionalSupply": int(420000 * (1 + req.extraSupplyPct / 100))
        },
        "metadata": {
            "engine": "FarmHub Hybrid Intelligence Engine",
            "mlModel": "RandomForestClassifier (100 Decision Trees)",
            "isDemoDataset": True
        }
    }

@app.post("/api/retrain")
def retrain_endpoint():
    # Demo safety: Disable public model retraining to prevent disk overwrite in production
    allow_retrain = os.getenv("ENABLE_DEMO_RETRAIN", "false").lower() == "true"
    if not allow_retrain:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Public model retraining is disabled in demo configuration. Use train_model.py for local development."
        )
    from train_model import train_and_save
    train_and_save()
    return {"message": "Retraining task completed successfully"}

