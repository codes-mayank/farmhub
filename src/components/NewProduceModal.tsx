import React, { useState } from 'react';
import { ProduceListing } from '../types';
import { ShoppingBag, X } from 'lucide-react';

interface NewProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduce: (produce: ProduceListing) => void;
}

export const NewProduceModal: React.FC<NewProduceModalProps> = ({
  isOpen,
  onClose,
  onAddProduce
}) => {
  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState('Wheat');
  const [variety, setVariety] = useState('Sharbati');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState<ProduceListing['unit']>('Quintal');
  const [pricePerUnit, setPricePerUnit] = useState<number>(2900);
  const [sellerName, setSellerName] = useState('Mayank Agrawal (Malwa Agri)');
  const [sellerPhone, setSellerPhone] = useState('+91 98260 55110');
  const [location, setLocation] = useState('Indore, MP');
  const [qualityGrade, setQualityGrade] = useState<ProduceListing['qualityGrade']>('Grade A (Export)');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newListing: ProduceListing = {
      id: `prod-${Date.now()}`,
      title,
      crop,
      variety,
      quantity: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      sellerName,
      sellerPhone,
      location,
      harvestDate: new Date().toISOString().split('T')[0],
      qualityGrade,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      isVerified: true,
      status: 'Available'
    };

    onAddProduce(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h3 className="text-base font-extrabold text-stone-900">List Produce on Direct Marketplace</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Listing Headline</label>
            <input
              type="text"
              required
              placeholder="e.g. Fresh Machine-Cleaned Sharbati Wheat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop Type</label>
              <input
                type="text"
                placeholder="e.g. Wheat, Mustard, Onion"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Variety</label>
              <input
                type="text"
                placeholder="e.g. Lokwan, Pusa Bold"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Available Quantity</label>
              <div className="flex">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-l-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="text-xs p-2 rounded-r-lg border-y border-r border-stone-300 bg-stone-50 text-stone-700"
                >
                  <option value="Quintal">Quintal</option>
                  <option value="Kg">Kg</option>
                  <option value="Tons">Tons</option>
                  <option value="Bags">Bags</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Price per {unit} (₹)</label>
              <input
                type="number"
                min="10"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quality Grade</label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Grade A (Export)">Grade A (Export)</option>
                <option value="Grade B (Standard)">Grade B (Standard)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Farm Location</label>
              <input
                type="text"
                placeholder="e.g. Indore, MP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Contact Name</label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
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
              Publish Marketplace Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
