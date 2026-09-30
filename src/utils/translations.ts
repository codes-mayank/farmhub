export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  navDashboard: string;
  navProfile: string;
  navIntelligence: string;
  navMarket: string;
  navEmergency: string;
  navAssistant: string;
  navSchemes: string;
  navServices: string;
  navCommunity: string;
  navSeekho: string;
  navAnalyzeBtn: string;
  demoFarmerLabel: string;
  emergencyWarningTicker: string;

  // Landing Page
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  exploreBtn: string;
  getStartedBtn: string;
  ecosystemHeading: string;
  ecosystemSub: string;
  propositionHeading: string;
  propositionQuote: string;
  openDashboardBtn: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;

  // Dashboard
  criticalRiskBadge: string;
  weatherAlertHeader: string;
  weatherAlertDesc: string;
  openEmergencyBtn: string;
  actionGrow: string;
  actionGrowDesc: string;
  actionMarket: string;
  actionMarketDesc: string;
  actionEmergency: string;
  actionEmergencyDesc: string;
  actionAssistant: string;
  actionAssistantDesc: string;
  activeStatusTitle: string;
  editProfileBtn: string;
  standingCropLabel: string;
  harvestReadinessLabel: string;
  cropConditionDesc: string;
  nextCycleTitle: string;
  nextCycleDesc: string;
  analyzeFarmBtn: string;
  weatherWidgetTitle: string;
  marketOutlookTitle: string;

  // Intelligence
  intelHeaderTitle: string;
  intelHeaderDesc: string;
  analyzeMyFarmBtn: string;
  analyzingBtn: string;
  feedbackLoopTitle: string;
  feedbackLoopDesc: string;
  simAdoptionLabel: string;
  baselineBtn: string;
  surgeBtn: string;
  rankedOutputTitle: string;
  topChoiceTag: string;
  soilSuitabilityLabel: string;
  expectedYieldLabel: string;
  regionalDemandLabel: string;
  regionalSupplyLabel: string;
  expectedProfitLabel: string;
  overallRiskLabel: string;
  whyRecommendedTitle: string;
  selectCropBtn: string;

  // Market
  marketHeaderTitle: string;
  marketHeaderDesc: string;
  marketSearchPlaceholder: string;
  cropCol: string;
  mandiCol: string;
  priceCol: string;
  demandCol: string;
  trendCol: string;
  mspCol: string;
  actionCol: string;
  viewBuyersBtn: string;
  verifiedBuyersTitle: string;

  // Emergency
  emergencyBannerTitle: string;
  emergencyForecastText: string;
  recommends5Title: string;
  recommends5Desc: string;
  action1: string;
  action1Desc: string;
  action2: string;
  action2Desc: string;
  action3: string;
  action3Desc: string;
  action4: string;
  action4Desc: string;
  action5: string;
  action5Desc: string;
  findMachineryBtn: string;
  findLabourBtn: string;
  findStorageBtn: string;
  findTransportBtn: string;
  findBuyersBtn: string;
  deployNowBtn: string;

  // AI Assistant
  aiTitle: string;
  aiSub: string;
  clearChatBtn: string;
  suggestedLabel: string;
  inputPlaceholder: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Nav
    navDashboard: 'Dashboard',
    navProfile: 'My Farm',
    navIntelligence: 'Farm Intelligence',
    navMarket: 'Market',
    navEmergency: 'Emergency',
    navAssistant: 'AI Assistant',
    navSchemes: 'Schemes',
    navServices: 'Services',
    navCommunity: 'Community',
    navSeekho: 'Seekho',
    navAnalyzeBtn: 'Analyze Farm',
    demoFarmerLabel: 'Demo Farmer',
    emergencyWarningTicker: 'Heavy Rain Warning (Potato 92%)',

    // Landing
    heroTitle: 'FarmHub',
    heroSub: 'Unified Agricultural Ecosystem',
    heroDesc: 'FarmHub connects agricultural data, intelligence, services and markets to help farmers make better decisions and reduce avoidable losses.',
    exploreBtn: 'Explore FarmHub',
    getStartedBtn: 'Get Started • Analyze My Farm',
    ecosystemHeading: 'How FarmHub Converts Agricultural Data into Decisions',
    ecosystemSub: 'Closed-Loop Core Architecture',
    propositionHeading: 'The FarmHub Proposition',
    propositionQuote: '"FarmHub converts agricultural data into actionable decisions."',
    openDashboardBtn: 'Open Farmer Dashboard →',
    pillar1Title: '1. Transparent Intelligence',
    pillar1Desc: 'Deterministic multi-factor algorithm balancing soil compatibility, regional supply, processing demand, and market pricing to rank the best crops.',
    pillar2Title: '2. Real-Time Mandi & Buyers',
    pillar2Desc: 'Direct connection to verified food processors and mandi wholesalers, comparing spot rates against MSP benchmarks with verified contacts.',
    pillar3Title: '3. Actionable Emergency Response',
    pillar3Desc: 'When weather emergencies threaten crops, FarmHub doesn\'t just alert—it instantly connects tractors, labor, cold storage, and spot buyers in one click.',

    // Dashboard
    criticalRiskBadge: 'Critical Weather Risk',
    weatherAlertHeader: 'Heavy Rainfall Warning (85mm Forecast in 36-48 Hrs)',
    weatherAlertDesc: 'Your Potato crop is at 92% maturity. Waterlogging will trigger rapid tuber rot. FarmHub has prepared a 5-step emergency harvest and buyer offload plan.',
    openEmergencyBtn: 'Open Emergency Action Plan →',
    actionGrow: '🌱 What should I grow?',
    actionGrowDesc: 'Run multi-factor crop analysis',
    actionMarket: '📈 Check Market',
    actionMarketDesc: 'Agra mandi rates & verified buyers',
    actionEmergency: '🚨 Emergency',
    actionEmergencyDesc: 'Machinery, labour, storage, buyers',
    actionAssistant: '🤖 Ask FarmHub AI',
    actionAssistantDesc: 'Contextual agronomy assistant',
    activeStatusTitle: 'Active Cultivation Status',
    editProfileBtn: 'Edit Profile',
    standingCropLabel: 'Standing Crop',
    harvestReadinessLabel: 'Harvest Readiness',
    cropConditionDesc: 'Crop Condition: Tuber skin is setting well. Tuber size: 45-65mm.',
    nextCycleTitle: 'Plan Next Cycle After Potato Harvest',
    nextCycleDesc: 'FarmHub\'s algorithm has analyzed Agra\'s soil moisture, processing demand, and market pricing to recommend high-margin crops.',
    analyzeFarmBtn: 'Analyze My Farm →',
    weatherWidgetTitle: 'Real-Time Microclimate',
    marketOutlookTitle: 'Market Outlook',

    // Intelligence
    intelHeaderTitle: 'FarmHub Intelligence Engine',
    intelHeaderDesc: 'Converts your 5-acre Loamy soil data in Agra into ranked crop recommendations with dynamic profit ranges, market demand, and transparent agronomic rationale.',
    analyzeMyFarmBtn: 'Analyze My Farm',
    analyzingBtn: 'Analyzing Farm...',
    feedbackLoopTitle: 'The FarmHub Closed Feedback Loop',
    feedbackLoopDesc: 'When FarmHub recommends a crop, regional farmers adopt it. As supply expands, market risk rises, automatically shifting future recommendations to rebalance regional agro-economics.',
    simAdoptionLabel: 'Simulate Farmer Adoption',
    baselineBtn: 'Baseline (0%)',
    surgeBtn: 'Adoption Surge (+45%)',
    rankedOutputTitle: 'Ranked Intelligence Output',
    topChoiceTag: '★ #1 Top Recommendation',
    soilSuitabilityLabel: 'Soil Suitability',
    expectedYieldLabel: 'Expected Yield',
    regionalDemandLabel: 'Regional Demand',
    regionalSupplyLabel: 'Regional Supply',
    expectedProfitLabel: 'Expected 5-Acre Net Profit Range',
    overallRiskLabel: 'Overall Risk:',
    whyRecommendedTitle: 'Why recommended?',
    selectCropBtn: 'Select Crop for Sowing Plan',

    // Market
    marketHeaderTitle: 'Agra APMC Mandi & Direct Buyer Network',
    marketHeaderDesc: 'Real-time modal mandi rates, MSP comparisons, weekly trend curves, and verified direct corporate buyer offloading.',
    marketSearchPlaceholder: 'Filter crops or mandis...',
    cropCol: 'Crop & Variety',
    mandiCol: 'Mandi Location',
    priceCol: 'Modal Price',
    demandCol: 'Demand',
    trendCol: 'Price Trend',
    mspCol: 'Govt MSP',
    actionCol: 'Action',
    viewBuyersBtn: 'View Buyers',
    verifiedBuyersTitle: 'Verified Buyers',

    // Emergency
    emergencyBannerTitle: '⚠ HEAVY RAINFALL RISK',
    emergencyForecastText: 'Rainfall Forecast: 85mm within the next 36–48 hours.',
    recommends5Title: 'FarmHub Recommends 5 Coordinated Actions',
    recommends5Desc: 'FarmHub doesn\'t just warn the farmer; it connects the warning to an actionable response.',
    action1: '1. Harvest Early',
    action1Desc: 'Begin mechanized digging in next 6 hours while topsoil is dry.',
    action2: '2. Arrange Machinery',
    action2Desc: 'Mobilize 2 tractor potato diggers to clear 5 acres in <6 hrs.',
    action3: '3. Arrange Labour',
    action3Desc: 'Deploy 10 pickers for field-sorting and bag stitching.',
    action4: '4. Secure Storage',
    action4Desc: 'Reserve pre-cooling bays at Khandauli cold storage.',
    action5: '5. Contact Buyers',
    action5Desc: 'Offload directly from field gate to chip processors at ₹1,320/q.',
    findMachineryBtn: 'Find Machinery (Tractor Diggers)',
    findLabourBtn: 'Find Labour (Harvest Gangs)',
    findStorageBtn: 'Find Storage (Cold Storage Bays)',
    findTransportBtn: 'Find Transport (Covered Trucks)',
    findBuyersBtn: 'Find Buyers (Spot Fieldgate Offloading)',
    deployNowBtn: 'Deploy / Book Now',

    // AI Assistant
    aiTitle: 'FarmHub AI Agronomic Assistant',
    aiSub: 'Grounded in FarmHub\'s structured intelligence pipeline: Soil + Weather + Supply + Demand = Actionable Decisions.',
    clearChatBtn: 'Clear Chat',
    suggestedLabel: 'Suggested:',
    inputPlaceholder: 'Ask FarmHub AI about crops, profits, weather emergency, or market prices...'
  },
  hi: {
    // Nav
    navDashboard: 'डैशबोर्ड',
    navProfile: 'मेरा खेत',
    navIntelligence: 'कृषि बुद्धिमत्ता',
    navMarket: 'मंडी बाज़ार',
    navEmergency: 'आपातकालीन',
    navAssistant: 'एआई सहायक',
    navSchemes: 'सरकारी योजनाएं',
    navServices: 'सेवाएं',
    navCommunity: 'किसान चौपाल',
    navSeekho: 'सीखो',
    navAnalyzeBtn: 'खेत का विश्लेषण',
    demoFarmerLabel: 'डेमो किसान',
    emergencyWarningTicker: 'भारी बारिश चेतावनी (आलू 92% तैयार)',

    // Landing
    heroTitle: 'फार्महब (FarmHub)',
    heroSub: 'एकीकृत कृषि इकोसिस्टम',
    heroDesc: 'फार्महब किसानों को बेहतर निर्णय लेने और नुकसान से बचने के लिए कृषि डेटा, बुद्धिमत्ता, सेवाएं और मंडियों को जोड़ता है।',
    exploreBtn: 'फार्महब देखें',
    getStartedBtn: 'शुरुआत करें • खेत का विश्लेषण',
    ecosystemHeading: 'फार्महब कृषि डेटा को सटीक निर्णयों में कैसे बदलता है',
    ecosystemSub: 'क्लोज्ड-लूप कोर आर्किटेक्चर',
    propositionHeading: 'फार्महब का संकल्प',
    propositionQuote: '"फार्महब कृषि डेटा को किसानों के लाभदायक निर्णयों में बदलता है।"',
    openDashboardBtn: 'किसान डैशबोर्ड खोलें →',
    pillar1Title: '१. पारदर्शी बुद्धिमत्ता',
    pillar1Desc: 'मिट्टी, क्षेत्रीय आवक, मांग और मंडी भावों का संतुलन कर सबसे उत्तम फसल का चयन।',
    pillar2Title: '२. लाइव मंडी भाव और खरीदार',
    pillar2Desc: 'एमएसपी समर्थन मूल्य की तुलना और सत्यापित फूड प्रोसेसर्स से सीधे खेत से बिक्री।',
    pillar3Title: '३. तत्काल आपातकालीन समाधान',
    pillar3Desc: 'मौसम चेतावनी पर सिर्फ सूचना नहीं—ट्रैक्टर, मजदूर, कोल्ड स्टोरेज और खरीदार तुरंत जोड़ता है।',

    // Dashboard
    criticalRiskBadge: 'गंभीर मौसम जोखिम चेतावनी',
    weatherAlertHeader: 'भारी बारिश चेतावनी (अगले ३६-४८ घंटों में ८५ मिमी वर्षा अनुमानित)',
    weatherAlertDesc: 'आपकी आलू की फसल ९२% पक चुकी है। खेत में जलभराव से कंद सड़ने का भारी खतरा है। फार्महब ने ५-चरणीय आपातकालीन कटाई और सीधी बिक्री योजना तैयार की है।',
    openEmergencyBtn: 'आपातकालीन कार्य योजना खोलें →',
    actionGrow: '🌱 क्या उगाएं?',
    actionGrowDesc: 'बहु-कारकीय फसल विश्लेषण',
    actionMarket: '📈 मंडी भाव देखें',
    actionMarketDesc: 'आगरा मंडी भाव व सत्यापित खरीदार',
    actionEmergency: '🚨 आपातकालीन राहत',
    actionEmergencyDesc: 'मशीनरी, मजदूर, कोल्ड स्टोरेज, खरीदार',
    actionAssistant: '🤖 फार्महब एआई से पूछें',
    actionAssistantDesc: 'सटीक कृषि सलाहकार चैट',
    activeStatusTitle: 'सक्रिय खेती स्थिति',
    editProfileBtn: 'प्रोफ़ाइल बदलें',
    standingCropLabel: 'खेत में खड़ी फसल',
    harvestReadinessLabel: 'कटाई परिपक्वता',
    cropConditionDesc: 'फसल स्थिति: आलू का छिलका कड़ा हो चुका है। आकार: ४५-६५ मिमी।',
    nextCycleTitle: 'आलू कटाई के बाद अगली फसल की योजना',
    nextCycleDesc: 'फार्महब इंजन ने आगरा की दोमट मिट्टी, नमी और आगामी मांग का विश्लेषण कर अधिकतम मुनाफे वाली फसलें तैयार की हैं।',
    analyzeFarmBtn: 'खेत का विश्लेषण करें →',
    weatherWidgetTitle: 'स्थानीय मौसम केंद्र (आगरा)',
    marketOutlookTitle: 'मंडी बाज़ार रुझान',

    // Intelligence
    intelHeaderTitle: 'फार्महब इंटेलिजेंस इंजन',
    intelHeaderDesc: 'आगरा में आपकी ५ एकड़ दोमट मिट्टी के डेटा को मुनाफे, मांग और जोखिम के आधार पर शीर्ष ३ फसलों में बदलता है।',
    analyzeMyFarmBtn: 'मेरे खेत का विश्लेषण करें',
    analyzingBtn: 'खेत का विश्लेषण जारी है...',
    feedbackLoopTitle: 'फार्महब क्लोज्ड फीडबैक लूप (प्रतिक्रिया चक्र)',
    feedbackLoopDesc: 'जब फार्महब किसी फसल की सिफारिश करता है, तो अधिक किसान उसे बोते हैं। आवक बढ़ने से भविष्य की सिफारिशें स्वतः दूसरी फसलों की ओर मुड़ जाती हैं।',
    simAdoptionLabel: 'किसान बुवाई बदलाव सिमुलेशन',
    baselineBtn: 'सामान्य आधार (०%)',
    surgeBtn: 'सरसों बुवाई उछाल (+४५%)',
    rankedOutputTitle: 'रैंक की गई फसल सिफारिशें',
    topChoiceTag: '★ सर्वश्रेष्ठ #१ पसंद',
    soilSuitabilityLabel: 'मिट्टी अनुकूलता',
    expectedYieldLabel: 'अनुमानित उपज',
    regionalDemandLabel: 'क्षेत्रीय मांग',
    regionalSupplyLabel: 'क्षेत्रीय आवक (सप्लाई)',
    expectedProfitLabel: '५ एकड़ पर कुल अनुमानित शुद्ध मुनाफा',
    overallRiskLabel: 'समग्र जोखिम:',
    whyRecommendedTitle: 'यह फसल क्यों चुनी गई?',
    selectCropBtn: 'बुवाई कार्य-योजना चुनें',

    // Market
    marketHeaderTitle: 'आगरा कृषि उपज मंडी व सीधे खरीदार',
    marketHeaderDesc: 'दैनिक मॉडल थोक भाव, सरकारी एमएसपी तुलना, साप्ताहिक रुझान और सत्यापित खाद्य तेल व चिप्स कंपनियों से सीधे संपर्क।',
    marketSearchPlaceholder: 'फसल या मंडी खोजें...',
    cropCol: 'फसल व किस्म',
    mandiCol: 'मंडी स्थान',
    priceCol: 'मॉडल भाव',
    demandCol: 'मांग',
    trendCol: 'भाव रुझान',
    mspCol: 'सरकारी एमएसपी',
    actionCol: 'कार्य',
    viewBuyersBtn: 'खरीदार देखें',
    verifiedBuyersTitle: 'सत्यापित खरीदार',

    // Emergency
    emergencyBannerTitle: '⚠ भारी वर्षा एवं जलभराव का खतरा',
    emergencyForecastText: 'वर्षा अनुमान: अगले ३६-४८ घंटों में ८५ मिमी मूसलाधार बारिश।',
    recommends5Title: 'फार्महब की ५ समन्वित त्वरित कार्रवाइयां',
    recommends5Desc: 'फार्महब सिर्फ चेतावनी नहीं देता; चेतावनी को तुरंत धरातलीय समाधान से जोड़ता है।',
    action1: '१. तत्काल खुदाई शुरू करें',
    action1Desc: 'मिट्टी सूखने के अगले ६ घंटे में ट्रैक्टर डिगर से खुदाई प्रारंभ करें।',
    action2: '२. मशीनरी की व्यवस्था',
    action2Desc: '५ एकड़ आलू ६ घंटे में निकालने हेतु २ ट्रैक्टर डिगर बुक करें।',
    action3: '३. मजदूर दल जुटाएं',
    action3Desc: 'खेत में छंटाई और बोरी सिलाई के लिए १० मजदूरों की टोली लगाएं।',
    action4: '४. सुरक्षित भंडारण',
    action4Desc: 'खंडौली कोल्ड स्टोरेज में प्री-कूलिंग चैंबर पहले से आरक्षित करें।',
    action5: '५. खरीदारों से सीधे संपर्क',
    action5Desc: 'खेत से ही सीधे ₹१,३२०/क्विंटल पर प्रोसेसर्स को लोड करवाएं।',
    findMachineryBtn: 'मशीनरी खोजें (ट्रैक्टर डिगर)',
    findLabourBtn: 'मजदूर खोजें (कटाई दल)',
    findStorageBtn: 'भंडारण खोजें (कोल्ड स्टोरेज)',
    findTransportBtn: 'परिवहन खोजें (तिरपाल वाले ट्रक)',
    findBuyersBtn: 'खरीदार खोजें (खेत से नकद खरीद)',
    deployNowBtn: 'तुरंत बुक करें / बुलाएं',

    // AI Assistant
    aiTitle: 'फार्महब एआई कृषि सलाहकार',
    aiSub: 'फार्महब के वैज्ञानिक एल्गोरिदम पर आधारित: मिट्टी + मौसम + आपूर्ति + मांग = सटीक निर्णय।',
    clearChatBtn: 'चैट साफ़ करें',
    suggestedLabel: 'सुझाए गए प्रश्न:',
    inputPlaceholder: 'फसलों, मुनाफे, मौसम आपातकाल या मंडी भाव के बारे में फार्महब एआई से पूछें...'
  }
};
