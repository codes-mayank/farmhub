import React from 'react';
import { PageId, FarmProfileData } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
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
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles
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

  return (
    <div className="space-y-6">
      
      {/* Weather Emergency Alert Banner */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-rose-600 text-white rounded-xl shadow-md shrink-0">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                  {t.criticalRiskBadge}
                </span>
                <span className="text-xs font-bold text-rose-800">
                  {language === 'hi' ? 'आगरा जिला • मौसम विभाग रेड अलर्ट' : 'Agra District • IMD Weather Alert'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-rose-950">
                {t.weatherAlertHeader}
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed max-w-2xl">
                {t.weatherAlertDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('emergency')}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.openEmergencyBtn}</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Actions Header Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <button
          onClick={() => setCurrentPage('intelligence')}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-700 to-green-800 text-white shadow-md hover:shadow-lg transition-all text-left group cursor-pointer hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs text-emerald-200">
              <Sprout className="w-5 h-5 text-amber-300" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-extrabold text-sm sm:text-base leading-tight">{t.actionGrow}</div>
          <p className="text-[11px] text-emerald-100/80 mt-1 font-medium">{t.actionGrowDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('market')}
          className="p-4 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white shadow-md hover:shadow-lg transition-all text-left group cursor-pointer hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs text-teal-200">
              <TrendingUp className="w-5 h-5 text-teal-200" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-teal-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-extrabold text-sm sm:text-base leading-tight">{t.actionMarket}</div>
          <p className="text-[11px] text-teal-100/80 mt-1 font-medium">{t.actionMarketDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('emergency')}
          className="p-4 rounded-2xl bg-gradient-to-br from-rose-700 to-red-800 text-white shadow-md hover:shadow-lg transition-all text-left group cursor-pointer hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs text-rose-200">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-rose-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-extrabold text-sm sm:text-base leading-tight">{t.actionEmergency}</div>
          <p className="text-[11px] text-rose-100/80 mt-1 font-medium">{t.actionEmergencyDesc}</p>
        </button>

        <button
          onClick={() => setCurrentPage('assistant')}
          className="p-4 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-800 text-white shadow-md hover:shadow-lg transition-all text-left group cursor-pointer hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs text-indigo-200">
              <Bot className="w-5 h-5 text-indigo-200" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-extrabold text-sm sm:text-base leading-tight">{t.actionAssistant}</div>
          <p className="text-[11px] text-indigo-100/80 mt-1 font-medium">{t.actionAssistantDesc}</p>
        </button>

      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Farm Snapshot & Current Crop Health */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Farm Profile Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">{t.activeStatusTitle}</span>
                <h2 className="text-xl font-extrabold text-stone-900 mt-0.5">
                  {farmProfile.farmerName} {language === 'hi' ? 'का खेत' : '\'s Farm'}
                </h2>
              </div>
              <button
                onClick={() => setCurrentPage('profile')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
              >
                <span>{t.editProfileBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Farm Attribute Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  {language === 'hi' ? 'स्थान' : 'Location'}
                </span>
                <span className="text-xs font-black text-stone-900">{farmProfile.location}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  {language === 'hi' ? 'कुल रकबा' : 'Farm Size'}
                </span>
                <span className="text-xs font-black text-emerald-700">{farmProfile.farmArea} {language === 'hi' ? 'एकड़' : 'Acres'}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  {language === 'hi' ? 'मिट्टी का प्रकार' : 'Soil Type'}
                </span>
                <span className="text-xs font-black text-stone-900">
                  {farmProfile.soilType} {language === 'hi' ? '(दोमट)' : ''}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  {language === 'hi' ? 'सिंचाई व्यवस्था' : 'Water Supply'}
                </span>
                <span className="text-xs font-black text-sky-700">
                  {farmProfile.waterAvailability} {language === 'hi' ? '(सिंचित)' : ''}
                </span>
              </div>
            </div>

            {/* Current Standing Crop: Potato */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-700 text-white">
                      {t.standingCropLabel}: {farmProfile.currentCrop} {language === 'hi' ? '(आलू)' : ''}
                    </span>
                    <span className="text-xs font-semibold text-stone-600">
                      {language === 'hi' ? 'पिछली फसल' : 'Previous'}: {farmProfile.previousCrop} {language === 'hi' ? '(गेहूं)' : ''}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {language === 'hi' ? 'बुवाई तिथि' : 'Planted'}: {farmProfile.plantingDate} • {language === 'hi' ? 'संभावित कटाई' : 'Expected Harvest'}: {farmProfile.expectedHarvestDate}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-800">
                    {farmProfile.harvestReadinessPercent}%
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    {t.harvestReadinessLabel}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all"
                    style={{ width: `${farmProfile.harvestReadinessPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 pt-0.5">
                  <span>{language === 'hi' ? 'वानस्पतिक विकास' : 'Vegetative'}</span>
                  <span>{language === 'hi' ? 'कंद विकास' : 'Tuber Bulking'}</span>
                  <span className="font-bold text-emerald-800">
                    {language === 'hi' ? 'परिपक्वता / कटाई खिड़की (अभी)' : 'Maturity / Harvest Window (Now)'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-emerald-200/60 text-xs text-stone-700 flex items-center justify-between">
                <span>{t.cropConditionDesc}</span>
                <button
                  onClick={() => setCurrentPage('emergency')}
                  className="text-xs font-bold text-rose-700 hover:text-rose-800 underline cursor-pointer"
                >
                  {language === 'hi' ? 'बारिश योजना खोलें →' : 'Action Rain Plan →'}
                </button>
              </div>
            </div>

          </div>

          {/* Quick Intelligence Teaser */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-6 text-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4" />
                <span>{language === 'hi' ? 'अगली फसल की योजना' : 'Next Crop Planning'}</span>
              </div>
              <h3 className="text-lg font-black">{t.nextCycleTitle}</h3>
              <p className="text-stone-300 text-xs max-w-lg leading-relaxed">
                {t.nextCycleDesc}
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('intelligence')}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-md whitespace-nowrap cursor-pointer transition-colors"
            >
              {t.analyzeFarmBtn}
            </button>
          </div>

        </div>

        {/* Right 1 Col: Weather Station & Mandi Outlook */}
        <div className="space-y-6">
          
          {/* Weather Widget */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? 'आगरा कृषि-मौसम केंद्र' : 'Agra Agro-Met Station'}
                </span>
                <h3 className="font-bold text-stone-900 text-sm">{t.weatherWidgetTitle}</h3>
              </div>
              <div className="p-2 bg-sky-50 text-sky-700 rounded-lg">
                <CloudRain className="w-4 h-4 text-sky-600" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-black text-stone-900">26°C</div>
                <div className="text-xs text-stone-600 font-medium">
                  {language === 'hi' ? 'बादल छाए रहेंगे व उच्च आर्द्रता' : 'Overcast & High Humidity'}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                  {language === 'hi' ? 'वर्षा संभावना: ९०%' : 'Rain Risk: 90%'}
                </span>
                <div className="text-[10px] text-stone-400 mt-1">
                  {language === 'hi' ? 'अगले ३६-४८ घंटे' : 'Next 36-48 Hours'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-stone-50 p-2 rounded-xl">
                <span className="text-[10px] text-stone-400 block">
                  {language === 'hi' ? 'वर्षा अनुमान' : 'Rain Forecast'}
                </span>
                <span className="font-bold text-rose-700">85 mm</span>
              </div>
              <div className="bg-stone-50 p-2 rounded-xl">
                <span className="text-[10px] text-stone-400 block">
                  {language === 'hi' ? 'आर्द्रता (ह्यूमिडिटी)' : 'Humidity'}
                </span>
                <span className="font-bold text-stone-800">88%</span>
              </div>
            </div>
          </div>

          {/* Mandi Market Outlook */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">{t.marketOutlookTitle}</h3>
              </div>
              <button
                onClick={() => setCurrentPage('market')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                {language === 'hi' ? 'मंडी दरें →' : 'Mandi Rates →'}
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">
                    {language === 'hi' ? 'सरसों (Pusa Bold)' : 'Mustard (Sarson)'}
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {language === 'hi' ? 'तेल मिलों में भारी मांग' : 'Crusher demand surging'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-stone-900">₹5,950 / q</div>
                  <div className="text-[10px] font-bold text-green-600">+₹170 {language === 'hi' ? 'आज' : 'today'}</div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">
                    {language === 'hi' ? 'आलू (Kufri Bahar)' : 'Potato (Alu)'}
                  </div>
                  <div className="text-[11px] text-amber-800">
                    {language === 'hi' ? 'आगरा में बंपर आवक' : 'Heavy arrivals in Agra'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-stone-900">₹1,250 / q</div>
                  <div className="text-[10px] font-bold text-rose-600">-₹70 {language === 'hi' ? 'आज' : 'today'}</div>
                </div>
              </div>

              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">
                    {language === 'hi' ? 'चना (JG-11 Desi)' : 'Chickpea (Chana)'}
                  </div>
                  <div className="text-[11px] text-sky-800">
                    {language === 'hi' ? 'एमएसपी से ऊपर मजबूत' : 'Firm above MSP'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-stone-900">₹5,600 / q</div>
                  <div className="text-[10px] font-bold text-green-600">+₹60 {language === 'hi' ? 'आज' : 'today'}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
