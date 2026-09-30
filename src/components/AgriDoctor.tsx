import React, { useState } from 'react';
import { PestDisease } from '../types';
import { 
  Stethoscope, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Droplet, 
  Leaf, 
  Bug, 
  Info,
  ChevronRight
} from 'lucide-react';

interface AgriDoctorProps {
  pestDiseases: PestDisease[];
}

export const AgriDoctor: React.FC<AgriDoctorProps> = ({ pestDiseases }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>(pestDiseases[0]?.id || '');
  
  // Interactive diagnostic wizard
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [affectedPart, setAffectedPart] = useState<'Leaves' | 'Stem/Bolls' | 'Roots/Collar'>('Leaves');
  const [observedSymptom, setObservedSymptom] = useState<string>('Yellow stripes or spots');
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const crops = ['All', 'Wheat', 'Cotton', 'Potato & Tomato', 'Mustard', 'Rice (Paddy)'];

  const filteredDiseases = pestDiseases.filter(d => {
    const matchesCrop = selectedCrop === 'All' || d.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCrop && matchesSearch;
  });

  const activeDisease = pestDiseases.find(d => d.id === activeDiseaseId) || pestDiseases[0];

  const handleRunDiagnosis = () => {
    if (observedSymptom.includes('Yellow stripes') || observedSymptom.includes('powdery')) {
      setDiagnosticResult('High probability of Stripe (Yellow) Rust or Powdery Mildew fungal infection.');
      const rust = pestDiseases.find(p => p.id === 'pest-1');
      if (rust) setActiveDiseaseId(rust.id);
    } else if (observedSymptom.includes('Green-black tiny bugs') || observedSymptom.includes('Sticky')) {
      setDiagnosticResult('Infestation detected: Mustard Aphids (Lipaphis erysimi). Immediate foliar intervention advised.');
      const aphid = pestDiseases.find(p => p.id === 'pest-4');
      if (aphid) setActiveDiseaseId(aphid.id);
    } else if (observedSymptom.includes('Dark water-soaked') || observedSymptom.includes('blight')) {
      setDiagnosticResult('Identified: Late Blight (Phytophthora infestans). Rapid humidity control required.');
      const blight = pestDiseases.find(p => p.id === 'pest-3');
      if (blight) setActiveDiseaseId(blight.id);
    } else {
      setDiagnosticResult('Symptoms match Fungal/Pest leaf attack. Review targeted chemical & organic recommendations below.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Agri-Doctor: Crop Pest & Disease Diagnostic Clinic
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Identify leaf rusts, blights, stem borers, and aphids. Get accurate chemical and bio-organic dosages.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            ICAR & KVK Validated Protocols
          </span>
        </div>
      </div>

      {/* Interactive Symptom Analyzer Wizard */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center space-x-2 text-emerald-300">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h2 className="text-base font-bold text-white">Instant Crop Symptom Diagnostic Wizard</h2>
        </div>
        <p className="text-xs text-emerald-100/90 max-w-2xl leading-relaxed">
          Select what you observe on your standing crop to receive a diagnostic match and immediate treatment recipe:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">1. Affected Plant Part</label>
            <select
              value={affectedPart}
              onChange={(e) => setAffectedPart(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Leaves">Leaves & Foliage</option>
              <option value="Stem/Bolls">Stems, Flowers & Bolls</option>
              <option value="Roots/Collar">Roots & Soil Collar</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">2. Visual Symptom</label>
            <select
              value={observedSymptom}
              onChange={(e) => setObservedSymptom(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Yellow stripes or spots">Yellow stripes / powdery pustules on leaf</option>
              <option value="Green-black tiny bugs">Green-black tiny clusters of insects (Aphids)</option>
              <option value="Dark water-soaked">Dark water-soaked brown lesions & white fuzz</option>
              <option value="Rosetted flowers / bored holes">Bored holes, sawdust frass or rosette flower</option>
              <option value="Spindle shaped eye lesions">Spindle-shaped elliptical lesions with grey centers</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunDiagnosis}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Analyze & Prescribe Remedy
            </button>
          </div>
        </div>

        {diagnosticResult && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-800/80 border border-emerald-400/40 text-xs text-emerald-100 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Diagnostic Result:</span>
              <p className="mt-0.5">{diagnosticResult}</p>
            </div>
          </div>
        )}
      </div>

      {/* Search & Crop Filter */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search disease name, pathogen, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium">Filter by Crop:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Disease Cards & Selected Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Disease Catalog */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            Common Field Pathogens ({filteredDiseases.length})
          </div>

          <div className="space-y-2.5">
            {filteredDiseases.map((disease) => {
              const isSelected = disease.id === activeDisease?.id;
              const severityColor = {
                'Mild': 'text-amber-600 bg-amber-50 border-amber-200',
                'Moderate': 'text-orange-600 bg-orange-50 border-orange-200',
                'Severe': 'text-rose-700 bg-rose-50 border-rose-200'
              }[disease.severity];

              return (
                <div
                  key={disease.id}
                  onClick={() => setActiveDiseaseId(disease.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                      : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {disease.crop}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900 mt-0.5">{disease.name}</h3>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${severityColor}`}>
                      {disease.severity}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-2">
                    {disease.symptoms[0]}
                  </p>

                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Type: {disease.type}</span>
                    <span className="text-emerald-700 font-bold flex items-center space-x-0.5">
                      <span>View Remedy</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Treatment Protocols */}
        {activeDisease && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-stone-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {activeDisease.crop}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      Pathogen: {activeDisease.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900 mt-1.5">{activeDisease.name}</h2>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    activeDisease.severity === 'Severe' 
                      ? 'bg-rose-50 text-rose-800 border-rose-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    Severity: {activeDisease.severity}
                  </span>
                </div>
              </div>

              {/* Symptoms Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Key Symptoms to Look For:</span>
                </h3>
                <div className="space-y-1.5 bg-stone-50 p-4 rounded-xl border border-stone-200/70">
                  {activeDisease.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Treatments: Chemical vs Organic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Chemical Treatment */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
                    <Droplet className="w-4 h-4 text-sky-600" />
                    <span>Chemical Control (Allopathic)</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {activeDisease.chemicalControl}
                  </p>
                  <div className="pt-2 text-[11px] text-sky-800 font-semibold border-t border-sky-200/60">
                    Dosage: {activeDisease.dosage}
                  </div>
                </div>

                {/* Organic / Bio Treatment */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>Bio-Organic & Natural Control</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {activeDisease.organicControl}
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-800 font-semibold border-t border-emerald-200/60">
                    Safety: Zero residue toxicity, safe for beneficial pollinating insects.
                  </div>
                </div>

              </div>

              {/* Agronomic Prevention & Best Practices */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-1">
                <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Cultural Prevention & Agronomic Hygiene</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed pt-1">
                  {activeDisease.preventionTips}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
