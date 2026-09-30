import React, { useState } from 'react';
import { EmergencyActionItem, FarmProfileData, PageId } from '../types/farmhub';
import { EMERGENCY_SCENARIO, EMERGENCY_PROVIDERS } from '../data/centralData';
import { AUTHORITATIVE_DEMO_SCENARIO } from '../data/demoScenario';
import { useLanguage } from '../context/LanguageContext';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Tractor, 
  Users, 
  Warehouse, 
  Truck, 
  ShoppingBag, 
  Phone, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles,
  X,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Info,
  Calendar,
  Layers,
  HelpCircle,
  Zap,
  Activity
} from 'lucide-react';

interface EmergencyPageProps {
  farmProfile: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ farmProfile, setCurrentPage }) => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Machinery' | 'Labour' | 'Storage' | 'Transport' | 'Buyer'>('All');
  const [selectedProvider, setSelectedProvider] = useState<EmergencyActionItem | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [demoActionToast, setDemoActionToast] = useState<string | null>(null);

  const [contactName, setContactName] = useState(farmProfile.farmerName);
  const [contactPhone, setContactPhone] = useState('+91 98370 22119');
  const [urgencyNote, setUrgencyNote] = useState(language === 'hi' 
    ? '५ एकड़ आलू कटाई हेतु ३६ घंटे में बारिश से पूर्व तुरंत तैनाती आवश्यक।' 
    : 'Need immediate deployment before rain hits in 36 hours for 5 acres potato.');

  const filteredProviders = activeFilter === 'All' 
    ? EMERGENCY_PROVIDERS 
    : EMERGENCY_PROVIDERS.filter(p => p.type === activeFilter);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedProvider(null);
    }, 3000);
  };

  const handleQuickDemoAction = (actionTitle: string) => {
    setDemoActionToast(language === 'hi'
      ? `डेमो कार्य निर्मित: "${actionTitle}"। संसाधन समन्वय अनुरोध तैयार है।`
      : `Demo Action Created: "${actionTitle}". Resource coordination request queued.`);
    setTimeout(() => setDemoActionToast(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification for Demo Actions */}
      {demoActionToast && (
        <div className="p-4 bg-emerald-900 text-white border border-emerald-500 rounded-2xl text-xs flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="block text-emerald-300 font-extrabold">{t.demoActionCreatedTitle}</strong>
              <span>{demoActionToast}</span>
            </div>
          </div>
          <button onClick={() => setDemoActionToast(null)} className="text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Critical Emergency Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-rose-600/60 relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-700 text-white text-xs font-black uppercase tracking-wider animate-pulse">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>
              {language === 'hi' 
                ? 'तत्काल कार्रवाई आवश्यक (अगले ३६-४८ घंटे)' 
                : EMERGENCY_SCENARIO.urgency}
            </span>
          </span>
          <span className="text-xs font-bold text-rose-200 bg-rose-900/80 px-3 py-1 rounded-full border border-rose-700">
            {t.demoScenarioNotice}
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t.emergencyBannerTitle}
          </h1>
          <p className="text-sm sm:text-base text-rose-100 font-medium max-w-3xl leading-relaxed">
            {t.emergencyForecastText}
          </p>
        </div>

        {/* Affected Crop Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-rose-900/60 p-4 rounded-2xl border border-rose-700/60 text-xs">
          <div>
            <span className="text-[10px] text-rose-300 block font-medium">
              {language === 'hi' ? 'जोखिम में खड़ी फसल' : 'Vulnerable Crop'}
            </span>
            <span className="text-base font-black text-white">
              {farmProfile.currentCrop} ({farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'})
            </span>
          </div>
          <div>
            <span className="text-[10px] text-rose-300 block font-medium">
              {language === 'hi' ? 'परिपक्वता स्तर' : 'Harvest Readiness'}
            </span>
            <span className="text-base font-black text-amber-300">
              {farmProfile.harvestReadinessPercent}% {language === 'hi' ? 'तैयार' : 'Mature'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-rose-300 block font-medium">
              {language === 'hi' ? 'मौसम जोखिम' : 'Weather Risk'}
            </span>
            <span className="text-base font-black text-rose-300">
              {language === 'hi' ? 'उच्च (८५ मिमी बारिश)' : 'CRITICAL (85mm Rain)'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-rose-300 block font-medium">
              {language === 'hi' ? 'सुरक्षित समय खिड़की' : 'Action Window'}
            </span>
            <span className="text-base font-black text-white">
              {language === 'hi' ? 'अगले ३६ घंटे' : 'Next 36 Hours'}
            </span>
          </div>
        </div>

        {/* Financial Loss Exposure vs Protected Margin */}
        <div className="p-4 bg-white/10 rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-amber-300 shrink-0" />
            <div>
              <strong className="block text-amber-200 font-extrabold">{t.financialRiskTitle}</strong>
              <span className="text-rose-100">{t.financialRiskDesc}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. RISK TO IMPACT PIPELINE */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-black text-stone-900">{t.riskImpactTitle}</h2>
          </div>
          <span className="text-xs text-stone-400 font-semibold">{farmProfile.location}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
            <span className="font-extrabold text-rose-900 block">{language === 'hi' ? '१. बेमौसम भारी बारिश' : '1. Heavy Rain Event'}</span>
            <span className="text-[11px] text-rose-700">85mm Forecast</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
            <span className="font-extrabold text-rose-900 block">{language === 'hi' ? '२. खेत में जलभराव' : '2. Waterlogging'}</span>
            <span className="text-[11px] text-rose-700">&gt;24 Hrs Saturated</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <span className="font-extrabold text-amber-900 block">{language === 'hi' ? '३. कटाई में रुकावट' : '3. Harvest Delay'}</span>
            <span className="text-[11px] text-amber-700">Tractor Mud Lock</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <span className="font-extrabold text-amber-900 block">{language === 'hi' ? '४. कंद सड़न जोखिम' : '4. Soft Rot Infection'}</span>
            <span className="text-[11px] text-amber-700">Erwinia Spoilage</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block">{language === 'hi' ? '५. सुरक्षित पूर्व कटाई' : '5. Saved Revenue'}</span>
            <span className="text-[11px] text-emerald-700">100% Value Retained</span>
          </div>
        </div>
      </div>

      {/* 2. CHRONOLOGICAL TIMELINE */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{t.timelineTitle}</span>
          </div>
          <p className="text-xs text-stone-500">
            {t.timelineSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50 border-l-4 border-l-rose-600 border border-stone-200 space-y-1.5">
            <div className="flex justify-between items-center text-rose-800 font-black">
              <span>{language === 'hi' ? 'वर्तमान (०-६ घंटे)' : 'NOW (0–6 Hours)'}</span>
              <span className="px-2 py-0.5 rounded-md bg-rose-200 text-[10px] uppercase">{t.doNowLabel.split(' ')[0]}</span>
            </div>
            <p className="text-stone-700 text-[11px]">
              {language === 'hi'
                ? '२ ट्रैक्टर आलू डिगर व १० मजदूरों का दल बुक करें। मिट्टी सूखने के दौरान ऊपरी हिस्से की खुदाई शुरू करें।'
                : 'Mobilize 2 tractor potato diggers & 10 pickers while topsoil remains firm.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-l-amber-500 border border-stone-200 space-y-1.5">
            <div className="flex justify-between items-center text-amber-800 font-black">
              <span>{language === 'hi' ? 'अगले (६-१८ घंटे)' : 'NEXT (6–18 Hours)'}</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-200 text-[10px] uppercase">{t.prepareLabel.split(' ')[0]}</span>
            </div>
            <p className="text-stone-700 text-[11px]">
              {language === 'hi'
                ? 'बोरी सिलाई पूरी करें और सीधे खरीदार (पेप्सिको ट्रक) को खेत के गेट पर लोडिंग हेतु कॉल करें।'
                : 'Complete bagging and direct Eicher tarpaulin truck loading for spot fieldgate offloading.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border-l-4 border-l-sky-500 border border-stone-200 space-y-1.5">
            <div className="flex justify-between items-center text-sky-800 font-black">
              <span>{language === 'hi' ? 'विंडो (१८-३६ घंटे)' : 'WINDOW (18–36 Hours)'}</span>
              <span className="px-2 py-0.5 rounded-md bg-sky-200 text-[10px] uppercase">{t.monitorLabel.split(' ')[0]}</span>
            </div>
            <p className="text-stone-700 text-[11px]">
              {language === 'hi'
                ? 'शेष आलू को खंडौली कोल्ड स्टोरेज चैंबर में स्थानांतरित करें। जलभराव वाली नालियां खोलें।'
                : 'Transfer un-offloaded stock to Khandauli cold storage pre-cooling bay. Open field drainage.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-l-emerald-600 border border-stone-200 space-y-1.5">
            <div className="flex justify-between items-center text-emerald-800 font-black">
              <span>{language === 'hi' ? 'बारिश के बाद' : 'AFTER RAIN (>36 Hours)'}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-[10px] uppercase">{language === 'hi' ? 'समीक्षा' : 'RE-EVALUATE'}</span>
            </div>
            <p className="text-stone-700 text-[11px]">
              {language === 'hi'
                ? 'फार्महब इंटेलिजेंस द्वारा अगली फसल (सरसों / चना) हेतु दोमट मिट्टी में नमी का पुनर्मूल्यांकन करें।'
                : 'Re-run FarmHub Intelligence to analyze post-harvest soil moisture for next crop cycle.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. ACTION PRIORITY TIERS */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'फार्महब रणनीतिक कार्य-योजना' : 'FarmHub Strategic Protocol'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {t.recommends5Title}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {t.recommends5Desc}
            </p>
          </div>

          {setCurrentPage && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentPage('market')}
                className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center space-x-1"
              >
                <span>{t.checkMarketBtn}</span>
              </button>
              <button
                onClick={() => setCurrentPage('intelligence')}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition-colors cursor-pointer"
              >
                <span>{t.reEvaluatePlanBtn}</span>
              </button>
              <button
                onClick={() => setCurrentPage('assistant')}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs border border-indigo-200 transition-colors cursor-pointer"
              >
                <span>{t.askAiHelpBtn}</span>
              </button>
            </div>
          )}
        </div>

        {/* 5 Recommended Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div 
            onClick={() => handleQuickDemoAction(t.action1)}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-xs font-black text-emerald-700 block">{t.action1}</span>
            <p className="text-[11px] text-stone-600 leading-snug">
              {t.action1Desc}
            </p>
          </div>
          <div 
            onClick={() => handleQuickDemoAction(t.action2)}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-xs font-black text-emerald-700 block">{t.action2}</span>
            <p className="text-[11px] text-stone-600 leading-snug">
              {t.action2Desc}
            </p>
          </div>
          <div 
            onClick={() => handleQuickDemoAction(t.action3)}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-xs font-black text-emerald-700 block">{t.action3}</span>
            <p className="text-[11px] text-stone-600 leading-snug">
              {t.action3Desc}
            </p>
          </div>
          <div 
            onClick={() => handleQuickDemoAction(t.action4)}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-xs font-black text-emerald-700 block">{t.action4}</span>
            <p className="text-[11px] text-stone-600 leading-snug">
              {t.action4Desc}
            </p>
          </div>
          <div 
            onClick={() => handleQuickDemoAction(t.action5)}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 hover:border-emerald-400 transition-all cursor-pointer"
          >
            <span className="text-xs font-black text-emerald-700 block">{t.action5}</span>
            <p className="text-[11px] text-stone-600 leading-snug">
              {t.action5Desc}
            </p>
          </div>
        </div>

        {/* Quick Action Responder Filter Buttons */}
        <div className="pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-stone-700 mb-3">
            {language === 'hi' ? 'आपातकालीन सहायता दल सीधे बुलाएं:' : 'Deploy Emergency Responders:'}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveFilter('Machinery')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeFilter === 'Machinery' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Tractor className="w-4 h-4" />
              <span>{t.findMachineryBtn}</span>
            </button>

            <button
              onClick={() => setActiveFilter('Labour')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeFilter === 'Labour' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.findLabourBtn}</span>
            </button>

            <button
              onClick={() => setActiveFilter('Storage')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeFilter === 'Storage' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Warehouse className="w-4 h-4" />
              <span>{t.findStorageBtn}</span>
            </button>

            <button
              onClick={() => setActiveFilter('Transport')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeFilter === 'Transport' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{t.findTransportBtn}</span>
            </button>

            <button
              onClick={() => setActiveFilter('Buyer')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeFilter === 'Buyer' 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.findBuyersBtn}</span>
            </button>

            {activeFilter !== 'All' && (
              <button
                onClick={() => setActiveFilter('All')}
                className="px-3 py-2 text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer underline"
              >
                {language === 'hi' ? 'सभी सेवाएं दिखाएं' : 'Show All Responders'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Verified Responder Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-stone-900">
            {language === 'hi' 
              ? `आपातकालीन सहायता नेटवर्क (${filteredProviders.length} प्रदाता सक्रिय)` 
              : `Emergency Action Service Network (${filteredProviders.length} Active in Agra Zone)`}
          </h3>
          <span className="text-xs text-emerald-700 font-bold">
            {language === 'hi' ? '३६ घंटे में तैनाती हेतु पूर्व-सत्यापित' : '100% Pre-Vetted for 36-Hr Deployment'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProviders.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {language === 'hi' 
                      ? (item.type === 'Machinery' ? 'मशीनरी' : item.type === 'Labour' ? 'मजदूर' : item.type === 'Storage' ? 'भंडारण' : item.type === 'Transport' ? 'परिवहन' : 'सीधे खरीदार') 
                      : item.type}
                  </span>
                  <span className="text-[11px] font-bold text-stone-500 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{item.distance}</span>
                  </span>
                </div>

                <h4 className="font-black text-base text-stone-900 leading-snug">{item.title}</h4>
                <div className="text-xs font-bold text-stone-700">{item.name}</div>
                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-stone-200/60">
                  {item.details}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      {language === 'hi' ? 'मानक दर' : 'Standard Rate'}
                    </span>
                    <span className="font-black text-stone-900 text-sm">{item.rate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-medium">
                      {language === 'hi' ? 'उपलब्धता' : 'Deployment'}
                    </span>
                    <span className="font-bold text-emerald-700">
                      {language === 'hi' ? 'तुरंत उपलब्ध' : `${item.availability.split(' ')[0]} ${item.availability.split(' ')[1]}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedProvider(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer text-center"
                  >
                    {t.deployNowBtn}
                  </button>
                  <a
                    href={`tel:${item.contact}`}
                    className="p-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
                    title="Direct Call"
                  >
                    <Phone className="w-4 h-4 text-emerald-700" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Booking Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-3 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-stone-900">
                  {language === 'hi' ? 'आपातकालीन सेवा पुष्टि!' : 'Emergency Dispatch Confirmed!'}
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  <strong>{selectedProvider.name}</strong> {language === 'hi' ? 'ने आपके ५ एकड़ खेत (आगरा) के लिए प्राथमिकता के आधार पर सेवा स्वीकृत कर ली है। चालक / समन्वयक मोबाइल:' : 'has confirmed priority dispatch to your 5-acre farm in Agra. Driver / Coordinator phone:'} {selectedProvider.contact}.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">
                      {language === 'hi' ? 'आपातकालीन कार्रवाई ट्रिगर' : 'Emergency Action Trigger'}
                    </span>
                    <h3 className="text-base font-black text-stone-900 mt-0.5">
                      {language === 'hi' ? `सेवा पुष्टि: ${selectedProvider.title}` : `Confirm Dispatch: ${selectedProvider.title}`}
                    </h3>
                  </div>
                  <button onClick={() => setSelectedProvider(null)} className="text-stone-400 hover:text-stone-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900">
                      {language === 'hi' ? 'सेवा प्रदाता:' : 'Provider:'} {selectedProvider.name}
                    </div>
                    <div className="text-stone-600">
                      {language === 'hi' ? 'मानक दर:' : 'Standard Rate:'} <span className="font-extrabold text-stone-900">{selectedProvider.rate}</span>
                    </div>
                    <div className="text-stone-600">
                      {language === 'hi' ? 'उपलब्धता:' : 'Availability:'} <span className="text-emerald-700 font-bold">{selectedProvider.availability}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'किसान का नाम' : 'Contact Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'मोबाइल नंबर (एसएमएस प्रेषण)' : 'Mobile Number (SMS Dispatch)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'विशेष निर्देश / खेत पता' : 'Action Request Note'}
                    </label>
                    <textarea
                      rows={2}
                      value={urgencyNote}
                      onChange={(e) => setUrgencyNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setSelectedProvider(null)}
                      className="px-4 py-2 rounded-xl text-stone-600 font-bold hover:bg-stone-100 cursor-pointer"
                    >
                      {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-md transition-colors cursor-pointer"
                    >
                      {language === 'hi' ? 'प्राथमिकता पर अभी बुक करें' : 'Confirm Priority Dispatch'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
