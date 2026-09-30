import React, { useState, useEffect } from 'react';
import { FarmProfileData, CropIntelligenceData } from '../types/farmhub';
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
  Info
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
}

export const FarmIntelligence: React.FC<FarmIntelligenceProps> = ({ farmProfile }) => {
  const { language, t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  
  // Feedback loop interactive state (0 = baseline, 45 = adoption surge)
  const [adoptionShift, setAdoptionShift] = useState<number>(0);
  const [intelResult, setIntelResult] = useState<IntelligenceResult>(() => 
    generateRecommendations(farmProfile, 0)
  );

  // Recalculate when profile or adoption shift changes
  useEffect(() => {
    const res = generateRecommendations(farmProfile, adoptionShift);
    setIntelResult(res);
  }, [farmProfile, adoptionShift]);

  const pipelineStepsEn = [
    '1. Ingesting Farm Profile & Loamy Soil Baseline',
    '2. Calculating Soil & Environmental Suitability',
    '3. Incorporating IMD Weather & Microclimate',
    '4. Querying Regional Mandi Supply & Processing Demand',
    '5. Running Elastic Price & Input Cost Simulation',
    '6. Estimating 5-Acre Net Profit Margin Range',
    '7. Applying Multi-Factor Risk Penalty & Ranking'
  ];

  const pipelineStepsHi = [
    '१. ५ एकड़ खेत प्रोफ़ाइल और दोमट मिट्टी डेटा इनपुट',
    '२. मिट्टी एवं जलवायु अनुकूलता स्कोर गणना',
    '३. मौसम विभाग की वर्षा व तापमान परिस्थितियों का समावेशन',
    '४. क्षेत्रीय आगरा मंडी आवक एवं क्रशिंग मांग का मिलान',
    '५. बीज/खाद लागत और गतिशील बाजार भाव सिमुलेशन',
    '६. ५ एकड़ कुल शुद्ध मुनाफा रेंज का आकलन',
    '७. समग्र जोखिम कटौती और शीर्ष ३ फसलों की रैंकिंग'
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
    }, 400);
  };

  // Prepare chart data for Recharts
  const chartData = intelResult.allRankedCrops.slice(0, 5).map(c => ({
    name: language === 'hi' ? c.hindiName : c.name.split(' ')[0],
    SupplyIndex: c.currentRegionalSupplyIndex,
    DemandIndex: c.currentRegionalDemandIndex,
    MinProfit: Math.round((c.expectedProfitMin || 0) / 1000), // in Thousands
    MaxProfit: Math.round((c.expectedProfitMax || 0) / 1000)
  }));

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-xs font-bold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'बहु-कारकीय वैज्ञानिक अनुकूलन' : 'Multi-Factor Algorithmic Optimization'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {t.intelHeaderTitle}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              {t.intelHeaderDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-black text-xs sm:text-sm shadow-xl hover:bg-emerald-50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <BrainCircuit className={`w-4 h-4 text-emerald-700 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? t.analyzingBtn : t.analyzeMyFarmBtn}</span>
            </button>
          </div>
        </div>

        {/* Input Parameters Ingested */}
        <div className="mt-6 pt-5 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'स्थान' : 'Location'}</span>
            <span className="font-bold text-white">{farmProfile.location}</span>
          </div>
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'खेत का क्षेत्रफल' : 'Farm Area'}</span>
            <span className="font-bold text-white">{farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'}</span>
          </div>
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'मिट्टी प्रकार' : 'Soil Type'}</span>
            <span className="font-bold text-white">{farmProfile.soilType} {language === 'hi' ? '(दोमट)' : ''}</span>
          </div>
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'सिंचाई' : 'Water Source'}</span>
            <span className="font-bold text-white">{farmProfile.waterAvailability}</span>
          </div>
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'पूर्व फसल' : 'Previous Crop'}</span>
            <span className="font-bold text-white">{farmProfile.previousCrop} {language === 'hi' ? '(गेहूं)' : ''}</span>
          </div>
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
            <span className="text-[10px] text-emerald-300 block">{language === 'hi' ? 'लक्ष्य सीजन' : 'Target Cycle'}</span>
            <span className="font-bold text-amber-300">{language === 'hi' ? 'रबी / आलू उपरांत' : 'Rabi / Post-Potato'}</span>
          </div>
        </div>
      </div>

      {/* Animated Analysis Pipeline Simulation */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl border border-emerald-300 p-8 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center space-x-3 text-emerald-800">
            <RotateCw className="w-5 h-5 animate-spin text-emerald-600" />
            <h3 className="text-base font-extrabold text-stone-900">
              {language === 'hi' 
                ? `${farmProfile.farmArea} एकड़ खेत हेतु निर्णय प्रक्रिया जारी...`
                : `Running Decision Pipeline for ${farmProfile.farmArea} Acres...`}
            </h3>
          </div>

          <div className="space-y-2">
            {pipelineSteps.map((step, idx) => {
              const isPast = idx < analysisStep;
              const isCurrent = idx === analysisStep;
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                      : isPast
                      ? 'bg-stone-50 border-stone-200 text-stone-700'
                      : 'opacity-40 border-dashed border-stone-200 text-stone-400'
                  }`}
                >
                  <span>{step}</span>
                  {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FEEDBACK LOOP INTERACTIVE DEMO CALLOUT */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'लाइव सिमुलेशन' : 'Interactive Demonstration'}</span>
            </div>
            <h3 className="text-lg font-black text-stone-900">
              {t.feedbackLoopTitle}
            </h3>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              {t.feedbackLoopDesc}
            </p>
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

        {/* Dynamic Feedback Loop Banner */}
        <div className={`p-4 rounded-2xl border text-xs flex items-start space-x-3 transition-colors ${
          adoptionShift > 0 
            ? 'bg-amber-50 border-amber-300 text-amber-900' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
          <div className="space-y-1">
            <span className="font-extrabold block">
              {adoptionShift > 0 
                ? (language === 'hi' 
                    ? 'फीडबैक लूप सक्रिय: आगरा क्षेत्र में सरसों की बंपर बुवाई का प्रभाव' 
                    : 'Feedback Loop Triggered: High Mustard Adoption Detected in Agra')
                : (language === 'hi'
                    ? 'सामान्य बाज़ार संतुलन (वर्तमान में सरसों सबसे उत्तम खिड़की)'
                    : 'Baseline Market Equilibrium (Current Optimal Window)')}
            </span>
            <p className="leading-relaxed">
              {language === 'hi' && adoptionShift > 0
                ? 'सरसों की क्षेत्रीय बुवाई में +४५% उछाल आने से आपूर्ति बढ़कर ७२/१०० हो गई है, जिससे सरसों का जोखिम मध्यम से उच्च हो गया है। परिणामस्वरूप, चना (JG-11) और हरी मटर अब शीर्ष लाभदायक विकल्प बन गए हैं!'
                : language === 'hi'
                ? `आपकी ५ एकड़ दोमट मिट्टी और गेहूं के बाद के चक्र के अनुसार, सरसों (Pusa Bold) और चना (Desi JG-11) न्यूनतम पानी और अधिकतम मंडी मांग के कारण सबसे अधिक मुनाफा प्रदान करते हैं।`
                : intelResult.summaryText}
            </p>
          </div>
        </div>
      </div>

      {/* TOP 3 CROP RECOMMENDATIONS */}
      {hasAnalyzed && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t.rankedOutputTitle}
              </span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {language === 'hi' ? 'शीर्ष ३ सिफारिशें' : 'Top 3 Recommendations'}
              </span>
            </div>
            <span className="text-xs text-stone-400">
              {language === 'hi' ? '५ एकड़ कुल रकबे हेतु आकलित' : 'Calculated for 5 Acres Total'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {intelResult.topRecommendations.map((crop, idx) => {
              const isFirst = idx === 0;
              const riskColor = {
                'Low': 'bg-green-100 text-green-800 border-green-200',
                'Medium': 'bg-amber-100 text-amber-800 border-amber-200',
                'High': 'bg-rose-100 text-rose-800 border-rose-200'
              }[crop.overallRisk || 'Medium'];

              return (
                <div 
                  key={crop.id}
                  className={`bg-white rounded-3xl border transition-all p-6 flex flex-col justify-between space-y-5 shadow-xs relative ${
                    isFirst ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-stone-200'
                  }`}
                >
                  {isFirst && (
                    <div className="absolute -top-3 left-6 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {t.topChoiceTag}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Crop Name & Badges */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          {crop.category} • {crop.season}
                        </span>
                        <h2 className="text-xl font-black text-stone-900 mt-0.5">
                          {language === 'hi' ? crop.hindiName : crop.name}
                        </h2>
                        <span className="text-xs text-stone-400 font-semibold">
                          {language === 'hi' ? crop.name : crop.hindiName}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-stone-900 block">
                          {language === 'hi' ? 'स्कोर' : 'Score'}: {crop.score}/100
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {language === 'hi' ? 'समग्र' : 'Composite'}
                        </span>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-2xl border border-stone-200/70">
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">{t.soilSuitabilityLabel}</span>
                        <span className="font-extrabold text-stone-900">
                          {crop.soilSuitabilityScore}% ({language === 'hi' ? 'उत्तम' : 'High'})
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">{t.expectedYieldLabel}</span>
                        <span className="font-extrabold text-stone-900">
                          {crop.expectedYield} {language === 'hi' ? 'क्विंटल' : 'Quintals'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">{t.regionalDemandLabel}</span>
                        <span className="font-extrabold text-emerald-700">
                          {language === 'hi' 
                            ? (crop.demandRating === 'High' ? 'उच्च' : crop.demandRating === 'Moderate' ? 'मध्यम' : 'सामान्य')
                            : crop.demandRating}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">{t.regionalSupplyLabel}</span>
                        <span className="font-extrabold text-stone-800">
                          {language === 'hi'
                            ? (crop.supplyRating === 'High' ? 'उच्च' : crop.supplyRating === 'Moderate' ? 'मध्यम' : 'कम')
                            : crop.supplyRating} ({crop.currentRegionalSupplyIndex}/100)
                        </span>
                      </div>
                    </div>

                    {/* Expected Profit Range Box */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                        {t.expectedProfitLabel}
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                        ₹{crop.expectedProfitMin?.toLocaleString('en-IN')} – ₹{crop.expectedProfitMax?.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {language === 'hi' 
                          ? `कुल उपज मूल्य: ~₹${crop.expectedRevenue?.toLocaleString('en-IN')} • लागत: ~₹${crop.expectedCost?.toLocaleString('en-IN')}`
                          : `Gross Yield: ~₹${crop.expectedRevenue?.toLocaleString('en-IN')} • Cost: ~₹${crop.expectedCost?.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    {/* Risk Rating */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-stone-500 font-bold">{t.overallRiskLabel}</span>
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${riskColor}`}>
                        {language === 'hi' 
                          ? (crop.overallRisk === 'Low' ? 'कम जोखिम' : crop.overallRisk === 'Medium' ? 'मध्यम जोखिम' : 'उच्च जोखिम')
                          : `${crop.overallRisk} Risk`}
                      </span>
                    </div>

                    {/* Why Recommended Rationale Checklist */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-black uppercase tracking-wider text-stone-700 block">
                        {t.whyRecommendedTitle}
                      </span>
                      <div className="space-y-1.5 text-xs text-stone-700">
                        {language === 'hi' ? (
                          <>
                            <div className="flex items-start space-x-2">
                              <span className="text-emerald-700 font-black shrink-0">✓</span>
                              <span className="leading-tight">आगरा की दोमट मिट्टी और सिंचित व्यवस्था के साथ शत-प्रतिशत जैविक अनुकूलता।</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-emerald-700 font-black shrink-0">✓</span>
                              <span className="leading-tight">आगरा व आसपास की तेल/बेसन मिलों में लगातार मजबूत मांग।</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-emerald-700 font-black shrink-0">✓</span>
                              <span className="leading-tight">गेहूं व आलू के बाद कीट चक्र तोड़ने और मिट्टी सुधारने के लिए सर्वोत्तम फसल चक्र।</span>
                            </div>
                          </>
                        ) : (
                          crop.reasons?.map((reason, rIdx) => (
                            <div key={rIdx} className="flex items-start space-x-2">
                              <span className="text-emerald-700 font-black shrink-0">✓</span>
                              <span className="leading-tight">{reason}</span>
                            </div>
                          ))
                        )}
                        {crop.risks && crop.risks.length > 0 && (
                          <div className="pt-1 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200/60 flex items-start space-x-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              {language === 'hi' 
                                ? `जोखिम नोट: ${crop.currentRegionalSupplyIndex > 70 ? 'अधिक बुवाई से मंडी में आवक दबाव संभव।' : 'मौसम में नमी बढ़ने पर रोग निगरानी आवश्यक।'}`
                                : `Risk note: ${crop.risks[0]}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => alert(language === 'hi' 
                        ? `${crop.hindiName} की बुवाई कार्य-योजना आपके मौसमी कैलेंडर में दर्ज कर दी गई है।` 
                        : `Sowing package details for ${crop.name} logged to your seasonal agro-calendar.`)}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      {language === 'hi' 
                        ? `${crop.hindiName} बुवाई योजना चुनें` 
                        : `Select ${crop.name.split(' ')[0]} for Sowing Plan`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISUALIZATION SECTION: Recharts & Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        
        {/* Supply vs Demand Comparison Chart */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {language === 'hi' ? 'बाज़ार गतिशीलता' : 'Market Dynamics'}
              </span>
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'hi' ? 'क्षेत्रीय मांग बनाम आवक (सप्लाई) सूचकांक' : 'Regional Supply vs Demand Index'}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {language === 'hi' ? 'पैमाना ०-१००' : 'Scale 0–100'}
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
                <Bar dataKey="SupplyIndex" fill="#e11d48" name={language === 'hi' ? 'आवक (सप्लाई) सूचकांक' : 'Supply Index'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed italic">
            {language === 'hi' 
              ? 'जिन फसलों में हरा बार (मांग) अधिक और लाल बार (सप्लाई) कम होता है, वे कटाई के बाद कीमतों में स्थिरता और अधिक मुनाफा सुनिश्चित करती हैं।'
              : 'Crops with high green bars (Demand) and lower red bars (Supply) offer superior price resilience and reduced post-harvest glut risk.'}
          </p>
        </div>

        {/* Expected Net Profit Range Comparison */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {language === 'hi' ? 'आर्थिक लाभ' : 'Economic Return'}
              </span>
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'hi' ? '५ एकड़ अनुमानित शुद्ध मुनाफा (हज़ार ₹ में)' : 'Projected 5-Acre Profit (in ₹\'000)'}
              </h3>
            </div>
            <span className="text-xs text-emerald-700 font-bold">
              {language === 'hi' ? 'न्यूनतम व अधिकतम रेंज' : 'Min vs Max Range'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`₹${Number(value) * 1000}`, language === 'hi' ? 'शुद्ध मुनाफा' : 'Profit Range']} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="MinProfit" fill="#10b981" name={language === 'hi' ? 'न्यूनतम मुनाफा (₹\'०००)' : 'Min Profit (₹\'000)'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="MaxProfit" fill="#047857" name={language === 'hi' ? 'अधिकतम मुनाफा (₹\'०००)' : 'Max Profit (₹\'000)'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed italic">
            {language === 'hi'
              ? 'मुनाफा गणना में बीज, उर्वरक, सिंचाई और मजदूरी लागत शामिल है। कम लागत और ऊंची मंडी दर के कारण सरसों व चना अग्रणी हैं।'
              : 'Profit accounts for seed, fertilizer, irrigation, and labor costs. Mustard and Chickpea lead due to low input cost and high oilseed/pulse market prices.'}
          </p>
        </div>

      </div>

    </div>
  );
};
