export interface FarmProfile {
  location: string;
  area: number; // in acres
  soil: string;
  waterAvailability: string;
  previousCrop: string;
  season?: string;
  farmerName?: string;
  harvestReadinessPct?: number;
}

export interface Recommendation {
  crop: string;
  suitabilityScore: number;
  suitabilityLabel: "High" | "Medium" | "Low";
  expectedYieldQuintals: number;
  costTotal: number;
  profitMin: number;
  profitExpected: number;
  profitMax: number;
  profitFormattedRange: string;
  demandTrend: "High" | "Medium" | "Low";
  projectedSupplyQuintals: number;
  riskLevel: "Low" | "Medium" | "High";
  riskReasons: string[];
}

export interface AnalysisResponse {
  recommendations: Recommendation[];
  supplyFeedback: {
    adoptionRatePct: number;
    projectedRegionalSupply: number;
  };
}
