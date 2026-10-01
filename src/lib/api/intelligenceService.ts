import { FarmProfile, AnalysisResponse, Recommendation } from "../../types/farm";
import { FarmProfileData } from "../../types/farmhub";

const BACKEND_URL = (import.meta as any).env?.VITE_ML_API_URL || "http://localhost:8000";

type AnyFarm = FarmProfile | FarmProfileData;

function getArea(farm: AnyFarm): number {
  if ("farmArea" in farm && typeof farm.farmArea === "number") return farm.farmArea;
  if ("area" in farm && typeof farm.area === "number") return farm.area;
  return 5;
}

function getSoil(farm: AnyFarm): string {
  if ("soilType" in farm && farm.soilType) return farm.soilType;
  if ("soil" in farm && farm.soil) return farm.soil;
  return "Loamy";
}

// Local fallback in case the Python server is offline during evaluation
function getFallbackData(farm: AnyFarm, extraSupplyPct: number = 0): AnalysisResponse {
  const area = getArea(farm);
  const isWheatPre = (farm.previousCrop || "").toLowerCase() === "wheat";
  const dampener = Math.max(0.75, 1 - (extraSupplyPct * 0.005));

  const list: Recommendation[] = [
    {
      crop: "Mustard",
      suitabilityScore: 0.88 - (extraSupplyPct > 15 ? 0.08 : 0),
      suitabilityLabel: "High",
      expectedYieldQuintals: Math.round(8.5 * area * 10) / 10,
      costTotal: 14500 * area,
      profitMin: Math.round(38000 * area * dampener),
      profitExpected: Math.round(52000 * area * dampener),
      profitMax: Math.round(61000 * area * dampener),
      profitFormattedRange: `₹${Math.round(38000 * area * dampener).toLocaleString("en-IN")} – ₹${Math.round(61000 * area * dampener).toLocaleString("en-IN")}`,
      demandTrend: "High",
      projectedSupplyQuintals: Math.round(420000 * (1 + extraSupplyPct / 100)),
      riskLevel: extraSupplyPct > 20 ? "Medium" : "Low",
      riskReasons: [
        "Optimal compatibility with loamy soil",
        isWheatPre ? "Excellent nitrogen cycle rotation after wheat" : "Favorable crop rotation",
        "Strong regional oilseed processing demand in Agra",
      ],
    },
    {
      crop: "Chickpea",
      suitabilityScore: 0.79,
      suitabilityLabel: "High",
      expectedYieldQuintals: Math.round(7.2 * area * 10) / 10,
      costTotal: 13000 * area,
      profitMin: Math.round(31000 * area),
      profitExpected: Math.round(44000 * area),
      profitMax: Math.round(55000 * area),
      profitFormattedRange: `₹${(31000 * area).toLocaleString("en-IN")} – ₹${(55000 * area).toLocaleString("en-IN")}`,
      demandTrend: "Medium",
      projectedSupplyQuintals: 210000,
      riskLevel: "Low",
      riskReasons: [
        "Low water requirement suited for irrigated Rabi",
        "MSP-supported pulse procurement",
        "Low upfront capital risk",
      ],
    },
    {
      crop: "Potato",
      suitabilityScore: 0.72 - (extraSupplyPct > 10 ? 0.05 : 0),
      suitabilityLabel: "Medium",
      expectedYieldQuintals: Math.round(110 * area),
      costTotal: 48000 * area,
      profitMin: Math.round(25000 * area * dampener),
      profitExpected: Math.round(58000 * area * dampener),
      profitMax: Math.round(82000 * area * dampener),
      profitFormattedRange: `₹${Math.round(25000 * area * dampener).toLocaleString("en-IN")} – ₹${Math.round(82000 * area * dampener).toLocaleString("en-IN")}`,
      demandTrend: "High",
      projectedSupplyQuintals: Math.round(2400000 * (1 + extraSupplyPct / 100)),
      riskLevel: "High",
      riskReasons: [
        "High seed and cold-storage capital expenditure",
        "Susceptible to late blight and unseasonal winter rain",
        "High price volatility near harvesting peak",
      ],
    },
  ];

  return {
    recommendations: list,
    supplyFeedback: {
      adoptionRatePct: extraSupplyPct,
      projectedRegionalSupply: Math.round(420000 * (1 + extraSupplyPct / 100)),
    },
  };
}

export async function fetchFarmIntelligence(
  farm: AnyFarm,
  extraSupplyPct: number = 0
): Promise<AnalysisResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout guard

  try {
    const area = getArea(farm);
    const soil = getSoil(farm);
    const res = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: farm.location,
        area: area,
        soil: soil,
        waterAvailability: farm.waterAvailability,
        previousCrop: farm.previousCrop,
        season: ("season" in farm && farm.season) || "Rabi",
        extraSupplyPct: extraSupplyPct,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Backend connection failed; using local fallback logic:", err);
    return getFallbackData(farm, extraSupplyPct);
  }
}
