import React, { useState } from 'react';
import { FarmProfileData, PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  AlertCircle, 
  Calendar, 
  Coins,
  ArrowRight,
  Bot
} from 'lucide-react';

interface FertilizerCalculatorProps {
  farmProfile?: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

export const FertilizerCalculator: React.FC<FertilizerCalculatorProps> = ({ 
  farmProfile,
  setCurrentPage 
}) => {
  const { language, t } = useLanguage();

  // Initialize with canonical farm profile if available
  const [crop, setCrop] = useState<string>(farmProfile?.currentCrop || 'Potato');
  const [acres, setAcres] = useState<number>(farmProfile?.farmArea || 5);
  const [ph, setPh] = useState<number>(7.2);
  const [nitrogen, setNitrogen] = useState<number>(240); // kg/ha (Medium: 280-560)
  const [phosphorus, setPhosphorus] = useState<number>(18); // kg/ha (Medium: 10-25)
  const [potassium, setPotassium] = useState<number>(210); // kg/ha (Medium: 110-280)
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.55); // % (Medium: 0.5-0.75%)

  // Standard recommended doses (kg/acre N-P-K)
  const cropRequirements: Record<string, { n: number; p: number; k: number; targetYield: string }> = {
    'Potato': { n: 60, p: 40, k: 45, targetYield: '140-160 Quintals/Acre' },
    'Mustard': { n: 32, p: 16, k: 12, targetYield: '10-12 Quintals/Acre' },
    'Wheat': { n: 48, p: 24, k: 16, targetYield: '22-25 Quintals/Acre' },
    'Chickpea (Chana)': { n: 10, p: 20, k: 10, targetYield: '8-10 Quintals/Acre' },
    'Green Pea (Matar)': { n: 12, p: 22, k: 12, targetYield: '30-35 Quintals/Acre' },
    'Rice (Paddy)': { n: 40, p: 20, k: 20, targetYield: '26-30 Quintals/Acre' },
    'Maize': { n: 45, p: 24, k: 20, targetYield: '28-32 Quintals/Acre' }
  };

  const req = cropRequirements[crop] || cropRequirements['Potato'];

  // Nutrient status flags
  const nStatus = nitrogen < 280 ? 'Low' : nitrogen <= 560 ? 'Medium' : 'High';
  const pStatus = phosphorus < 10 ? 'Low' : phosphorus <= 25 ? 'Medium' : 'High';
  const kStatus = potassium < 110 ? 'Low' : potassium <= 280 ? 'Medium' : 'High';

  // Adjust doses based on soil test
  const nAdjustment = nStatus === 'Low' ? 1.2 : nStatus === 'High' ? 0.8 : 1.0;
  const pAdjustment = pStatus === 'Low' ? 1.2 : pStatus === 'High' ? 0.8 : 1.0;
  const kAdjustment = kStatus === 'Low' ? 1.2 : kStatus === 'High' ? 0.8 : 1.0;

  const totalN = req.n * nAdjustment * acres;
  const totalP = req.p * pAdjustment * acres;
  const totalK = req.k * kAdjustment * acres;

  // Fertilizer conversion
  const dapKg = totalP / 0.46;
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);
  const ureaKg = remainingN / 0.46;
  const mopKg = totalK / 0.60;
  const compostTons = (acres * 1.5).toFixed(1);

  // Bag counts
  const dapBags = (dapKg / 50).toFixed(1);
  const ureaBags = (ureaKg / 45).toFixed(1);
  const mopBags = (mopKg / 50).toFixed(1);

  // Subsidized cost estimates
  const totalCost = Math.round(
    (parseFloat(ureaBags) * 266.5) + 
    (parseFloat(dapBags) * 1350) + 
    (parseFloat(mopBags) * 1700)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {language === 'hi' ? 'उर्वरक एवं पोषक तत्व गणना' : 'Soil Health & Precision Fertilizer Calculator'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'hi'
              ? 'आगरा की दोमट मिट्टी के लिए यूरिया, डीएपी और पोटाश बोरियों की सटीक मात्रा एवं लागत का हिसाब।'
              : 'Calculate Urea, DAP, and MOP bag requirements based on ICAR nutrient recommendations for your land.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {language === 'hi' ? 'आईसीएआर वैज्ञानिक सूत्र' : 'ICAR Formula Standard'}
          </span>
        </div>
      </div>

      {/* Main Grid: Parameters vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Soil Test & Target Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'फसल व खेत रकबा' : 'Target Crop & Acreage'}</span>
              </h3>
              {farmProfile && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {farmProfile.farmerName} ({farmProfile.soilType})
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">{language === 'hi' ? 'लक्ष्य फसल' : 'Target Crop'}</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.keys(cropRequirements).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">{language === 'hi' ? 'खेत रकबा (एकड़)' : 'Land Area (Acres)'}</label>
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={acres}
                  onChange={(e) => setAcres(Math.max(0.5, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-3">
                {language === 'hi' ? 'मिट्टी परीक्षण मान (मृदा स्वास्थ्य कार्ड)' : 'Soil Test Values (Soil Card)'}
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">Soil pH</span>
                    <span className="font-bold text-stone-900">{ph} ({ph < 6.5 ? 'Acidic' : ph > 7.8 ? 'Alkaline' : 'Optimal Neutral'})</span>
                  </div>
                  <input
                    type="range"
                    min="5.5"
                    max="9.0"
                    step="0.1"
                    value={ph}
                    onChange={(e) => setPh(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">Available Nitrogen (N)</span>
                    <span className={`font-bold ${nStatus === 'Low' ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {nitrogen} kg/ha ({nStatus})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="650"
                    step="10"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">Available Phosphorus (P₂O₅)</span>
                    <span className={`font-bold ${pStatus === 'Low' ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {phosphorus} kg/ha ({pStatus})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">Available Potassium (K₂O)</span>
                    <span className={`font-bold ${kStatus === 'Low' ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {potassium} kg/ha ({kStatus})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="350"
                    step="10"
                    value={potassium}
                    onChange={(e) => setPotassium(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">Organic Carbon (OC %)</span>
                    <span className="font-bold text-stone-900">{organicCarbon}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.2"
                    step="0.05"
                    value={organicCarbon}
                    onChange={(e) => setOrganicCarbon(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Recommendation & Schedule */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Bags Requirement Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {acres} {language === 'hi' ? 'एकड़ हेतु अनुशंसित मात्रा' : `Acres of ${crop}`}
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-0.5">
                  {language === 'hi' ? 'उर्वरक बोरी आवश्यकता' : 'Commercial Bag Requirement'}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-stone-400 block font-medium">{language === 'hi' ? 'अनुमानित सब्सिडी लागत' : 'Est. Subsidized Cost'}</span>
                <span className="text-xl font-black text-stone-900">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Bag Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-emerald-900">Urea (46% N)</div>
                <div className="text-2xl font-black text-emerald-800 my-1">{ureaBags}</div>
                <div className="text-[11px] text-emerald-700 font-medium">{language === 'hi' ? 'बोरियां (४५ किलो)' : 'Bags (45 kg each)'}</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(ureaBags) * 266.5)}</div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-amber-900">DAP (18:46:0)</div>
                <div className="text-2xl font-black text-amber-800 my-1">{dapBags}</div>
                <div className="text-[11px] text-amber-700 font-medium">{language === 'hi' ? 'बोरियां (५० किलो)' : 'Bags (50 kg each)'}</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(dapBags) * 1350)}</div>
              </div>

              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-sky-900">MOP (Potash 60%)</div>
                <div className="text-2xl font-black text-sky-800 my-1">{mopBags}</div>
                <div className="text-[11px] text-sky-700 font-medium">{language === 'hi' ? 'बोरियां (५० किलो)' : 'Bags (50 kg each)'}</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(mopBags) * 1700)}</div>
              </div>
            </div>

            {/* Organic Carbon & Manure Recommendation */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <strong className="text-stone-900">{language === 'hi' ? 'जैविक खाद सलाह:' : 'Organic Enrichment Advice:'}</strong> {language === 'hi' ? `ऑर्गेनिक कार्बन ${organicCarbon}% है। मिट्टी की उर्वरता बढ़ाने हेतु बुवाई से पूर्व ` : `Organic Carbon is ${organicCarbon}%. Apply `} 
                <strong>{compostTons} {language === 'hi' ? 'टन पकी गोबर खाद' : 'Tons of Farmyard Manure (FYM)'}</strong> 
                {language === 'hi' ? ' खेत में मिलाएं।' : ' before harrowing.'}
              </div>
            </div>

            {/* Navigation Return Links */}
            {setCurrentPage && (
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-stone-600 font-medium">
                  {language === 'hi' ? 'उर्वरक लागत फसल मुनाफे से जुड़ी है:' : 'Fertilizer budget connects to crop intelligence:'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage('intelligence')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? 'फसल बुद्धिमत्ता →' : 'Crop Intelligence →'}
                  </button>
                  <button
                    onClick={() => setCurrentPage('assistant')}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs border border-indigo-200 transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'एआई सलाह' : 'Ask AI'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
