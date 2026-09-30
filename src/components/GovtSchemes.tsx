import React, { useState } from 'react';
import { GovtScheme } from '../types';
import { 
  Landmark, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ExternalLink, 
  Sparkles, 
  Award, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GovtSchemesProps {
  schemes: GovtScheme[];
}

export const GovtSchemes: React.FC<GovtSchemesProps> = ({ schemes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(schemes[0]?.id || null);
  
  // Eligibility quiz state
  const [quizLandSize, setQuizLandSize] = useState<'marginal' | 'small' | 'medium'>('small');
  const [quizIrrigation, setQuizIrrigation] = useState<'assured' | 'rainfed'>('assured');
  const [quizOwnership, setQuizOwnership] = useState<'owner' | 'tenant'>('owner');
  const [quizResult, setQuizResult] = useState<string[] | null>(null);

  const categories = ['All', 'Direct Income', 'Insurance', 'Irrigation', 'Equipment Subsidy', 'Credit/Loan'];

  const filteredSchemes = schemes.filter(s => {
    return selectedCategory === 'All' || s.category === selectedCategory;
  });

  const handleCheckEligibility = () => {
    const eligible: string[] = [];
    
    // PM-KISAN: Owners eligible
    if (quizOwnership === 'owner') {
      eligible.push('PM-KISAN: Eligible for ₹6,000 annual direct cash transfer.');
    } else {
      eligible.push('PM-KISAN: Requires owned landholding title for direct cash benefits.');
    }

    // PMFBY: Both owner & tenant eligible
    eligible.push('PMFBY (Crop Insurance): 100% Eligible! Premium capped at 1.5% for Rabi & 2.0% for Kharif crops.');

    // PMKSY: Assured water source needed
    if (quizIrrigation === 'assured') {
      const subsidy = quizLandSize === 'marginal' || quizLandSize === 'small' ? '55%' : '45%';
      eligible.push(`PMKSY (Micro-Irrigation): Eligible for ${subsidy} government subsidy on Drip & Sprinkler installations.`);
    }

    // SMAM: Machinery subsidy
    eligible.push('SMAM (Agri Mechanization): Eligible for 40-50% subsidy on Tractors, Rotavators & Drone spraying services.');

    // KCC: Eligible
    eligible.push('Kisan Credit Card (KCC): Eligible for subsidized crop loan up to ₹3 Lakh at prompt 4% interest.');

    setQuizResult(eligible);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Landmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Government Schemes, Subsidies & Benefits
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Official government subsidies for drip irrigation, tractor purchases, PM-KISAN payouts, and crop insurance claims.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Govt of India Verified 2026-27
          </span>
        </div>
      </div>

      {/* Instant Eligibility Checker Widget */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h2 className="text-base font-bold">Instant Farmer Subsidy Eligibility Checker</h2>
        </div>
        <p className="text-xs text-emerald-100/90 max-w-2xl leading-relaxed">
          Select your land profile to instantly check which central and state subsidies you qualify for:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Landholding Size</label>
            <select
              value={quizLandSize}
              onChange={(e) => setQuizLandSize(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:ring-2 focus:ring-emerald-400"
            >
              <option value="marginal">Marginal Farmer (&lt; 2.5 Acres)</option>
              <option value="small">Small Farmer (2.5 to 5.0 Acres)</option>
              <option value="medium">Medium / Large Farmer (&gt; 5.0 Acres)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Ownership Status</label>
            <select
              value={quizOwnership}
              onChange={(e) => setQuizOwnership(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:ring-2 focus:ring-emerald-400"
            >
              <option value="owner">Landowner (Title in Name)</option>
              <option value="tenant">Tenant Farmer / Sharecropper</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Water Source</label>
            <select
              value={quizIrrigation}
              onChange={(e) => setQuizIrrigation(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:ring-2 focus:ring-emerald-400"
            >
              <option value="assured">Assured Source (Borewell / Well / Canal)</option>
              <option value="rainfed">Monsoon Rainfed Only</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <button
            onClick={handleCheckEligibility}
            className="py-2.5 px-6 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Check Eligible Subsidies & Benefits
          </button>
        </div>

        {quizResult && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-xs text-emerald-100 space-y-2">
            <div className="font-bold text-white text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Your Subsidies Assessment:</span>
            </div>
            <div className="space-y-1.5 pt-1">
              {quizResult.map((res, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes Accordion List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          return (
            <div 
              key={scheme.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all"
            >
              <div 
                onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {scheme.category}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {scheme.department}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-stone-900">{scheme.title}</h3>
                  <div className="text-xs font-bold text-emerald-700">
                    Benefit: {scheme.benefitAmount}
                  </div>
                </div>

                <div className="p-2 text-stone-400 hover:text-stone-600 rounded-lg">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-100 space-y-4 text-xs">
                  <p className="text-stone-700 leading-relaxed font-medium pt-3">
                    {scheme.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70 space-y-2">
                      <span className="font-bold text-stone-900 block flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Eligibility Criteria:</span>
                      </span>
                      <ul className="space-y-1 text-stone-600">
                        {scheme.criteria.map((c, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70 space-y-2">
                      <span className="font-bold text-stone-900 block flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-sky-600" />
                        <span>Required Documents:</span>
                      </span>
                      <ul className="space-y-1 text-stone-600">
                        {scheme.documentsRequired.map((doc, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-sky-700 font-bold">•</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <span className="font-semibold text-emerald-900">
                      How to apply: {scheme.applyLinkText}
                    </span>
                    <button
                      onClick={() => alert(`Application portal link guidance: ${scheme.applyLinkText}`)}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Application Guide
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
