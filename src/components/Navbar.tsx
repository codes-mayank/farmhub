import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  MapPin, 
  TrendingUp, 
  ShoppingBag, 
  Stethoscope, 
  FlaskConical, 
  Wallet, 
  Landmark, 
  Sun, 
  CloudRain, 
  Bell, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { NavigationTab, WeatherData } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  weather: WeatherData;
  farmerName: string;
  farmLocation: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  weather,
  farmerName,
  farmLocation
}) => {
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState('English');

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'fields', label: 'My Fields', icon: MapPin },
    { id: 'mandi', label: 'Mandi Rates', icon: TrendingUp },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'doctor', label: 'Agri Doctor', icon: Stethoscope },
    { id: 'fertilizer', label: 'Soil & Fertilizer', icon: FlaskConical },
    { id: 'finance', label: 'Finances', icon: Wallet },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner with Weather & Alerts */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-medium">
              Agro Advisory
            </span>
            <span className="truncate max-w-md sm:max-w-xl text-emerald-200 font-normal">
              {weather.advisory.substring(0, 110)}...
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-medium text-emerald-100">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{weather.city}: <strong>{weather.temperature}°C</strong> ({weather.condition})</span>
              <span className="text-emerald-400">|</span>
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>Rain: {weather.rainfallProbability}%</span>
            </div>
            
            {/* Language toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white text-stone-800 rounded-md shadow-lg border border-stone-200 py-1 z-50">
                  {['English', 'हिन्दी', 'ਪੰਜਾਬੀ', 'ગુજરાતી'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowLanguageMenu(false);
                      }}
                      className="w-full text-left px-3 py-1 text-xs hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                    >
                      {lang}
                      {selectedLang === lang && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-stone-900 font-sans">
                  Farm<span className="text-emerald-600">Hub</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Agri Suite
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium -mt-0.5">{farmLocation}</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Farmer Profile & Notifications */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setActiveTab('doctor')} 
                title="Notifications & Alerts"
                className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors relative cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
              </button>
            </div>

            <div className="flex items-center space-x-2.5 pl-2 border-l border-stone-200">
              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs">
                MA
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900">{farmerName}</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>11.2 Acres Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Sub-nav on medium & mobile screens */}
        <div className="xl:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-stone-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
