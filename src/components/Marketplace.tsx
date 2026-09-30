import React, { useState } from 'react';
import { ProduceListing, EquipmentListing } from '../types';
import { 
  ShoppingBag, 
  Tractor, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Plus, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Award,
  Sparkles,
  MessageSquare
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface MarketplaceProps {
  produceListings: ProduceListing[];
  equipmentListings: EquipmentListing[];
  onOpenProduceModal: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  produceListings,
  equipmentListings,
  onOpenProduceModal
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'produce' | 'equipment'>('produce');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedEqCategory, setSelectedEqCategory] = useState<string>('All');
  const [inquiryModalItem, setInquiryModalItem] = useState<ProduceListing | null>(null);
  const [equipmentBookItem, setEquipmentBookItem] = useState<EquipmentListing | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerOffer, setBuyerOffer] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const filteredProduce = produceListings.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || p.qualityGrade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const filteredEquipment = equipmentListings.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedEqCategory === 'All' || e.category === selectedEqCategory;
    return matchesSearch && matchesCat;
  });

  const handleSendInquiry = () => {
    if (!buyerName || !buyerPhone) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalItem(null);
      setEquipmentBookItem(null);
      setBuyerName('');
      setBuyerPhone('');
      setBuyerOffer('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {language === 'hi' ? 'कृषि बाज़ार एवं यंत्रीकरण हब' : 'Agri-Marketplace & Equipment Hub'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'hi'
              ? 'बिना किसी बिचौलिए के सीधे खेत से उपज बेचें और खरीदें। आधुनिक ट्रैक्टर, हार्वेस्टर व स्प्रे ड्रोन किराए पर लें।'
              : 'Buy and sell harvest directly at farmgate prices with zero middlemen cut. Rent modern tractors, harvesters, and spraying drones.'}
          </p>
        </div>

        <button
          onClick={onOpenProduceModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-md hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? 'बिक्री हेतु उपज जोड़ें' : 'List Produce for Sale'}</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center space-x-3 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('produce')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'produce'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Farm Produce Direct ({produceListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('equipment')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'equipment'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-stone-100'
          }`}
        >
          <Tractor className="w-4 h-4" />
          <span>Machinery & Drone Rental ({equipmentListings.length})</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={activeTab === 'produce' ? "Search crops, variety, or city..." : "Search tractor, drone, harvester..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {activeTab === 'produce' ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-stone-500 font-medium">Quality Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Grades</option>
              <option value="Grade A (Export)">Grade A (Export)</option>
              <option value="Grade B (Standard)">Grade B (Standard)</option>
              <option value="Organic Certified">Organic Certified</option>
            </select>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-stone-500 font-medium">Category:</span>
            <select
              value={selectedEqCategory}
              onChange={(e) => setSelectedEqCategory(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Equipment</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Sprayer/Drone">Sprayer / Drone</option>
              <option value="Tiller/Plough">Tiller / Plough</option>
            </select>
          </div>
        )}
      </div>

      {/* Produce Listings Grid */}
      {activeTab === 'produce' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="h-44 w-full bg-stone-100 relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs ${
                    item.qualityGrade === 'Organic Certified'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/90 text-stone-800'
                  }`}>
                    {item.qualityGrade}
                  </span>
                  {item.isVerified && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white flex items-center space-x-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {item.quantity} {item.unit} available
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{item.location}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Harvest: {item.harvestDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">Farmgate Price</span>
                    <span className="text-xl font-black text-stone-900">
                      ₹{item.pricePerUnit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">/{item.unit}</span>
                  </div>

                  <button
                    onClick={() => setInquiryModalItem(item)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire / Buy</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Equipment Rentals Grid */}
      {activeTab === 'equipment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((eq) => (
            <div 
              key={eq.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="h-44 w-full bg-stone-100 relative overflow-hidden">
                <img 
                  src={eq.imageUrl} 
                  alt={eq.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                    {eq.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {eq.available ? 'Ready for Booking' : 'Currently in Use'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {eq.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {eq.specifications}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{eq.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">Rental Fee</span>
                    <span className="text-xl font-black text-stone-900">
                      ₹{eq.ratePerDay.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">/ day</span>
                  </div>

                  <button
                    onClick={() => setEquipmentBookItem(eq)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Tractor className="w-3.5 h-3.5" />
                    <span>Book Rental</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Produce Inquiry Modal */}
      {(inquiryModalItem || equipmentBookItem) && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Inquiry Sent Successfully!</h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  The farmer has been notified via SMS. They will reach out to you directly within 2 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">
                      {inquiryModalItem ? 'Contact Producer / Purchase' : 'Book Farm Machinery'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {inquiryModalItem?.title || equipmentBookItem?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setInquiryModalItem(null);
                      setEquipmentBookItem(null);
                    }}
                    className="text-stone-400 hover:text-stone-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Number (for SMS & Call)</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {inquiryModalItem ? 'Desired Quantity / Price Offer' : 'Required Rental Dates & Acreage'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={inquiryModalItem ? "e.g. Interested in purchasing 50 Quintals at listed price." : "e.g. Need for 2 days starting Friday for 10 acres wheat harvesting."}
                      value={buyerOffer}
                      onChange={(e) => setBuyerOffer(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {inquiryModalItem && (
                    <div className="bg-stone-50 p-3 rounded-lg text-[11px] text-stone-600 flex items-center justify-between">
                      <span>Seller Contact:</span>
                      <span className="font-bold text-stone-900">{inquiryModalItem.sellerPhone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setInquiryModalItem(null);
                      setEquipmentBookItem(null);
                    }}
                    className="px-4 py-2 text-xs font-medium text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInquiry}
                    disabled={!buyerName || !buyerPhone}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Send Direct Inquiry
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
