import React, { useState } from 'react';
import { SCHEMES_DATA } from '../data/centralData';
import { FarmProfileData } from '../types/farmhub';
import { 
  Landmark, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ExternalLink, 
  Sparkles, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface SchemesPageProps {
  farmProfile: FarmProfileData;
}

export const SchemesPage: React.FC<SchemesPageProps> = ({ farmProfile }) => {
  const [expandedId, setExpandedId] = useState<string | null>(SCHEMES_DATA[0].id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Landmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              Government Schemes & Subsidies
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Personalized subsidy recommendations based on your {farmProfile.farmArea}-acre {farmProfile.soilType.toLowerCase()} soil farm in {farmProfile.location}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            Controlled Demo Dataset
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Curated for Agra District
          </span>
        </div>
      </div>

      {/* Schemes Accordion List */}
      <div className="space-y-4">
        {SCHEMES_DATA.map((scheme) => {
          const isExpanded = expandedId === scheme.id;
          return (
            <div 
              key={scheme.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs transition-all"
            >
              <div 
                onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-stone-50/60 transition-colors"
              >
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {scheme.statusTag}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {scheme.ministry}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900">{scheme.name}</h3>
                  <div className="text-xs font-black text-emerald-700">
                    Benefit: {scheme.benefit}
                  </div>
                </div>

                <div className="p-2 text-stone-400 hover:text-stone-600 rounded-lg shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 pt-0 border-t border-stone-100 space-y-4 text-xs">
                  {/* Why Relevant Callout */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="font-black text-emerald-950 block">Why Relevant to Your Farm:</span>
                    <p className="text-emerald-900/90 leading-relaxed font-medium">
                      {scheme.whyRelevant}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <span className="font-extrabold text-stone-900 block flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Potential Eligibility:</span>
                      </span>
                      <p className="text-stone-600 leading-relaxed">
                        {scheme.potentialEligibility}
                      </p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <span className="font-extrabold text-stone-900 block flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-sky-600" />
                        <span>Required Documents:</span>
                      </span>
                      <ul className="space-y-1 text-stone-600">
                        {scheme.requiredDocuments.map((doc, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-stone-700 font-semibold">
                      <strong>Application Process:</strong> {scheme.applicationProcess}
                    </span>
                    <button
                      onClick={() => alert(`Redirecting to official portal instruction guide for ${scheme.name}`)}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
                    >
                      Apply Online Guide →
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
