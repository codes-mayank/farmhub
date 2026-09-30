# FarmHub — Unified Agricultural Ecosystem 🌾

FarmHub is a hackathon-ready agricultural decision-support web application that connects farm data, multi-factor intelligence, services, and markets to help farmers make better decisions and reduce avoidable losses.

> **Core Philosophy:** "FarmHub converts agricultural data into actionable decisions."

---

## 🎯 Consistent Demo Farmer Persona

To ensure an intuitive, cohesive demonstration, FarmHub is pre-configured with a live demo farmer:
- **Farmer Name**: Ramesh Sharma
- **Location**: Agra, Uttar Pradesh
- **Farm Size**: 5 Acres
- **Soil Classification**: Loamy
- **Water Regime**: Irrigated
- **Previous Crop**: Wheat (High nutrient depletion)
- **Current Standing Crop**: Potato (92% harvest ready, vulnerable to imminent 85mm rainfall alert)

---

## 🔄 Core Decision & Feedback Loop Architecture

```text
Farm Data (5 Acres Loamy Soil in Agra)
   ↓
FarmHub Intelligence Engine
   ↓
Soil + Weather + Supply + Demand
   ↓
Price + Cost + Risk
   ↓
Crop Recommendations (Mustard, Chickpea, Green Pea)
   ↓
Market / Verified Buyers (Adani Wilmar, ITC e-Choupal, Patanjali)
   ↓
Action & Emergency Protocol (Mechanized Diggers, Labor, Cold Storage)
   ↓
Outcome
   ↓
Closed Feedback Loop (Simulated Farmer Adoption Rebalances Regional Supply & Risk)
```

---

## 📱 Navigation & Implemented Modules

1. **Landing Page (`Landing`)**:
   - High-impact introduction highlighting the unified agricultural ecosystem.
   - Interactive 8-stage architecture flow diagram from Farm Data to Closed Feedback Loop.

2. **Farmer Dashboard (`Dashboard`)**:
   - Live farm profile summary, active crop health (Potato at 92%), and weather risk banner.
   - 4 quick actions:
     - 🌱 *What should I grow?*
     - 📈 *Check Market*
     - 🚨 *Emergency*
     - 🤖 *Ask FarmHub AI*

3. **My Farm (`Profile`)**:
   - Full editing of location, cultivable acreage, soil classification, water availability, previous crop, and harvest readiness with local persistence.

4. **Farm Intelligence (`Intelligence`) — Core Engine**:
   - "**Analyze My Farm**" with step-by-step animated multi-factor pipeline.
   - Top 3 ranked crop recommendations with:
     - Suitability score
     - Expected yield
     - 5-Acre net profit range (e.g. ₹42,000–₹61,000)
     - Regional demand & supply ratings
     - Overall multi-factor risk rating
     - Explicit rationale ("*Why recommended?*")
   - Recharts visual comparisons:
     - Regional Supply vs Demand comparison
     - Expected Net Profit range comparison
   - **Interactive Feedback Loop Demonstration**:
     - Live toggle simulating farmer adoption (+45% adoption wave).
     - Dynamically updates regional supply, alters Mustard risk to High, and promotes Chickpea and Peas.

5. **Market (`Market`)**:
   - Market board displaying `Crop | Price | Demand | Trend` across Agra, Khandauli, and Hathras mandis.
   - 7-day APMC price trend curves and MSP benchmark comparisons.
   - Verified corporate and processor buyer cards with direct contact triggers.

6. **Emergency Protocol (`Emergency`)**:
   - Realistic emergency scenario: **Heavy Rainfall Risk (85mm forecast)** threatening 92% mature Potato crops with soft rot.
   - 5 coordinated actions: *Harvest early, Arrange machinery, Arrange labour, Secure storage, Contact buyers*.
   - 5 one-click responder dispatch buttons connecting to tractor potato diggers, harvesting labor gangs, cold storage bays, tarpaulin trucks, and spot cash buyers.

7. **AI Assistant (`Assistant`)**:
   - FarmHub AI grounded strictly in FarmHub's structured intelligence.
   - Suggested prompts for crop choice, profit comparisons, emergency response, and market outlook.

8. **Supporting Features**:
   - **Government Schemes (`Schemes`)**: Tailored subsidies (PMKSY, PMFBY, SMAM, PM-KISAN) with reasons for relevance, eligibility, and required documents.
   - **Services Directory (`Services`)**: Catalog of Machinery, Labour, Transport, Storage, Buyers, Finance, and Insurance with instant booking inquiry modals.
   - **Community Forum (`Community`)**: Regional Agra farmer Q&A with Agronomist and Senior Farmer verified badges and upvoting.
   - **Seekho (`Seekho`)**: Short video masterclasses with topic, crop, creator, duration, and key agronomic takeaways.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide Icons
- **Runtime**: Node.js 22 (Port 3000, Host 0.0.0.0)
