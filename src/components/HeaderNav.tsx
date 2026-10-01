import React from 'react';
import { PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { FarmLogo } from './FarmLogo';
import { 
  LayoutDashboard, 
  MapPin, 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Bot, 
  Landmark, 
  Wrench, 
  Users, 
  GraduationCap,
  Sparkles,
  Globe,
  Check
} from 'lucide-react';

interface HeaderNavProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  farmerName: string;
  location: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  setCurrentPage,
  farmerName,
  location
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }>; badge?: string; emergency?: boolean }[] = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.navProfile, icon: MapPin },
    { id: 'intelligence', label: t.navIntelligence, icon: BrainCircuit, badge: 'Core' },
    { id: 'market', label: t.navMarket, icon: TrendingUp },
    { id: 'emergency', label: t.navEmergency, icon: AlertTriangle, emergency: true },
    { id: 'assistant', label: t.navAssistant, icon: Bot, badge: 'AI' },
    { id: 'schemes', label: t.navSchemes, icon: Landmark },
    { id: 'services', label: t.navServices, icon: Wrench },
    { id: 'community', label: t.navCommunity, icon: Users },
    { id: 'seekho', label: t.navSeekho, icon: GraduationCap }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F5F7F2]/90 backdrop-blur-md border-b border-[#087F5B]/15 shadow-xs">
      {/* Top Banner with Demo Context & Language Switcher */}
      <div className="bg-[#063F32] text-stone-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#087F5B] text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
              {language === 'hi' ? 'आगरा पायलट डेमो' : 'Agra Pilot Demo'}
            </span>
            <span className="text-emerald-100/90 text-xs font-medium truncate">
              {t.demoFarmerLabel}: <strong className="text-white">{farmerName}</strong> • {location} • 5 Acres ({language === 'hi' ? 'दोमट मिट्टी / सिंचित' : 'Loamy Soil / Irrigated'})
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setCurrentPage('emergency')}
              className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#E85D5D] text-white font-bold text-[11px] animate-pulse hover:bg-rose-600 cursor-pointer transition-colors shadow-xs"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{t.emergencyWarningTicker}</span>
            </button>

            {/* Language Toggle Capsule */}
            <div className="flex items-center bg-[#063F32]/80 rounded-full p-0.5 border border-[#14A66A]/40 shadow-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#F2B544] text-[#063F32] shadow-xs'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#F2B544] text-[#063F32] shadow-xs'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center space-x-3 cursor-pointer group py-1"
          >
            <FarmLogo size="md" className="group-hover:scale-105 transition-transform" />
            <div className="hidden sm:flex flex-col justify-center border-l border-emerald-900/20 dark:border-emerald-500/20 pl-2.5">
              <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-[#F2B544]/20 text-[#8B5E3C] border border-[#F2B544]/40 w-max">
                {language === 'hi' ? 'इकोसिस्टम' : 'Ecosystem'}
              </span>
              <p className="text-[10px] text-[#087F5B] dark:text-emerald-400 font-semibold mt-0.5 whitespace-nowrap">
                {language === 'hi' ? 'कृषि निर्णय प्रणाली' : 'Agricultural Decision Engine'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/30 shadow-xs'
                      : item.emergency
                      ? 'text-rose-700 hover:bg-rose-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive ? 'text-emerald-700' : item.emergency ? 'text-rose-600' : 'text-stone-500'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded font-extrabold uppercase bg-emerald-600 text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.emergency && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action, Language & Profile Avatar */}
          <div className="flex items-center space-x-2">
            
            {/* Prominent Language Button for easy access on any screen */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <button
              onClick={() => setCurrentPage('intelligence')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.navAnalyzeBtn}</span>
            </button>

            <button
              onClick={() => setCurrentPage('profile')}
              className="flex items-center space-x-2 pl-1 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs border border-emerald-300">
                RS
              </div>
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Subnav for Mobile/Tablet */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-stone-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : item.emergency
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
