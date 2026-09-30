import React, { useState } from 'react';
import { FarmProfileData, PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Droplets, 
  Calendar, 
  Sprout, 
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Info,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { DEFAULT_FARM_PROFILE } from '../data/centralData';

interface FarmProfileProps {
  farmProfile: FarmProfileData;
  setFarmProfile: React.Dispatch<React.SetStateAction<FarmProfileData>>;
  setCurrentPage: (page: PageId) => void;
}

export const FarmProfile: React.FC<FarmProfileProps> = ({
  farmProfile,
  setFarmProfile,
  setCurrentPage
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FarmProfileData>(farmProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmProfile(formData);
    localStorage.setItem('farmhub_profile', JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setFormData(DEFAULT_FARM_PROFILE);
    setFarmProfile(DEFAULT_FARM_PROFILE);
    localStorage.setItem('farmhub_profile', JSON.stringify(DEFAULT_FARM_PROFILE));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <MapPin className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {language === 'hi' ? 'खेत प्रोफ़ाइल एवं बुनियादी मापदंड' : 'Farm Profile & Baseline Parameters'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'hi' 
              ? 'फार्महब के निर्णय इंजन को सटीक बनाने के लिए अपने खेत की मिट्टी, क्षेत्रफल, सिंचाई और फसल का विवरण दर्ज करें।'
              : 'Configure your farm\'s physical soil, area, water regime, and crop rotation to ground FarmHub\'s intelligence engine.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-stone-100 text-stone-600">
            {t.demoDataBadge}
          </span>
          <button
            onClick={() => setCurrentPage('intelligence')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs hover:bg-emerald-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'hi' ? 'बुद्धिमत्ता विश्लेषण चलाएं' : 'Run Intelligence Analysis'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Educational Explanation Box (Why Profile Matters) */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4 text-amber-300" />
          <span>{t.profileWhyTitle}</span>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed font-normal">
          {t.profileWhyDesc}
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-emerald-200 font-bold border-t border-emerald-800/80">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Farm Context</span>
          </div>
          <span>➔</span>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Intelligence Processing</span>
          </div>
          <span>➔</span>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Personalized Crop Action</span>
          </div>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">
            {language === 'hi' 
              ? 'खेत प्रोफ़ाइल सुरक्षित की गई और फार्महब निर्णय इंजन से सिंक हो गई!'
              : 'Farm profile updated and synced to FarmHub Decision Engine & Dashboard!'}
          </span>
        </div>
      )}

      {/* 3. Main Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Farmer Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1.5 border-b border-stone-100 pb-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'किसान व स्थान विवरण' : 'Farmer & Location Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'किसान का पूरा नाम' : 'Farmer Full Name'}
              </label>
              <input
                type="text"
                required
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'खेत का स्थान / जिला' : 'Farm Location / District'}
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Farm Characteristics (Soil & Water) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1.5 border-b border-stone-100 pb-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'भूमि, मिट्टी एवं सिंचाई मापदंड' : 'Land, Soil & Water Parameters'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'कुल कृषि योग्य रकबा (एकड़)' : 'Farm Cultivable Area (Acres)'}
              </label>
              <input
                type="number"
                min="0.5"
                max="500"
                step="0.5"
                required
                value={formData.farmArea}
                onChange={(e) => setFormData({ ...formData, farmArea: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-bold"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                {language === 'hi' ? 'डेमो आधार: ५ एकड़' : 'Default demo: 5 acres'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'मिट्टी का प्रकार' : 'Soil Classification'}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Loamy">Loamy ({language === 'hi' ? 'दोमट - संतुलित' : 'Optimal balanced'})</option>
                <option value="Sandy Loam">Sandy Loam ({language === 'hi' ? 'बलुई दोमट' : 'Light'})</option>
                <option value="Clay">Clay ({language === 'hi' ? 'चिकनी मिट्टी' : 'Heavy'})</option>
                <option value="Black Soil">Black Soil ({language === 'hi' ? 'काली मिट्टी' : 'Vertisol'})</option>
                <option value="Alluvial">Alluvial ({language === 'hi' ? 'जलोढ़ मिट्टी' : 'River basin'})</option>
              </select>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {language === 'hi' ? 'डेमो आधार: दोमट (Loamy)' : 'Default demo: Loamy'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'जल स्रोत एवं सिंचाई' : 'Water Availability'}
              </label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Irrigated">Irrigated ({language === 'hi' ? 'पूर्ण सिंचित' : 'Assured'})</option>
                <option value="Borewell Assisted">Borewell Assisted ({language === 'hi' ? 'नलकूप / बोरवेल' : 'Groundwater'})</option>
                <option value="Canal Fed">Canal Fed ({language === 'hi' ? 'नहरी सिंचाई' : 'Canal'})</option>
                <option value="Rainfed">Rainfed ({language === 'hi' ? 'वर्षा आधारित' : 'Dryland'})</option>
              </select>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {language === 'hi' ? 'डेमो आधार: सिंचित (Irrigated)' : 'Default demo: Irrigated'}
              </span>
            </div>
          </div>
        </div>

        {/* Current Crop & Rotation History */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1.5 border-b border-stone-100 pb-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'फसल चक्र एवं वर्तमान सीजन' : 'Crop Rotation & Season Context'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'पूर्व में काटी गई फसल' : 'Previous Harvested Crop'}
              </label>
              <select
                value={formData.previousCrop}
                onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Wheat">Wheat ({language === 'hi' ? 'गेहूं - अधिक पोषक तत्व खपत' : 'High nitrogen depletion'})</option>
                <option value="Rice (Paddy)">Rice / Paddy ({language === 'hi' ? 'धान' : 'Paddy'})</option>
                <option value="Cotton">Cotton ({language === 'hi' ? 'कपास' : 'Cotton'})</option>
                <option value="Maize">Maize ({language === 'hi' ? 'मक्का' : 'Maize'})</option>
                <option value="Fallow">Fallow ({language === 'hi' ? 'परती / खाली जमीन' : 'Rested Soil'})</option>
              </select>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {language === 'hi' ? 'डेमो आधार: गेहूं (Wheat)' : 'Default demo: Wheat'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'वर्तमान में खड़ी फसल' : 'Current Standing Crop'}
              </label>
              <input
                type="text"
                value={formData.currentCrop}
                onChange={(e) => setFormData({ ...formData, currentCrop: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                {language === 'hi' ? 'डेमो आधार: आलू (Potato)' : 'Default demo: Potato'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'बुवाई तिथि' : 'Planting Date'}
              </label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? 'संभावित कटाई तिथि' : 'Expected Harvest Date'}
              </label>
              <input
                type="date"
                value={formData.expectedHarvestDate}
                onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'hi' ? `परिपक्वता स्तर (${formData.harvestReadinessPercent}%)` : `Harvest Readiness (${formData.harvestReadinessPercent}%)`}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.harvestReadinessPercent}
                onChange={(e) => setFormData({ ...formData, harvestReadinessPercent: Number(e.target.value) })}
                className="w-full accent-emerald-600 mt-2"
              />
              <span className="text-[10px] text-stone-400 block mt-0.5">
                {language === 'hi' ? 'डेमो आपातकालीन ट्रिगर ९२% पर सेट है' : 'Demo emergency trigger is set at 92%'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-stone-100 gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>{language === 'hi' ? 'आगरा डेमो डिफ़ॉल्ट पर रीसेट करें' : 'Reset to Agra Demo Baseline'}</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold shadow-md transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'पैरामीटर सुरक्षित करें' : 'Save Profile Parameters'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
