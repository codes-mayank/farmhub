# FarmHub — Backend & ML Integration Demo Architecture

## 1. System Overview

FarmHub uses a **hybrid intelligence architecture** designed for interactive demonstration:

```text
                                 FARM PROFILE DATA
                         (Agra 5-Acre Baseline Context)
                                       │
                                       ▼
                         UNIFIED INTELLIGENCE SERVICE
                    (src/lib/api/intelligenceService.ts)
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     FASTAPI ML MICROSERVICE                        DETERMINISTIC ENGINE
   (backend/main.py — Port 8000)                (src/services/intelligenceEngine.ts)
                │                                             │
   • RandomForest Crop Prediction                • Exact Mandi vs Direct Math
   • Agronomic Probability %                     • 85mm Rain Emergency Sequence
   • Dynamic Price Dampener                      • Authoritative Scenario Values
                │                                             │
                └──────────────────────┬──────────────────────┘
                                       ▼
                           UNIFIED INTELLIGENCE RESULT
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
         FARMHUB UI VIEWS                              DAWN AI ASSISTANT
   (Dashboard, Intelligence, Market)             (Conversational Orchestrator)
```

---

## 2. ML vs. Deterministic Boundary

| Operational Domain | Owner | Description |
|---|---|---|
| **Learned Agronomic Prediction** | **FastAPI ML Service** | Scikit-Learn `RandomForestClassifier` trained on agronomic features ($N, P, K, \text{temp}, \text{humidity}, ph, \text{rainfall}$) predicting crop suitability probabilities. |
| **Emergency Harvest Decision** | **Deterministic Engine** | Authoritative Agra potato rain alert (85mm in 36–48 hours, 92% harvest maturity). |
| **Mandi vs Direct Sales Math** | **Deterministic Engine** | Exact calculation ($625\text{ q} \times ₹1,250\text{ Mandi} \rightarrow ₹7,09,375\text{ Net}$ vs $₹1,380\text{ Direct} \rightarrow ₹8,62,500\text{ Net} = \mathbf{+₹1,53,125\text{ Advantage}}$). |
| **Farmer UI Explanation** | **Dawn AI Assistant** | Grounded explanation linking ML probabilities to business profit bounds and emergency timing. |

---

## 3. Fallback Mechanism

If the Python FastAPI service is offline or unreachable within 3.5 seconds, the application automatically switches to **Demo Baseline Fallback Mode** (`getFallbackData()`), using pre-computed Scikit-Learn baseline predictions.

The frontend notifies the demonstrator via a **"Controlled Demo Dataset"** badge.

---

## 4. API & Environment Configuration

* **Frontend API Endpoint**: `VITE_ML_API_URL` (Defaults to `http://localhost:8000`)
* **Backend Allowed Origins**: `FRONTEND_ORIGIN` (Configurable CORS origins)
* **Demo Retraining Guard**: `POST /api/retrain` is disabled by default in demo configuration (`ENABLE_DEMO_RETRAIN=false`).
