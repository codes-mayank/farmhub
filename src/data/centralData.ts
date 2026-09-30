import { 
  FarmProfileData, 
  CropIntelligenceData, 
  MarketCommodity, 
  EmergencyActionItem, 
  SchemeItem, 
  ServiceListing, 
  CommunityQuestion, 
  SeekhoVideo 
} from '../types/farmhub';

export const DEFAULT_FARM_PROFILE: FarmProfileData = {
  farmerName: 'Ramesh Sharma',
  location: 'Agra, Uttar Pradesh',
  farmArea: 5, // 5 acres
  soilType: 'Loamy',
  waterAvailability: 'Irrigated',
  previousCrop: 'Wheat',
  currentCrop: 'Potato',
  plantingDate: '2026-11-15',
  expectedHarvestDate: '2027-02-15',
  harvestReadinessPercent: 92
};

export const CROP_INTELLIGENCE_BASE_CATALOG: CropIntelligenceData[] = [
  {
    id: 'crop-mustard',
    name: 'Mustard (Sarson)',
    hindiName: 'सरसों',
    category: 'Oilseed',
    season: 'Rabi',
    idealSoils: ['Loamy', 'Sandy Loam', 'Alluvial'],
    waterNeeds: 'Low',
    growingPeriodDays: 110,
    averageYieldPerAcre: 11, // Quintals
    baseProductionCostPerAcre: 14500, // INR
    baseMarketPricePerQuintal: 5950, // INR
    currentRegionalSupplyIndex: 42, // Moderate
    currentRegionalDemandIndex: 88, // Very High
    priceVolatility: 'Medium',
    weatherResilience: 85
  },
  {
    id: 'crop-chickpea',
    name: 'Chickpea (Chana)',
    hindiName: 'चना',
    category: 'Pulse',
    season: 'Rabi',
    idealSoils: ['Loamy', 'Sandy Loam', 'Clay'],
    waterNeeds: 'Low',
    growingPeriodDays: 105,
    averageYieldPerAcre: 9, // Quintals
    baseProductionCostPerAcre: 13000,
    baseMarketPricePerQuintal: 5600,
    currentRegionalSupplyIndex: 51,
    currentRegionalDemandIndex: 78,
    priceVolatility: 'Low',
    weatherResilience: 90
  },
  {
    id: 'crop-potato',
    name: 'Potato (Alu)',
    hindiName: 'आलू',
    category: 'Tuber',
    season: 'Rabi',
    idealSoils: ['Loamy', 'Sandy Loam'],
    waterNeeds: 'High',
    growingPeriodDays: 90,
    averageYieldPerAcre: 125, // Quintals
    baseProductionCostPerAcre: 38000,
    baseMarketPricePerQuintal: 1250,
    currentRegionalSupplyIndex: 78, // High supply currently
    currentRegionalDemandIndex: 70,
    priceVolatility: 'High',
    weatherResilience: 55
  },
  {
    id: 'crop-wheat',
    name: 'Wheat (Gehun)',
    hindiName: 'गेहूं',
    category: 'Cereal',
    season: 'Rabi',
    idealSoils: ['Loamy', 'Clay', 'Alluvial'],
    waterNeeds: 'Medium',
    growingPeriodDays: 135,
    averageYieldPerAcre: 22, // Quintals
    baseProductionCostPerAcre: 21000,
    baseMarketPricePerQuintal: 2550,
    currentRegionalSupplyIndex: 85, // Very high supply
    currentRegionalDemandIndex: 80,
    priceVolatility: 'Low',
    weatherResilience: 80
  },
  {
    id: 'crop-pea',
    name: 'Green Pea (Matar)',
    hindiName: 'मटर',
    category: 'Vegetable',
    season: 'Rabi',
    idealSoils: ['Loamy', 'Sandy Loam'],
    waterNeeds: 'Medium',
    growingPeriodDays: 75,
    averageYieldPerAcre: 35, // Quintals
    baseProductionCostPerAcre: 22000,
    baseMarketPricePerQuintal: 2800,
    currentRegionalSupplyIndex: 48,
    currentRegionalDemandIndex: 75,
    priceVolatility: 'Medium',
    weatherResilience: 70
  },
  {
    id: 'crop-maize',
    name: 'Hybrid Maize (Makka)',
    hindiName: 'मक्का',
    category: 'Cereal',
    season: 'Zaid',
    idealSoils: ['Loamy', 'Sandy Loam', 'Alluvial'],
    waterNeeds: 'Medium',
    growingPeriodDays: 95,
    averageYieldPerAcre: 28, // Quintals
    baseProductionCostPerAcre: 18500,
    baseMarketPricePerQuintal: 2350,
    currentRegionalSupplyIndex: 55,
    currentRegionalDemandIndex: 82,
    priceVolatility: 'Low',
    weatherResilience: 75
  },
  {
    id: 'crop-tomato',
    name: 'Tomato (Tamatar)',
    hindiName: 'टमाटर',
    category: 'Vegetable',
    season: 'Zaid',
    idealSoils: ['Loamy', 'Sandy Loam'],
    waterNeeds: 'High',
    growingPeriodDays: 85,
    averageYieldPerAcre: 150, // Quintals
    baseProductionCostPerAcre: 45000,
    baseMarketPricePerQuintal: 1400,
    currentRegionalSupplyIndex: 65,
    currentRegionalDemandIndex: 85,
    priceVolatility: 'High',
    weatherResilience: 50
  }
];

export const MARKET_DATA: MarketCommodity[] = [
  {
    id: 'mkt-mustard',
    crop: 'Mustard (Sarson)',
    variety: 'Pusa Bold / 42% Oil Content',
    mandi: 'Agra APMC Mandi',
    currentPrice: 5950,
    previousPrice: 5780,
    msp: 5650,
    demand: 'Very High',
    trend: 'up',
    outlook: 'Crushers & edible oil mills aggressively buying due to low local depot inventory.',
    weeklyHistory: [
      { day: 'Mon', price: 5740 },
      { day: 'Tue', price: 5780 },
      { day: 'Wed', price: 5820 },
      { day: 'Thu', price: 5890 },
      { day: 'Fri', price: 5920 },
      { day: 'Sat', price: 5950 }
    ],
    verifiedBuyers: [
      {
        buyerName: 'Adani Wilmar Procurement Hub',
        type: 'Processor',
        requiredQuantity: '500 Quintals',
        offeredPrice: 6020,
        phone: '+91 98370 12044',
        location: 'Agra-Delhi Highway Yard'
      },
      {
        buyerName: 'Shri Balaji Oil Mills',
        type: 'Processor',
        requiredQuantity: '200 Quintals',
        offeredPrice: 5980,
        phone: '+91 94122 88410',
        location: 'Khandauli Road, Agra'
      }
    ]
  },
  {
    id: 'mkt-potato',
    crop: 'Potato (Alu)',
    variety: 'Kufri Bahar (Fresh Harvest)',
    mandi: 'Khandauli Mandi, Agra',
    currentPrice: 1250,
    previousPrice: 1320,
    msp: 1100,
    demand: 'Sluggish',
    trend: 'down',
    outlook: 'Heavy arrivals from Shamshabad & Fatehabad belts exerting temporary downward pressure.',
    weeklyHistory: [
      { day: 'Mon', price: 1380 },
      { day: 'Tue', price: 1350 },
      { day: 'Wed', price: 1320 },
      { day: 'Thu', price: 1290 },
      { day: 'Fri', price: 1260 },
      { day: 'Sat', price: 1250 }
    ],
    verifiedBuyers: [
      {
        buyerName: 'Pepsico Foods India Direct Yard',
        type: 'Processor',
        requiredQuantity: '1200 Quintals (Chips Grade)',
        offeredPrice: 1380,
        phone: '+91 98110 54321',
        location: 'Agra Kosi Kalan Collection'
      },
      {
        buyerName: 'Azadpur Wholesale Consortium',
        type: 'Mandi Wholesaler',
        requiredQuantity: '600 Quintals',
        offeredPrice: 1270,
        phone: '+91 98711 90214',
        location: 'Direct Truck Loading Agra'
      }
    ]
  },
  {
    id: 'mkt-chickpea',
    crop: 'Chickpea (Chana)',
    variety: 'Desi JG-11 Bold',
    mandi: 'Hathras Mandi',
    currentPrice: 5600,
    previousPrice: 5540,
    msp: 5440,
    demand: 'High',
    trend: 'up',
    outlook: 'Strong confectionery and besan mill consumption with firm support above MSP.',
    weeklyHistory: [
      { day: 'Mon', price: 5480 },
      { day: 'Tue', price: 5510 },
      { day: 'Wed', price: 5540 },
      { day: 'Thu', price: 5560 },
      { day: 'Fri', price: 5590 },
      { day: 'Sat', price: 5600 }
    ],
    verifiedBuyers: [
      {
        buyerName: 'ITC e-Choupal Procurement',
        type: 'FPO Aggregator',
        requiredQuantity: '350 Quintals',
        offeredPrice: 5650,
        phone: '+91 97580 33419',
        location: 'Sasni Yard, Hathras'
      }
    ]
  },
  {
    id: 'mkt-wheat',
    crop: 'Wheat (Gehun)',
    variety: 'Sharbati HD-2967',
    mandi: 'Agra APMC Mandi',
    currentPrice: 2550,
    previousPrice: 2530,
    msp: 2425,
    demand: 'Steady',
    trend: 'up',
    outlook: 'FCI state procurement starting soon; flour mills building buffer stocks.',
    weeklyHistory: [
      { day: 'Mon', price: 2510 },
      { day: 'Tue', price: 2520 },
      { day: 'Wed', price: 2530 },
      { day: 'Thu', price: 2540 },
      { day: 'Fri', price: 2545 },
      { day: 'Sat', price: 2550 }
    ],
    verifiedBuyers: [
      {
        buyerName: 'Patanjali Agro Mill Division',
        type: 'Processor',
        requiredQuantity: '800 Quintals',
        offeredPrice: 2590,
        phone: '+91 98390 77123',
        location: 'Agra Mandi Gate 2'
      }
    ]
  }
];

export const EMERGENCY_SCENARIO = {
  alertTitle: 'HEAVY RAINFALL & WATERLOGGING WARNING',
  urgency: 'CRITICAL ACTION REQUIRED (Next 36-48 Hours)',
  rainfallForecastMm: 85,
  windowHours: 42,
  cropAffected: 'Potato',
  harvestReadiness: 92,
  riskAssessment: 'Tubers at 92% maturity will suffer severe soft rot (Erwinia carotovora) and fungal blight if soil is saturated for >24 hours.',
  recommendedActions: [
    'Harvest immediately (take advantage of 36-hour dry window before rain front arrives).',
    'Mobilize mechanical potato digger and 8-10 farmhands for rapid ground clearance.',
    'Transfer harvested tubers to high-platform covered sheds or ventilated cold storage.',
    'Contract with food processors or spot buyers directly from the field to avoid storage bottleneck.'
  ]
};

export const EMERGENCY_PROVIDERS: EmergencyActionItem[] = [
  {
    id: 'em-mach-1',
    title: 'High-Speed Tractor Potato Digger (With Operator)',
    type: 'Machinery',
    name: 'Malik Farm Mechanization Center',
    contact: '+91 98371 44520',
    rate: '₹1,200 / acre',
    distance: '3.5 km away (Khandauli)',
    availability: 'Available Immediately (2 tractors ready)',
    details: 'Digs 5 acres in ~6 hours without cutting tuber skins. Fuel included.'
  },
  {
    id: 'em-mach-2',
    title: 'Mahindra 575 DI + Hydraulic Trailer',
    type: 'Machinery',
    name: 'Kisan Seva Kendra Equipment Hub',
    contact: '+91 94120 77810',
    rate: '₹800 / trip',
    distance: '5 km away',
    availability: 'Ready for deployment',
    details: 'Hauls 60 quintals per trip from field to main road storage.'
  },
  {
    id: 'em-labour-1',
    title: 'Experienced Harvest Labour Gang (10 Persons)',
    type: 'Labour',
    name: 'Suresh Mukadam Labour Crew',
    contact: '+91 97592 11045',
    rate: '₹450 / worker / day',
    distance: 'Local (Fatehabad block)',
    availability: 'Can arrive in 45 minutes',
    details: 'Specialized in rapid potato sorting, bagging, and crate loading.'
  },
  {
    id: 'em-storage-1',
    title: 'Ventilated Pre-Cooling Chamber (Emergency Bay)',
    type: 'Storage',
    name: 'Agra Raj Cold Storage & Logistics',
    contact: '+91 98370 99881',
    rate: '₹22 / bag (50kg) / month',
    distance: '7 km away (NH-19 Bypass)',
    availability: '3,000 bags capacity reserved for weather emergency',
    details: 'Humidity regulated, equipped with heavy-duty backup gensets.'
  },
  {
    id: 'em-transport-1',
    title: 'Eicher 17ft Closed Tarpaulin Truck (9 Tons)',
    type: 'Transport',
    name: 'Taj Express Agri Logistics',
    contact: '+91 98970 44321',
    rate: '₹2,800 local depot roundtrip',
    distance: '4 km away',
    availability: 'On call 24x7',
    details: 'Waterproof tarpaulin body; protects fresh harvest during transit.'
  },
  {
    id: 'em-buyer-1',
    title: 'Direct Fieldgate Procurement (Instant Payment)',
    type: 'Buyer',
    name: 'Pepsico / Balaji Agri Aggregator',
    contact: '+91 98110 54321',
    rate: '₹1,320 / quintal (Spot Cash / UPI)',
    distance: 'Field inspection team on standby',
    availability: 'Buying up to 500 Quintals today',
    details: 'Takes field-fresh tubers directly, reducing storage handling loss.'
  }
];

export const SCHEMES_DATA: SchemeItem[] = [
  {
    id: 'sch-pmksy',
    name: 'PMKSY - Per Drop More Crop (Micro Irrigation)',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: 'Up to 55% subsidy on Drip and Micro-Sprinkler Installation',
    whyRelevant: 'Matches your 5-acre irrigated farm in Agra. Drip irrigation reduces water consumption by 45% and boosts potato/mustard yield by 20%.',
    potentialEligibility: 'Eligible (Small farmer category: 5 acres with assured borewell water).',
    requiredDocuments: ['Land Record (Khasra/Khatauni)', 'Borewell/Water proof', 'Aadhaar Card', 'Bank Passbook'],
    applicationProcess: 'Apply online on UP Agriculture portal (upagriculture.com) or visit District Horticulture Office, Agra.',
    statusTag: 'High Match'
  },
  {
    id: 'sch-pmfby',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    ministry: 'Department of Agriculture & Cooperation',
    benefit: 'Comprehensive crop insurance against unseasonal rain & hail',
    whyRelevant: 'Directly covers losses from sudden heavy rainfall events like the current alert. Premium is only 1.5% of sum insured.',
    potentialEligibility: 'Eligible for all notified Rabi crops in Agra district.',
    requiredDocuments: ['Sowing Certificate from Patwari', 'Land Document', 'Aadhaar', 'Bank Account details'],
    applicationProcess: 'Enroll via pmfby.gov.in or your lending bank branch within 72 hours of damage for instant survey.',
    statusTag: 'High Match'
  },
  {
    id: 'sch-pmkisan',
    name: 'PM-KISAN Samman Nidhi',
    ministry: 'Government of India',
    benefit: '₹6,000 annual direct income support in 3 installments',
    whyRelevant: 'Direct cash flow for input purchases (seeds, fertilizers, bio-stimulants).',
    potentialEligibility: 'Eligible for landholding farmer family.',
    requiredDocuments: ['Aadhaar linked with mobile (e-KYC)', 'Land title records', 'Bank account'],
    applicationProcess: 'Register on pmkisan.gov.in or nearest Common Service Center (CSC).',
    statusTag: 'Recommended'
  },
  {
    id: 'sch-smam',
    name: 'SMAM Sub-Mission on Agricultural Mechanization',
    ministry: 'Mechanization Division',
    benefit: '40% to 50% subsidy on Tractors, Potato Diggers & Sprayers',
    whyRelevant: 'Helps acquire modern harvesting machinery like the tractor potato digger needed in emergency situations.',
    potentialEligibility: 'Eligible under individual mechanization grant.',
    requiredDocuments: ['Land records', 'Aadhaar', 'Vendor Quotation', 'Bank details'],
    applicationProcess: 'Apply through agrimachinery.nic.in portal.',
    statusTag: 'General Match'
  }
];

export const SERVICES_DATA: ServiceListing[] = [
  {
    id: 'srv-1',
    category: 'Machinery',
    title: 'Custom Hiring Center: Tractors, Harvesters & Laser Levelers',
    provider: 'Agra Kisan Mechanization Hub',
    rate: '₹1,000–₹1,800 / hr',
    location: 'Bichpuri, Agra (6 km)',
    rating: 4.8,
    contact: '+91 98370 11990',
    description: 'Fleet of 8 John Deere & Mahindra tractors with modern implements available on hourly or acreage basis.'
  },
  {
    id: 'srv-2',
    category: 'Labour',
    title: 'Verified Agricultural Labour Teams (Transplanting & Harvesting)',
    provider: 'Gramin Shramik Kalyan Samiti',
    rate: '₹400–₹450 / worker / day',
    location: 'Fatehabad Road, Agra',
    rating: 4.6,
    contact: '+91 94121 55620',
    description: 'Pre-screened farm labor groups for potato picking, mustard harvesting, and bag stitching.'
  },
  {
    id: 'srv-3',
    category: 'Storage',
    title: 'Solar Powered CA Cold Storage & Warehouse',
    provider: 'Taj Agro Cold Chain Ltd',
    rate: '₹22 / bag / month',
    location: 'Khandauli Industrial Area, Agra',
    rating: 4.9,
    contact: '+91 98371 88200',
    description: '10,000 MT multi-chamber storage with computerized temperature monitoring and insurance coverage.'
  },
  {
    id: 'srv-4',
    category: 'Transport',
    title: 'Farmgate to Mandi Freight Logistics (Tata 407 & Bolero Maxx)',
    provider: 'Kisan Vahan Sewa',
    rate: '₹1,500–₹3,000 / trip',
    location: 'Agra Bypass',
    rating: 4.7,
    contact: '+91 98972 33110',
    description: 'Same-day pickup from field edges directly to Agra, Hathras, or Azadpur Delhi mandis.'
  },
  {
    id: 'srv-5',
    category: 'Buyers',
    title: 'Direct Corporate Buying Program (Chips & Edible Oil)',
    provider: 'National Agro Procurement Network',
    rate: 'Guaranteed 5-8% over Mandi Rate',
    location: 'Agra Collection Depot',
    rating: 4.9,
    contact: '+91 98112 44990',
    description: 'Fair electronic weighbridge, on-spot digital payment, and transparent moisture testing.'
  },
  {
    id: 'srv-6',
    category: 'Finance',
    title: 'Kisan Credit Card (KCC) Low-Interest Cultivation Loan',
    provider: 'Canara / SBI Rural Branch Agra',
    rate: '4% p.a. (with prompt repayment subsidy)',
    location: 'Sanjay Place, Agra',
    rating: 4.8,
    contact: '+91 0562 252011',
    description: 'Instant credit limit up to ₹3,00,000 for seed, fertilizer, and operational farm working capital.'
  },
  {
    id: 'srv-7',
    category: 'Insurance',
    title: 'Parametric Weather & Hail Insurance (PMFBY Authorized)',
    provider: 'Agriculture Insurance Company of India (AIC)',
    rate: '1.5% premium (subsidized by Govt)',
    location: 'Agra District Office',
    rating: 4.7,
    contact: '+91 1800 116515',
    description: 'Automated satellite and weather station payout triggers for sudden unseasonal rainfall.'
  }
];

export const COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'cq-1',
    author: 'Sunil Verma',
    badge: 'Agra Farmer',
    question: 'With the heavy rainfall forecast this week in Agra, how early can we harvest Kufri Bahar potatoes without losing weight?',
    timestamp: '2 hours ago',
    answersCount: 5,
    upvotes: 18,
    topAnswer: {
      author: 'Dr. Vivek Pathak',
      badge: 'Agronomist, KVK Bichpuri',
      text: 'If your crop has reached 90%+ maturity, skin setting is mostly done. Digging now will save 100% of the crop from soft rot. Ensure tubers dry under shade for 4 hours before bagging.'
    }
  },
  {
    id: 'cq-2',
    author: 'Harishankar Kushwaha',
    badge: 'Senior Farmer',
    question: 'Is Pusa Bold mustard profitable compared to late wheat after harvesting potato in loamy soil?',
    timestamp: '1 day ago',
    answersCount: 8,
    upvotes: 32,
    topAnswer: {
      author: 'Rajendra Singh',
      badge: 'Agra Farmer',
      text: 'Mustard gives ₹45,000–₹55,000 profit per acre with half the water of wheat. Market demand in Agra is at a 3-year peak at ₹5,950/quintal.'
    }
  },
  {
    id: 'cq-3',
    author: 'Bhupendra Singh',
    badge: 'Agra Farmer',
    question: 'How do I test my borewell soil water for EC and alkalinity in Agra district?',
    timestamp: '3 days ago',
    answersCount: 3,
    upvotes: 12,
    topAnswer: {
      author: 'Dr. Ananya Mishra',
      badge: 'Soil Scientist',
      text: 'You can submit a 500ml water sample to the Soil Health Lab at RBS College Bichpuri. The test is free under the Soil Health Scheme and gives results in 48 hours.'
    }
  }
];

export const SEEKHO_VIDEOS: SeekhoVideo[] = [
  {
    id: 'sk-1',
    title: 'Emergency Potato Harvesting & Field Sorting during Unseasonal Rain',
    creator: 'Kisan Vigyan Kendra (KVK Agra)',
    crop: 'Potato',
    language: 'Hindi',
    duration: '4:15 min',
    views: '24.5K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    keyTakeaways: [
      'Stop irrigation immediately when rain is forecasted',
      'Cut foliage (dehaulming) 3 days prior if possible',
      'Never pack damp tubers in airtight plastic bags'
    ]
  },
  {
    id: 'sk-2',
    title: 'Mustard (Sarson) Scientific Package of Practices for High Oil Content',
    creator: 'Dr. R.K. Yadav (ICAR-DRMR)',
    crop: 'Mustard',
    language: 'Hindi',
    duration: '6:30 min',
    views: '41.2K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=500&q=80',
    keyTakeaways: [
      'Optimum seed rate: 1.5–2 kg per acre',
      'Sulfur application @ 20 kg/acre boosts oil % by 3%',
      'First irrigation strictly at 28-32 days after sowing'
    ]
  },
  {
    id: 'sk-3',
    title: 'Chickpea (Chana) Wilt & Pod Borer Integrated Pest Management',
    creator: 'AgriTech Krishi Gyan',
    crop: 'Chickpea',
    language: 'Hindi',
    duration: '5:10 min',
    views: '18.9K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=500&q=80',
    keyTakeaways: [
      'Seed treatment with Trichoderma viride @ 5g/kg',
      'Install 4 pheromone traps per acre',
      'Nip top shoots at 45 days to induce branching'
    ]
  },
  {
    id: 'sk-4',
    title: 'Direct-to-Buyer Contract Farming & MSP Mandi Tricks',
    creator: 'Agra FPO Federation',
    crop: 'Multiple Crops',
    language: 'Hindi',
    duration: '7:45 min',
    views: '33.1K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
    keyTakeaways: [
      'Check daily modal prices on e-NAM before loading trucks',
      'Direct buying eliminates 6-8% middleman commission',
      'Maintain moisture certificate to get premium rates'
    ]
  }
];
