import React, { useState } from 'react';
import { FieldPlot } from '../types';
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
  FileText
} from 'lucide-react';

interface FieldManagementProps {
  fields: FieldPlot[];
  setFields: React.Dispatch<React.SetStateAction<FieldPlot[]>>;
  onOpenNewFieldModal: () => void;
}

export const FieldManagement: React.FC<FieldManagementProps> = ({
  fields,
  setFields,
  onOpenNewFieldModal
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState<string>(fields[0]?.id || '');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [waterModalField, setWaterModalField] = useState<FieldPlot | null>(null);
  const [waterDuration, setWaterDuration] = useState('2 hours');

  const selectedField = fields.find(f => f.id === selectedFieldId) || fields[0];

  const stages: FieldPlot['stage'][] = [
    'Germination',
    'Vegetative',
    'Flowering',
    'Grain Filling',
    'Harvest Ready'
  ];

  const handleStageChange = (fieldId: string, newStage: FieldPlot['stage']) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return { ...f, stage: newStage };
      }
      return f;
    }));
  };

  const handleSaveNotes = (fieldId: string) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return { ...f, notes: tempNotes };
      }
      return f;
    }));
    setEditingNotesId(null);
  };

  const handleLogIrrigation = () => {
    if (!waterModalField) return;
    setFields(prev => prev.map(f => {
      if (f.id === waterModalField.id) {
        return {
          ...f,
          lastWatered: `Today (${waterDuration})`,
          healthScore: Math.min(100, f.healthScore + 2)
        };
      }
      return f;
    }));
    setWaterModalField(null);
  };

  const handleDeleteField = (fieldId: string) => {
    if (confirm('Are you sure you want to remove this field plot?')) {
      setFields(prev => prev.filter(f => f.id !== fieldId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Field & Crop Lifecycle Management
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track vegetative stages, irrigation cycles, soil types, and planned agro operations across your farm.
          </p>
        </div>

        <button
          onClick={onOpenNewFieldModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm shadow-md hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Field Plot</span>
        </button>
      </div>

      {/* Main Grid: Field Selector & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Plot List & Quick Selector */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            Registered Plots ({fields.length})
          </div>

          <div className="space-y-2.5">
            {fields.map((field) => {
              const isSelected = field.id === selectedFieldId;
              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                      : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{field.name}</h3>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
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
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
              
              {/* Plot Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-100 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-stone-900">{selectedField.name}</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedField.areaAcres} Acres
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                    {selectedField.crop} • Variety: {selectedField.variety}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setWaterModalField(selectedField)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold hover:bg-sky-100 transition-colors cursor-pointer"
                  >
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span>Log Irrigation</span>
                  </button>
                  <button
                    onClick={() => handleDeleteField(selectedField.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete plot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Lifecycle Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Crop Growth Lifecycle Tracker
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50/70 p-4 rounded-xl border border-stone-200/60">
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Soil Classification</div>
                  <div className="text-xs font-bold text-stone-900 mt-0.5">{selectedField.soilType}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Irrigation System</div>
                  <div className="text-xs font-bold text-stone-900 mt-0.5">{selectedField.irrigationType}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Sowing Date</div>
                  <div className="text-xs font-bold text-stone-900 mt-0.5">{selectedField.sowingDate}</div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Expected Harvest</div>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">{selectedField.expectedHarvestDate}</div>
                </div>
              </div>

              {/* Next Scheduled Farm Task */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                    <Clock className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-emerald-900">
                      Next Agro Operation in Schedule
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

              {/* Field Notes & Agronomist Diary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>Agronomist Field Notes</span>
                  </span>
                  {editingNotesId !== selectedField.id && (
                    <button
                      onClick={() => {
                        setEditingNotesId(selectedField.id);
                        setTempNotes(selectedField.notes);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Notes</span>
                    </button>
                  )}
                </div>

                {editingNotesId === selectedField.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Record fertilizer dosages, pest observations, seed germination rates..."
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-3 py-1.5 text-xs text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(selectedField.id)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 cursor-pointer"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/70 italic">
                    "{selectedField.notes || 'No field notes logged yet. Click Edit Notes to add observations.'}"
                  </p>
                )}
              </div>

            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500">
            No fields currently registered. Click "Add New Field Plot" to start.
          </div>
        )}

      </div>

      {/* Irrigation Logging Modal */}
      {waterModalField && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center space-x-3 text-sky-600">
              <div className="p-2 bg-sky-100 rounded-lg">
                <Droplets className="w-5 h-5 text-sky-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">Log Irrigation Cycle</h3>
                <p className="text-xs text-stone-500">{waterModalField.name} ({waterModalField.crop})</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Watering Duration / Volume
                </label>
                <select
                  value={waterDuration}
                  onChange={(e) => setWaterDuration(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="30 mins">30 mins (Light Drip)</option>
                  <option value="1 hour">1 hour (Standard Drip)</option>
                  <option value="2 hours">2 hours (Full Soaking)</option>
                  <option value="3 hours">3 hours (Canal Flooding)</option>
                  <option value="4+ hours">4+ hours (Deep Root Zone)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Method Used
                </label>
                <div className="text-xs bg-stone-100 p-2.5 rounded-lg text-stone-800 font-medium">
                  {waterModalField.irrigationType} System
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setWaterModalField(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogIrrigation}
                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
              >
                Confirm & Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
