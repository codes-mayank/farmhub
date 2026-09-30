import { FarmProfileData } from '../types/farmhub';

export interface FarmHubDemoScenario {
  farmProfile: FarmProfileData;
  weather: {
    rainfallMm: number;
    forecastWindowHours: string;
    severity: string;
    isDemo: boolean;
  };
  cropStatus: {
    crop: string;
    maturityPercent: number;
    harvestWindow: string;
  };
  market: {
    crop: string;
    quantityQuintals: number;
    mandiPricePerQuintal: number;
    directBuyerPricePerQuintal: number;
    mandiCosts: {
      transport: number; // ₹25,000
      brokerage: number; // ₹46,875 (6%)
    };
    directCosts: {
      transport: number; // ₹0 (Fieldgate)
      brokerage: number; // ₹0
    };
    mandiGross: number; // ₹7,81,250
    mandiNet: number; // ₹7,09,375
    directGross: number; // ₹8,62,500
    directNet: number; // ₹8,62,500
    directAdvantage: number; // ₹1,53,125
    isDemo: boolean;
  };
  metadata: {
    scenarioName: string;
    label: string;
    isControlledDemo: boolean;
  };
}

export const AUTHORITATIVE_DEMO_SCENARIO: FarmHubDemoScenario = {
  farmProfile: {
    farmerName: 'Ramesh Sharma',
    location: 'Agra, Uttar Pradesh',
    farmArea: 5,
    soilType: 'Loamy',
    waterAvailability: 'Irrigated',
    previousCrop: 'Wheat',
    currentCrop: 'Potato',
    plantingDate: '2026-11-15',
    expectedHarvestDate: '2027-02-15',
    harvestReadinessPercent: 92
  },

  weather: {
    rainfallMm: 85,
    forecastWindowHours: '36–48 Hours',
    severity: 'Critical Unseasonal Rain Alert',
    isDemo: true
  },

  cropStatus: {
    crop: 'Potato',
    maturityPercent: 92,
    harvestWindow: 'Immediate (Next 36 Hours)'
  },

  market: {
    crop: 'Potato (Kufri Bahar)',
    quantityQuintals: 625, // 5 acres * 125 q/acre
    mandiPricePerQuintal: 1250,
    directBuyerPricePerQuintal: 1380,
    mandiCosts: {
      transport: 25000, // ₹40/q * 625q
      brokerage: 46875   // 6% of ₹7,81,250
    },
    directCosts: {
      transport: 0,
      brokerage: 0
    },
    mandiGross: 781250,
    mandiNet: 709375,
    directGross: 862500,
    directNet: 862500,
    directAdvantage: 153125, // ₹8,62,500 - ₹7,09,375 = ₹1,53,125
    isDemo: true
  },

  metadata: {
    scenarioName: 'Agra Potato Unseasonal Rain & Fieldgate Sale',
    label: 'Controlled Demo Scenario',
    isControlledDemo: true
  }
};
