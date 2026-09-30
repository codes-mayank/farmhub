import React, { useState } from 'react';
import { ServiceListing } from '../types/farmhub';
import { SERVICES_DATA } from '../data/centralData';
import { 
  Wrench, 
  Tractor, 
  Users, 
  Truck, 
  Warehouse, 
  ShoppingBag, 
  Coins, 
  ShieldCheck, 
  Star, 
  Phone, 
  MapPin, 
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [inquiryModalItem, setInquiryModalItem] = useState<ServiceListing | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const categories = ['All', 'Machinery', 'Labour', 'Transport', 'Storage', 'Buyers', 'Finance', 'Insurance'];

  const filteredServices = SERVICES_DATA.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryModalItem(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Wrench className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              Farm Services & Infrastructure Directory
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Access verified agricultural mechanization, labour gangs, transport logistics, cold storage, finance, and insurance in Agra district.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          7 Core Service Categories
        </span>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search provider or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {service.category}
                </span>
                <div className="flex items-center space-x-1 text-amber-500 font-black text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{service.rating}</span>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-stone-900 leading-snug">{service.title}</h3>
                <div className="text-xs font-semibold text-emerald-700 mt-1">{service.provider}</div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-stone-200/60">
                {service.description}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block font-medium">Pricing Rate</span>
                  <span className="font-black text-stone-900 text-sm">{service.rate}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-medium">Location</span>
                  <span className="font-semibold text-stone-700 flex items-center justify-end space-x-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{service.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setInquiryModalItem(service)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer text-center"
                >
                  Book / Contact Service
                </button>
                <a
                  href={`tel:${service.contact}`}
                  className="p-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
                  title="Direct Call"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {inquiryModalItem && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            {inquirySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-stone-900">Service Request Sent!</h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  <strong>{inquiryModalItem.provider}</strong> has received your farm requirement. Representative will call you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                      {inquiryModalItem.category} Service
                    </span>
                    <h3 className="text-base font-black text-stone-900 mt-0.5">
                      {inquiryModalItem.title}
                    </h3>
                  </div>
                  <button onClick={() => setInquiryModalItem(null)} className="text-stone-400 hover:text-stone-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900">{inquiryModalItem.provider}</div>
                    <div className="text-stone-600">Estimated Rate: <span className="font-black text-stone-900">{inquiryModalItem.rate}</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      defaultValue="Ramesh Sharma"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      defaultValue="+91 98370 22119"
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Requirement Details</label>
                    <textarea
                      rows={2}
                      defaultValue="Require booking for 5 acres in Bichpuri block Agra."
                      className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setInquiryModalItem(null)}
                      className="px-4 py-2 rounded-xl text-stone-600 font-bold hover:bg-stone-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md transition-colors cursor-pointer"
                    >
                      Send Service Request
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
