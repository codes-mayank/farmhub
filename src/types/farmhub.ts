export type PageId = 
  | 'landing'
  | 'dashboard'
  | 'profile'
  | 'intelligence'
  | 'market'
  | 'emergency'
  | 'assistant'
  | 'schemes'
  | 'services'
  | 'community'
  | 'seekho';

export interface FarmProfileData {
  farmerName: string;
  location: string;
  farmArea: number; // in acres
  soilType: 'Loamy' | 'Sandy Loam' | 'Clay' | 'Black Soil' | 'Alluvial';
  waterAvailability: 'Irrigated' | 'Canal Fed' | 'Rainfed' | 'Borewell Assisted';
  previousCrop: string;
  currentCrop: string;
  plantingDate: string;
  expectedHarvestDate: string;
  harvestReadinessPercent: number; // e.g. 92%
}

export interface CropIntelligenceData {
  id: string;
  name: string;
  hindiName: string;
  category: 'Oilseed' | 'Pulse' | 'Tuber' | 'Cereal' | 'Vegetable';
  season: 'Rabi' | 'Kharif' | 'Zaid';
  idealSoils: string[];
  waterNeeds: 'Low' | 'Medium' | 'High';
  growingPeriodDays: number;
  averageYieldPerAcre: number; // in Quintals
  baseProductionCostPerAcre: number; // in INR
  baseMarketPricePerQuintal: number; // in INR
  currentRegionalSupplyIndex: number; // 0 - 100
  currentRegionalDemandIndex: number; // 0 - 100
  priceVolatility: 'Low' | 'Medium' | 'High';
  weatherResilience: number; // 0 - 100
  soilSuitabilityScore?: number;
  expectedYield?: number;
  expectedRevenue?: number;
  expectedCost?: number;
  expectedProfitMin?: number;
  expectedProfitMax?: number;
  demandRating?: 'High' | 'Moderate' | 'Low';
  supplyRating?: 'High' | 'Moderate' | 'Low';
  overallRisk?: 'Low' | 'Medium' | 'High';
  score?: number;
  reasons?: string[];
  risks?: string[];
}

export interface MarketCommodity {
  id: string;
  crop: string;
  variety: string;
  mandi: string;
  currentPrice: number; // per quintal
  previousPrice: number;
  msp: number;
  demand: 'Very High' | 'High' | 'Steady' | 'Sluggish';
  trend: 'up' | 'down' | 'neutral';
  outlook: string;
  weeklyHistory: { day: string; price: number }[];
  verifiedBuyers: {
    buyerName: string;
    type: 'Processor' | 'Exporter' | 'Mandi Wholesaler' | 'FPO Aggregator';
    requiredQuantity: string;
    offeredPrice: number;
    phone: string;
    location: string;
  }[];
}

export interface EmergencyActionItem {
  id: string;
  title: string;
  type: 'Machinery' | 'Labour' | 'Storage' | 'Transport' | 'Buyer';
  name: string;
  contact: string;
  rate: string;
  distance: string;
  availability: string;
  details: string;
}

export interface SchemeItem {
  id: string;
  name: string;
  ministry: string;
  benefit: string;
  whyRelevant: string;
  potentialEligibility: string;
  requiredDocuments: string[];
  applicationProcess: string;
  statusTag: 'High Match' | 'General Match' | 'Recommended';
}

export interface ServiceListing {
  id: string;
  category: 'Machinery' | 'Labour' | 'Transport' | 'Storage' | 'Buyers' | 'Finance' | 'Insurance';
  title: string;
  provider: string;
  rate: string;
  location: string;
  rating: number;
  contact: string;
  description: string;
}

export interface CommunityQuestion {
  id: string;
  author: string;
  badge: 'Agronomist' | 'Senior Farmer' | 'Agra Farmer' | 'Soil Scientist';
  question: string;
  timestamp: string;
  answersCount: number;
  upvotes: number;
  topAnswer: {
    author: string;
    badge: string;
    text: string;
  };
}

export interface SeekhoVideo {
  id: string;
  title: string;
  creator: string;
  crop: string;
  language: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
}
