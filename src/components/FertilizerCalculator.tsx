import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  AlertCircle, 
  Calendar, 
  Coins,
  ArrowRight
} from 'lucide-react';
import { SoilTestResult } from '../types';

export const FertilizerCalculator: React.FC = () => {
  // Inputs
  const [crop, setCrop] = useState<string>('Wheat');
  const [acres, setAcres] = useState<number>(4);
  const [ph, setPh] = useState<number>(7.2);
  const [nitrogen, setNitrogen] = useState<number>(240); // kg/ha (Medium: 280-560)
  const [phosphorus, setPhosphorus] = useState<number>(18); // kg/ha (Medium: 10-25)
  const [potassium, setPotassium] = useState<number>(210); // kg/ha (Medium: 110-280)
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.55); // % (Medium: 0.5-0.75%)

  // Standard recommended doses (kg/acre N-P-K)
  const cropRequirements: Record<string, { n: number; p: number; k: number; targetYield: string }> = {
    'Wheat': { n: 48, p: 24, k: 16, targetYield: '22-25 Quintals/Acre' },
    'Mustard': { n: 32, p: 16, k: 12, targetYield: '10-12 Quintals/Acre' },
    'Rice (Paddy)': { n: 40, p: 20, k: 20, targetYield: '26-30 Quintals/Acre' },
    'Cotton': { n: 50, p: 25, k: 25, targetYield: '12-15 Quintals/Acre' },
    'Maize': { n: 45, p: 24, k: 20, targetYield: '28-32 Quintals/Acre' },
    'Potato': { n: 60, p: 40, k: 45, targetYield: '140-160 Quintals/Acre' },
    'Chickpea (Chana)': { n: 10, p: 20, k: 10, targetYield: '8-10 Quintals/Acre' }
  };

  const req = cropRequirements[crop] || cropRequirements['Wheat'];

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

  // Fertilizer conversion (DAP provides 18% N and 46% P; Urea provides 46% N; MOP provides 60% K)
  // DAP required for P:
  const dapKg = totalP / 0.46;
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);
  const ureaKg = remainingN / 0.46;
  const mopKg = totalK / 0.60;
  const compostTons = (acres * 1.5).toFixed(1);

  // Bag counts (45 kg or 50 kg bags)
  const dapBags = (dapKg / 50).toFixed(1);
  const ureaBags = (ureaKg / 45).toFixed(1);
  const mopBags = (mopKg / 50).toFixed(1);

  // Cost estimates (Subsidized official MRP rates in India)
  // Urea: ~₹266.50/45kg bag; DAP: ~₹1350/50kg bag; MOP: ~₹1700/50kg bag
  const totalCost = Math.round(
    (parseFloat(ureaBags) * 266.5) + 
    (parseFloat(dapBags) * 1350) + 
    (parseFloat(mopBags) * 1700)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Soil Health & Precision Fertilizer Calculator
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Input soil test results to calculate optimal Urea, DAP, and MOP bag requirements based on ICAR nutrient recommendations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Govt Soil Health Card Compatible
          </span>
        </div>
      </div>

      {/* Main Grid: Parameters vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Soil Test & Target Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Target Crop & Acreage</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Target Crop</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.keys(cropRequirements).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Land Area (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={acres}
                  onChange={(e) => setAcres(Math.max(0.5, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                Soil Test Values (From Card)
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
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Recommended Quantity for {acres} Acres of {crop}
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-0.5">Commercial Bag Requirement</h3>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-stone-400 block font-medium">Est. Subsidized Cost</span>
                <span className="text-xl font-black text-stone-900">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Bag Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-emerald-900">Urea (46% N)</div>
                <div className="text-2xl font-black text-emerald-800 my-1">{ureaBags}</div>
                <div className="text-[11px] text-emerald-700 font-medium">Bags (45 kg each)</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(ureaBags) * 266.5)}</div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-amber-900">DAP (18:46:0)</div>
                <div className="text-2xl font-black text-amber-800 my-1">{dapBags}</div>
                <div className="text-[11px] text-amber-700 font-medium">Bags (50 kg each)</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(dapBags) * 1350)}</div>
              </div>

              <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-sky-900">MOP (Potash 60%)</div>
                <div className="text-2xl font-black text-sky-800 my-1">{mopBags}</div>
                <div className="text-[11px] text-sky-700 font-medium">Bags (50 kg each)</div>
                <div className="text-[10px] text-stone-400 mt-1">~₹{Math.round(parseFloat(mopBags) * 1700)}</div>
              </div>
            </div>

            {/* Organic Carbon & Manure Recommendation */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <strong className="text-stone-900">Organic Enrichment Advice:</strong> Since Organic Carbon is {organicCarbon}%, apply <strong>{compostTons} Tons of Well-Decomposed Farmyard Manure (FYM)</strong> or Vermicompost before final harrowing to improve soil microbial activity and water holding capacity.
              </div>
            </div>

            {/* Split Application Schedule */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Split Application Timeline (Nutrient Delivery)</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-stone-900">Stage 1: Basal Dose (At Sowing / Planting)</span>
                    <p className="text-stone-500 mt-0.5">
                      Apply 100% of DAP ({dapBags} bags), 100% of MOP ({mopBags} bags), and 25% of Urea.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 whitespace-nowrap">
                    Day 0
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-stone-900">Stage 2: 1st Top Dressing (CRI / Early Tillering)</span>
                    <p className="text-stone-500 mt-0.5">
                      Broadcast 40% of Urea with 1st irrigation. Ensure soil has proper moisture.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700 whitespace-nowrap">
                    Day 21-25
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-stone-900">Stage 3: 2nd Top Dressing (Jointing / Booting)</span>
                    <p className="text-stone-500 mt-0.5">
                      Broadcast remaining 35% of Urea before panicle/flag-leaf emergence.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700 whitespace-nowrap">
                    Day 45-50
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
