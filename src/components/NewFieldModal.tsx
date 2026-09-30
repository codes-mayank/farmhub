import React, { useState } from 'react';
import { FieldPlot } from '../types';
import { Layers, X } from 'lucide-react';

interface NewFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (field: FieldPlot) => void;
}

export const NewFieldModal: React.FC<NewFieldModalProps> = ({
  isOpen,
  onClose,
  onAddField
}) => {
  const [name, setName] = useState('');
  const [areaAcres, setAreaAcres] = useState<number>(3.5);
  const [crop, setCrop] = useState('Wheat (Gehun)');
  const [variety, setVariety] = useState('HD-2967');
  const [sowingDate, setSowingDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-03-30');
  const [stage, setStage] = useState<FieldPlot['stage']>('Vegetative');
  const [soilType, setSoilType] = useState<FieldPlot['soilType']>('Alluvial');
  const [irrigationType, setIrrigationType] = useState<FieldPlot['irrigationType']>('Drip');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newField: FieldPlot = {
      id: `field-${Date.now()}`,
      name,
      areaAcres: Number(areaAcres),
      crop,
      variety,
      sowingDate,
      expectedHarvestDate,
      stage,
      healthScore: 92,
      soilType,
      irrigationType,
      lastWatered: 'Registered today',
      nextScheduledTask: 'Initial vegetative weeding and soil loosening',
      notes: notes || 'Standard agronomic management active.'
    };

    onAddField(newField);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-base font-extrabold text-stone-900">Add New Cultivation Field Plot</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Plot Name / Identifier</label>
            <input
              type="text"
              required
              placeholder="e.g. West Canal Plot (Plot E)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Acreage (Acres)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={areaAcres}
                onChange={(e) => setAreaAcres(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Germination">Germination</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Grain Filling">Grain Filling</option>
                <option value="Harvest Ready">Harvest Ready</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Sown Crop</label>
              <input
                type="text"
                placeholder="e.g. Wheat, Mustard, Soybean"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Variety / Hybrid</label>
              <input
                type="text"
                placeholder="e.g. Sharbati Lokwan, Pusa Bold"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Soil Classification</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Alluvial">Alluvial</option>
                <option value="Black Soil">Black Soil</option>
                <option value="Red Soil">Red Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Clay">Clay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Irrigation Method</label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Drip">Drip Irrigation</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Canal/Flood">Canal / Flooding</option>
                <option value="Rainfed">Rainfed (Dryland)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Sowing Date</label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Expected Harvest Date</label>
              <input
                type="date"
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Field Notes / Observations</label>
            <textarea
              rows={2}
              placeholder="e.g. Laser leveled, good seed germination observed, pre-emergence herbicide sprayed"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              Create Field Plot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
