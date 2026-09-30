import React, { useState } from 'react';
import { MandiPrice } from '../types';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Calculator, 
  Bell, 
  Sparkles, 
  HelpCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface MandiPricesProps {
  mandiPrices: MandiPrice[];
}

export const MandiPrices: React.FC<MandiPricesProps> = ({ mandiPrices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  
  // Calculator state
  const [calcCommodityId, setCalcCommodityId] = useState<string>(mandiPrices[0]?.id || '');
  const [calcQuantity, setCalcQuantity] = useState<number>(50); // Quintals
  
  // Price alert state
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const commodities = ['All', ...Array.from(new Set(mandiPrices.map(m => m.commodity.split(' ')[0])))];
  const states = ['All', ...Array.from(new Set(mandiPrices.map(m => m.state)))];

  const filteredPrices = mandiPrices.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.mandi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComm = selectedCommodity === 'All' || item.commodity.toLowerCase().includes(selectedCommodity.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    return matchesSearch && matchesComm && matchesState;
  });

  const selectedCalcItem = mandiPrices.find(m => m.id === calcCommodityId) || mandiPrices[0];
  const estimatedRevenue = selectedCalcItem ? selectedCalcItem.modalPrice * calcQuantity : 0;
  const mspDifference = selectedCalcItem ? selectedCalcItem.modalPrice - selectedCalcItem.msp : 0;

  const handleSetAlert = (commodityName: string) => {
    setAlertSuccess(`Price SMS alert activated for ${commodityName}! You will receive notifications when rates vary by >3%.`);
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Mandi & APMC Market Intelligence
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time modal mandi rates, MSP benchmarks, 7-day variation curves, and AI selling window recommendations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            Controlled Demo Data Feed
          </span>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Agra APMC Feed Active</span>
          </span>
        </div>
      </div>

      {/* Alert toast notification */}
      {alertSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{alertSuccess}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search commodity or mandi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium">Crop:</span>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {commodities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium">State:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Mandi Cards + Live Revenue Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mandi Cards List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPrices.map((item) => {
            const isAboveMsp = item.modalPrice >= item.msp;
            const mspDiff = item.modalPrice - item.msp;
            const recBadge = {
              'Sell Now': 'bg-emerald-100 text-emerald-900 border-emerald-300',
              'Hold (Expected Rise)': 'bg-amber-100 text-amber-900 border-amber-300',
              'Favorable MSP': 'bg-sky-100 text-sky-900 border-sky-300'
            }[item.recommendation];

            // Calculate min & max for simple historical SVG sparkline
            const prices = item.history.map(h => h.price);
            const minP = Math.min(...prices);
            const maxP = Math.max(...prices);
            const range = maxP - minP || 1;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-base text-stone-900">{item.commodity}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${recBadge}`}>
                        {item.recommendation}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      {item.mandi}, <span className="font-semibold text-stone-700">{item.state}</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                    <div className="text-xl sm:text-2xl font-black text-stone-900">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                      <span className="text-xs font-semibold text-stone-500 ml-1">/ Quintal</span>
                    </div>
                    <div className={`text-xs font-bold flex items-center space-x-0.5 mt-0.5 ${
                      item.priceChange >= 0 ? 'text-green-600' : 'text-rose-600'
                    }`}>
                      {item.priceChange >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      <span>{item.priceChange > 0 ? `+${item.priceChange}%` : `${item.priceChange}%`} today</span>
                    </div>
                  </div>
                </div>

                {/* Range Bar & MSP Comparison */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">Daily Range</span>
                    <span className="font-bold text-stone-800">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">Govt MSP</span>
                    <span className="font-bold text-stone-800">₹{item.msp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-medium">MSP Spread</span>
                    <span className={`font-bold ${isAboveMsp ? 'text-green-600' : 'text-rose-600'}`}>
                      {isAboveMsp ? `+₹${mspDiff}` : `-₹${Math.abs(mspDiff)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleSetAlert(item.commodity)}
                      className="inline-flex items-center space-x-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Set Alert</span>
                    </button>
                  </div>
                </div>

                {/* 7-Day Visual Trend Sparkline */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">7-Day APMC Price Trend</span>
                    <span>Low: ₹{minP} • High: ₹{maxP}</span>
                  </div>

                  <div className="flex items-end space-x-2 h-10 pt-1">
                    {item.history.map((h, i) => {
                      const heightPercent = Math.max(20, Math.round(((h.price - minP) / range) * 100));
                      const isLast = i === item.history.length - 1;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          <div 
                            className={`w-full rounded-t-sm transition-all ${
                              isLast ? 'bg-emerald-600' : 'bg-stone-300 group-hover:bg-emerald-400'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          ></div>
                          <span className="text-[9px] text-stone-400 mt-1 truncate">{h.date}</span>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute -top-7 hidden group-hover:block bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                            ₹{h.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Harvest Revenue Estimator Calculator */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs sticky top-24 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-800">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Calculator className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900">Mandi Revenue Estimator</h3>
                <p className="text-[11px] text-stone-500">Calculate gross income before bringing produce to market</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Select Crop & Target Mandi
                </label>
                <select
                  value={calcCommodityId}
                  onChange={(e) => setCalcCommodityId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {mandiPrices.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.commodity} ({m.mandi}) - ₹{m.modalPrice}/q
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Harvest Quantity (Quintals)
                  </label>
                  <span className="text-xs font-extrabold text-emerald-700">{calcQuantity} Quintals</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>5 Quintal</span>
                  <span>250 Q</span>
                  <span>500 Q</span>
                </div>
              </div>

              {/* Calculation Summary Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2.5">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Rate at Mandi:</span>
                  <span className="font-bold text-stone-900">₹{selectedCalcItem?.modalPrice} / Quintal</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Official MSP Benchmark:</span>
                  <span className="font-bold text-stone-900">₹{selectedCalcItem?.msp} / Quintal</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Gain above MSP:</span>
                  <span className={`font-bold ${mspDifference >= 0 ? 'text-green-600' : 'text-rose-600'}`}>
                    ₹{(mspDifference * calcQuantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-2 border-t border-emerald-200/80 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-stone-800">Estimated Gross Revenue:</span>
                  <span className="text-xl font-black text-emerald-800">
                    ₹{estimatedRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg text-[11px] text-stone-500 leading-relaxed border border-stone-200/60">
                💡 <strong>Tip for farmers:</strong> Prices tend to dip by 3-5% during peak arrival weeks (11 AM to 2 PM). Contact buyers directly through the <em>FarmHub Marketplace</em> to lock guaranteed advance contracts.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
