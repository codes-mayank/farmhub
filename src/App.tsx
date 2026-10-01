import React, { useState, useEffect } from 'react';
import { PageId, FarmProfileData } from './types/farmhub';
import { DEFAULT_FARM_PROFILE } from './data/centralData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FarmProvider } from './context/FarmContext';
import { HeaderNav } from './components/HeaderNav';
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { FarmProfile } from './components/FarmProfile';
import { FarmIntelligence } from './components/FarmIntelligence';
import { MarketPage } from './components/MarketPage';
import { EmergencyPage } from './components/EmergencyPage';
import { AIAssistant } from './components/AIAssistant';
import { SchemesPage } from './components/SchemesPage';
import { ServicesPage } from './components/ServicesPage';
import { CommunityPage } from './components/CommunityPage';
import { SeekhoPage } from './components/SeekhoPage';
import { AgriDoctor } from './components/AgriDoctor';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { FieldManagement } from './components/FieldManagement';
import { FinanceTracker } from './components/FinanceTracker';
import { Marketplace } from './components/Marketplace';
import { MandiPrices } from './components/MandiPrices';
import { Sprout } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const { language, t } = useLanguage();
  
  // Persistent farm profile with default Agra 5-acre baseline
  const [farmProfile, setFarmProfile] = useState<FarmProfileData>(() => {
    const saved = localStorage.getItem('farmhub_profile');
    return saved ? JSON.parse(saved) : DEFAULT_FARM_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('farmhub_profile', JSON.stringify(farmProfile));
  }, [farmProfile]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navigation Bar */}
      <HeaderNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        farmerName={farmProfile.farmerName}
        location={farmProfile.location}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentPage === 'landing' && (
          <LandingPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'dashboard' && (
          <FarmerDashboard
            farmProfile={farmProfile}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'profile' && (
          <FarmProfile
            farmProfile={farmProfile}
            setFarmProfile={setFarmProfile}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'intelligence' && (
          <FarmIntelligence farmProfile={farmProfile} />
        )}

        {currentPage === 'market' && (
          <MarketPage
            farmProfile={farmProfile}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'emergency' && (
          <EmergencyPage 
            farmProfile={farmProfile}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'assistant' && (
          <AIAssistant 
            farmProfile={farmProfile}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'schemes' && (
          <SchemesPage farmProfile={farmProfile} />
        )}

        {currentPage === 'services' && (
          <ServicesPage />
        )}

        {currentPage === 'community' && (
          <CommunityPage />
        )}

        {currentPage === 'seekho' && (
          <SeekhoPage />
        )}

        {currentPage === 'agriDoctor' && (
          <AgriDoctor farmProfile={farmProfile} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'fertilizer' && (
          <FertilizerCalculator farmProfile={farmProfile} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'fieldManagement' && (
          <FieldManagement farmProfile={farmProfile} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'finance' && (
          <FinanceTracker farmProfile={farmProfile} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'marketplace' && (
          <Marketplace farmProfile={farmProfile} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'mandi' && (
          <MandiPrices setCurrentPage={setCurrentPage} />
        )}
      </main>

      {/* Global Hackathon Demo Sticky Floating Switcher */}
      <div className="sticky bottom-4 z-40 max-w-4xl mx-auto px-4 w-full pointer-events-none">
        <div className="bg-stone-900/90 backdrop-blur-md text-white rounded-2xl p-2.5 px-4 shadow-xl border border-stone-700/60 flex items-center justify-between text-xs pointer-events-auto">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-extrabold text-[11px] uppercase tracking-wider text-emerald-300">
              {language === 'hi' ? 'डेमो यात्रा:' : 'Demo Journey:'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'landing' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              1. {language === 'hi' ? 'शुरुआत' : 'Landing'}
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              2. {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'profile' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              3. {language === 'hi' ? 'प्रोफाइल' : 'Profile'}
            </button>
            <button
              onClick={() => setCurrentPage('intelligence')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'intelligence' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              4. {language === 'hi' ? 'बुद्धिमत्ता' : 'Intelligence'}
            </button>
            <button
              onClick={() => setCurrentPage('market')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'market' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              5. {language === 'hi' ? 'मंडी' : 'Market'}
            </button>
            <button
              onClick={() => setCurrentPage('emergency')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'emergency' ? 'bg-rose-600 text-white' : 'text-rose-300 hover:text-white'
              }`}
            >
              6. {language === 'hi' ? 'आपातकाल' : 'Emergency'}
            </button>
            <button
              onClick={() => setCurrentPage('assistant')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                currentPage === 'assistant' ? 'bg-indigo-600 text-white' : 'text-indigo-300 hover:text-white'
              }`}
            >
              7. {language === 'hi' ? 'एआई सहायक' : 'AI Assistant'}
            </button>
          </div>
        </div>
      </div>

      {/* Global Ecosystem Footer */}
      <footer className="mt-12 bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-stone-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Sprout className="w-4 h-4" />
                </div>
                <span>Farm<span className="text-emerald-500">Hub</span></span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                {language === 'hi' ? 'आगरा पायलट क्षेत्र' : 'Agra Pilot Region'}
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                {language === 'hi' 
                  ? 'आगरा, खंडौली, फतेहाबाद और बिचपुरी ब्लॉकों के लिए विशेष रूप से संरचित। स्थानीय एपीएमसी मंडी मॉडल भाव सूचकांकों से सत्यापित।'
                  : 'Configured for Agra, Khandauli, Fatehabad, and Bichpuri blocks. Validated with local APMC market price indices.'}
              </p>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                {language === 'hi' ? 'निर्णय यात्रा' : 'Decision Journey'}
              </div>
              <div className="grid grid-cols-2 gap-1 text-stone-400">
                <button onClick={() => setCurrentPage('dashboard')} className="text-left hover:text-white cursor-pointer">{t.navDashboard}</button>
                <button onClick={() => setCurrentPage('intelligence')} className="text-left hover:text-white cursor-pointer">{t.navIntelligence}</button>
                <button onClick={() => setCurrentPage('market')} className="text-left hover:text-white cursor-pointer">{t.navMarket}</button>
                <button onClick={() => setCurrentPage('emergency')} className="text-left hover:text-white cursor-pointer">{t.navEmergency}</button>
                <button onClick={() => setCurrentPage('assistant')} className="text-left hover:text-white cursor-pointer">{t.navAssistant}</button>
                <button onClick={() => setCurrentPage('schemes')} className="text-left hover:text-white cursor-pointer">{t.navSchemes}</button>
              </div>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                {language === 'hi' ? 'किसान आपातकालीन हेल्पलाइन' : 'Farmer Emergency Hotline'}
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                {language === 'hi' ? 'राष्ट्रीय किसान कॉल सेंटर:' : 'National Kisan Call Centre:'} <strong className="text-emerald-400">1800-180-1551</strong> ({language === 'hi' ? 'टोल फ्री २४x७' : 'Toll Free 24x7'})
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
            <div>
              © 2026 FarmHub — {language === 'hi' ? 'एकीकृत कृषि इकोसिस्टम प्रोटोटाइप।' : 'Unified Agricultural Ecosystem Prototype. Built for Hackathon Demo.'}
            </div>
            <div>
              {language === 'hi' ? 'डेटा: आगरा कृषि बुद्धिमत्ता एवं आईसीएआर वैज्ञानिक मानक' : 'Data: Synthetic & ICAR-grounded Agra Agricultural Intelligence'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <FarmProvider>
        <AppContent />
      </FarmProvider>
    </LanguageProvider>
  );
};

export default App;
