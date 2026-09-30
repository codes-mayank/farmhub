import React from 'react';
import { 
  FieldPlot, 
  MandiPrice, 
  WeatherData, 
  ProduceListing, 
  NavigationTab 
} from '../types';
import { 
  Sprout, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ChevronRight, 
  Calendar,
  Layers,
  Sparkles,
  ShoppingBag,
  Stethoscope
} from 'lucide-react';

interface DashboardProps {
  fields: FieldPlot[];
  mandiPrices: MandiPrice[];
  weather: WeatherData;
  produceListings: ProduceListing[];
  setActiveTab: (tab: NavigationTab) => void;
  onOpenNewFieldModal: () => void;
  onOpenProduceModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  fields,
  mandiPrices,
  weather,
  produceListings,
  setActiveTab,
  onOpenNewFieldModal,
  onOpenProduceModal
}) => {
  const totalAcres = fields.reduce((acc, f) => acc + f.areaAcres, 0);
  const avgHealth = Math.round(fields.reduce((acc, f) => acc + f.healthScore, 0) / (fields.length || 1));
  const harvestReadyFields = fields.filter(f => f.stage === 'Harvest Ready').length;
  
  // Calculate top market gainer
  const topGainer = [...mandiPrices].sort((a, b) => b.priceChange - a.priceChange)[0];

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Action Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-xs font-semibold text-emerald-100 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Farming Advisory Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, Kisan Brother! 🌾
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
              Today is ideal for foliar nutrient spraying in <span className="font-semibold text-white">Plot A (Wheat)</span>. Mandi rates for Mustard are soaring (+{topGainer?.priceChange}% at Neemuch). 1 field is ready for harvest.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
            <button
              onClick={onOpenNewFieldModal}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Add Field Plot</span>
            </button>
            <button
              onClick={onOpenProduceModal}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-400/40 text-white font-semibold text-sm hover:bg-emerald-900/80 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Sell Produce</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-emerald-600/50">
          <div className="bg-emerald-900/40 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
            <div className="text-emerald-200 text-xs font-medium">Cultivated Land</div>
            <div className="text-xl sm:text-2xl font-black mt-1 text-white">{totalAcres.toFixed(1)} <span className="text-xs font-semibold text-emerald-300">Acres</span></div>
          </div>
          <div className="bg-emerald-900/40 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
            <div className="text-emerald-200 text-xs font-medium">Avg Crop Health</div>
            <div className="text-xl sm:text-2xl font-black mt-1 text-white">{avgHealth}% <span className="text-xs font-semibold text-emerald-300">Vigorous</span></div>
          </div>
          <div className="bg-emerald-900/40 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
            <div className="text-emerald-200 text-xs font-medium">Harvest Ready</div>
            <div className="text-xl sm:text-2xl font-black mt-1 text-amber-300">{harvestReadyFields} <span className="text-xs font-semibold text-emerald-200">Plot(s)</span></div>
          </div>
          <div className="bg-emerald-900/40 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
            <div className="text-emerald-200 text-xs font-medium">Top Mandi Gainer</div>
            <div className="text-lg sm:text-xl font-black mt-1 text-white truncate">{topGainer?.commodity.split(' ')[0]} <span className="text-xs text-green-300">+{topGainer?.priceChange}%</span></div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Field Plots & Crop Stage Monitoring */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-stone-900">Active Field Plots & Crop Health</h2>
            </div>
            <button
              onClick={() => setActiveTab('fields')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
            >
              <span>View All Plots ({fields.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              const stageColor = {
                'Germination': 'bg-sky-100 text-sky-800 border-sky-200',
                'Vegetative': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                'Flowering': 'bg-amber-100 text-amber-800 border-amber-200',
                'Grain Filling': 'bg-indigo-100 text-indigo-800 border-indigo-200',
                'Harvest Ready': 'bg-green-600 text-white border-green-700'
              }[field.stage];

              const progressPercent = {
                'Germination': 20,
                'Vegetative': 45,
                'Flowering': 70,
                'Grain Filling': 88,
                'Harvest Ready': 100
              }[field.stage];

              return (
                <div 
                  key={field.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${stageColor}`}>
                          {field.stage}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          {field.areaAcres} Acres
                        </span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-base mt-1.5 group-hover:text-emerald-700 transition-colors">
                        {field.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                        {field.crop} • {field.variety}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-lg">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-extrabold">{field.healthScore}%</span>
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1">Health Score</span>
                    </div>
                  </div>

                  {/* Growth Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                      <span>Crop Lifecycle Progress</span>
                      <span className="font-bold text-stone-700">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          field.stage === 'Harvest Ready' ? 'bg-green-600' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next task & irrigation info */}
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs space-y-2">
                    <div className="flex items-start space-x-2 text-stone-600">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">
                        <strong className="text-stone-800">Task:</strong> {field.nextScheduledTask}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="flex items-center space-x-1">
                        <Droplets className="w-3 h-3 text-sky-500" />
                        <span>Irrigation: {field.irrigationType}</span>
                      </span>
                      <span>Watered: {field.lastWatered}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2">
                    <button
                      onClick={() => setActiveTab('fields')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Field Details & Logs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveTab('doctor')}
                      className="text-xs font-medium text-stone-500 hover:text-amber-700 flex items-center space-x-1 cursor-pointer"
                    >
                      <Stethoscope className="w-3 h-3 text-amber-500" />
                      <span>Check Symptoms</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Urgent Agro Alerts & Farm Notifications */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-900">
                    Agro Advisory Alert: Yellow Rust Risk & Aphid Spread
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                    High Priority
                  </span>
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Relative humidity reached 62% with night temperature at 18°C. This microclimate fosters Yellow Rust spores in Wheat and Mustard Aphid propagation. Farmers are advised to conduct morning inspections.
                </p>
                <div className="pt-2 flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('doctor')}
                    className="text-xs font-bold text-amber-900 underline hover:text-amber-950 cursor-pointer"
                  >
                    View Yellow Rust Treatment Protocols →
                  </button>
                  <button
                    onClick={() => setActiveTab('fertilizer')}
                    className="text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Calculate Foliar Dose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Weather Station & Mandi Quick Ticker */}
        <div className="space-y-6">
          
          {/* Weather & Spray Suitability Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs text-stone-500 font-medium">{weather.city}</span>
                <h3 className="font-bold text-stone-900 text-base">Agro Weather Station</h3>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <Sun className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-extrabold text-stone-900">
                  {weather.temperature}°C
                </div>
                <div className="text-xs text-stone-600 font-medium mt-0.5">
                  {weather.condition}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                  weather.spraySuitability === 'Excellent' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Spray: {weather.spraySuitability}
                </span>
                <div className="text-[10px] text-stone-400 mt-1">Wind & Rain Window</div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-100 text-center">
              <div className="bg-stone-50 rounded-lg p-2">
                <div className="flex items-center justify-center text-stone-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                </div>
                <div className="text-[11px] text-stone-500">Humidity</div>
                <div className="text-xs font-bold text-stone-800">{weather.humidity}%</div>
              </div>
              <div className="bg-stone-50 rounded-lg p-2">
                <div className="flex items-center justify-center text-stone-400 mb-1">
                  <Wind className="w-3.5 h-3.5 text-teal-500" />
                </div>
                <div className="text-[11px] text-stone-500">Wind</div>
                <div className="text-xs font-bold text-stone-800">{weather.windSpeed} km/h</div>
              </div>
              <div className="bg-stone-50 rounded-lg p-2">
                <div className="flex items-center justify-center text-stone-400 mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-[11px] text-stone-500">Rain Prob.</div>
                <div className="text-xs font-bold text-stone-800">{weather.rainfallProbability}%</div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
              <div className="text-xs font-bold text-stone-700">5-Day Farming Outlook</div>
              <div className="space-y-1.5">
                {weather.forecast.map((day, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-stone-50">
                    <span className="font-semibold text-stone-700 w-16">{day.day}</span>
                    <span className="text-stone-500 text-[11px]">{day.condition}</span>
                    <span className="text-stone-400 text-[11px]">{day.rainChance}% rain</span>
                    <span className="font-bold text-stone-800">{day.tempHigh}° / {day.tempLow}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mandi Quick Prices Ticker */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">Live Mandi Prices</h3>
              </div>
              <button
                onClick={() => setActiveTab('mandi')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                All Mandis →
              </button>
            </div>

            <div className="divide-y divide-stone-100 mt-2">
              {mandiPrices.slice(0, 4).map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-stone-900">{item.commodity}</div>
                    <div className="text-[11px] text-stone-500">{item.mandi}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-sm text-stone-900">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                    </div>
                    <div className={`text-[10px] font-bold flex items-center justify-end ${
                      item.priceChange >= 0 ? 'text-green-600' : 'text-rose-600'
                    }`}>
                      {item.priceChange >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      )}
                      <span>{Math.abs(item.priceChange)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 text-center">
              <button
                onClick={() => setActiveTab('mandi')}
                className="w-full py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                View APMC Trend Analysis
              </button>
            </div>
          </div>

          {/* Direct Marketplace Teaser */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-xl p-5 text-white shadow-xs">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span>Direct-to-Buyer Marketplace</span>
            </div>
            <h4 className="font-bold text-base mt-2">Eliminate Middlemen Commision</h4>
            <p className="text-stone-300 text-xs mt-1 leading-relaxed">
              List your harvested crops directly for millers, exporters, and wholesale buyers at 0% broker fees.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('marketplace')}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Buyers ({produceListings.length} Active)
              </button>
              <button
                onClick={onOpenProduceModal}
                className="px-3 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                List
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
