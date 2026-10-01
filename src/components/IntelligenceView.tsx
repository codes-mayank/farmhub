import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { fetchFarmIntelligence } from "../lib/api/intelligenceService";
import { AnalysisResponse } from "../types/farm";

const ANALYSIS_STEPS = [
  "Farm Data Verified",
  "Soil Suitability Evaluated",
  "Weather Conditions Screened",
  "Regional Supply Benchmarked",
  "Market Demand Projected",
  "Price Outlook Calculated",
  "Production Cost Estimated",
  "Expected Profit Bounded",
  "Risk Metrics Synthesized",
];

export const IntelligenceView: React.FC = () => {
  const { farm } = useFarm();
  const [loading, setLoading] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [supplySurgePct, setSupplySurgePct] = useState(0);
  const [data, setData] = useState<AnalysisResponse | null>(null);

  const runAnalysis = async (extraPct: number = supplySurgePct) => {
    setLoading(true);
    setCurrentStepIdx(0);

    // Fast animation sequence (Rule 12)
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 180);

    const response = await fetchFarmIntelligence(farm, extraPct);
    clearInterval(interval);
    setData(response);
    setLoading(false);
  };

  const handleSliderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSupplySurgePct(val);
    const updated = await fetchFarmIntelligence(farm, val);
    setData(updated);
  };

  return (
    <div className="space-y-8">
      {/* Header & Farm Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-emerald-950">FarmHub Intelligence Engine</h1>
          <p className="text-sm text-gray-500">
            Analyzing farm in <span className="font-semibold text-gray-800">{farm.location}</span> ({(farm as any).farmArea ?? (farm as any).area ?? 5} Acres, {(farm as any).soilType ?? (farm as any).soil ?? 'Loamy'} Soil, {farm.waterAvailability})
          </p>
        </div>
        <button
          onClick={() => runAnalysis(supplySurgePct)}
          disabled={loading}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition disabled:opacity-50"
        >
          {loading ? "Analyzing Models..." : "Analyze My Farm"}
        </button>
      </div>

      {/* Fast Analysis Sequence Overlay */}
      {loading && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
            Running Dual-Model Inference Pipeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {ANALYSIS_STEPS.map((step, idx) => (
              <div
                key={step}
                className={`text-xs flex items-center gap-1.5 transition-colors ${
                  idx <= currentStepIdx ? "text-emerald-700 font-medium" : "text-gray-400"
                }`}
              >
                <span>{idx <= currentStepIdx ? "✓" : "○"}</span> {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {data && !loading && (
        <div className="space-y-8">
          {/* Section 21: Supply-Demand Feedback Loop Interactive Slider */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="font-bold text-amber-950">
                Supply-Demand Feedback Simulation
              </h3>
              <span className="text-xs bg-amber-200/80 text-amber-900 font-semibold px-2.5 py-1 rounded-full">
                +{supplySurgePct}% District Cultivation
              </span>
            </div>
            <p className="text-xs text-amber-800 mb-4">
              Simulate market shifts if neighboring farmers follow the recommendation. Notice how expected profit and risk scores adjust in real time:
            </p>
            <input
              type="range"
              min="0"
              max="40"
              step="10"
              value={supplySurgePct}
              onChange={handleSliderChange}
              className="w-full max-w-md accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Top 3 Crop Recommendation Cards (Section 14 & 15) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.recommendations.map((rec) => (
              <div
                key={rec.crop}
                className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{rec.crop}</h2>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {Math.round(rec.suitabilityScore * 100)}% Suitability
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        rec.riskLevel === "High"
                          ? "bg-red-100 text-red-800"
                          : rec.riskLevel === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {rec.riskLevel} Risk
                    </span>
                  </div>

                  <div className="space-y-3 py-3 border-y my-3">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block">
                        Expected Net Profit ({(farm as any).farmArea ?? (farm as any).area ?? 5} Acres)
                      </span>
                      <span className="text-xl font-bold text-emerald-950">
                        {rec.profitFormattedRange}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="text-gray-400 block">Upfront Cost</span>
                        ₹{rec.costTotal.toLocaleString("en-IN")}
                      </div>
                      <div>
                        <span className="text-gray-400 block">Market Demand</span>
                        {rec.demandTrend} Trend
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explainable Decision Factors */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-gray-700 block">Why FarmHub recommends this:</span>
                  {rec.riskReasons.map((reason, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> {reason}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 italic">
            * Some market, weather and profitability values shown in this prototype are simulated for demonstration purposes.
          </div>
        </div>
      )}
    </div>
  );
};