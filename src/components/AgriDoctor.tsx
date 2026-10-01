import React, { useState } from 'react';
import { PestDisease } from '../types';
import { FarmProfileData, PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
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
  ChevronRight,
  ArrowRight,
  Bot
} from 'lucide-react';

interface AgriDoctorProps {
  pestDiseases?: PestDisease[];
  farmProfile?: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

// Fallback demo data if none provided
const DEFAULT_PEST_DISEASES: PestDisease[] = [
  {
    id: 'pest-1',
    name: 'Yellow (Stripe) Rust of Wheat',
    crop: 'Wheat',
    type: 'Fungal',
    severity: 'Severe',
    symptoms: [
      'Bright yellow pustules arranged in linear stripes along leaf veins.',
      'Yellow powder sheds easily onto hands or clothing when touched.',
      'Leaves dry out prematurely causing shriveled grains and 30-50% yield loss.'
    ],
    chemicalControl: 'Foliar spray of Propiconazole 25% EC @ 1ml per liter of water or Tebuconazole 25.9% EC.',
    dosage: '200ml per acre dissolved in 200 liters of water.',
    organicControl: 'Foliar spray of Neem Oil (10,000 ppm) @ 3ml/liter + Panchagavya 3% spray at early onset.',
    preventionTips: 'Use resistant varieties like HD-2967 or PBW-550. Avoid excessive nitrogenous fertilizers in humid weather.'
  },
  {
    id: 'pest-2',
    name: 'Mustard Aphids (Mahu)',
    crop: 'Mustard',
    type: 'Pest/Insect',
    severity: 'Moderate',
    symptoms: [
      'Clusters of green-black tiny sap-sucking insects on inflorescence & young pods.',
      'Excretion of sticky honeydew causing black sooty mold growth on leaves.',
      'Stunted pod growth and reduction in oil seed formation.'
    ],
    chemicalControl: 'Foliar spray of Dimethoate 30% EC @ 1.7ml/liter or Imidacloprid 17.8% SL @ 0.5ml/liter.',
    dosage: '100ml Imidacloprid per acre dissolved in 150 liters of water.',
    organicControl: 'Spray Verticillium lecanii bio-fungicide @ 5g/liter or NSKE (Neem Seed Kernel Extract 5%).',
    preventionTips: 'Sow early (before 20th October) to avoid aphid peak migration window in December-January.'
  },
  {
    id: 'pest-3',
    name: 'Potato Late Blight (Phytophthora)',
    crop: 'Potato & Tomato',
    type: 'Fungal',
    severity: 'Severe',
    symptoms: [
      'Dark water-soaked brown lesions on leaf margins rapidly enlarging in damp weather.',
      'White cottony fungal growth on lower surface of leaves during humid mornings.',
      'Tuber rot in soil turning tubers into soft foul-smelling pulpy mass.'
    ],
    chemicalControl: 'Prophylactic spray of Mancozeb 75% WP @ 2g/liter followed by Cymoxanil + Mancozeb @ 2g/liter on symptom onset.',
    dosage: '600g per acre dissolved in 200 liters of water.',
    organicControl: 'Copper Oxychloride 50% WP @ 3g/liter or Bio-agent Trichoderma viride @ 5g/liter foliar spray.',
    preventionTips: 'Stop irrigation immediately when heavy rain is forecasted. Perform dehaulming 10 days before harvest.'
  }
];

export const AgriDoctor: React.FC<AgriDoctorProps> = ({ 
  pestDiseases = DEFAULT_PEST_DISEASES,
  farmProfile,
  setCurrentPage 
}) => {
  const { language, t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>(pestDiseases[0]?.id || '');
  
  // Interactive diagnostic wizard
  const [affectedPart, setAffectedPart] = useState<'Leaves' | 'Stem/Bolls' | 'Roots/Collar'>('Leaves');
  const [observedSymptom, setObservedSymptom] = useState<string>('Dark water-soaked');
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const crops = ['All', 'Wheat', 'Potato & Tomato', 'Mustard', 'Cotton', 'Rice (Paddy)'];

  const filteredDiseases = pestDiseases.filter(d => {
    const matchesCrop = selectedCrop === 'All' || d.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCrop && matchesSearch;
  });

  const activeDisease = pestDiseases.find(d => d.id === activeDiseaseId) || pestDiseases[0];

  const handleRunDiagnosis = () => {
    if (observedSymptom.includes('Yellow stripes') || observedSymptom.includes('powdery')) {
      setDiagnosticResult(language === 'hi' 
        ? 'अनुमानित निदान: पीला रतुआ (Yellow Rust) अथवा चूर्णिल आसिता (Powdery Mildew)।' 
        : 'High probability of Stripe (Yellow) Rust or Powdery Mildew fungal infection.');
      const rust = pestDiseases.find(p => p.id === 'pest-1');
      if (rust) setActiveDiseaseId(rust.id);
    } else if (observedSymptom.includes('Green-black tiny bugs') || observedSymptom.includes('Aphids')) {
      setDiagnosticResult(language === 'hi'
        ? 'अनुमानित निदान: सरसों का माहू (Mustard Aphids)। तुरंत नीम तेल अथवा अनुशंसित कीटनाशक छिड़कें।'
        : 'Infestation detected: Mustard Aphids (Lipaphis erysimi). Immediate foliar intervention advised.');
      const aphid = pestDiseases.find(p => p.id === 'pest-2');
      if (aphid) setActiveDiseaseId(aphid.id);
    } else if (observedSymptom.includes('Dark water-soaked') || observedSymptom.includes('blight')) {
      setDiagnosticResult(language === 'hi'
        ? 'अनुमानित निदान: आलू/टमाटर का पछेता झुलसा (Late Blight)। आर्द्रता नियंत्रण व कॉपर फफूंदनाशी आवश्यक।'
        : 'Identified: Late Blight (Phytophthora infestans). Rapid humidity control & copper fungicide required.');
      const blight = pestDiseases.find(p => p.id === 'pest-3');
      if (blight) setActiveDiseaseId(blight.id);
    } else {
      setDiagnosticResult(language === 'hi'
        ? 'लक्षणों के आधार पर फफूंद अथवा कीट हमले की संभावना। नीचे अनुशंसित उपचार देखें।'
        : 'Symptoms match Fungal/Pest leaf attack. Review targeted chemical & organic recommendations below.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {language === 'hi' ? 'फार्महब फसल डॉक्टर व रोग निदान क्लीनिक' : 'Agri-Doctor: Crop Pest & Disease Diagnostic Clinic'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'hi'
              ? 'आलू का झुलसा, सरसों का माहू व गेहूं के रतुआ का वैज्ञानिक निदान और अनुशंसित जैविक व रासायनिक उपचार।'
              : 'Identify leaf rusts, blights, stem borers, and aphids. Get accurate chemical and bio-organic dosages.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {language === 'hi' ? 'नियंत्रित डेमो निदान मॉडल' : 'Controlled Demo Diagnostic Model'}
          </span>
        </div>
      </div>

      {/* Interactive Symptom Analyzer Wizard */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
          <div className="flex items-center space-x-2 text-emerald-300">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-black text-white">
              {language === 'hi' ? 'त्वरित लक्षण निदान विज़ार्ड' : 'Instant Crop Symptom Diagnostic Wizard'}
            </h2>
          </div>
          {farmProfile && (
            <span className="text-xs text-emerald-200 font-medium">
              {farmProfile.farmerName} • {farmProfile.currentCrop} ({farmProfile.location})
            </span>
          )}
        </div>

        <p className="text-xs text-emerald-100/90 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'अपनी खड़ी फसल में दिखाई देने वाले लक्षणों का चयन करें और तत्काल रोग पहचान व उपचार पर्चा प्राप्त करें:'
            : 'Select what you observe on your standing crop to receive a diagnostic match and immediate treatment recipe:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">
              {language === 'hi' ? '१. प्रभावित पौधा अंग' : '1. Affected Plant Part'}
            </label>
            <select
              value={affectedPart}
              onChange={(e) => setAffectedPart(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Leaves">{language === 'hi' ? 'पत्तियां व पत्तों की सतह' : 'Leaves & Foliage'}</option>
              <option value="Stem/Bolls">{language === 'hi' ? 'तना, फूल व तना गांठ' : 'Stems, Flowers & Bolls'}</option>
              <option value="Roots/Collar">{language === 'hi' ? 'जड़ व मिटटी के पास का तना' : 'Roots & Soil Collar'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">
              {language === 'hi' ? '२. दृश्यमान लक्षण' : '2. Visual Symptom'}
            </label>
            <select
              value={observedSymptom}
              onChange={(e) => setObservedSymptom(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Dark water-soaked">{language === 'hi' ? 'गहरे भूरे जलभराव वाले धब्बे व सफेद फफूंद (आलू झुलसा)' : 'Dark water-soaked brown lesions & white fuzz'}</option>
              <option value="Green-black tiny bugs">{language === 'hi' ? 'हरे-काले छोटे कीड़ों का गुच्छा (सरसों का माहू)' : 'Green-black tiny clusters of insects (Aphids)'}</option>
              <option value="Yellow stripes or spots">{language === 'hi' ? 'पत्तियों पर पीले पाउडर की धारियां (गेहूं का रतुआ)' : 'Yellow stripes / powdery pustules on leaf'}</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunDiagnosis}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'hi' ? 'रोग विश्लेषण व उपचार देखें' : 'Analyze & Prescribe Remedy'}
            </button>
          </div>
        </div>

        {diagnosticResult && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-800/90 border border-emerald-400/40 text-xs text-emerald-100 flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-white block">{language === 'hi' ? 'अनुमानित डेमो निदान परिणाम:' : 'Demo Diagnostic Match:'}</span>
                <p className="mt-0.5 leading-relaxed">{diagnosticResult}</p>
              </div>
            </div>

            {setCurrentPage && (
              <button
                onClick={() => setCurrentPage('assistant')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs shrink-0 flex items-center space-x-1 hover:bg-emerald-400 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search & Crop Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={language === 'hi' ? 'रोग का नाम या लक्षण खोजें...' : 'Search disease name, pathogen, or symptoms...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium">{language === 'hi' ? 'फसल अनुसार:' : 'Filter by Crop:'}</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
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
            {language === 'hi' ? `सामान्य फसल रोग (${filteredDiseases.length})` : `Common Field Pathogens (${filteredDiseases.length})`}
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
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
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
                      <h3 className="font-extrabold text-sm text-stone-900 mt-0.5">{disease.name}</h3>
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
                      <span>{language === 'hi' ? 'उपचार देखें' : 'View Remedy'}</span>
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
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
              
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
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1.5">{activeDisease.name}</h2>
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
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'hi' ? 'मुख्य पहचान लक्षण:' : 'Key Symptoms to Look For:'}</span>
                </h3>
                <div className="space-y-1.5 bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
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
                <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
                    <Droplet className="w-4 h-4 text-sky-600" />
                    <span>{language === 'hi' ? 'रासायनिक नियंत्रण (Allopathic)' : 'Chemical Control (Allopathic)'}</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {activeDisease.chemicalControl}
                  </p>
                  <div className="pt-2 text-[11px] text-sky-800 font-semibold border-t border-sky-200/60">
                    Dosage: {activeDisease.dosage}
                  </div>
                </div>

                {/* Organic / Bio Treatment */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'hi' ? 'जैविक व प्राकृतिक नियंत्रण' : 'Bio-Organic & Natural Control'}</span>
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {activeDisease.organicControl}
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-800 font-semibold border-t border-emerald-200/60">
                    Safety: Zero residue toxicity, safe for beneficial pollinating insects.
                  </div>
                </div>

              </div>

              {/* Return Link to Emergency or Intelligence */}
              {setCurrentPage && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-stone-600 font-medium">
                    {language === 'hi' ? 'फसल झुलसा रोग बारिश से बढ़ता है। आपातकालीन कटाई देखें:' : 'Blight spreads rapidly with rainfall. Review emergency harvest plan:'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage('emergency')}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      {language === 'hi' ? 'आपातकालीन योजना →' : 'Emergency Plan →'}
                    </button>
                    <button
                      onClick={() => setCurrentPage('intelligence')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      {language === 'hi' ? 'फसल चक्र बदलें →' : 'Crop Intelligence →'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
