import React from 'react';
import { PageId, FarmProfileData } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { generateRecommendations } from '../services/intelligenceEngine';
import { MARKET_DATA } from '../data/centralData';
import { 
  Sprout, 
  MapPin, 
  Droplets, 
  CloudRain, 
  AlertTriangle, 
  TrendingUp, 
  Bot, 
  BrainCircuit, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Zap,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Clock,
  Stethoscope,
  Calculator,
  Landmark,
  GraduationCap,
  Users,
  DollarSign,
  Wrench,
  ShoppingCart
} from 'lucide-react';

interface FarmerDashboardProps {
  farmProfile: FarmProfileData;
  setCurrentPage: (page: PageId) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  farmProfile,
  setCurrentPage
}) => {
  const { language, t } = useLanguage();

  // Dynamic Intelligence recommendation engine invocation
  const intelResult = generateRecommendations(farmProfile, 0);
  const topCrop = intelResult.topRecommendations[0];

  // Market data lookup for current potato crop
  const potatoMarket = MARKET_DATA.find(m => m.id === 'market-potato') || MARKET_DATA[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Farmer Identity & Context Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
              {language === 'hi' ? 'सक्रिय कॉकपिट' : 'Operational Cockpit'}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">
              {t.demoDataBadge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {farmProfile.farmerName}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-600">
            <span className="flex items-center space-x-1 text-emerald-800 font-bold">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{farmProfile.location}</span>
            </span>
            <span>•</span>
            <span>{farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'}</span>
            <span>•</span>
            <span>{farmProfile.soilType} {language === 'hi' ? 'मिट्टी' : 'Soil'}</span>
            <span>•</span>
            <span className="text-sky-700 font-bold">{farmProfile.waterAvailability}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage('profile')}
            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-bold text-xs transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>{t.editProfileBtn}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. PRIMARY RISK & RECOMMENDED ACTION CARD (Highest Priority) */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4">
        <div className="flex items-start justify-between gap-4 border-b border-rose-200/80 pb-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-sm shrink-0">
              <ShieldAlert className="w-7 h-7 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-200 text-rose-950 px-2 py-0.5 rounded">
                  {t.criticalRiskBadge}
                </span>
                <span className="text-xs font-bold text-rose-800">
                  {language === 'hi' ? 'आगरा मौसम अलर्ट • ३६-४८ घंटे' : 'Agra District • 36–48 Hr Rain Alert'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-rose-950">
                {t.primaryRiskTitle}
              </h2>
              <p className="text-xs text-rose-900 leading-relaxed max-w-2xl font-medium">
                {t.primaryRiskDesc}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-1 rounded bg-rose-200/80 text-rose-900 shrink-0">
            {t.demoDataBadge}
          </span>
        </div>

        {/* Action Connected Signal */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-rose-200 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-black text-emerald-800">
            <Zap className="w-4 h-4 text-emerald-600 fill-current" />
            <span>{t.recommendedActionTitle}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {t.recommendedActionDesc}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentPage('emergency')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.openEmergencyBtn}</span>
            </button>
            <button
              onClick={() => setCurrentPage('market')}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 font-bold text-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'खरीदार दरें देखें (₹१,३८०/क्विंटल)' : 'Check Buyer Rates (₹1,380/q)'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Farm Snapshot, Standing Crop, & FarmHub Intelligence Recommendation */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Farm & Crop Status */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-stone-900">
                  {language === 'hi' ? 'खेत स्थिति व खड़ी फसल' : 'Active Field & Standing Crop'}
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {farmProfile.currentCrop} ({farmProfile.harvestReadinessPercent}% {language === 'hi' ? 'परिपक्व' : 'Ready'})
              </span>
            </div>

            {/* Compact Farm Snapshot Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">{language === 'hi' ? 'फसल' : 'Crop'}</span>
                <span className="text-xs font-black text-stone-900">{farmProfile.currentCrop}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">{language === 'hi' ? 'रकबा' : 'Area'}</span>
                <span className="text-xs font-black text-emerald-700">{farmProfile.farmArea} Acres</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">{language === 'hi' ? 'बुवाई तिथि' : 'Planted'}</span>
                <span className="text-xs font-black text-stone-900">{farmProfile.plantingDate}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">{language === 'hi' ? 'कटाई खिड़की' : 'Harvest Window'}</span>
                <span className="text-xs font-black text-amber-700">Immediate (Now)</span>
              </div>
            </div>

            {/* Maturity Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-stone-600 font-bold">
                <span>{language === 'hi' ? 'फसल परिपक्वता चक्र' : 'Crop Maturity Cycle'}</span>
                <span className="text-emerald-800">{farmProfile.harvestReadinessPercent}% ({language === 'hi' ? 'कटाई योग्य' : 'Harvest Window'})</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all"
                  style={{ width: `${farmProfile.harvestReadinessPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* FarmHub Intelligence Recommendation Box */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 rounded-3xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-stone-700 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                <BrainCircuit className="w-5 h-5 text-amber-300" />
                <span>{language === 'hi' ? 'फार्महब निर्णय सिफारिश' : 'FarmHub Intelligence Recommendation'}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-stone-300">
                {t.demoDataBadge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {language === 'hi' 
                ? `आलू कटाई के बाद आपकी ५ एकड़ दोमट जमीन के लिए सरसों (Sarson) सर्वश्रेष्ठ #१ पसंद है। अनुमानित शुद्ध मुनाफा: ₹${topCrop.expectedProfitMin?.toLocaleString('en-IN')} - ₹${topCrop.expectedProfitMax?.toLocaleString('en-IN')}।`
                : `Following potato harvest, Mustard (Pusa Bold) is ranked #1 for your 5-acre loamy soil in Bichpuri with an estimated net profit of ₹${topCrop.expectedProfitMin?.toLocaleString('en-IN')} – ₹${topCrop.expectedProfitMax?.toLocaleString('en-IN')}.`}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('intelligence')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-md transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <span>{t.analyzeFarmBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('market')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'मंडी भाव देखें' : 'View Mandi Trends'}
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Market Snapshot & AI Assistant Teaser */}
        <div className="space-y-6">
          
          {/* Market Snapshot Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">{t.marketOutlookTitle}</h3>
              </div>
              <button
                onClick={() => setCurrentPage('market')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                {language === 'hi' ? 'मंडी देखें →' : 'View Market →'}
              </button>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-stone-900">{potatoMarket.crop} ({potatoMarket.variety})</span>
                <span className="font-black text-emerald-800">₹{potatoMarket.currentPrice}/q</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-amber-900 font-medium">
                <span>{language === 'hi' ? 'आगरा मंडी मॉडल भाव' : 'Agra Mandi Rate'}</span>
                <span className="text-emerald-700 font-bold">Demand: {potatoMarket.demand}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('market')}
              className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer text-center"
            >
              {language === 'hi' ? 'सत्यापित कॉर्पोरेट खरीदार देखें (३ उपलब्ध)' : 'View Verified Corporate Buyers (3 Active)'}
            </button>
          </div>

          {/* Contextual AI Assistant Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-950 text-white rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>{language === 'hi' ? 'फार्महब एआई सहायक' : 'FarmHub AI Assistant'}</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed font-medium">
              {t.askAIPromptHint}
            </p>
            <button
              onClick={() => setCurrentPage('assistant')}
              className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.actionAssistant}</span>
            </button>
          </div>

        </div>

      </div>

      {/* 4. Primary Decision Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
        <button
          onClick={() => setCurrentPage('intelligence')}
          className="p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all text-left cursor-pointer group"
        >
          <BrainCircuit className="w-5 h-5 text-amber-300 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-extrabold text-xs sm:text-sm">{t.actionGrow}</div>
          <p className="text-[10px] text-emerald-100/80 mt-0.5">{t.actionGrowDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('market')}
          className="p-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-all text-left cursor-pointer group"
        >
          <TrendingUp className="w-5 h-5 text-teal-200 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-extrabold text-xs sm:text-sm">{t.actionMarket}</div>
          <p className="text-[10px] text-teal-100/80 mt-0.5">{t.actionMarketDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('emergency')}
          className="p-4 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white shadow-xs transition-all text-left cursor-pointer group"
        >
          <AlertTriangle className="w-5 h-5 text-rose-200 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-extrabold text-xs sm:text-sm">{t.actionEmergency}</div>
          <p className="text-[10px] text-rose-100/80 mt-0.5">{t.actionEmergencyDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('assistant')}
          className="p-4 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white shadow-xs transition-all text-left cursor-pointer group"
        >
          <Bot className="w-5 h-5 text-indigo-200 mb-2 group-hover:scale-110 transition-transform" />
          <div className="font-extrabold text-xs sm:text-sm">{t.actionAssistant}</div>
          <p className="text-[10px] text-indigo-100/80 mt-0.5">{t.actionAssistantDesc}</p>
        </button>
      </div>

      {/* 5. Supporting Ecosystem Tools Section (Phase 11) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-base font-black text-stone-900">{t.ecosystemToolsTitle}</h2>
            <p className="text-xs text-stone-500 mt-0.5">{t.ecosystemToolsSub}</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
            {t.demoDisclaimerTag}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {/* AgriDoctor */}
          <button
            onClick={() => setCurrentPage('agriDoctor')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-rose-100 text-rose-800 w-fit group-hover:scale-105 transition-transform">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolAgriDoctorTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolAgriDoctorDesc}</p>
            </div>
          </button>

          {/* Fertilizer Calculator */}
          <button
            onClick={() => setCurrentPage('fertilizer')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 w-fit group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolFertilizerTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolFertilizerDesc}</p>
            </div>
          </button>

          {/* Government Schemes */}
          <button
            onClick={() => setCurrentPage('schemes')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800 w-fit group-hover:scale-105 transition-transform">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolSchemesTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolSchemesDesc}</p>
            </div>
          </button>

          {/* Seekho Academy */}
          <button
            onClick={() => setCurrentPage('seekho')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800 w-fit group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolSeekhoTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolSeekhoDesc}</p>
            </div>
          </button>

          {/* Farmer Community */}
          <button
            onClick={() => setCurrentPage('community')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800 w-fit group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolCommunityTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolCommunityDesc}</p>
            </div>
          </button>

          {/* Finance Tracker */}
          <button
            onClick={() => setCurrentPage('finance')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 w-fit group-hover:scale-105 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolFinanceTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolFinanceDesc}</p>
            </div>
          </button>

          {/* Services Network */}
          <button
            onClick={() => setCurrentPage('services')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800 w-fit group-hover:scale-105 transition-transform">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolServicesTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolServicesDesc}</p>
            </div>
          </button>

          {/* Marketplace */}
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group space-y-1.5"
          >
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 w-fit group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-stone-900">{t.toolMarketplaceTitle}</h4>
              <p className="text-[10px] text-stone-500 leading-snug">{t.toolMarketplaceDesc}</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
