import React, { useState, useEffect } from 'react';
import { PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { FarmLogo } from './FarmLogo';
import { 
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
  Zap,
  ShieldAlert,
  Globe,
  Activity,
  CheckCircle2,
  MapPin,
  CloudRain,
  Landmark,
  Wrench,
  Users,
  PhoneCall,
  ArrowUpRight,
  Sun,
  Droplets,
  Scale
} from 'lucide-react';

import fh0 from '../fh0.png';
import fh1 from '../fh1.png';
import fh2 from '../fh2.png';
import fh3 from '../fh3.png';
import fh4 from '../fh4.png';
import fh5 from '../fh5.png';
import fh6 from '../fh6.png';
import fh7 from '../fh7.png';
import fh8 from '../fh8.png';

const HERO_IMAGES = [fh0, fh1, fh2, fh3, fh4, fh5, fh6, fh7, fh8];
const IMAGE_INTERVAL_MS = 850;
const CROSSFADE_DURATION_MS = 300;

interface LandingPageProps {
  setCurrentPage: (page: PageId) => void;
}

const CinematicHeroBackground: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        src="/assets/fh_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Completely neutral dark overlay without any green tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80 backdrop-brightness-95 z-10"></div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage }) => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loopStages = [
    {
      step: '01',
      title: language === 'hi' ? 'बहु-स्रोती डेटा एकीकरण' : 'Multi-Source Data Integration',
      desc: language === 'hi' ? 'मिट्टी परीक्षण (दोमट), उपग्रह NDVI, IMD मौसम अलर्ट व मंडी भाव feeds' : 'Soil test profiles (Loamy, pH 6.8), satellite NDVI, IMD weather feeds & APMC mandis.',
      icon: Database,
      badge: language === 'hi' ? 'डेटा एकीकरण' : 'Multi-Source Data',
      accentColor: 'border-[#5CA8B8]/30 bg-white text-[#063F32]'
    },
    {
      step: '02',
      title: language === 'hi' ? 'निश्चयात्मक विश्लेषण इंजन' : 'Deterministic Analysis Engine',
      desc: language === 'hi' ? 'फसल उपयुक्तता, जलभराव जोखिम, कीट पूर्वानुमान व मांग-आपूर्ति मॉडल' : 'Crop suitability, waterlogging threat calculation, pest forecast & glut risk engine.',
      icon: Cpu,
      badge: language === 'hi' ? 'विश्लेषण' : 'Engine Processing',
      accentColor: 'border-[#087F5B]/30 bg-white text-[#063F32]'
    },
    {
      step: '03',
      title: language === 'hi' ? 'कार्रवाई योग्य निर्णय' : 'Actionable Decision Output',
      desc: language === 'hi' ? 'सटीक कटाई समय, उर्वरक खुराक व इष्टतम बिक्री समय की सिफारिश' : 'Context-aware harvest timing, crop selection, input dosage & offload window.',
      icon: BrainCircuit,
      badge: language === 'hi' ? 'पारदर्शी निर्णय' : 'Actionable Decision',
      accentColor: 'border-[#F2B544]/60 bg-[#F2B544]/5 text-[#063F32]'
    },
    {
      step: '04',
      title: language === 'hi' ? 'प्रत्यक्ष निष्पादन इकोसिस्टम' : 'Direct Execution Ecosystem',
      desc: language === 'hi' ? 'मशीनरी किराया, कटाई मजदूर टोली व सीधे कॉर्पोरेट खरीदार अनुबंध' : 'Equipment rentals, harvest labor gangs & verified direct corporate buyer offload.',
      icon: Zap,
      badge: language === 'hi' ? 'धरातलीय निष्पादन' : 'Direct Action',
      accentColor: 'border-[#E85D5D]/30 bg-white text-[#063F32]'
    },
    {
      step: '05',
      title: language === 'hi' ? 'क्षेत्रीय फीडबैक व संतुलन' : 'Regional Feedback & Rebalancing',
      desc: language === 'hi' ? 'क्षेत्रीय बोआई क्षेत्रफल निगरानी, स्थानीय मंडी मंदी रोकथाम व मूल्य संरक्षण' : 'Aggregate acreage monitoring, local mandi glut prevention & regional price defense.',
      icon: RotateCw,
      badge: language === 'hi' ? 'फीडबैक लूप' : 'Regional Rebalancing',
      accentColor: 'border-[#14A66A]/30 bg-white text-[#063F32]'
    }
  ];

  const modules = [
    {
      title: language === 'hi' ? '🌱 कृषि बुद्धिमत्ता' : 'Farm Intelligence',
      desc: language === 'hi' ? 'मिट्टी उपयुक्तता, मुनाफा पूर्वानुमान, आपूर्ति-मांग संतुलन व जोखिम स्कोरिंग।' : 'Crop suitability, profit estimation, supply-demand balancing & risk scoring.',
      page: 'intelligence' as PageId,
      items: ['Soil Matching', 'Acreage Profit', 'Glut Risk'],
      accentClass: 'border-l-4 border-l-[#14A66A] bg-white'
    },
    {
      title: language === 'hi' ? '<ctrl42> मौसम व आपातकाल' : 'Weather & Emergency',
      desc: language === 'hi' ? 'आपदा चेतावनी, फसल जोखिम मूल्यांकन व त्वरित १-क्लिक राहत निष्पादन।' : 'Weather red alerts, crop risk assessment & immediate emergency dispatch.',
      page: 'emergency' as PageId,
      items: ['Rain Alert', 'Early Harvest', 'SOS Dispatch'],
      accentClass: 'border-l-4 border-l-[#5CA8B8] bg-white'
    },
    {
      title: language === 'hi' ? '📈 मंडी व खरीदार' : 'Markets & Buyers',
      desc: language === 'hi' ? 'एपीएमसी मंडी मॉडल भाव, एमएसपी तुलना व सत्यापित खरीदार अनुबंध।' : 'APMC Mandi prices, MSP comparisons & verified direct offload buyers.',
      page: 'market' as PageId,
      items: ['APMC Mandis', 'Price Trends', 'Direct Buyers'],
      accentClass: 'border-l-4 border-l-[#F2B544] bg-white'
    },
    {
      title: language === 'hi' ? '🧪 फसल स्वास्थ्य व मिट्टी' : 'Crop & Soil Health',
      desc: language === 'hi' ? 'एआई कीट व रोग निदान एवं सटीक उर्वरक खुराक कैलकुलेटर।' : 'AI pest/disease identification & precision soil fertilizer dosage.',
      page: 'agriDoctor' as PageId,
      items: ['AgriDoctor AI', 'Fertilizer Calculator', 'Soil Health'],
      accentClass: 'border-l-4 border-l-[#8B5E3C] bg-white'
    },
    {
      title: language === 'hi' ? '🏦 वित्त व सरकारी योजनाएं' : 'Finance & Schemes',
      desc: language === 'hi' ? 'सरकारी योजना ट्रैकिंग, सब्सिडी कैलकुलेटर व फसल बीमा।' : 'Government scheme tracking, subsidy calculator & crop insurance.',
      page: 'schemes' as PageId,
      items: ['PM-Kisan', 'Fasal Bima', 'Solar Subsidy'],
      accentClass: 'border-l-4 border-l-[#087F5B] bg-white'
    },
    {
      title: language === 'hi' ? '🤝 सेवाएं व समुदाय' : 'Services & Community',
      desc: language === 'hi' ? 'ट्रैक्टर किराया, कटाई मजदूर टोली, कोल्ड स्टोरेज व किसान फोरम।' : 'Machinery rentals, harvest labour gangs, cold storage & farmer forum.',
      page: 'services' as PageId,
      items: ['Tractor Rental', 'Labour Gangs', 'Farmer Forum'],
      accentClass: 'border-l-4 border-l-[#063F32] bg-white'
    }
  ];

  return (
    <div className="w-full font-sans bg-[#F5F7F2] text-stone-900 selection:bg-[#14A66A] selection:text-white">
      {/* ============================================================ */}
      {/* 1. CINEMATIC AGRICULTURAL HERO SECTION WITH IMAGE LOOP */}
      {/* ============================================================ */}
      <section className="relative min-h-[88vh] lg:min-h-screen flex flex-col justify-between bg-stone-950 text-white overflow-hidden">
        {/* Dynamic 9-Image Cinematic Background Loop (850ms interval) */}
        <CinematicHeroBackground />

        {/* Floating Transparent Dedicated Landing Navigation (Compact ~70px height) */}
        <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <FarmLogo size="lg" className="group-hover:scale-105 transition-transform" />
            <div className="hidden sm:block border-l border-white/25 pl-3">
              <p className="text-[10px] font-bold text-stone-200 uppercase tracking-widest leading-none">
                {language === 'hi' ? 'कृषि निर्णय प्रणाली' : 'DECISION ENGINE'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Options */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6 text-xs font-bold uppercase tracking-wider text-white/90">
            <button 
              onClick={() => setCurrentPage('dashboard')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'डैशबोर्ड' : 'DASHBOARD'}
            </button>
            <button 
              onClick={() => setCurrentPage('profile')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'प्रोफाइल' : 'PROFILE'}
            </button>
            <button 
              onClick={() => setCurrentPage('intelligence')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'बुद्धिमत्ता' : 'INTELLIGENCE'}
            </button>
            <button 
              onClick={() => setCurrentPage('market')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'मंडी' : 'MARKET'}
            </button>
            <button 
              onClick={() => setCurrentPage('emergency')} 
              className="hover:text-white transition-colors cursor-pointer text-rose-300 hover:text-rose-100"
            >
              {language === 'hi' ? 'आपातकाल' : 'EMERGENCY'}
            </button>
            <button 
              onClick={() => setCurrentPage('assistant')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'एआई सहायक' : 'AI ASSISTANT'}
            </button>
          </nav>

          {/* Language Toggle & Transparent Primary CTA Button */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-md">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={() => setCurrentPage('intelligence')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-transparent hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40 backdrop-blur-xs"
            >
              <span>{language === 'hi' ? 'खेत विश्लेषण' : 'ANALYZE MY FARM'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </header>

        {/* Hero Main Centered Content */}
        <div className="relative z-20 max-w-[980px] w-full mx-auto px-4 sm:px-8 py-12 lg:py-20 flex flex-col items-center justify-center text-center space-y-7 my-auto">
          {/* Transparent Capsule Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-transparent border border-white/30 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur-xs shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>
              {language === 'hi' ? 'एकीकृत कृषि बुद्धिमत्ता एवं निष्पादन प्लेटफॉर्म' : 'UNIFIED AGRICULTURAL INTELLIGENCE & ACTION PLATFORM'}
            </span>
          </div>

          {/* TWO-LINE RESTRAINED HERO HEADLINE IN PURE WHITE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black uppercase tracking-tight text-white leading-[1.0] font-['Montserrat',sans-serif] drop-shadow-2xl">
            {language === 'hi' ? (
              <>
                खेत के आंकड़ों से<br />
                बेहतर निर्णयों तक
              </>
            ) : (
              <>
                FROM FARM DATA<br />
                TO BETTER DECISIONS
              </>
            )}
          </h1>

          {/* SINGLE SHORT SUPPORTING SENTENCE */}
          <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-[650px] font-sans drop-shadow-md">
            {language === 'hi'
              ? 'मिट्टी, मौसम, मंडी और जोखिम को एक एकीकृत कृषि निर्णय प्रणाली में जोड़ें।'
              : 'Connect soil, weather, markets and risk into one agricultural decision system.'}
          </p>

          {/* TRANSPARENT PRIMARY CTA */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={() => setCurrentPage('intelligence')}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-transparent hover:bg-white/10 text-white font-black text-sm uppercase tracking-wider shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/40 backdrop-blur-sm"
            >
              <span>{language === 'hi' ? 'खेत का विश्लेषण करें' : 'ANALYZE MY FARM'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* SUBTLE SINGLE-LINE DEMO PERSONA STRIP */}
          <div className="pt-5 max-w-md w-full border-t border-white/10 text-[11px] text-white/80 font-medium tracking-wide">
            {language === 'hi' ? (
              <span>LIVE DEMO · रमेश शर्मा · आगरा · ५ एकड़ · आलू · ९२% परिपक्व</span>
            ) : (
              <span>LIVE DEMO · Ramesh Sharma · Agra · 5 Acres · Potato · 92% Ready</span>
            )}
          </div>
        </div>

        {/* Spacious Bottom Padding */}
        <div className="pb-6"></div>
      </section>

      {/* ============================================================ */}
      {/* 2. CLOSED-LOOP ARCHITECTURE SECTION (5 CARDS) */}
      {/* ============================================================ */}
      <section id="architecture" className="py-20 px-4 sm:px-8 lg:px-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/30 text-xs font-black uppercase tracking-wider text-[#087F5B]">
              <Layers className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>{language === 'hi' ? 'निर्णय आर्किटेक्चर' : 'CLOSED-LOOP ARCHITECTURE'}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#063F32] font-['Montserrat',sans-serif]">
              {language === 'hi' ? '५-चरणीय बंद-लूप निर्णय प्रणाली' : '5-STAGE CLOSED-LOOP DECISION SYSTEM'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t.loopDesc}
            </p>
          </div>

          {/* 5-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {loopStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-3xl border ${stage.accentColor} flex flex-col justify-between space-y-4 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#063F32] text-[#F2B544] shadow-xs font-mono">
                      {stage.step}
                    </span>
                    <Icon className="w-5 h-5 text-[#087F5B] group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-[#063F32] text-sm leading-snug font-['Outfit',sans-serif]">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-[#087F5B]">
                      {stage.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentPage('intelligence')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#063F32] hover:bg-[#087F5B] text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>{language === 'hi' ? 'निर्णय इंजन चलाएं' : 'RUN DECISION ENGINE NOW'}</span>
              <ChevronRight className="w-4 h-4 text-[#F2B544]" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PARADIGM SHIFT SECTION (DARK GREEN DEEP FOREST) */}
      {/* ============================================================ */}
      <section id="paradigm" className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-[#063F32] via-[#087F5B] to-[#042A21] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F2B544]/20 border border-[#F2B544]/50 text-xs font-black uppercase tracking-wider text-[#F2B544]">
              <Scale className="w-3.5 h-3.5 text-[#F2B544]" />
              <span>{language === 'hi' ? 'वैचारिक अंतर' : 'THE CORE DISTINCTION'}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-['Montserrat',sans-serif]">
              {t.infoVsDecisionTitle}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {language === 'hi'
                ? 'पारंपरिक पोर्टल केवल अलग-अलग डेटा दिखाते हैं। फार्महब आपके खेत के संदर्भ में निर्णय देता है।'
                : 'Traditional portals leave farmers with raw charts. FarmHub transforms data into contextual, executable decisions.'}
            </p>
          </div>

          {/* 2 Glassmorphism Translucent Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Traditional Disconnected Info */}
            <div className="bg-white/5 backdrop-blur-md border border-rose-500/30 p-8 rounded-3xl space-y-5 hover:border-rose-500/50 transition-colors shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
                  {t.traditionalLabel}
                </span>
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                {language === 'hi' ? 'स्थिर डेटा सूचना का अंबार' : 'Static Information Overflow'}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {t.traditionalDesc}
              </p>

              <div className="p-4 bg-rose-950/40 border border-rose-800/40 rounded-2xl text-xs text-rose-200 font-mono space-y-1">
                <div className="font-bold text-rose-300">DISCONNECTED PIPELINE:</div>
                <div>Weather Chart ➔ Mandi Price List ➔ Generic Articles (No Context or Action)</div>
              </div>
            </div>

            {/* Right: FarmHub Closed-Loop Intelligence */}
            <div className="bg-[#087F5B]/30 backdrop-blur-md border border-[#F2B544]/60 p-8 rounded-3xl space-y-5 hover:border-[#F2B544] transition-colors shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#F2B544] bg-[#063F32] px-3 py-1 rounded-full border border-[#F2B544]/40">
                  {t.farmhubMethodLabel}
                </span>
                <span className="w-3 h-3 rounded-full bg-[#F2B544] animate-ping"></span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                {language === 'hi' ? 'एकीकृत बंद-लूप निर्णय प्रणाली' : 'Integrated Closed-Loop Decision Engine'}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                {t.farmhubMethodDesc}
              </p>

              <div className="p-4 bg-[#063F32]/90 border border-[#F2B544]/50 rounded-2xl text-xs text-emerald-100 font-mono space-y-1 shadow-inner">
                <div className="font-bold text-[#F2B544]">CLOSED-LOOP EXECUTION:</div>
                <div>Farm Context + Weather Threat + Market Buyers ➔ 1-Click Harvest & Direct Buyer Offload</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. AGRA DEMO SCENARIO (PHOTOGRAPHIC BREAK) */}
      {/* ============================================================ */}
      <section id="scenario" className="relative py-24 px-4 sm:px-8 lg:px-16 bg-stone-950 text-white overflow-hidden">
        {/* Background Image & Storm Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/storm_farmland.png')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-950/95 backdrop-brightness-75"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          {/* Scenario Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F2B544]/20 border border-[#F2B544]/50 text-xs font-black uppercase tracking-wider text-[#F2B544]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#F2B544]" />
                <span>{language === 'hi' ? 'नियंत्रित डेमो केस स्टडी' : 'CONTROLLED DEMO SCENARIO'}</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-['Montserrat',sans-serif]">
                {language === 'hi' ? 'रमेश शर्मा — ५ एकड़ आलू खेत (आगरा)' : 'RAMESH SHARMA — 5 ACRE POTATO FARM (AGRA)'}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 max-w-2xl font-normal">
                {t.scenarioDesc}
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('emergency')}
              className="px-6 py-3.5 rounded-xl bg-[#E85D5D] hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer whitespace-nowrap border border-rose-400/40 hover:scale-105"
            >
              {language === 'hi' ? 'लाइव आपातकालीन योजना देखें →' : 'TRIGGER RAIN EMERGENCY DEMO →'}
            </button>
          </div>

          {/* 4-Stage Visual Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl space-y-3 hover:bg-white/15 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F2B544] font-mono">01 • SIGNAL</span>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                {language === 'hi' ? 'भारी बारिश चेतावनी' : '85mm Rain Forecast'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.scenarioStep1}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl space-y-3 hover:bg-white/15 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F2B544] font-mono">02 • ANALYSIS</span>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                {language === 'hi' ? 'जलभराव व सड़न जोखिम' : 'Waterlogging Threat'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.scenarioStep2}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-[#14A66A]/60 p-6 rounded-3xl space-y-3 hover:bg-white/15 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">03 • DECISION</span>
              <h3 className="text-lg font-bold text-emerald-300 font-['Outfit',sans-serif]">
                {language === 'hi' ? 'शीघ्र कटाई निर्णय' : 'Early Harvest Command'}
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t.scenarioStep3}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl space-y-3 hover:bg-white/15 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F2B544] font-mono">04 • ACTION</span>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                {language === 'hi' ? 'मशीनरी व खरीदार अनुबंध' : '1-Click Buyer Contract'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.scenarioStep4}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CAPABILITY ECOSYSTEM GRID (6 CARDS) */}
      {/* ============================================================ */}
      <section id="ecosystem" className="py-20 px-4 sm:px-8 lg:px-16 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/30 text-xs font-black uppercase tracking-wider text-[#087F5B]">
              <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>{language === 'hi' ? 'इकोसिस्टम क्षमताएं' : 'INTEGRATED ECOSYSTEM'}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#063F32] font-['Montserrat',sans-serif]">
              {t.modulesTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t.modulesSub}
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border border-stone-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group ${mod.accentClass} hover:-translate-y-1`}
              >
                <div className="space-y-3">
                  <h3 className="font-black text-xl text-[#063F32] group-hover:text-[#087F5B] transition-colors font-['Outfit',sans-serif]">
                    {mod.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {mod.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-stone-100">
                  <div className="flex flex-wrap gap-1.5">
                    {mod.items.map((item, i) => (
                      <span key={i} className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#F5F7F2] text-[#063F32] border border-[#087F5B]/20">
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(mod.page)}
                    className="w-full py-3 rounded-xl bg-[#F5F7F2] hover:bg-[#063F32] hover:text-white text-[#063F32] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 border border-[#087F5B]/25 group-hover:border-[#063F32]"
                  >
                    <span>{language === 'hi' ? 'क्षमता खोलें' : 'EXPLORE CAPABILITY'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DARK BRANDED FOOTER */}
      {/* ============================================================ */}
      <footer className="bg-[#063F32] text-stone-300 text-xs border-t-4 border-[#F2B544] py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#087F5B]/40">
            {/* Brand Column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center text-white">
                <FarmLogo size="lg" />
              </div>
              <p className="text-stone-300 text-xs leading-relaxed font-normal">
                {language === 'hi'
                  ? 'फार्महब कृषि आंकड़ों, मौसम बुद्धिमत्ता व मंडियों को जोड़कर किसानों को सही निर्णय लेने में सक्षम बनाता है।'
                  : 'FarmHub connects agricultural data, intelligence, services, and markets to help farmers make better decisions.'}
              </p>
            </div>

            {/* Agra Region Details */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Outfit',sans-serif]">
                {language === 'hi' ? 'आगरा पायलट क्षेत्र' : 'AGRA PILOT REGION'}
              </h4>
              <p className="text-stone-400 text-xs leading-relaxed font-normal">
                {language === 'hi'
                  ? 'आगरा, खंडौली, फतेहाबाद और बिचपुरी ब्लॉकों के लिए विशेष रूप से संरचित। एपीएमसी मंडी मॉडल भावों से सत्यापित।'
                  : 'Configured for Agra, Khandauli, Fatehabad, and Bichpuri blocks. Validated with local APMC market price indices.'}
              </p>
            </div>

            {/* Navigation Quick Links */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Outfit',sans-serif]">
                {language === 'hi' ? 'नेविगेशन' : 'DECISION JOURNEY'}
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-stone-300">
                <button onClick={() => setCurrentPage('dashboard')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navDashboard}</button>
                <button onClick={() => setCurrentPage('intelligence')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navIntelligence}</button>
                <button onClick={() => setCurrentPage('market')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navMarket}</button>
                <button onClick={() => setCurrentPage('emergency')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navEmergency}</button>
                <button onClick={() => setCurrentPage('assistant')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navAssistant}</button>
                <button onClick={() => setCurrentPage('schemes')} className="text-left hover:text-[#F2B544] cursor-pointer">{t.navSchemes}</button>
              </div>
            </div>

            {/* Kisan Hotline & Disclaimer */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Outfit',sans-serif]">
                {language === 'hi' ? 'किसान आपातकालीन हेल्पलाइन' : 'KISAN EMERGENCY HOTLINE'}
              </h4>
              <div className="p-3 bg-[#042A21] border border-[#14A66A]/30 rounded-xl space-y-1">
                <div className="flex items-center space-x-2 text-[#F2B544]">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-sm font-mono">1800-180-1551</span>
                </div>
                <div className="text-[10px] text-stone-400">
                  {language === 'hi' ? 'राष्ट्रीय किसान कॉल सेंटर (टोल फ्री २४x७)' : 'National Kisan Call Centre (Toll Free 24x7)'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2 font-mono">
            <div>
              © 2026 FarmHub — {language === 'hi' ? 'एकीकृत कृषि इकोसिस्टम प्रोटोटाइप।' : 'Unified Agricultural Ecosystem Prototype.'}
            </div>
            <div>
              {language === 'hi' ? 'डेटा: आगरा कृषि बुद्धिमत्ता एवं ICAR वैज्ञानिक मानक' : 'Data: Synthetic & ICAR-grounded Agra Agricultural Intelligence'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
