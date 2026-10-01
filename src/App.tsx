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

import { FarmLogo } from './components/FarmLogo';

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
    <div className="min-h-screen bg-[#F5F7F2] flex flex-col font-sans selection:bg-[#14A66A] selection:text-white">
      {/* Top Main Navigation Bar */}
      {currentPage !== 'landing' && (
        <HeaderNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          farmerName={farmProfile.farmerName}
          location={farmProfile.location}
        />
      )}

      {/* Main Content Area */}
      <main className={currentPage === 'landing' ? 'flex-1 w-full overflow-hidden' : 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6'}>
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



      {/* Global Ecosystem Footer */}
      {currentPage !== 'landing' && (
        <footer className="mt-12 bg-[#063F32] text-stone-300 text-xs border-t border-[#087F5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-[#087F5B]/30">
            <div className="space-y-3">
              <div className="flex items-center text-white font-bold text-base">
                <FarmLogo size="md" />
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">
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
      )}
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
