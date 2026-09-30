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

  // Landing Page Extended Loop & Story
  loopTitle: string;
  loopDesc: string;
  loopDataTitle: string;
  loopDataDesc: string;
  loopAnalysisTitle: string;
  loopAnalysisDesc: string;
  loopDecisionTitle: string;
  loopDecisionDesc: string;
  loopActionTitle: string;
  loopActionDesc: string;
  loopLearningTitle: string;
  loopLearningDesc: string;
  modulesTitle: string;
  modulesSub: string;
  infoVsDecisionTitle: string;
  traditionalLabel: string;
  traditionalDesc: string;
  farmhubMethodLabel: string;
  farmhubMethodDesc: string;
  scenarioTitle: string;
  scenarioDesc: string;
  scenarioStep1: string;
  scenarioStep2: string;
  scenarioStep3: string;
  scenarioStep4: string;

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

  // Additional Dashboard Specific Keys
  demoDataBadge: string;
  primaryRiskTitle: string;
  primaryRiskDesc: string;
  recommendedActionTitle: string;
  recommendedActionDesc: string;
  askAIPromptHint: string;

  // Profile Specific Keys
  profileWhyTitle: string;
  profileWhyDesc: string;

  // Intelligence Pipeline Keys
  pipelineTitle: string;
  pipelineSub: string;
  profitFormulaTitle: string;
  profitFormulaDesc: string;

  // Phase 7 Visualization Keys
  comparisonTitle: string;
  comparisonSub: string;
  profitRangeVisualTitle: string;

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

  // Market Phase 8
  marketSnapshotTitle: string;
  marketSnapshotSub: string;
  currentPriceLabel: string;
  priceTrendLabel: string;
  mandiVsDirectTitle: string;
  mandiVsDirectSub: string;
  mandiOptionLabel: string;
  directBuyerOptionLabel: string;
  netDiffLabel: string;
  marketActionTitle: string;
  marketActionDesc: string;
  reviewEmergencyBtn: string;
  viewIntelligenceBtn: string;
  demoScenarioNotice: string;
  simulatedTrendNotice: string;
  buyerDemandIndexLabel: string;

  // Emergency Phase 9
  riskImpactTitle: string;
  doNowLabel: string;
  prepareLabel: string;
  monitorLabel: string;
  timelineTitle: string;
  timelineSub: string;
  financialRiskTitle: string;
  financialRiskDesc: string;
  askAiHelpBtn: string;
  checkMarketBtn: string;
  reEvaluatePlanBtn: string;
  demoActionCreatedTitle: string;
  demoActionCreatedDesc: string;

  // AI Assistant Phase 10
  aiContextBadge: string;
  aiSourceNotice: string;
  actionOpenIntel: string;
  actionOpenMarket: string;
  actionOpenEmergency: string;
  actionOpenProfile: string;
  actionOpenSchemes: string;

  // Phase 11 Supporting Ecosystem
  ecosystemToolsTitle: string;
  ecosystemToolsSub: string;
  toolAgriDoctorTitle: string;
  toolAgriDoctorDesc: string;
  toolFertilizerTitle: string;
  toolFertilizerDesc: string;
  toolSchemesTitle: string;
  toolSchemesDesc: string;
  toolSeekhoTitle: string;
  toolSeekhoDesc: string;
  toolCommunityTitle: string;
  toolCommunityDesc: string;
  toolFinanceTitle: string;
  toolFinanceDesc: string;
  toolServicesTitle: string;
  toolServicesDesc: string;
  toolMarketplaceTitle: string;
  toolMarketplaceDesc: string;
  demoDisclaimerTag: string;
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

    // Landing Page Extended Loop & Story
    loopTitle: 'The FarmHub Closed-Loop Decision Architecture',
    loopDesc: 'Unlike static advisory tools, FarmHub converts multi-source agricultural signals into targeted field actions while capturing feedback to continually balance regional farm economics.',
    loopDataTitle: '1. Multi-Source Data Integration',
    loopDataDesc: 'Captures micro-farm parameters (soil, water, previous crops) alongside macro indicators (weather forecasts, mandi prices, regional supply).',
    loopAnalysisTitle: '2. Deterministic Analysis Engine',
    loopAnalysisDesc: 'Evaluates soil suitability, weather resilience, production cost, price elasticity, and market glut risk for every crop candidate.',
    loopDecisionTitle: '3. Actionable Decision Output',
    loopDecisionDesc: 'Generates transparent recommendations ranking top 3 crops with explicit agronomic and financial reasons per acre.',
    loopActionTitle: '4. Direct Execution Ecosystem',
    loopActionDesc: 'Connects the farmer immediately with verified equipment rentals, harvest labour, cold storage bays, and corporate offload buyers.',
    loopLearningTitle: '5. Regional Feedback & Rebalancing',
    loopLearningDesc: 'As regional farmers commit to specific crops, FarmHub dynamically updates supply density metrics to prevent regional market saturation.',
    modulesTitle: 'Integrated Agricultural Ecosystem',
    modulesSub: 'Comprehensive capability pillars built into a single unified platform',
    infoVsDecisionTitle: 'The Paradigm Shift: From Information to Decisions',
    traditionalLabel: 'Traditional Ag-Tech Apps (Static Information)',
    traditionalDesc: 'Separate disconnected tools providing raw weather charts, generic crop lists, and uncoordinated emergency alerts without field execution context.',
    farmhubMethodLabel: 'FarmHub Platform (Closed-Loop Intelligence)',
    farmhubMethodDesc: 'Integrated decision pipeline that connects farm context + microclimate + market signals directly to one-click field execution and buyer contracts.',
    scenarioTitle: 'Controlled Demo Persona: Ramesh Sharma (Agra)',
    scenarioDesc: '5-Acre Loamy Soil Farm in Bichpuri • Current Potato Crop (92% Maturity) • Heavy Rain Threat',
    scenarioStep1: 'IMD Rain Warning: 85mm expected in 36 hrs',
    scenarioStep2: 'FarmHub assesses high waterlogging rot risk',
    scenarioStep3: 'Recommends immediate 6-hour early harvest',
    scenarioStep4: 'One-click dispatch for 2 tractor diggers & 10 pickers',

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
    demoDataBadge: 'Controlled Demo Scenario',
    primaryRiskTitle: 'Current Primary Risk: Unseasonal Heavy Rain Alert',
    primaryRiskDesc: 'IMD rainfall warning forecasts 85mm within 36-48 hours over Bichpuri block. Potato crop is at 92% maturity; waterlogging will trigger severe tuber rot.',
    recommendedActionTitle: 'FarmHub Recommended Action: Early Harvest & Fieldgate Sale',
    recommendedActionDesc: 'Initiate 6-hour mechanized early harvest with 2 tractor diggers, 10 pickers, and offload directly to chip processors at ₹1,380/q.',
    askAIPromptHint: 'Ask FarmHub AI: "What should I do about the incoming rain threat?"',
    profileWhyTitle: 'Why FarmHub asks for this farm information',
    profileWhyDesc: 'FarmHub uses your farm\'s physical soil classification, water availability, acreage, and crop rotation history to ground its multi-factor crop suitability algorithms and profit calculations. Recommendations are tailored directly to your land rather than generic regional averages.',
    pipelineTitle: 'Transparent Decision Pipeline',
    pipelineSub: 'Deterministic multi-stage optimization converting raw farm signals into ranked choices',
    profitFormulaTitle: 'Profit Model (Per Acre & Total Land)',
    profitFormulaDesc: 'Estimated Net Profit = (Expected Yield × Selling Price) − Base Production Cost',
    comparisonTitle: 'Comparative Decision Matrix',
    comparisonSub: 'Side-by-side comparison of suitability, supply glut risk, market demand, and net returns across candidate crops',
    profitRangeVisualTitle: 'Net Profit Range Comparison (Min – Max)',

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
    marketSnapshotTitle: 'Current Standing Crop Market Snapshot',
    marketSnapshotSub: 'Real-time price, demand activity, and financial comparison for your 5-acre Potato crop',
    currentPriceLabel: 'Current Mandi Rate',
    priceTrendLabel: 'Price Trend',
    mandiVsDirectTitle: 'Mandi vs. Direct Corporate Buyer Net Net',
    mandiVsDirectSub: 'Comparing traditional local mandi wholesale against verified corporate fieldgate offload',
    mandiOptionLabel: 'Traditional Mandi Yard',
    directBuyerOptionLabel: 'Direct Corporate Fieldgate Buyer',
    netDiffLabel: 'Net Financial Advantage',
    marketActionTitle: 'Market Signal & Decision Recommendation',
    marketActionDesc: 'Rain Forecast + 92% Harvest Maturity + Active Chip Processing Buyers = Optimal Immediate Action',
    reviewEmergencyBtn: 'Deploy Harvest & Offload Logistics →',
    viewIntelligenceBtn: 'View Crop Intelligence →',
    demoScenarioNotice: 'Controlled Demo Scenario (Agra District)',
    simulatedTrendNotice: 'Simulated Market Trend (Modal Price)',
    buyerDemandIndexLabel: 'Regional Buyer Demand Index',

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
    action5Desc: 'Offload directly from field gate to chip processors at ₹1,380/q.',
    findMachineryBtn: 'Find Machinery (Tractor Diggers)',
    findLabourBtn: 'Find Labour (Harvest Gangs)',
    findStorageBtn: 'Find Storage (Cold Storage Bays)',
    findTransportBtn: 'Find Transport (Covered Trucks)',
    findBuyersBtn: 'Find Buyers (Spot Fieldgate Offloading)',
    deployNowBtn: 'Deploy / Book Now',

    // Emergency Phase 9
    riskImpactTitle: 'Risk to Field Impact Pipeline',
    doNowLabel: 'DO NOW (Next 0–6 Hrs)',
    prepareLabel: 'PREPARE (Next 6–18 Hrs)',
    monitorLabel: 'MONITOR (18–36 Hrs)',
    timelineTitle: 'Emergency Action Response Timeline',
    timelineSub: 'Chronological execution window to protect crop value before rain event',
    financialRiskTitle: 'Financial Loss Exposure vs. Protected Margin',
    financialRiskDesc: 'Waterlogging causes 40-70% rot loss (₹3.5L–₹5.2L risk exposure). Coordinated early harvest saves 100% of value.',
    askAiHelpBtn: 'Ask FarmHub AI for Advice →',
    checkMarketBtn: 'Check Buyers & Mandi →',
    reEvaluatePlanBtn: 'Re-evaluate Crop Plan →',
    demoActionCreatedTitle: 'Demo Action Created',
    demoActionCreatedDesc: 'Harvest coordination request prepared for demonstration.',

    // AI Assistant Phase 10
    aiContextBadge: 'Farm Context Active',
    aiSourceNotice: 'Grounded in FarmHub Decision Engine & APMC Data',
    actionOpenIntel: 'Open Farm Intelligence →',
    actionOpenMarket: 'Check Mandi Rates & Buyers →',
    actionOpenEmergency: 'Open Emergency Plan →',
    actionOpenProfile: 'View Farm Profile →',
    actionOpenSchemes: 'Explore Matched Schemes →',

    // Phase 11 Supporting Ecosystem
    ecosystemToolsTitle: 'FarmHub Supporting Ecosystem Tools',
    ecosystemToolsSub: 'Contextual modules supporting the core decision loop: Profile → Intelligence → Market → Emergency',
    toolAgriDoctorTitle: 'Crop Health Doctor',
    toolAgriDoctorDesc: 'Diagnose leaf blight & tuber soft rot symptoms',
    toolFertilizerTitle: 'Nutrient Calculator',
    toolFertilizerDesc: 'Calculate NPK dosage for 5-acre loamy soil',
    toolSchemesTitle: 'Matched Government Schemes',
    toolSchemesDesc: 'Explore PMKSY, PMFBY & SMAM subsidies',
    toolSeekhoTitle: 'Seekho Agri Academy',
    toolSeekhoDesc: 'Learn scientific package of practices & videos',
    toolCommunityTitle: 'Farmer Community',
    toolCommunityDesc: 'Share field experiences with Agra growers',
    toolFinanceTitle: 'Farm Finance Tracker',
    toolFinanceDesc: 'Track input costs & net crop margins',
    toolServicesTitle: 'Agri Services Network',
    toolServicesDesc: 'Machinery, labour, cold storage & transport',
    toolMarketplaceTitle: 'Inputs Marketplace',
    toolMarketplaceDesc: 'Quality seeds, bio-fertilizers & equipment',
    demoDisclaimerTag: 'Controlled Demo Dataset',

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

    // Landing Page Extended Loop & Story
    loopTitle: 'फार्महब क्लोज्ड-लूप निर्णय वास्तुकला',
    loopDesc: 'पारंपरिक सूचना ऐप्स के विपरीत, फार्महब बहु-स्रोतीय कृषि आंकड़ों को धरातलीय कार्यों में बदलता है और क्षेत्रीय संतुलन बनाए रखने के लिए निरंतर सीखता है।',
    loopDataTitle: '१. बहु-स्रोतीय डेटा एकीकरण',
    loopDataDesc: 'खेत के मापदंड (मिट्टी, पानी, पिछली फसल) और व्यापक संकेतक (मौसम पूर्वानुमान, मंडी भाव, क्षेत्रीय आवक) को एकत्र करता है।',
    loopAnalysisTitle: '२. पारदर्शी विश्लेषण इंजन',
    loopAnalysisDesc: 'मिट्टी की उपयुक्तता, मौसम सहनशीलता, उत्पादन लागत और मंडी संतृप्ति जोखिम का सूक्ष्म मूल्यांकन करता है।',
    loopDecisionTitle: '३. कार्रवाई योग्य निर्णय परिणाम',
    loopDecisionDesc: 'स्पष्ट कृषि व वित्तीय कारणों के साथ शीर्ष ३ अनुशंसित फसलों की पारदर्शी रैंकिंग प्रदान करता है।',
    loopActionTitle: '४. सीधा निष्पादन इकोसिस्टम',
    loopActionDesc: 'किसान को तुरंत किराए के उपकरण, कटाई मजदूर, कोल्ड स्टोरेज चैंबर और थोक खरीदारों से जोड़ता है।',
    loopLearningTitle: '५. क्षेत्रीय फीडबैक व संतुलन चक्र',
    loopLearningDesc: 'जैसे-जैसे क्षेत्र के किसान विशिष्ट फसल चुनते हैं, फार्महब बाजार में मंदी व ओवर-सप्लाई रोकने के लिए स्वचालित रूप से अपडेट होता है।',
    modulesTitle: 'एकीकृत कृषि इकोसिस्टम',
    modulesSub: 'एक ही मंच में निर्मित ६ प्रमुख तकनीकी क्षमताएं',
    infoVsDecisionTitle: 'वैचारिक बदलाव: "केवल जानकारी" से "सटीक निर्णय" की ओर',
    traditionalLabel: 'पारंपरिक कृषि ऐप्स (केवल जानकारी)',
    traditionalDesc: 'अलग-अलग बिखरे उपकरण जो बिना किसी धरातलीय तालमेल के केवल मौसम चार्ट, सामान्य फसल सूची और चेतावनी दिखाते हैं।',
    farmhubMethodLabel: 'फार्महब प्लेटफॉर्म (क्लोज्ड-लूप बुद्धिमत्ता)',
    farmhubMethodDesc: 'एकीकृत निर्णय प्रणाली जो खेत के संदर्भ + मौसम + मंडी संकेतकों को सीधे १-क्लिक निष्पादन और खरीदार अनुबंधों से जोड़ती है।',
    scenarioTitle: 'लाइव डेमो किसान: रमेश शर्मा (आगरा)',
    scenarioDesc: 'बिचपुरी में ५ एकड़ दोमट जमीन • वर्तमान फसल: आलू (९२% परिपक्व) • भारी बारिश का खतरा',
    scenarioStep1: 'मौसम विभाग चेतावनी: ३६ घंटे में ८५ मिमी बारिश',
    scenarioStep2: 'फार्महब ने जलभराव से सड़न जोखिम का आकलन किया',
    scenarioStep3: '६ घंटे के भीतर त्वरित खुदाई की सिफारिश की',
    scenarioStep4: '२ ट्रैक्टर डिगर व १० मजदूरों का १-क्लिक बुकिंग dispatch',

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
    demoDataBadge: 'नियंत्रित डेमो परिदृश्य',
    primaryRiskTitle: 'वर्तमान मुख्य जोखिम: बेमौसम भारी बारिश का अलर्ट',
    primaryRiskDesc: 'मौसम विभाग की चेतावनी: बिचपुरी ब्लॉक में अगले ३६-४८ घंटों में ८५ मिमी बारिश। आलू ९२% परिपक्व है; जलभराव से कंद सड़ने का बड़ा खतरा है।',
    recommendedActionTitle: 'फार्महब अनुशंसित कार्रवाई: त्वरित कटाई व खेत से बिक्री',
    recommendedActionDesc: '२ ट्रैक्टर डिगर व १० मजदूरों के साथ ६ घंटे की यंत्रीकृत खुदाई शुरू करें और चिप्स मिलों को सीधे ₹१,३८०/क्विंटल पर लोड करवाएं।',
    askAIPromptHint: 'फार्महब एआई से पूछें: "आगामी बारिश के खतरे से बचने के लिए मुझे क्या करना चाहिए?"',
    profileWhyTitle: 'फार्महब यह जानकारी क्यों मांगता है?',
    profileWhyDesc: 'फार्महब आपकी जमीन की मिट्टी के वर्गीकरण, पानी की उपलब्धता, रकबा और पिछली फसल के इतिहास का उपयोग करके बहु-कारकीय फसल उपयुक्तता और मुनाफे की गणना करता है। सिफारिशें सामान्य क्षेत्रीय औसत के बजाय सीधे आपकी जमीन पर आधारित होती हैं।',
    pipelineTitle: 'पारदर्शी निर्णय पाइपलाइन',
    pipelineSub: 'कच्चे कृषि मापदंडों को चरणबद्ध वैज्ञानिक विधि से अनुशंसित विकल्पों में बदलना',
    profitFormulaTitle: 'मुनाफा मॉडल (प्रति एकड़ व कुल रकबा)',
    profitFormulaDesc: 'अनुमानित शुद्ध मुनाफा = (अनुमानित उपज × मंडी विक्रय मूल्य) − कुल उत्पादन लागत',
    comparisonTitle: 'तुलनात्मक निर्णय मैट्रिक्स',
    comparisonSub: 'अनुकूलता, मंडी आवक जोखिम, मांग और शुद्ध लाभ का प्रत्यक्ष तुलनात्मक तालिका',
    profitRangeVisualTitle: 'अनुमानित शुद्ध मुनाफा रेंज (न्यूनतम – अधिकतम)',

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
    marketSnapshotTitle: 'वर्तमान खड़ी फसल मंडी स्नैपशॉट',
    marketSnapshotSub: 'आपकी ५ एकड़ आलू की फसल के लिए लाइव भाव, मांग और वित्तीय तुलना',
    currentPriceLabel: 'वर्तमान मंडी भाव',
    priceTrendLabel: 'मूल्य रुझान',
    mandiVsDirectTitle: 'पारंपरिक मंडी बनाम सीधे कॉर्पोरेट खरीदार की तुलना',
    mandiVsDirectSub: 'स्थानीय आढ़ती बनाम सीधे खेत से कारखाने तक खरीद के शुद्ध लाभ का अंतर',
    mandiOptionLabel: 'पारंपरिक मंडी आढ़त',
    directBuyerOptionLabel: 'सीधा कॉर्पोरेट खरीदार (खेत से)',
    netDiffLabel: 'शुद्ध वित्तीय लाभ',
    marketActionTitle: 'मंडी संकेत और निर्णय सिफारिश',
    marketActionDesc: 'बारिश का अलर्ट + ९२% फसल परिपक्वता + सक्रिय चिप्स मिल खरीदार = तत्काल कार्रवाई',
    reviewEmergencyBtn: 'कटाई व बिक्री योजना लागू करें →',
    viewIntelligenceBtn: 'फसल बुद्धिमत्ता देखें →',
    demoScenarioNotice: 'नियंत्रित डेमो परिदृश्य (आगरा जिला)',
    simulatedTrendNotice: 'अनुमानित मंडी भाव रुझान (मॉडल दर)',
    buyerDemandIndexLabel: 'क्षेत्रीय खरीदार मांग सूचकांक',

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
    action5Desc: 'खेत से ही सीधे ₹१,३८०/क्विंटल पर प्रोसेसर्स को लोड करवाएं।',
    findMachineryBtn: 'मशीनरी खोजें (ट्रैक्टर डिगर)',
    findLabourBtn: 'मजदूर खोजें (कटाई दल)',
    findStorageBtn: 'भंडारण खोजें (कोल्ड स्टोरेज)',
    findTransportBtn: 'परिवहन खोजें (तिरपाल वाले ट्रक)',
    findBuyersBtn: 'खरीदार खोजें (खेत से नकद खरीद)',
    deployNowBtn: 'तुरंत बुक करें / बुलाएं',

    // Emergency Phase 9
    riskImpactTitle: 'मौसम जोखिम से फसल प्रभाव श्रृंखला',
    doNowLabel: 'अभी करें (अगले ०-६ घंटे)',
    prepareLabel: 'तैयारी करें (अगले ६-१८ घंटे)',
    monitorLabel: 'निगरानी रखें (१८-३६ घंटे)',
    timelineTitle: 'आपातकालीन कार्रवाई समय सीमा (टाइमलाइन)',
    timelineSub: 'बारिश से पूर्व फसल मूल्य बचाने की चरणबद्ध समय-सारणी',
    financialRiskTitle: 'संभावित नुकसान जोखिम बनाम सुरक्षित मुनाफा',
    financialRiskDesc: 'जलभराव से ४०-७०% कंद सड़न (₹३.५ लाख-₹५.२ लाख नुकसान जोखिम)। त्वरित कटाई से १००% उपज सुरक्षित।',
    askAiHelpBtn: 'फार्महब एआई से सलाह लें →',
    checkMarketBtn: 'खरीदार व मंडी भाव देखें →',
    reEvaluatePlanBtn: 'फसल योजना का पुनर्मूल्यांकन →',
    demoActionCreatedTitle: 'डेमो कार्रवाई निर्मित',
    demoActionCreatedDesc: 'प्रदर्शन हेतु कटाई समन्वय अनुरोध तैयार किया गया।',

    // AI Assistant Phase 10
    aiContextBadge: 'खेत संदर्भ सक्रिय',
    aiSourceNotice: 'फार्महब डिसीजन इंजन व एपीएमसी आंकड़ों पर आधारित',
    actionOpenIntel: 'कृषि बुद्धिमत्ता खोलें →',
    actionOpenMarket: 'मंडी भाव व खरीदार देखें →',
    actionOpenEmergency: 'आपातकालीन योजना खोलें →',
    actionOpenProfile: 'खेत प्रोफ़ाइल देखें →',
    actionOpenSchemes: 'सरकारी योजनाएं देखें →',

    // Phase 11 Supporting Ecosystem
    ecosystemToolsTitle: 'फार्महब सहायक इकोसिस्टम उपकरण',
    ecosystemToolsSub: 'मुख्य निर्णय चक्र की सहायक सेवाएं: प्रोफ़ाइल → बुद्धिमत्ता → मंडी → आपातकाल',
    toolAgriDoctorTitle: 'फसल डॉक्टर',
    toolAgriDoctorDesc: 'पत्ती झुलसा व कंद सड़न लक्षणों की पहचान',
    toolFertilizerTitle: 'उर्वरक कैलकुलेटर',
    toolFertilizerDesc: '५ एकड़ दोमट मिट्टी हेतु एनपीके मात्रा',
    toolSchemesTitle: 'सरकारी योजनाएं',
    toolSchemesDesc: 'पीएमकेएसवाई, पीएमएफबीवाई व स्मैम सब्सिडी',
    toolSeekhoTitle: 'सीखो कृषि अकादमी',
    toolSeekhoDesc: 'वैज्ञानिक खेती पद्धतियां व शिक्षण वीडियो',
    toolCommunityTitle: 'किसान चौपाल',
    toolCommunityDesc: 'आगरा के किसानों के साथ अनुभव साझा करें',
    toolFinanceTitle: 'कृषि वित्त ट्रैकर',
    toolFinanceDesc: 'लागत खर्च व शुद्ध मुनाफे का हिसाब रखें',
    toolServicesTitle: 'कृषि सेवा नेटवर्क',
    toolServicesDesc: 'मशीनरी, मजदूर, कोल्ड स्टोरेज व परिवहन',
    toolMarketplaceTitle: 'इनपुट मार्केटप्लेस',
    toolMarketplaceDesc: 'उच्च गुणवत्ता बीज, जैव-उर्वरक व उपकरण',
    demoDisclaimerTag: 'नियंत्रित डेमो आंकड़े',

    // AI Assistant
    aiTitle: 'फार्महब एआई कृषि सलाहकार',
    aiSub: 'फार्महब के वैज्ञानिक एल्गोरिदम पर आधारित: मिट्टी + मौसम + आपूर्ति + मांग = सटीक निर्णय।',
    clearChatBtn: 'चैट साफ़ करें',
    suggestedLabel: 'सुझाए गए प्रश्न:',
    inputPlaceholder: 'फसलों, मुनाफे, मौसम आपातकाल या मंडी भाव के बारे में फार्महब एआई से पूछें...'
  }
};
