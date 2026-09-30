import React from 'react';
import { PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sprout, 
  ArrowRight, 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  RotateCw, 
  Sparkles, 
  ChevronRight,
  Database,
  Cpu,
  CheckCircle2,
  Zap,
  ShoppingBag,
  Stethoscope,
  Landmark,
  Wrench,
  CloudRain,
  ShieldAlert,
  ArrowDown,
  Activity,
  Users
} from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage }) => {
  const { language, t } = useLanguage();

  const loopStages = [
    {
      step: '01',
      title: t.loopDataTitle,
      desc: t.loopDataDesc,
      icon: Database,
      badge: language === 'hi' ? 'डेटा एकीकरण' : 'Multi-Source Data',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    },
    {
      step: '02',
      title: t.loopAnalysisTitle,
      desc: t.loopAnalysisDesc,
      icon: Cpu,
      badge: language === 'hi' ? 'विश्लेषण' : 'Engine Processing',
      color: 'bg-teal-50 border-teal-200 text-teal-800'
    },
    {
      step: '03',
      title: t.loopDecisionTitle,
      desc: t.loopDecisionDesc,
      icon: BrainCircuit,
      badge: language === 'hi' ? 'पारदर्शी निर्णय' : 'Actionable Decision',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      step: '04',
      title: t.loopActionTitle,
      desc: t.loopActionDesc,
      icon: Zap,
      badge: language === 'hi' ? 'धरातलीय निष्पादन' : 'Direct Action',
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      step: '05',
      title: t.loopLearningTitle,
      desc: t.loopLearningDesc,
      icon: RotateCw,
      badge: language === 'hi' ? 'फीडबैक लूप' : 'Regional Rebalancing',
      color: 'bg-rose-50 border-rose-200 text-rose-800'
    }
  ];

  const modules = [
    {
      title: language === 'hi' ? '🌱 कृषि बुद्धिमत्ता' : '🌱 Farm Intelligence',
      desc: language === 'hi' ? 'मिट्टी उपयुक्तता, मुनाफा पूर्वानुमान व आपूर्ति-मांग विश्लेषण' : 'Crop suitability, profit estimation, supply-demand balancing & risk scoring.',
      page: 'intelligence' as PageId,
      items: ['Soil Matching', 'Acreage Profit', 'Glut Risk']
    },
    {
      title: language === 'hi' ? '🌦️ मौसम व आपातकाल' : '🌦️ Weather & Emergency',
      desc: language === 'hi' ? 'आपदा चेतावनी, फसल जोखिम व त्वरित १-क्लिक राहत' : 'Weather red alerts, crop risk assessment & immediate emergency dispatch.',
      page: 'emergency' as PageId,
      items: ['Rain Alert', 'Early Harvest', 'SOS Dispatch']
    },
    {
      title: language === 'hi' ? '📈 मंडी व खरीदार' : '📈 Markets & Buyers',
      desc: language === 'hi' ? 'मॉडल भाव, एमएसपी तुलना व सीधे कॉर्पोरेट खरीदार' : 'Mandi prices, MSP comparisons & verified direct offload buyers.',
      page: 'market' as PageId,
      items: ['APMC Mandis', 'Price Trends', 'Direct Buyers']
    },
    {
      title: language === 'hi' ? '🧪 फसल स्वास्थ्य व मिट्टी' : '🧪 Crop & Soil Health',
      desc: language === 'hi' ? 'कीट व रोग निदान एवं सटीक उर्वरक खुराक कैलकुलेटर' : 'AI pest/disease identification & precision soil fertilizer dosage.',
      page: 'dashboard' as PageId,
      items: ['AgriDoctor', 'Fertilizer Calculator', 'Soil Test']
    },
    {
      title: language === 'hi' ? '🏦 वित्त व सरकारी योजनाएं' : '🏦 Finance & Schemes',
      desc: language === 'hi' ? 'सरकारी सब्सिडी, फसल बीमा व वित्तीय सहायता पात्रता' : 'Government scheme tracking, subsidy calculator & crop insurance.',
      page: 'schemes' as PageId,
      items: ['PM-Kisan', 'Fasal Bima', 'Solar Subsidy']
    },
    {
      title: language === 'hi' ? '🤝 सेवाएं व समुदाय' : '🤝 Services & Community',
      desc: language === 'hi' ? 'मशीनरी किराया, मजदूर टोली, कोल्ड स्टोरेज व ज्ञान मंच' : 'Machinery rentals, harvest labour, cold storage & farmer forum.',
      page: 'services' as PageId,
      items: ['Tractor Rental', 'Labour Gangs', 'Farmer Forum']
    }
  ];

  return (
    <div className="space-y-12 py-2">
      {/* 1. Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-emerald-700/50">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-400/40 text-xs font-bold text-emerald-200 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {language === 'hi' ? 'एकीकृत कृषि बुद्धिमत्ता एवं निष्पादन प्लेटफॉर्म' : 'Unified Agricultural Intelligence & Action Platform'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-sans">
              Farm<span className="text-emerald-400">Hub</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-emerald-100 font-serif">
              {t.heroSub}
            </p>
          </div>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
            {t.heroDesc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-sm shadow-xl hover:bg-emerald-50 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>{t.exploreBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>

            <button
              onClick={() => setCurrentPage('intelligence')}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-extrabold text-sm border border-emerald-400/40 shadow-lg backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <BrainCircuit className="w-4 h-4 text-amber-300" />
              <span>{t.getStartedBtn}</span>
            </button>
          </div>

          {/* Demo Persona Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-emerald-200/90 border-t border-emerald-700/60">
            <span className="font-extrabold text-white uppercase tracking-wider bg-emerald-800/80 px-2 py-0.5 rounded">
              {language === 'hi' ? 'लाइव डेमो किसान:' : 'Live Demo Persona:'}
            </span>
            <span className="font-bold text-white">Ramesh Sharma (Agra)</span>
            <span>•</span>
            <span>5 Acres ({language === 'hi' ? 'दोमट मिट्टी' : 'Loamy Soil'})</span>
            <span>•</span>
            <span>{language === 'hi' ? 'वर्तमान फसल: आलू (९२% परिपक्व)' : 'Current: Potato (92% harvest ready)'}</span>
          </div>
        </div>
      </div>

      {/* 2. Closed-Loop Intelligence Architecture */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'निर्णय चक्र प्रणाली' : 'Closed-Loop Intelligence Loop'}</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900">
              {t.loopTitle}
            </h2>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
              {t.loopDesc}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('intelligence')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'hi' ? 'निर्णय इंजन चलाएं' : 'Run Decision Engine'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Stage Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {loopStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border ${stage.color} flex flex-col justify-between space-y-3 relative group hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/70">
                    {stage.step}
                  </span>
                  <Icon className="w-4 h-4 opacity-80" />
                </div>

                <div>
                  <h3 className="font-extrabold text-stone-900 text-xs leading-tight mb-1">{stage.title}</h3>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-normal">{stage.desc}</p>
                </div>

                <div className="pt-2 border-t border-stone-200/50">
                  <span className="text-[9px] font-bold uppercase tracking-wider block opacity-70">
                    {stage.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Information vs Decision Paradigm Shift */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            {language === 'hi' ? 'वैचारिक अंतर' : 'The Core Distinction'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {t.infoVsDecisionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>{t.traditionalLabel}</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {t.traditionalDesc}
            </p>
            <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl text-[11px] text-rose-200">
              Weather Chart ➔ Mandi Ticker ➔ Generic Articles (No Context)
            </div>
          </div>

          <div className="bg-emerald-900/40 backdrop-blur-xs border border-emerald-500/40 p-6 rounded-2xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.farmhubMethodLabel}</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {t.farmhubMethodDesc}
            </p>
            <div className="p-3 bg-emerald-950/60 border border-emerald-400/40 rounded-xl text-[11px] text-emerald-200 font-semibold">
              Farm Context + Weather + Market ➔ 1-Click Harvest & Buyer Contract
            </div>
          </div>
        </div>
      </div>

      {/* 4. Controlled Demo Persona Scenario (Ramesh Sharma) */}
      <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-amber-600 text-white rounded-2xl shadow-sm shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">
                {language === 'hi' ? 'नियंत्रित हैकाथॉन केस स्टडी' : 'Controlled Demo Scenario'}
              </span>
              <h2 className="text-xl font-black text-amber-950 mt-1">
                {t.scenarioTitle}
              </h2>
              <p className="text-xs text-amber-800 mt-0.5 font-medium">
                {t.scenarioDesc}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('emergency')}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer whitespace-nowrap"
          >
            {language === 'hi' ? 'लाइव बारिश प्लान खोलें →' : 'View Rain Emergency →'}
          </button>
        </div>

        {/* Step Flow for Ramesh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-amber-800 uppercase">Step 1 • Signals</div>
            <div className="text-xs font-black text-stone-900">{t.scenarioStep1}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-amber-800 uppercase">Step 2 • Analysis</div>
            <div className="text-xs font-black text-stone-900">{t.scenarioStep2}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-amber-800 uppercase">Step 3 • Decision</div>
            <div className="text-xs font-black text-emerald-800">{t.scenarioStep3}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-amber-800 uppercase">Step 4 • Action</div>
            <div className="text-xs font-black text-stone-900">{t.scenarioStep4}</div>
          </div>
        </div>
      </div>

      {/* 5. 6 Ecosystem Modules Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              {t.modulesSub}
            </span>
            <h2 className="text-2xl font-black text-stone-900 mt-0.5">
              {t.modulesTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <h3 className="font-black text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {mod.desc}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex flex-wrap gap-1">
                  {mod.items.map((item, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(mod.page)}
                  className="w-full py-2 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>{language === 'hi' ? 'खोलें' : 'Explore Capability'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
