import { CropIntelligenceData, FarmProfileData } from '../types/farmhub';
import { CROP_INTELLIGENCE_BASE_CATALOG } from '../data/centralData';

export interface IntelligenceResult {
  topRecommendations: CropIntelligenceData[];
  allRankedCrops: CropIntelligenceData[];
  feedbackLoopActive: boolean;
  adoptionShiftPercent: number; // e.g. 0% (baseline) vs +40% (high adoption)
  summaryText: string;
}

/**
 * 1. Calculate Soil & Environmental Suitability (0 - 100)
 */
export function calculateSuitability(crop: CropIntelligenceData, farm: FarmProfileData): number {
  let score = 50;

  // Soil match
  if (crop.idealSoils.includes(farm.soilType)) {
    score += 30;
  } else {
    score -= 15;
  }

  // Water match
  if (farm.waterAvailability === 'Irrigated' || farm.waterAvailability === 'Borewell Assisted') {
    score += 15; // easily satisfies water needs
  } else if (farm.waterAvailability === 'Rainfed') {
    if (crop.waterNeeds === 'Low') {
      score += 20;
    } else {
      score -= 25;
    }
  }

  // Crop rotation synergy (legumes after cereal, oilseeds after cereal, avoiding same family back-to-back)
  if (farm.previousCrop === 'Wheat') {
    if (crop.category === 'Pulse' || crop.category === 'Oilseed') {
      score += 15; // excellent rotation
    } else if (crop.name.includes('Wheat')) {
      score -= 20; // monoculture penalty
    }
  }

  return Math.min(100, Math.max(10, score));
}

/**
 * 2. Calculate Regional Supply Index (incorporating farmer adoption simulation)
 */
export function calculateSupply(crop: CropIntelligenceData, adoptionShiftPercent: number = 0): number {
  // If simulated adoption occurs for this crop (e.g. Mustard adoption wave):
  let supply = crop.currentRegionalSupplyIndex;
  
  if (crop.id === 'crop-mustard' && adoptionShiftPercent > 0) {
    supply += adoptionShiftPercent * 0.7; // supply expands rapidly as farmers flock to mustard
  } else if (adoptionShiftPercent > 0) {
    // Other crops see slight relative supply drop
    supply -= adoptionShiftPercent * 0.15;
  }

  return Math.min(98, Math.max(15, Math.round(supply)));
}

/**
 * 3. Calculate Regional Demand Index
 */
export function calculateDemand(crop: CropIntelligenceData): number {
  return crop.currentRegionalDemandIndex;
}

/**
 * 4. Estimate Dynamic Market Price
 */
export function estimatePrice(
  crop: CropIntelligenceData, 
  supplyIndex: number, 
  demandIndex: number
): number {
  // Base price modulated by supply/demand elasticity
  const ratio = demandIndex / (supplyIndex || 1);
  const elasticityFactor = 0.35; // realistic agro price movement damper
  const priceMultiplier = 1 + (ratio - 1) * elasticityFactor;
  
  const estimated = crop.baseMarketPricePerQuintal * priceMultiplier;
  return Math.round(estimated / 10) * 10;
}

/**
 * 5. Calculate Expected Profit Range for Farmer's specific acreage
 */
export function calculateProfit(
  crop: CropIntelligenceData, 
  farm: FarmProfileData, 
  estimatedPrice: number,
  suitabilityScore: number
): {
  expectedYield: number;
  expectedRevenue: number;
  expectedCost: number;
  expectedProfitMin: number;
  expectedProfitMax: number;
} {
  // Yield is adjusted by suitability
  const yieldEfficiency = 0.75 + (suitabilityScore / 100) * 0.35;
  const yieldPerAcre = Math.round(crop.averageYieldPerAcre * yieldEfficiency * 10) / 10;
  const totalYield = Math.round(yieldPerAcre * farm.farmArea);

  const expectedRevenue = totalYield * estimatedPrice;
  const expectedCost = Math.round(crop.baseProductionCostPerAcre * farm.farmArea);
  
  // Profit baseline
  const baseProfit = expectedRevenue - expectedCost;
  
  // Spread accounting for weather & market range
  const spreadPercent = crop.priceVolatility === 'High' ? 0.20 : 0.12;
  const expectedProfitMin = Math.round(baseProfit * (1 - spreadPercent));
  const expectedProfitMax = Math.round(baseProfit * (1 + spreadPercent));

  return {
    expectedYield: totalYield,
    expectedRevenue,
    expectedCost,
    expectedProfitMin,
    expectedProfitMax
  };
}

/**
 * 6. Calculate Multi-Factor Risk Rating
 */
export function calculateRisk(
  crop: CropIntelligenceData, 
  farm: FarmProfileData, 
  supplyIndex: number
): { riskRating: 'Low' | 'Medium' | 'High'; risks: string[] } {
  const risks: string[] = [];
  let riskScore = 30; // base

  // High supply risk (glut)
  if (supplyIndex > 70) {
    riskScore += 30;
    risks.push(`High projected regional supply (${supplyIndex}/100) creates market glut & price slump risk.`);
  }

  // Price volatility risk
  if (crop.priceVolatility === 'High') {
    riskScore += 20;
    risks.push('High historical price volatility at local mandis.');
  }

  // Weather resilience
  if (crop.weatherResilience < 65) {
    riskScore += 20;
    risks.push('Sensitive to unseasonal precipitation & humidity surges.');
  }

  // Water dependency
  if (crop.waterNeeds === 'High' && farm.waterAvailability === 'Rainfed') {
    riskScore += 30;
    risks.push('High water requirement under rainfed conditions.');
  }

  let riskRating: 'Low' | 'Medium' | 'High' = 'Medium';
  if (riskScore <= 45) riskRating = 'Low';
  else if (riskScore >= 75) riskRating = 'High';

  return { riskRating, risks };
}

/**
 * 7. Master Generator: Recommend Crops & Explain "Why"
 */
export function generateRecommendations(
  farm: FarmProfileData,
  adoptionShiftPercent: number = 0
): IntelligenceResult {
  const catalog = CROP_INTELLIGENCE_BASE_CATALOG;

  const processed: CropIntelligenceData[] = catalog.map((crop) => {
    const suitabilityScore = calculateSuitability(crop, farm);
    const supplyIndex = calculateSupply(crop, adoptionShiftPercent);
    const demandIndex = calculateDemand(crop);
    const dynamicPrice = estimatePrice(crop, supplyIndex, demandIndex);
    const profitData = calculateProfit(crop, farm, dynamicPrice, suitabilityScore);
    const { riskRating, risks } = calculateRisk(crop, farm, supplyIndex);

    // Composite ranking score:
    // Suitability (30%) + Demand (25%) + Profitability (25%) - Supply Risk (15%) - Volatility Risk (5%)
    const profitPerAcre = profitData.expectedProfitMin / farm.farmArea;
    const profitFactor = Math.min(100, Math.max(0, (profitPerAcre / 55000) * 100));
    
    let compositeScore = 
      (suitabilityScore * 0.30) +
      (demandIndex * 0.25) +
      (profitFactor * 0.25) +
      ((100 - supplyIndex) * 0.15) +
      (crop.weatherResilience * 0.05);

    // Rotation bonus
    if (farm.previousCrop === 'Wheat' && (crop.category === 'Pulse' || crop.category === 'Oilseed')) {
      compositeScore += 6;
    }

    // Determine why recommended
    const reasons: string[] = [];
    if (suitabilityScore >= 75) {
      reasons.push(`Optimal match for ${farm.soilType} soil and ${farm.waterAvailability.toLowerCase()} conditions.`);
    }
    if (demandIndex >= 75) {
      reasons.push(`Strong processing and crushing demand (${demandIndex}/100) in Agra & surrounding mandis.`);
    }
    if (supplyIndex <= 55) {
      reasons.push(`Moderate regional supply (${supplyIndex}/100) ensures favorable pricing without local gluts.`);
    }
    if (farm.previousCrop === 'Wheat' && crop.category === 'Pulse') {
      reasons.push('Natural nitrogen fixation rejuvenates soil depleted after heavy wheat feeding.');
    }
    if (farm.previousCrop === 'Wheat' && crop.category === 'Oilseed') {
      reasons.push('Breaks soil pathogen cycles and requires 40% less irrigation than second cereal.');
    }

    const demandRating: 'High' | 'Moderate' | 'Low' = demandIndex >= 75 ? 'High' : demandIndex >= 50 ? 'Moderate' : 'Low';
    const supplyRating: 'High' | 'Moderate' | 'Low' = supplyIndex >= 70 ? 'High' : supplyIndex >= 45 ? 'Moderate' : 'Low';

    return {
      ...crop,
      soilSuitabilityScore: suitabilityScore,
      currentRegionalSupplyIndex: supplyIndex,
      baseMarketPricePerQuintal: dynamicPrice,
      expectedYield: profitData.expectedYield,
      expectedRevenue: profitData.expectedRevenue,
      expectedCost: profitData.expectedCost,
      expectedProfitMin: profitData.expectedProfitMin,
      expectedProfitMax: profitData.expectedProfitMax,
      demandRating,
      supplyRating,
      overallRisk: riskRating,
      score: Math.round(compositeScore),
      reasons,
      risks
    };
  });

  // Sort descending by composite score
  processed.sort((a, b) => (b.score || 0) - (a.score || 0));

  const top3 = processed.slice(0, 3);

  // Generate dynamic executive summary
  let summary = '';
  if (adoptionShiftPercent > 25) {
    summary = `Simulated Regional Farmer Feedback Loop active (+${adoptionShiftPercent}% farmer adoption of Mustard). Increased regional supply shifts Mustard risk higher, opening prime opportunities for Chickpea and Green Peas!`;
  } else {
    summary = `Based on your ${farm.farmArea}-acre ${farm.soilType.toLowerCase()} soil farm in ${farm.location} following ${farm.previousCrop}, Mustard and Chickpea offer the highest net return with optimal disease-break rotation.`;
  }

  return {
    topRecommendations: top3,
    allRankedCrops: processed,
    feedbackLoopActive: adoptionShiftPercent > 0,
    adoptionShiftPercent,
    summaryText: summary
  };
}
