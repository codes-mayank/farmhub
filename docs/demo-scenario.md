# FarmHub Presentation Scenario Documentation

This document defines the single source of truth for **FarmHub's Controlled Demonstration Scenario** used in live academic and hackathon presentations.

---

## 1. Persona & Baseline Context

| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **Farmer Name** | Ramesh Sharma | Single canonical demo farmer |
| **Location** | Bichpuri, Agra District, Uttar Pradesh | Agro-climatic Zone V |
| **Farm Area** | 5 Acres | Irrigated land baseline |
| **Soil Classification** | Loamy Soil | High organic fertility |
| **Water Source** | Canal / Borewell Assisted | Assured irrigation |
| **Previous Crop** | Wheat (Gehun) | High nitrogen depletion |
| **Current Crop** | Potato (Kufri Bahar) | Standing crop |
| **Harvest Readiness** | 92% Maturity | Tuber skin set, ready for digging |

---

## 2. Weather Threat Scenario

| Parameter | Value | Status |
| :--- | :--- | :--- |
| **Event** | Unseasonal Heavy Rainfall Warning | Controlled Demo Scenario |
| **Rainfall Forecast** | 85 mm | High waterlogging threat |
| **Forecast Window** | 36–48 Hours | Action required before rain front |
| **Agronomic Risk** | Bacterial Soft Rot (*Erwinia*) & Phytophthora | 40%–70% potential crop damage if submerged >24 hrs |

---

## 3. Authoritative Market & Financial Reconciliation

The mathematical model below governs all financial calculations across **Market Intelligence**, **Emergency Response**, **AI Assistant**, and **Finance Tracker**:

### A. Physical Production
- **Acreage:** 5 Acres
- **Average Yield:** 125 Quintals / Acre
- **Total Produce:** **625 Quintals**

### B. Option 1: Traditional Agra APMC Mandi Yard Sale
- **Mandi Rate:** ₹1,250 / Quintal
- **Gross Market Value:** $625 \text{ quintals} \times ₹1,250/\text{q} = ₹7,81,250$
- **Loading & Transport Freight:** $625 \text{ quintals} \times ₹40/\text{q} = ₹25,000$
- **Mandi Commission (Aadhat 6%):** $6\% \times ₹7,81,250 = ₹46,875$
- **Total Deductions:** $₹25,000 + ₹46,875 = ₹71,875$
- **Net Bank Payout:** $₹7,81,250 - ₹71,875 =$ **₹7,09,375**

### C. Option 2: Direct Corporate Fieldgate Offloading (Pepsico / Balaji)
- **Direct Buyer Contract Rate:** ₹1,380 / Quintal
- **Gross Cash Payment:** $625 \text{ quintals} \times ₹1,380/\text{q} = ₹8,62,500$
- **Fieldgate Loading Freight:** ₹0 (Buyer handles transportation from farm edge)
- **Middleman Commission:** ₹0
- **Total Deductions:** ₹0
- **Net Bank Payout:** **₹8,62,500**

### D. Direct Fieldgate Net Advantage
$$\text{Net Advantage} = ₹8,62,500 - ₹7,09,375 = \mathbf{₹1,53,125}$$

---

## 4. Intelligence Engine Recommendations (Next Rabi Sowing)

Driven deterministically by `intelligenceEngine.ts`:

1. **#1 Mustard (Sarson - Pusa Bold):** Composite Score **88/100**
   - *5-Acre Expected Net Profit Range:* **₹1,85,000 – ₹2,10,000**
   - *Rationale:* Low water requirement, excellent rotation following wheat, strong Agra crusher demand (88/100 index).
2. **#2 Chickpea (Chana - JG-11):** Composite Score **82/100**
   - *5-Acre Expected Net Profit Range:* **₹1,55,000 – ₹1,80,000**
   - *Rationale:* Natural nitrogen fixation, low input cost.
3. **#3 Green Peas (Matar):** Composite Score **76/100**

---

## 5. Person 2 Integration Boundary

```
[Controlled Demo Scenario / Person 2 Live Feeds]
                      │
                      ▼
        [intelligenceEngine.ts] (Calculated Outputs)
                      │
                      ▼
           [Unified React UI & AI Assistant]
```

All UI elements derive values dynamically from `demoScenario.ts` and `intelligenceEngine.ts`. Profile editing allows dynamic recalculation while the "Reset to Agra Demo Baseline" button restores this scenario instantly.
