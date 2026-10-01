import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="FarmHub Intelligence Engine")

# CORS Setup for Next.js (Localhost and Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
DATA_PATH = os.path.join(os.path.dirname(__file__), "crop_data.csv")

# Ensure model exists on startup
if not os.path.exists(MODEL_PATH) or os.path.getsize(MODEL_PATH) == 0:
    from train_model import train_and_save
    train_and_save()

ml_model = joblib.load(MODEL_PATH)

# Model 2 Market Benchmarks (Agra / Western UP CACP norms)
MARKET_BENCHMARKS = {
    "mustard": {"yield_acre": 8.5, "cost_acre": 14500, "base_price": 5600, "base_supply": 420000, "demand_idx": 0.88, "weather_fragility": 0.35},
    "chickpea": {"yield_acre": 7.2, "cost_acre": 13000, "base_price": 5300, "base_supply": 210000, "demand_idx": 0.76, "weather_fragility": 0.30},
    "potato": {"yield_acre": 110.0, "cost_acre": 48000, "base_price": 920, "base_supply": 2400000, "demand_idx": 0.82, "weather_fragility": 0.80},
    "wheat": {"yield_acre": 18.0, "cost_acre": 19000, "base_price": 2275, "base_supply": 3200000, "demand_idx": 0.70, "weather_fragility": 0.25},
    "pea": {"yield_acre": 14.0, "cost_acre": 16000, "base_price": 3200, "base_supply": 160000, "demand_idx": 0.65, "weather_fragility": 0.50},
    "maize": {"yield_acre": 16.0, "cost_acre": 17500, "base_price": 2090, "base_supply": 580000, "demand_idx": 0.68, "weather_fragility": 0.40},
}

class FarmAnalysisRequest(BaseModel):
    location: str
    area: float
    soil: str
    waterAvailability: str
    previousCrop: str
    season: Optional[str] = "Rabi"
    extraSupplyPct: Optional[float] = 0.0  # Feedback loop simulation parameter

@app.get("/health")
def health():
    return {"status": "healthy", "service": "FarmHub Intelligence"}

@app.post("/api/analyze")
def analyze_farm(req: FarmAnalysisRequest):
    global ml_model

    # 1. Map Farmer Qualitative Inputs to NPK & Weather
    soil_map = {
        "Loamy": {"n": 65, "p": 45, "k": 40, "ph": 7.1},
        "Sandy Loam": {"n": 50, "p": 35, "k": 30, "ph": 6.8},
        "Clayey": {"n": 80, "p": 50, "k": 60, "ph": 7.5},
        "Alluvial": {"n": 70, "p": 40, "k": 45, "ph": 7.2},
    }
    s = soil_map.get(req.soil, soil_map["Loamy"])
    rain = 65.0 if req.waterAvailability == "Irrigated" else 35.0
    temp = 20.5
    humidity = 62.0

    # 2. Model 1: Real ML Inference via predict_proba
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

        # Model 2: Profit & Downside Risk Engine
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

        # Explainable score calculation
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
                f"Agronomic ML confidence: {int(agronomic_prob * 100)}%",
                "Suitable for loamy irrigated conditions",
                f"Upfront operational cost: ₹{total_cost:,}"
            ]
        })

    # Return top 3 sorted by composite score
    recommendations.sort(key=lambda x: x["suitabilityScore"], reverse=True)
    return {
        "recommendations": recommendations[:3],
        "supplyFeedback": {
            "adoptionRatePct": req.extraSupplyPct,
            "projectedRegionalSupply": int(420000 * (1 + req.extraSupplyPct / 100))
        }
    }

@app.post("/api/retrain")
def retrain_endpoint(background_tasks: BackgroundTasks):
    from train_model import train_and_save
    background_tasks.add_task(train_and_save)
    return {"message": "Retraining task scheduled in background"}
