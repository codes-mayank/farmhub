import React, { useState, useEffect } from 'react';
import { FarmProfileData, CropIntelligenceData, PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { 
  generateRecommendations, 
  IntelligenceResult 
} from '../services/intelligenceEngine';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCw, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  RefreshCw,
  Sliders,
  Info,
  ShieldAlert,
  ArrowUpRight,
  HelpCircle,
  Cpu,
  Calculator,
  ShoppingBag,
  Stethoscope,
  BarChart3,
  Check,
  Zap,
  Flame
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface FarmIntelligenceProps {
  farmProfile: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

export const FarmIntelligence: React.FC<FarmIntelligenceProps> = ({ farmProfile, setCurrentPage }) => {
  const { language, t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  
  // Feedback loop interactive state (0 = baseline, 45 = adoption surge)
  const [adoptionShift, setAdoptionShift] = useState<number>(0);
  const [intelResult, setIntelResult] = useState<IntelligenceResult>(() => 
    generateRecommendations(farmProfile, 0)
  );

  // Dynamic recalculation when farmProfile or adoptionShift changes
  useEffect(() => {
    const res = generateRecommendations(farmProfile, adoptionShift);
    setIntelResult(res);
  }, [farmProfile, adoptionShift]);

  const pipelineStages = [
    { step: '1', title: 'Farm Profile', sub: `${farmProfile.farmArea} Acres • ${farmProfile.soilType}` },
    { step: '2', title: 'Suitability', sub: 'Soil & Water Match' },
    { step: '3', title: 'Supply + Demand', sub: 'Regional Index' },
    { step: '4', title: 'Price Elasticity', sub: 'Elastic Price Model' },
    { step: '5', title: 'Profit Range', sub: 'Revenue − Cost' },
    { step: '6', title: 'Risk Penalty', sub: 'Weather & Glut' },
    { step: '7', title: 'Ranked Choice', sub: 'Top 3 Output' }
  ];

  const pipelineStepsEn = [
    '1. Ingesting Farm Profile & Soil Parameters',
    '2. Calculating Soil & Water Suitability Score',
    '3. Evaluating Previous Crop Rotation Synergy',
    '4. Querying Regional Supply & Market Demand Indexes',
    '5. Running Price Elasticity & Production Cost Calculation',
    '6. Estimating Total Net Profit Margin Range',
    '7. Applying Volatility & Risk Penalties to Rank Top Crops'
  ];

  const pipelineStepsHi = [
    '१. खेत प्रोफ़ाइल एवं मिट्टी मापदंड इनपुट',
    '२. मिट्टी व जल उपयुक्तता स्कोर की गणना',
    '३. पूर्व फसल चक्र लाभ का मूल्यांकन',
    '४. क्षेत्रीय आगरा मंडी आवक व मांग सूचकांक मिलान',
    '५. मूल्य लोच व उत्पादन लागत गणना',
    '६. कुल शुद्ध मुनाफा रेंज का आकलन',
    '७. जोखिम कटौती लागू कर शीर्ष ३ फसलों की रैंकिंग'
  ];

  const pipelineSteps = language === 'hi' ? pipelineStepsHi : pipelineStepsEn;

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setHasAnalyzed(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= pipelineSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setHasAnalyzed(true);
        }, 500);
      }
    }, 350);
  };

  // Recharts preparation
  const chartData = intelResult.allRankedCrops.slice(0, 5).map(c => ({
    name: language === 'hi' ? c.hindiName : c.name.split(' ')[0],
    SupplyIndex: c.currentRegionalSupplyIndex,
    DemandIndex: c.currentRegionalDemandIndex,
    MinProfit: Math.round((c.expectedProfitMin || 0) / 1000),
    MaxProfit: Math.round((c.expectedProfitMax || 0) / 1000)
  }));

  const topCrop = intelResult.topRecommendations[0];

  return (
    <div className="space-y-8">
      
      {/* 1. TOP VISUAL PRIORITY: #1 TOP RECOMMENDATION HERO CARD */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-emerald-500/60 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Badge & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-emerald-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{t.topChoiceTag}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-emerald-200">
              {t.demoDataBadge}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-emerald-200 font-semibold">
              {language === 'hi' ? 'एल्गोरिदम अंक:' : 'Score:'} <strong className="text-white text-sm">{topCrop.score}/100</strong>
            </span>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-white text-emerald-950 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
            >
              {isAnalyzing ? t.analyzingBtn : t.analyzeMyFarmBtn}
            </button>
          </div>
        </div>

        {/* Hero Crop Title & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
              {topCrop.category} • {topCrop.season} Season • {farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans text-white">
              {language === 'hi' ? topCrop.hindiName : topCrop.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl font-normal">
              {language === 'hi' 
                ? `आपकी ${farmProfile.farmArea} एकड़ ${farmProfile.soilType} (दोमट) मिट्टी और गेहूं के बाद के चक्र के लिए न्यूनतम पानी व उच्चतम मंडी मांग के कारण सबसे अनुशंसित फसल।`
                : `Highest ranked crop for your ${farmProfile.farmArea}-acre ${farmProfile.soilType} soil in ${farmProfile.location} following ${farmProfile.previousCrop}, providing optimal margin and lowest water requirement.`}
            </p>
          </div>

          {/* Prominent Profit Range Box */}
          <div className="bg-emerald-900/80 backdrop-blur-md border border-emerald-400/40 p-6 rounded-3xl space-y-2 text-center lg:text-right shadow-lg">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 block">
              {t.expectedProfitLabel} ({farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'})
            </span>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ₹{(topCrop.expectedProfitMin || 0) / 1000}k – ₹{(topCrop.expectedProfitMax || 0) / 1000}k
            </div>
            <span className="text-[11px] text-emerald-200 block font-medium">
              ₹{topCrop.expectedProfitMin?.toLocaleString('en-IN')} – ₹{topCrop.expectedProfitMax?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Visual Progress Indicators: Suitability, Supply, Demand, Risk */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-emerald-800/80 text-xs">
          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 space-y-1.5">
            <div className="flex justify-between text-[11px] text-emerald-300 font-bold">
              <span>{t.soilSuitabilityLabel}</span>
              <span className="text-white">{topCrop.soilSuitabilityScore}%</span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${topCrop.soilSuitabilityScore}%` }}></div>
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 space-y-1.5">
            <div className="flex justify-between text-[11px] text-emerald-300 font-bold">
              <span>{t.regionalDemandLabel}</span>
              <span className="text-emerald-300 font-black">{topCrop.demandRating} ({topCrop.currentRegionalDemandIndex}/100)</span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${topCrop.currentRegionalDemandIndex}%` }}></div>
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 space-y-1.5">
            <div className="flex justify-between text-[11px] text-emerald-300 font-bold">
              <span>{t.regionalSupplyLabel}</span>
              <span className="text-stone-300 font-black">{topCrop.supplyRating} ({topCrop.currentRegionalSupplyIndex}/100)</span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden">
              <div className="bg-rose-400 h-full rounded-full" style={{ width: `${topCrop.currentRegionalSupplyIndex}%` }}></div>
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 space-y-1.5">
            <div className="flex justify-between text-[11px] text-emerald-300 font-bold">
              <span>{t.overallRiskLabel}</span>
              <span className="text-green-400 font-black">{topCrop.overallRisk}</span>
            </div>
            <div className="text-[10px] text-emerald-200/80 font-medium">
              {language === 'hi' ? 'मौसम सहिष्णुता: ८५/१००' : 'Weather Resilience: 85/100'}
            </div>
          </div>
        </div>

        {/* Why Recommended Rationale Checklist */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2 text-xs">
          <span className="font-extrabold uppercase tracking-wider text-amber-300 block text-[11px]">
            {t.whyRecommendedTitle}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-100">
            {topCrop.reasons?.map((reason, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span className="leading-tight">{reason}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. STANDING CROP CONTEXT & EMERGENCY BRIDGE */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-amber-600 text-white rounded-2xl shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-800">
              {language === 'hi' ? 'वर्तमान फसल स्थिति' : 'Standing Crop Context'}
            </div>
            <h3 className="font-black text-stone-900 text-sm">
              {language === 'hi' 
                ? `वर्तमान फसल: ${farmProfile.currentCrop} (परिपक्वता: ${farmProfile.harvestReadinessPercent}%) • बेमौसम वर्षा जोखिम` 
                : `Current Crop: ${farmProfile.currentCrop} (${farmProfile.harvestReadinessPercent}% Harvest Ready) • Rain Risk`}
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed max-w-2xl">
              {language === 'hi'
                ? 'कटाई खिड़की वर्तमान में खुली है। बेमौसम बारिश से बचाव हेतु त्वरित खुदाई व सीधी बिक्री योजना देखें।'
                : 'Harvest window is active. Manage unseasonal rain risk before evaluating your next sowing plan.'}
            </p>
          </div>
        </div>

        {setCurrentPage && (
          <button
            onClick={() => setCurrentPage('emergency')}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            {language === 'hi' ? 'आपातकालीन राहत योजना देखें →' : 'Review Emergency Action →'}
          </button>
        )}
      </div>

      {/* 3. STANDARDIZED 7-STAGE DECISION PIPELINE DIAGRAM */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {language === 'hi' ? 'निर्णय प्रक्रिया' : 'Decision Pipeline'}
            </span>
            <h3 className="font-extrabold text-base text-stone-900">
              {t.pipelineTitle}
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            {t.pipelineSub}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          {pipelineStages.map((stage, idx) => (
            <div key={idx} className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1">
              <span className="text-[9px] text-stone-400 font-bold uppercase block">STAGE {stage.step}</span>
              <span className="font-extrabold text-stone-900 block leading-tight">{stage.title}</span>
              <span className="text-[10px] text-stone-500 block leading-none">{stage.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SIDE-BY-SIDE COMPARATIVE DECISION MATRIX (#2 & #3 CROPS) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {language === 'hi' ? 'विकल्प तुलना' : 'Alternative Options'}
            </span>
            <h3 className="font-extrabold text-base text-stone-900">
              {t.comparisonTitle}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{t.comparisonSub}</p>
          </div>
        </div>

        {/* Matrix Table for Desktop / Cards for Mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-extrabold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Rank & Crop</th>
                <th className="py-3 px-4">Suitability</th>
                <th className="py-3 px-4">Yield</th>
                <th className="py-3 px-4">Demand</th>
                <th className="py-3 px-4">Supply Index</th>
                <th className="py-3 px-4">Est. Net Profit Range</th>
                <th className="py-3 px-4">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {intelResult.allRankedCrops.slice(0, 4).map((crop, idx) => (
                <tr key={crop.id} className={idx === 0 ? 'bg-emerald-50/50 font-bold' : 'hover:bg-stone-50/80'}>
                  <td className="py-3 px-4 font-black text-stone-900 flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                      idx === 0 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span>{language === 'hi' ? crop.hindiName : crop.name}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-800">{crop.soilSuitabilityScore}%</td>
                  <td className="py-3 px-4 text-stone-700">{crop.expectedYield} q</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">{crop.demandRating}</td>
                  <td className="py-3 px-4 text-stone-700">{crop.currentRegionalSupplyIndex}/100</td>
                  <td className="py-3 px-4 font-black text-emerald-900">
                    ₹{(crop.expectedProfitMin || 0) / 1000}k – ₹{(crop.expectedProfitMax || 0) / 1000}k
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      crop.overallRisk === 'Low' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {crop.overallRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. VISUAL PROFIT RANGE COMPARISON & SUPPLY VS DEMAND RECHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Custom Range Profit Bar Chart */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {language === 'hi' ? 'मुनाफा रेंज' : 'Profit Spreads'}
              </span>
              <h3 className="font-extrabold text-base text-stone-900">
                {t.profitRangeVisualTitle}
              </h3>
            </div>
            <span className="text-xs text-emerald-700 font-bold">
              {farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres Total'}
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {intelResult.allRankedCrops.slice(0, 4).map((crop) => (
              <div key={crop.id} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>{language === 'hi' ? crop.hindiName : crop.name.split(' ')[0]}</span>
                  <span className="text-emerald-800 font-black">
                    ₹{(crop.expectedProfitMin || 0) / 1000}k – ₹{(crop.expectedProfitMax || 0) / 1000}k
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 relative overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full opacity-90"
                    style={{
                      marginLeft: `${Math.max(5, ((crop.expectedProfitMin || 0) / 250000) * 100)}%`,
                      width: `${Math.min(90, (((crop.expectedProfitMax || 0) - (crop.expectedProfitMin || 0)) / 250000) * 100 + 15)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed italic">
            {language === 'hi'
              ? 'मुनाफा रेंज में न्यूनतम व अधिकतम उत्पादन मूल्य दर्शाया गया है।'
              : 'Profit bars represent explicit min-to-max net return range accounting for weather and price volatility.'}
          </p>
        </div>

        {/* Regional Supply vs Demand Index Chart */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {language === 'hi' ? 'बाज़ार संतुलन' : 'Market Equilibrium'}
              </span>
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'hi' ? 'क्षेत्रीय मांग बनाम आपूर्ति सूचकांक' : 'Regional Supply vs Demand Index'}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Scale 0–100
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="DemandIndex" fill="#059669" name={language === 'hi' ? 'मांग सूचकांक' : 'Demand Index'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="SupplyIndex" fill="#e11d48" name={language === 'hi' ? 'आवक सूचकांक' : 'Supply Index'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 6. CLOSED-LOOP SIMULATED FEEDBACK COMPARISON */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सिमुलेशन फीडबैक' : 'Simulated Regional Feedback'}</span>
            </div>
            <h3 className="text-lg font-black text-stone-900">
              {t.feedbackLoopTitle}
            </h3>
          </div>

          <div className="flex items-center space-x-3 bg-stone-50 p-3 rounded-2xl border border-stone-200 shrink-0">
            <Sliders className="w-4 h-4 text-stone-500" />
            <div>
              <div className="text-[11px] font-bold text-stone-700">{t.simAdoptionLabel}</div>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  onClick={() => setAdoptionShift(0)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    adoptionShift === 0
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t.baselineBtn}
                </button>
                <button
                  onClick={() => setAdoptionShift(45)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    adoptionShift > 0
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t.surgeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Before / After Comparison Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-950 flex items-center justify-between">
              <span>Baseline Equilibrium (0%)</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Optimal Window</span>
            </div>
            <div className="space-y-1 text-emerald-900 font-medium">
              <div>#1 Mustard (Score: 88/100) — Low supply pressure</div>
              <div>#2 Chickpea (Score: 82/100)</div>
              <div>#3 Green Peas (Score: 76/100)</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${
            adoptionShift > 0 ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="font-extrabold flex items-center justify-between">
              <span>Adoption Surge (+45% Mustard Shift)</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Rebalanced</span>
            </div>
            <div className="space-y-1 font-medium">
              <div>#1 Chickpea (Score: 85/100) ➔ <span className="font-black text-emerald-700">Rises to #1</span></div>
              <div>#2 Mustard (Score: 78/100) ➔ <span className="text-amber-800">Glut risk shifts to #2</span></div>
              <div>#3 Green Peas (Score: 76/100)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Action Navigation Footer */}
      {setCurrentPage && (
        <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-black text-base">{language === 'hi' ? 'निर्णय से निष्पादन की ओर बढ़ें' : 'Move from Intelligence to Execution'}</h4>
            <p className="text-xs text-stone-300">
              {language === 'hi' ? 'मंडी दरें व खरीदार देखें, आपातकालीन राहत खोलें या एआई से सवाल पूछें।' : 'Check verified buyers, open emergency harvest plan, or query FarmHub AI.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentPage('market')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'मंडी खरीदार' : 'Check Market'}
            </button>
            <button
              onClick={() => setCurrentPage('emergency')}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'आपातकाल' : 'Emergency'}
            </button>
            <button
              onClick={() => setCurrentPage('assistant')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'एआई सहायक' : 'Ask AI'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
