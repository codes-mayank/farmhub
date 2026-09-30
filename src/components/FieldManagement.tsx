import React, { useState } from 'react';
import { FieldPlot } from '../types';
import { FarmProfileData, PageId } from '../types/farmhub';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Plus, 
  Droplets, 
  Calendar, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Layers, 
  Activity,
  ArrowRight,
  Clock,
  FileText,
  Bot
} from 'lucide-react';

interface FieldManagementProps {
  fields?: FieldPlot[];
  setFields?: React.Dispatch<React.SetStateAction<FieldPlot[]>>;
  onOpenNewFieldModal?: () => void;
  farmProfile?: FarmProfileData;
  setCurrentPage?: (page: PageId) => void;
}

const DEFAULT_FIELDS: FieldPlot[] = [
  {
    id: 'f-1',
    name: 'North Block (Main Field)',
    areaAcres: 3.0,
    crop: 'Potato',
    variety: 'Kufri Bahar',
    sowingDate: '2026-11-15',
    expectedHarvestDate: '2027-02-15',
    stage: 'Harvest Ready',
    irrigationType: 'Canal / Drip',
    soilType: 'Loamy',
    healthScore: 94,
    lastWatered: 'Yesterday (2 hours)',
    nextScheduledTask: 'Emergency harvest before rain event',
    notes: 'Tuber skin is firm. Excellent size 45-65mm. Immediate harvesting advised.'
  },
  {
    id: 'f-2',
    name: 'South Block (Channel Side)',
    areaAcres: 2.0,
    crop: 'Potato',
    variety: 'Kufri Bahar',
    sowingDate: '2026-11-18',
    expectedHarvestDate: '2027-02-18',
    stage: 'Harvest Ready',
    irrigationType: 'Borewell Sprinkler',
    soilType: 'Loamy',
    healthScore: 91,
    lastWatered: '2 days ago',
    nextScheduledTask: 'Foliar dehaulming cutting',
    notes: 'Field edge exhibits minor soil saturation. Clear drainage ditches.'
  }
];

export const FieldManagement: React.FC<FieldManagementProps> = ({
  fields = DEFAULT_FIELDS,
  setFields,
  onOpenNewFieldModal,
  farmProfile,
  setCurrentPage
}) => {
  const { language, t } = useLanguage();
  const [localFields, setLocalFields] = useState<FieldPlot[]>(fields);
  const activeFields = setFields ? fields : localFields;

  const [selectedFieldId, setSelectedFieldId] = useState<string>(activeFields[0]?.id || 'f-1');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [waterModalField, setWaterModalField] = useState<FieldPlot | null>(null);
  const [waterDuration, setWaterDuration] = useState('2 hours');

  const selectedField = activeFields.find(f => f.id === selectedFieldId) || activeFields[0];

  const stages: FieldPlot['stage'][] = [
    'Germination',
    'Vegetative',
    'Flowering',
    'Grain Filling',
    'Harvest Ready'
  ];

  const handleStageChange = (fieldId: string, newStage: FieldPlot['stage']) => {
    const updater = (prev: FieldPlot[]) => prev.map(f => f.id === fieldId ? { ...f, stage: newStage } : f);
    if (setFields) setFields(updater);
    else setLocalFields(updater);
  };

  const handleSaveNotes = (fieldId: string) => {
    const updater = (prev: FieldPlot[]) => prev.map(f => f.id === fieldId ? { ...f, notes: tempNotes } : f);
    if (setFields) setFields(updater);
    else setLocalFields(updater);
    setEditingNotesId(null);
  };

  const handleLogIrrigation = () => {
    if (!waterModalField) return;
    const updater = (prev: FieldPlot[]) => prev.map(f => {
      if (f.id === waterModalField.id) {
        return {
          ...f,
          lastWatered: `Today (${waterDuration})`,
          healthScore: Math.min(100, f.healthScore + 2)
        };
      }
      return f;
    });
    if (setFields) setFields(updater);
    else setLocalFields(updater);
    setWaterModalField(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {language === 'hi' ? 'खेत एवं फसल जीवन-चक्र प्रबंधन' : 'Field & Crop Lifecycle Management'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'hi'
              ? 'अपनी ५ एकड़ भूमि के प्लॉट्स में वृद्धि चरणों, सिंचाई चक्रों और कृषि कार्यों का हिसाब रखें।'
              : 'Track vegetative stages, irrigation cycles, soil types, and planned agro operations across your farm.'}
          </p>
        </div>

        {onOpenNewFieldModal && (
          <button
            onClick={onOpenNewFieldModal}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-md hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'नया प्लॉट जोड़ें' : 'Add New Field Plot'}</span>
          </button>
        )}
      </div>

      {/* Main Grid: Field Selector & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Plot List & Quick Selector */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            {language === 'hi' ? `पंजीकृत प्लॉट्स (${activeFields.length})` : `Registered Plots (${activeFields.length})`}
          </div>

          <div className="space-y-2.5">
            {activeFields.map((field) => {
              const isSelected = field.id === selectedFieldId;
              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                      : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-stone-900">{field.name}</h3>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">
                        {field.crop} ({field.variety})
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {field.areaAcres} Acres
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <span className="font-medium text-stone-600">
                      Stage: <span className="font-bold text-stone-800">{field.stage}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{field.healthScore}% Vigour</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Selected Plot Workspace */}
        {selectedField ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
              
              {/* Plot Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-100 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-stone-900">{selectedField.name}</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedField.areaAcres} Acres
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">
                    {selectedField.crop} • Variety: {selectedField.variety}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setWaterModalField(selectedField)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold hover:bg-sky-100 transition-colors cursor-pointer"
                  >
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span>{language === 'hi' ? 'सिंचाई दर्ज करें' : 'Log Irrigation'}</span>
                  </button>
                </div>
              </div>

              {/* Stage Lifecycle Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {language === 'hi' ? 'फसल विकास चरण ट्रैकर' : 'Crop Growth Lifecycle Tracker'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Current: <strong>{selectedField.stage}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {stages.map((stageName, idx) => {
                    const currentIndex = stages.indexOf(selectedField.stage);
                    const isPassed = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <button
                        key={stageName}
                        onClick={() => handleStageChange(selectedField.id, stageName)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                            : isPassed
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                          Step {idx + 1}
                        </div>
                        <div className="font-bold text-xs mt-0.5 truncate">{stageName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plot Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-xs">
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Soil Type</div>
                  <div className="font-bold text-stone-900 mt-0.5">{selectedField.soilType}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Irrigation</div>
                  <div className="font-bold text-stone-900 mt-0.5">{selectedField.irrigationType}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Sowing Date</div>
                  <div className="font-bold text-stone-900 mt-0.5">{selectedField.sowingDate}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Harvest Window</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{selectedField.expectedHarvestDate}</div>
                </div>
              </div>

              {/* Next Scheduled Farm Task */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                    <Clock className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-emerald-900">
                      {language === 'hi' ? 'अगला प्रस्तावित खेत कार्य' : 'Next Agro Operation in Schedule'}
                    </div>
                    <p className="text-xs text-stone-700 mt-0.5">
                      {selectedField.nextScheduledTask}
                    </p>
                    <div className="mt-2 text-[11px] text-stone-500 flex items-center space-x-4">
                      <span>Last Watered: <strong>{selectedField.lastWatered}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Return Links */}
              {setCurrentPage && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-stone-600 font-medium">
                    {language === 'hi' ? 'खेत परिपक्व होने पर अगली फसल योजना बनाएं:' : 'When plot harvest completes, plan next cycle:'}
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
        ) : null}

      </div>
    </div>
  );
};
