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
  ChevronRight 
} from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage }) => {
  const { language, t } = useLanguage();

  const ecosystemSteps = language === 'hi' ? [
    { label: 'खेत का डेटा', sub: 'मिट्टी, क्षेत्रफल, पानी, पूर्व फसल', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { label: 'फार्महब इंटेलिजेंस', sub: 'बहु-कारकीय निर्णय इंजन', color: 'bg-teal-50 text-teal-800 border-teal-200', highlight: true },
    { label: 'मिट्टी + मौसम + मांग + आवक', sub: 'गतिशील क्षेत्रीय संकेतक', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    { label: 'भाव + लागत + जोखिम', sub: 'प्रति एकड़ मुनाफा गणना', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { label: 'फसल सिफारिश', sub: 'कारणों सहित शीर्ष ३ विकल्प', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { label: 'मंडी एवं खरीदार', sub: 'एमएसपी व सीधी खरीद अनुबंध', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { label: 'त्वरित कार्रवाई', sub: 'मशीनरी, मजदूर, कोल्ड स्टोरेज', color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { label: 'परिणाम व फीडबैक लूप', sub: 'क्षेत्रीय संतुलन चक्र', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', loop: true }
  ] : [
    { label: 'Farm Data', sub: 'Soil, area, water, previous crops', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { label: 'FarmHub Intelligence', sub: 'Multi-factor decision engine', color: 'bg-teal-50 text-teal-800 border-teal-200', highlight: true },
    { label: 'Soil + Weather + Supply + Demand', sub: 'Dynamic regional indicators', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    { label: 'Price + Cost + Risk', sub: 'Acreage margin calculations', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { label: 'Crop Recommendation', sub: 'Ranked top 3 with transparent why', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { label: 'Market / Buyers', sub: 'Direct offloading & MSP spread', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { label: 'Action & Execution', sub: 'Machinery, labor, cold storage', color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { label: 'Outcome & Feedback Loop', sub: 'Regional supply rebalancing', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', loop: true }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-emerald-700/50">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-700/50 border border-emerald-400/30 text-xs font-bold text-emerald-200 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {language === 'hi' ? 'हैकाथॉन प्रोटोटाइप • कृषि निर्णय वास्तुकला' : 'Hackathon Prototype • Decision Support Architecture'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-sans">
              Farm<span className="text-emerald-400">Hub</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-emerald-100 italic font-serif">
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
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-extrabold text-sm border border-emerald-400/40 shadow-lg backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <BrainCircuit className="w-4 h-4 text-amber-300" />
              <span>{t.getStartedBtn}</span>
            </button>
          </div>

          {/* Demo Farmer Badge */}
          <div className="pt-4 flex items-center space-x-3 text-xs text-emerald-200/90 border-t border-emerald-700/60">
            <span className="font-bold text-white">
              {language === 'hi' ? 'लाइव डेमो किसान:' : 'Live Demo Persona:'}
            </span>
            <span>Ramesh Sharma (Agra)</span>
            <span>•</span>
            <span>5 Acres ({language === 'hi' ? 'दोमट मिट्टी' : 'Loamy Soil'})</span>
            <span>•</span>
            <span>{language === 'hi' ? 'वर्तमान फसल: आलू (९२% परिपक्व)' : 'Current: Potato (92% harvest ready)'}</span>
          </div>
        </div>
      </div>

      {/* Visual Ecosystem Architecture Diagram */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{t.ecosystemSub}</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900">
              {t.ecosystemHeading}
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('intelligence')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>{language === 'hi' ? 'इंजन का कार्य देखें' : 'See Engine in Action'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step-by-Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {ecosystemSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all relative ${step.color} ${
                step.highlight ? 'ring-2 ring-emerald-500 shadow-md' : 'shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider opacity-70 mb-2">
                <span>{language === 'hi' ? `चरण ०${idx + 1}` : `Stage 0${idx + 1}`}</span>
                {step.loop && (
                  <span className="flex items-center space-x-1 text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full">
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span>Feedback</span>
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-stone-900 text-base mb-1">{step.label}</h3>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">{step.sub}</p>
            </div>
          ))}
        </div>

        {/* Core Value Quote Callout */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">{t.propositionHeading}</span>
            <blockquote className="text-base sm:text-lg font-black text-stone-900 italic">
              {t.propositionQuote}
            </blockquote>
          </div>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer transition-colors"
          >
            {t.openDashboardBtn}
          </button>
        </div>
      </div>

      {/* 3 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">{t.pillar1Title}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.pillar1Desc}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">{t.pillar2Title}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.pillar2Desc}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose-700" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">{t.pillar3Title}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t.pillar3Desc}
          </p>
        </div>
      </div>
    </div>
  );
};
