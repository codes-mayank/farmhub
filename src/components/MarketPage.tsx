import React, { useState } from 'react';
import { MarketCommodity } from '../types/farmhub';
import { MARKET_DATA } from '../data/centralData';
import { useLanguage } from '../context/LanguageContext';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const MarketPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCropId, setSelectedCropId] = useState<string>(MARKET_DATA[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);

  const selectedCrop = MARKET_DATA.find(m => m.id === selectedCropId) || MARKET_DATA[0];

  const filteredData = MARKET_DATA.filter(m => 
    m.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactBuyer = (buyerName: string) => {
    setContactSuccess(language === 'hi' 
      ? `${buyerName} से सीधा संपर्क स्थापित किया गया। खरीद विवरण खरीदार प्रतिनिधि को एसएमएस द्वारा भेज दिया गया है।`
      : `Direct connection initiated with ${buyerName}. SMS inquiry and trade specification sent to buyer representative.`);
    setTimeout(() => setContactSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              {t.marketHeaderTitle}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t.marketHeaderDesc}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{language === 'hi' ? 'लाइव मंडी एपीआई फीड' : 'Simulated Live Mandi Feed'}</span>
          </span>
        </div>
      </div>

      {contactSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{contactSuccess}</span>
        </div>
      )}

      {/* Main Table: Crop | Price | Demand | Trend */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-extrabold text-stone-900">
            {language === 'hi' ? 'दैनिक थोक भाव बोर्ड' : 'Market Rate Board'}
          </h2>
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t.marketSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-extrabold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">{t.cropCol}</th>
                <th className="py-4 px-6">{t.mandiCol}</th>
                <th className="py-4 px-6">{t.priceCol}</th>
                <th className="py-4 px-6">{t.demandCol}</th>
                <th className="py-4 px-6">{t.trendCol}</th>
                <th className="py-4 px-6">{t.mspCol}</th>
                <th className="py-4 px-6 text-right">{t.actionCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map((item) => {
                const isSelected = item.id === selectedCropId;
                const priceDiff = item.currentPrice - item.previousPrice;
                const demandBadge = {
                  'Very High': 'bg-emerald-100 text-emerald-800',
                  'High': 'bg-green-100 text-green-800',
                  'Steady': 'bg-sky-100 text-sky-800',
                  'Sluggish': 'bg-amber-100 text-amber-800'
                }[item.demand];

                const demandText = language === 'hi' 
                  ? (item.demand === 'Very High' ? 'अत्यधिक उच्च' : item.demand === 'High' ? 'उच्च' : item.demand === 'Steady' ? 'स्थिर' : 'मंदी')
                  : item.demand;

                return (
                  <tr 
                    key={item.id}
                    onClick={() => setSelectedCropId(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-stone-50/60'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-sm text-stone-900">{item.crop}</div>
                      <div className="text-[10px] text-stone-500">{item.variety}</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600 font-medium">
                      {item.mandi}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-black text-sm text-stone-900">
                        ₹{item.currentPrice.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {language === 'hi' ? 'प्रति क्विंटल' : 'per Quintal'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${demandBadge}`}>
                        {demandText}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center space-x-1 font-bold ${
                        item.trend === 'up' ? 'text-green-600' : 'text-rose-600'
                      }`}>
                        {item.trend === 'up' ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        <span>{priceDiff > 0 ? `+₹${priceDiff}` : `-₹${Math.abs(priceDiff)}`}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-600 font-medium">
                      ₹{item.msp}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCropId(item.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
                      >
                        {t.viewBuyersBtn}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Crop Deep Dive: Trend Chart & Verified Buyers */}
      {selectedCrop && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: 7-Day Trend Chart & Market Outlook */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {language === 'hi' ? '७-दिवसीय मंडी रुझान' : '7-Day APMC Trend'}
                </span>
                <h3 className="font-black text-base text-stone-900">
                  {selectedCrop.crop} {language === 'hi' ? 'मूल्य रेखाचित्र' : 'Price Curve'}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-stone-900">₹{selectedCrop.currentPrice}/q</span>
                <span className="text-[10px] text-stone-400 block">
                  {language === 'hi' ? 'आगरा मंडी मॉडल भाव' : 'Agra Mandi Modal'}
                </span>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedCrop.weeklyHistory}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600 }} />
                  <YAxis domain={['dataMin - 100', 'dataMax + 100']} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`₹${value}`, language === 'hi' ? 'मॉडल भाव / क्विंटल' : 'Price / Quintal']} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#059669" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#059669' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-700 block">
                {language === 'hi' ? 'कृषि विशेषज्ञ बाज़ार दृष्टिकोण' : 'Agronomist Market Outlook'}
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {language === 'hi'
                  ? selectedCrop.id === 'mkt-mustard'
                    ? 'स्थानीय तेल मिलों में इन्वेंट्री कम होने के कारण क्रशर आक्रामक रूप से खरीद कर रहे हैं। भाव एमएसपी से ऊपर स्थिर रहने का अनुमान है।'
                    : selectedCrop.id === 'mkt-potato'
                    ? 'शमसाबाद और फतेहाबाद बेल्ट से भारी आवक के कारण अस्थायी मंदी का दबाव बना हुआ है।'
                    : selectedCrop.outlook
                  : selectedCrop.outlook}
              </p>
            </div>
          </div>

          {/* Right: Direct Corporate & Wholesaler Buyers */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {language === 'hi' ? 'सीधी खरीद अनुबंध' : 'Procurement Contracts'}
                </span>
                <h3 className="font-black text-base text-stone-900">
                  {t.verifiedBuyersTitle} ({selectedCrop.crop.split(' ')[0]})
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-semibold">
                {selectedCrop.verifiedBuyers.length} {language === 'hi' ? 'सत्यापित' : 'Verified'}
              </span>
            </div>

            <div className="space-y-3">
              {selectedCrop.verifiedBuyers.map((buyer, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all space-y-2.5 bg-stone-50/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-emerald-700" />
                        <h4 className="font-extrabold text-sm text-stone-900">{buyer.buyerName}</h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 mt-1 inline-block">
                        {language === 'hi'
                          ? (buyer.type === 'Processor' ? 'फूड प्रोसेसर' : buyer.type === 'FPO Aggregator' ? 'किसान उत्पादक संगठन' : 'थोक आढ़ती')
                          : buyer.type}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-emerald-800">
                        ₹{buyer.offeredPrice}
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {language === 'hi' ? 'प्रस्तावित / क्विंटल' : 'Offered / Quintal'}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200/60">
                    <span>
                      {language === 'hi' ? 'मांग मात्रा:' : 'Requirement:'} <strong>{buyer.requiredQuantity}</strong>
                    </span>
                    <span>
                      {language === 'hi' ? 'स्थान:' : 'Location:'} {buyer.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-stone-500 font-semibold">
                      {language === 'hi' ? 'फोन:' : 'Phone:'} {buyer.phone}
                    </span>
                    <button
                      onClick={() => handleContactBuyer(buyer.buyerName)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'खरीदार से संपर्क करें' : 'Connect Buyer'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
