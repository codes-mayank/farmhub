export type NavigationTab = 
  | 'dashboard'
  | 'fields'
  | 'mandi'
  | 'marketplace'
  | 'doctor'
  | 'fertilizer'
  | 'finance'
  | 'schemes';

export interface FieldPlot {
  id: string;
  name: string;
  areaAcres: number;
  crop: string;
  variety: string;
  sowingDate: string;
  expectedHarvestDate: string;
  stage: 'Germination' | 'Vegetative' | 'Flowering' | 'Grain Filling' | 'Harvest Ready';
  healthScore: number; // 0-100
  soilType: 'Alluvial' | 'Black Soil' | 'Red Soil' | 'Sandy Loam' | 'Clay';
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal/Flood' | 'Rainfed';
  lastWatered: string;
  nextScheduledTask: string;
  notes: string;
}

export interface MandiPrice {
  id: string;
  commodity: string;
  mandi: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  msp: number; // Minimum Support Price
  priceChange: number; // percentage change today
  unit: string;
  trend: 'up' | 'down' | 'stable';
  recommendation: 'Sell Now' | 'Hold (Expected Rise)' | 'Favorable MSP';
  history: { date: string; price: number }[];
}

export interface ProduceListing {
  id: string;
  title: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: 'Quintal' | 'Kg' | 'Tons' | 'Bags';
  pricePerUnit: number;
  sellerName: string;
  sellerPhone: string;
  location: string;
  harvestDate: string;
  qualityGrade: 'Grade A (Export)' | 'Grade B (Standard)' | 'Organic Certified';
  imageUrl: string;
  isVerified: boolean;
  status: 'Available' | 'Reserved' | 'Sold';
}

export interface EquipmentListing {
  id: string;
  name: string;
  category: 'Tractor' | 'Harvester' | 'Sprayer/Drone' | 'Tiller/Plough' | 'Seeder';
  ratePerDay: number;
  ownerName: string;
  phone: string;
  location: string;
  available: boolean;
  modelYear: number;
  specifications: string;
  imageUrl: string;
}

export interface PestDisease {
  id: string;
  name: string;
  crop: string;
  type: 'Fungal' | 'Bacterial' | 'Pest/Insect' | 'Viral' | 'Nutrient Deficiency';
  symptoms: string[];
  severity: 'Mild' | 'Moderate' | 'Severe';
  chemicalControl: string;
  organicControl: string;
  dosage: string;
  preventionTips: string;
  imageUrl: string;
}

export interface SoilTestResult {
  ph: number;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  organicCarbon: number; // %
  zinc: number; // ppm
}

export interface FarmExpense {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  category: 'Seeds' | 'Fertilizer' | 'Pesticide' | 'Labor' | 'Machinery' | 'Irrigation' | 'Sale Income';
  type: 'Expense' | 'Income';
  amount: number;
  date: string;
  description: string;
}

export interface GovtScheme {
  id: string;
  title: string;
  department: string;
  benefitAmount: string;
  description: string;
  criteria: string[];
  documentsRequired: string[];
  applyLinkText: string;
  category: 'Direct Income' | 'Insurance' | 'Irrigation' | 'Equipment Subsidy' | 'Credit/Loan';
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfallProbability: number;
  uvIndex: number;
  advisory: string;
  spraySuitability: 'Excellent' | 'Moderate' | 'Avoid';
  forecast: {
    day: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
    rainChance: number;
  }[];
}
