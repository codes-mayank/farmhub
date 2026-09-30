import { 
  FieldPlot, 
  MandiPrice, 
  ProduceListing, 
  EquipmentListing, 
  PestDisease, 
  FarmExpense, 
  GovtScheme, 
  WeatherData 
} from '../types';

export const INITIAL_WEATHER: WeatherData = {
  city: 'Indore, Madhya Pradesh',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 62,
  windSpeed: 11,
  rainfallProbability: 15,
  uvIndex: 6,
  advisory: 'Favorable conditions for foliar nutrient sprays. Soil moisture is optimal across low-lying fields. Monitor wheat crops for morning dew rust susceptibility.',
  spraySuitability: 'Excellent',
  forecast: [
    { day: 'Today', tempHigh: 31, tempLow: 19, condition: 'Partly Cloudy', rainChance: 15 },
    { day: 'Tomorrow', tempHigh: 32, tempLow: 20, condition: 'Sunny', rainChance: 5 },
    { day: 'Thu', tempHigh: 30, tempLow: 18, condition: 'Clear', rainChance: 10 },
    { day: 'Fri', tempHigh: 29, tempLow: 17, condition: 'Overcast', rainChance: 35 },
    { day: 'Sat', tempHigh: 28, tempLow: 18, condition: 'Light Shower', rainChance: 60 },
  ]
};

export const INITIAL_FIELDS: FieldPlot[] = [
  {
    id: 'field-1',
    name: 'North Acre (Plot A)',
    areaAcres: 4.5,
    crop: 'Wheat (Gehun)',
    variety: 'Sharbati HD-2967',
    sowingDate: '2026-11-12',
    expectedHarvestDate: '2026-03-25',
    stage: 'Grain Filling',
    healthScore: 94,
    soilType: 'Alluvial',
    irrigationType: 'Drip',
    lastWatered: 'Yesterday (2 hrs)',
    nextScheduledTask: 'Final irrigation & moisture check before grain hardening',
    notes: 'Uniform canopy growth. Zero weed infestation after manual weeding.'
  },
  {
    id: 'field-2',
    name: 'East Meadow (Plot B)',
    areaAcres: 3.0,
    crop: 'Mustard (Sarson)',
    variety: 'Pusa Bold',
    sowingDate: '2026-10-28',
    expectedHarvestDate: '2026-02-28',
    stage: 'Harvest Ready',
    healthScore: 89,
    soilType: 'Sandy Loam',
    irrigationType: 'Sprinkler',
    lastWatered: '5 days ago',
    nextScheduledTask: 'Schedule combine harvester for pod reaping',
    notes: 'Pod density is excellent. 85% of pods turned golden brown.'
  },
  {
    id: 'field-3',
    name: 'South Riverbed (Plot C)',
    areaAcres: 2.5,
    crop: 'Chickpea (Chana)',
    variety: 'JG-11 Desi',
    sowingDate: '2026-11-20',
    expectedHarvestDate: '2026-03-15',
    stage: 'Flowering',
    healthScore: 82,
    soilType: 'Black Soil',
    irrigationType: 'Canal/Flood',
    lastWatered: '3 days ago',
    nextScheduledTask: 'Apply neem oil foliar spray against pod borer risk',
    notes: 'Mild vegetative crowding in low corner; good root nodulation observed.'
  },
  {
    id: 'field-4',
    name: 'Greenhouse & Nursery (Plot D)',
    areaAcres: 1.2,
    crop: 'Tomato & Capsicum',
    variety: 'Himsona Hybrid',
    sowingDate: '2026-12-05',
    expectedHarvestDate: '2026-04-10',
    stage: 'Vegetative',
    healthScore: 97,
    soilType: 'Clay',
    irrigationType: 'Drip',
    lastWatered: 'Today (30 mins)',
    nextScheduledTask: 'Staking & trellising of tomato vines with jute twine',
    notes: 'Fertigation with NPK 19-19-19 applied on Monday.'
  }
];

export const INITIAL_MANDI_PRICES: MandiPrice[] = [
  {
    id: 'mandi-1',
    commodity: 'Wheat (Sharbati)',
    mandi: 'Indore Mandi',
    state: 'Madhya Pradesh',
    minPrice: 2650,
    maxPrice: 3180,
    modalPrice: 2890,
    msp: 2425,
    priceChange: 3.2,
    unit: '₹ / Quintal',
    trend: 'up',
    recommendation: 'Sell Now',
    history: [
      { date: '23 Sep', price: 2720 },
      { date: '24 Sep', price: 2740 },
      { date: '25 Sep', price: 2790 },
      { date: '26 Sep', price: 2810 },
      { date: '27 Sep', price: 2835 },
      { date: '28 Sep', price: 2860 },
      { date: '29 Sep', price: 2890 },
    ]
  },
  {
    id: 'mandi-2',
    commodity: 'Mustard (Sarson)',
    mandi: 'Neemuch APMC',
    state: 'Madhya Pradesh',
    minPrice: 5400,
    maxPrice: 6150,
    modalPrice: 5880,
    msp: 5650,
    priceChange: 1.8,
    unit: '₹ / Quintal',
    trend: 'up',
    recommendation: 'Sell Now',
    history: [
      { date: '23 Sep', price: 5620 },
      { date: '24 Sep', price: 5650 },
      { date: '25 Sep', price: 5710 },
      { date: '26 Sep', price: 5750 },
      { date: '27 Sep', price: 5800 },
      { date: '28 Sep', price: 5840 },
      { date: '29 Sep', price: 5880 },
    ]
  },
  {
    id: 'mandi-3',
    commodity: 'Basmati Rice (1121)',
    mandi: 'Karnal Mandi',
    state: 'Haryana',
    minPrice: 3800,
    maxPrice: 4600,
    modalPrice: 4250,
    msp: 2320,
    priceChange: -1.2,
    unit: '₹ / Quintal',
    trend: 'down',
    recommendation: 'Hold (Expected Rise)',
    history: [
      { date: '23 Sep', price: 4410 },
      { date: '24 Sep', price: 4390 },
      { date: '25 Sep', price: 4350 },
      { date: '26 Sep', price: 4320 },
      { date: '27 Sep', price: 4280 },
      { date: '28 Sep', price: 4260 },
      { date: '29 Sep', price: 4250 },
    ]
  },
  {
    id: 'mandi-4',
    commodity: 'Cotton (Shankar-6)',
    mandi: 'Rajkot APMC',
    state: 'Gujarat',
    minPrice: 7100,
    maxPrice: 7850,
    modalPrice: 7520,
    msp: 7122,
    priceChange: 0.8,
    unit: '₹ / Quintal',
    trend: 'up',
    recommendation: 'Favorable MSP',
    history: [
      { date: '23 Sep', price: 7380 },
      { date: '24 Sep', price: 7410 },
      { date: '25 Sep', price: 7450 },
      { date: '26 Sep', price: 7480 },
      { date: '27 Sep', price: 7500 },
      { date: '28 Sep', price: 7510 },
      { date: '29 Sep', price: 7520 },
    ]
  },
  {
    id: 'mandi-5',
    commodity: 'Soybean (Yellow)',
    mandi: 'Ujjain Mandi',
    state: 'Madhya Pradesh',
    minPrice: 4300,
    maxPrice: 4950,
    modalPrice: 4680,
    msp: 4892,
    priceChange: -0.5,
    unit: '₹ / Quintal',
    trend: 'stable',
    recommendation: 'Hold (Expected Rise)',
    history: [
      { date: '23 Sep', price: 4720 },
      { date: '24 Sep', price: 4710 },
      { date: '25 Sep', price: 4700 },
      { date: '26 Sep', price: 4690 },
      { date: '27 Sep', price: 4680 },
      { date: '28 Sep', price: 4675 },
      { date: '29 Sep', price: 4680 },
    ]
  },
  {
    id: 'mandi-6',
    commodity: 'Onion (Nashik Red)',
    mandi: 'Lasalgaon Mandi',
    state: 'Maharashtra',
    minPrice: 1800,
    maxPrice: 2450,
    modalPrice: 2180,
    msp: 1650,
    priceChange: 5.4,
    unit: '₹ / Quintal',
    trend: 'up',
    recommendation: 'Sell Now',
    history: [
      { date: '23 Sep', price: 1920 },
      { date: '24 Sep', price: 1980 },
      { date: '25 Sep', price: 2010 },
      { date: '26 Sep', price: 2060 },
      { date: '27 Sep', price: 2110 },
      { date: '28 Sep', price: 2140 },
      { date: '29 Sep', price: 2180 },
    ]
  },
  {
    id: 'mandi-7',
    commodity: 'Potato (Jyoti)',
    mandi: 'Agra Mandi',
    state: 'Uttar Pradesh',
    minPrice: 1100,
    maxPrice: 1550,
    modalPrice: 1350,
    msp: 1150,
    priceChange: 2.1,
    unit: '₹ / Quintal',
    trend: 'up',
    recommendation: 'Sell Now',
    history: [
      { date: '23 Sep', price: 1240 },
      { date: '24 Sep', price: 1260 },
      { date: '25 Sep', price: 1290 },
      { date: '26 Sep', price: 1310 },
      { date: '27 Sep', price: 1330 },
      { date: '28 Sep', price: 1340 },
      { date: '29 Sep', price: 1350 },
    ]
  }
];

export const INITIAL_PRODUCE: ProduceListing[] = [
  {
    id: 'prod-1',
    title: 'Certified Organic Sharbati Wheat (Grain)',
    crop: 'Wheat',
    variety: 'Sharbati High Protein',
    quantity: 120,
    unit: 'Quintal',
    pricePerUnit: 2950,
    sellerName: 'Ramesh Patel (Greenfield Farms)',
    sellerPhone: '+91 98260 41120',
    location: 'Sehore, MP',
    harvestDate: '2026-03-20',
    qualityGrade: 'Organic Certified',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    status: 'Available'
  },
  {
    id: 'prod-2',
    title: 'Clean Sun-Dried Yellow Mustard Seeds',
    crop: 'Mustard',
    variety: 'Pusa Bold (High Oil 42%)',
    quantity: 65,
    unit: 'Quintal',
    pricePerUnit: 5900,
    sellerName: 'Vikram Singh Shekhawat',
    sellerPhone: '+91 94140 88219',
    location: 'Bharatpur, Rajasthan',
    harvestDate: '2026-02-25',
    qualityGrade: 'Grade A (Export)',
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    status: 'Available'
  },
  {
    id: 'prod-3',
    title: 'Nashik Premium Medium Red Onions',
    crop: 'Onion',
    variety: 'Garwa / Nashik Red',
    quantity: 250,
    unit: 'Quintal',
    pricePerUnit: 2200,
    sellerName: 'Sanjay Deshmukh',
    sellerPhone: '+91 97654 32901',
    location: 'Niphad, Nashik',
    harvestDate: '2026-03-01',
    qualityGrade: 'Grade A (Export)',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    status: 'Available'
  },
  {
    id: 'prod-4',
    title: 'A-Grade Desi Chickpea (Chana)',
    crop: 'Chickpea',
    variety: 'JG-11 Bold',
    quantity: 80,
    unit: 'Quintal',
    pricePerUnit: 5750,
    sellerName: 'Kailash Chouhan',
    sellerPhone: '+91 98930 11942',
    location: 'Dewas, MP',
    harvestDate: '2026-03-12',
    qualityGrade: 'Grade B (Standard)',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
    isVerified: false,
    status: 'Available'
  }
];

export const INITIAL_EQUIPMENT: EquipmentListing[] = [
  {
    id: 'eq-1',
    name: 'John Deere 5050D (50 HP Tractor with Dual Clutch)',
    category: 'Tractor',
    ratePerDay: 1800,
    ownerName: 'Gurpreet Singh',
    phone: '+91 98150 99432',
    location: 'Karnal, Haryana (Within 25 km)',
    available: true,
    modelYear: 2024,
    specifications: '50 HP, Power Steering, 8 Forward + 4 Reverse gears, Fuel efficient.',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'eq-2',
    name: 'DJI Agras T40 Smart Agricultural Drone',
    category: 'Sprayer/Drone',
    ratePerDay: 4500,
    ownerName: 'Kisan Drone Sewa Kendra',
    phone: '+91 99220 54100',
    location: 'Indore, MP (Includes licensed pilot)',
    available: true,
    modelYear: 2025,
    specifications: '40L spray payload, covers 40 acres/day, dual atomized centrifugal nozzles.',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'eq-3',
    name: 'Claas Crop Tiger 40 Combine Harvester',
    category: 'Harvester',
    ratePerDay: 7500,
    ownerName: 'Malwa Agro Equipment Hub',
    phone: '+91 98270 33810',
    location: 'Ujjain, MP (Operator included)',
    available: true,
    modelYear: 2023,
    specifications: 'Ideal for Wheat, Paddy, and Soybean. High separation efficiency with minimal grain loss.',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'eq-4',
    name: 'Shaktiman Semi-Champion Rotary Tiller (7 Feet)',
    category: 'Tiller/Plough',
    ratePerDay: 1200,
    ownerName: 'Dharmendra Patidar',
    phone: '+91 98790 12345',
    location: 'Dhar, MP',
    available: false,
    modelYear: 2024,
    specifications: '48 Boron steel blades, multi-speed gearbox, excellent soil pulverization.',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PEST_DISEASES: PestDisease[] = [
  {
    id: 'pest-1',
    name: 'Yellow (Stripe) Rust',
    crop: 'Wheat',
    type: 'Fungal',
    symptoms: [
      'Bright yellow powdery pustules forming linear stripes on leaf blades',
      'Leaves dry up and appear prematurely scorched',
      'Stunted growth and shriveled grains'
    ],
    severity: 'Severe',
    chemicalControl: 'Foliar spray of Propiconazole 25% EC @ 1 ml/litre water or Tebuconazole 25.9% EC @ 1.25 ml/litre water.',
    organicControl: 'Foliar spray of Trichoderma harzianum @ 5g/litre + Panchagavya solution (3%) during cool overcast periods.',
    dosage: '200 ml Propiconazole in 200 litres water per acre.',
    preventionTips: 'Sow rust-resistant varieties (HD-3086, DBW-187). Avoid excessive nitrogen fertilizer.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pest-2',
    name: 'Pink Bollworm (Pectinophora gossypiella)',
    crop: 'Cotton',
    type: 'Pest/Insect',
    symptoms: [
      'Rosetted flowers that fail to open fully (lion-shaped bloom)',
      'Exit pin-holes on developing bolls with brown staining inside',
      'Premature boll dropping and lint destruction'
    ],
    severity: 'Severe',
    chemicalControl: 'Install pheromone traps (5/acre for monitoring, 10/acre for mass trapping). Spray Chlorantraniliprole 18.5% SC @ 60 ml/acre or Spinetoram 11.7% SC @ 170 ml/acre.',
    organicControl: 'Release Trichogramma bactrae egg parasitoid wasps @ 60,000/acre at 10-day intervals. Spray 5% Neem Seed Kernel Extract (NSKE).',
    dosage: 'Spray during evening hours when adult moths are active.',
    preventionTips: 'Maintain a 120-day close season, destroy crop residues, avoid ratoon cropping.',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pest-3',
    name: 'Late Blight (Phytophthora infestans)',
    crop: 'Potato & Tomato',
    type: 'Fungal',
    symptoms: [
      'Water-soaked dark brownish-black irregular lesions on leaves and stems',
      'White cottony fungal growth on underside of leaves in humid mornings',
      'Tuber rot with granular reddish-brown dry flesh'
    ],
    severity: 'Severe',
    chemicalControl: 'Prophylactic spray of Mancozeb 75% WP @ 2.5 g/litre. In active disease outbreak: Cymoxanil 8% + Mancozeb 64% WP @ 3 g/litre or Metalaxyl-M + Mancozeb.',
    organicControl: 'Spray Bordeaux mixture (1%) or Copper oxychloride @ 3g/litre before rain spells.',
    dosage: 'Repeat spray at 7-10 day intervals if relative humidity >85% persists.',
    preventionTips: 'Use certified disease-free seed tubers. High-ridge earthing up to prevent spores reaching underground tubers.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pest-4',
    name: 'Mustard Aphid (Lipaphis erysimi)',
    crop: 'Mustard',
    type: 'Pest/Insect',
    symptoms: [
      'Dense colonies of tiny green-black soft insects on inflorescence & young pods',
      'Curled, yellowed leaves and sticky honeydew attracting black sooty mold',
      'Poor seed development and 30-70% oil loss'
    ],
    severity: 'Moderate',
    chemicalControl: 'Spray Dimethoate 30% EC @ 1.5 ml/litre or Imidacloprid 17.8% SL @ 0.5 ml/litre water.',
    organicControl: 'Spray Neem oil (10,000 ppm) @ 3 ml/litre with liquid soap or Verticillium lecanii bio-fungicide @ 5 g/litre.',
    dosage: 'Apply during afternoon when pollinators like honeybees are less active.',
    preventionTips: 'Early sowing (before 20th October) escapes major aphid wave. Install yellow sticky traps (15 traps/acre).',
    imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pest-5',
    name: 'Blast Disease (Magnaporthe oryzae)',
    crop: 'Rice (Paddy)',
    type: 'Fungal',
    symptoms: [
      'Spindle-shaped elliptical lesions with ash-grey centers and brown margins on leaves',
      'Neck blast: Blackened node below panicle causing hanging chaffy grains',
      'Severe lodging and yield collapse'
    ],
    severity: 'Severe',
    chemicalControl: 'Spray Tricyclazole 75% WP @ 0.6 g/litre or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/litre.',
    organicControl: 'Pseudomonas fluorescens seed treatment (10g/kg) and foliar spray @ 5g/litre.',
    dosage: '120g Tricyclazole in 200L water per acre.',
    preventionTips: 'Avoid heavy split doses of urea during booting stage. Maintain adequate water level.',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_EXPENSES: FarmExpense[] = [
  {
    id: 'exp-1',
    fieldId: 'field-1',
    fieldName: 'North Acre (Plot A)',
    crop: 'Wheat (Gehun)',
    category: 'Seeds',
    type: 'Expense',
    amount: 5400,
    date: '2026-11-12',
    description: 'Purchased 180 kg Certified Sharbati Seed from Krishi Vigyan Kendra'
  },
  {
    id: 'exp-2',
    fieldId: 'field-1',
    fieldName: 'North Acre (Plot A)',
    crop: 'Wheat (Gehun)',
    category: 'Fertilizer',
    type: 'Expense',
    amount: 6850,
    date: '2026-11-15',
    description: 'Basal dose: 3 bags DAP + 2 bags MOP + 1 bag Urea'
  },
  {
    id: 'exp-3',
    fieldId: 'field-2',
    fieldName: 'East Meadow (Plot B)',
    crop: 'Mustard (Sarson)',
    category: 'Labor',
    type: 'Expense',
    amount: 4200,
    date: '2026-12-02',
    description: 'Intercultural weeding and hoeing (6 workers for 2 days)'
  },
  {
    id: 'exp-4',
    fieldId: 'field-2',
    fieldName: 'East Meadow (Plot B)',
    crop: 'Mustard (Sarson)',
    category: 'Irrigation',
    type: 'Expense',
    amount: 1800,
    date: '2026-12-20',
    description: 'Sprinkler pump diesel & electricity bill for 1st flowering irrigation'
  },
  {
    id: 'exp-5',
    fieldId: 'field-3',
    fieldName: 'South Riverbed (Plot C)',
    crop: 'Chickpea (Chana)',
    category: 'Pesticide',
    type: 'Expense',
    amount: 2200,
    date: '2027-01-10',
    description: 'Neem oil concentrate 10,000 ppm + sticker for pod borer prevention'
  },
  {
    id: 'exp-6',
    fieldId: 'field-1',
    fieldName: 'North Acre (Plot A)',
    crop: 'Wheat (Gehun)',
    category: 'Sale Income',
    type: 'Income',
    amount: 65000,
    date: '2027-03-28',
    description: 'Advance received from ITC e-Choupal for 25 quintal grade-A booking'
  }
];

export const INITIAL_SCHEMES: GovtScheme[] = [
  {
    id: 'sch-1',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    department: 'Ministry of Agriculture & Farmers Welfare',
    benefitAmount: '₹6,000 / year (3 equal installments of ₹2,000)',
    description: 'Direct cash income support transferred directly to the bank accounts of landholding farmer families across the country.',
    criteria: [
      'All landholding farmer families with cultivable landholding in their names',
      'Valid Aadhaar linked with active bank account (e-KYC mandatory)',
      'Not paying institutional income tax in previous assessment year'
    ],
    documentsRequired: ['Aadhaar Card', 'Land Ownership Records (Khasra/Khatauni)', 'Bank Passbook copy', 'Mobile number linked to Aadhaar'],
    applyLinkText: 'Apply via pmkisan.gov.in portal or nearest CSC centre',
    category: 'Direct Income'
  },
  {
    id: 'sch-2',
    title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    department: 'Department of Agriculture & Cooperation',
    benefitAmount: 'Comprehensive risk insurance with up to 100% loss payout',
    description: 'Subsidized crop insurance covering non-preventable natural risks from pre-sowing to post-harvest (drought, flood, pests, unseasonal hail). Premium is only 1.5% for Rabi and 2.0% for Kharif crops.',
    criteria: [
      'All farmers growing notified crops in notified areas (both loanee and non-loanee)',
      'Sharecroppers and tenant farmers are also eligible with cultivation proof',
      'Must enroll before designated cut-off date per crop season'
    ],
    documentsRequired: ['Land Record document / Tenancy agreement', 'Sowing certificate / Self-declaration', 'Aadhaar Card', 'Cancelled bank cheque'],
    applyLinkText: 'Enroll on pmfby.gov.in or through lending bank branch',
    category: 'Insurance'
  },
  {
    id: 'sch-3',
    title: 'PMKSY - Per Drop More Crop (Micro Irrigation)',
    department: 'Department of Water Resources & Agriculture',
    benefitAmount: 'Up to 55% subsidy for Small/Marginal farmers, 45% for others',
    description: 'Financial assistance for installing drip irrigation, micro-sprinklers, and portable sprinkler sets to maximize water efficiency and crop productivity.',
    criteria: [
      'Farmers having assured water source (borewell/well/farm pond)',
      'Minimum land 0.5 acre, maximum eligible 5 hectares',
      'Assistance given once in 7 years for same piece of land'
    ],
    documentsRequired: ['Land title (7/12 extract / RTC)', 'Water test report / Borewell proof', 'Soil test card', 'Quotation from authorized micro-irrigation vendor'],
    applyLinkText: 'Apply via State Horticulture / Agriculture portal',
    category: 'Irrigation'
  },
  {
    id: 'sch-4',
    title: 'SMAM (Sub-Mission on Agricultural Mechanization)',
    department: 'Mechanization & Technology Division',
    benefitAmount: '40% to 50% subsidy on Tractors, Harvesters, Tillers & Drones',
    description: 'Promotes custom hiring centres and individual ownership of modern farming machinery, laser levellers, seed drills, and agricultural drones.',
    criteria: [
      'Individual small, marginal, SC/ST, and women farmers given high priority',
      'Farmer Producer Organizations (FPOs) and Self-Help Groups get up to 80% for custom hiring centres'
    ],
    documentsRequired: ['Land records', 'Valid driving license / Drone pilot certificate (for drones)', 'Income certificate', 'Vendor proforma invoice'],
    applyLinkText: 'Register on agrimachinery.nic.in portal',
    category: 'Equipment Subsidy'
  },
  {
    id: 'sch-5',
    title: 'Kisan Credit Card (KCC) Scheme',
    department: 'NABARD & Reserve Bank of India',
    benefitAmount: 'Credit limit up to ₹3,00,000 at effective 4% interest rate',
    description: 'Timely and adequate credit support for cultivation expenses, post-harvest costs, and maintenance of farm assets with 3% interest subvention for prompt repayment.',
    criteria: [
      'All farmers (individuals or joint borrowers) cultivating owned or leased land',
      'Animal husbandry, poultry, and fisheries farmers also eligible up to ₹2 lakh sub-limit'
    ],
    documentsRequired: ['KCC Application Form', 'Land title documents & crop pattern details', 'Aadhaar & PAN Card', 'Passport size photographs'],
    applyLinkText: 'Visit any Commercial Bank, RRB, or Cooperative Bank branch',
    category: 'Credit/Loan'
  }
];
