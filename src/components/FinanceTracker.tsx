import React, { useState } from 'react';
import { FarmExpense, FieldPlot } from '../types';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Tag, 
  Layers,
  PieChart
} from 'lucide-react';

interface FinanceTrackerProps {
  expenses: FarmExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<FarmExpense[]>>;
  fields: FieldPlot[];
}

export const FinanceTracker: React.FC<FinanceTrackerProps> = ({
  expenses,
  setExpenses,
  fields
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>('All');
  
  // New transaction form state
  const [type, setType] = useState<'Expense' | 'Income'>('Expense');
  const [fieldId, setFieldId] = useState(fields[0]?.id || '');
  const [category, setCategory] = useState<FarmExpense['category']>('Fertilizer');
  const [amount, setAmount] = useState<number>(2500);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTransactions = expenses.filter(e => {
    return selectedFieldFilter === 'All' || e.fieldId === selectedFieldFilter;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    const targetField = fields.find(f => f.id === fieldId) || fields[0];
    const newRecord: FarmExpense = {
      id: `trans-${Date.now()}`,
      fieldId: targetField?.id || 'general',
      fieldName: targetField?.name || 'General Farm Operation',
      crop: targetField?.crop || 'Multiple',
      category,
      type,
      amount: Number(amount),
      date,
      description: description || `${category} expenditure`
    };

    setExpenses(prev => [newRecord, ...prev]);
    setShowAddModal(false);
    setDescription('');
  };

  const handleDelete = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Wallet className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Farm Financial Book & Expense Ledger
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track seed, fertilizer, diesel, and labor expenses against crop sales to calculate net profit per acre.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm shadow-md hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense / Sale</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Gross Sales Income</span>
            <div className="p-1.5 bg-green-100 text-green-700 rounded-lg">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-green-700 mt-2">
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">Crop bookings & market sales</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Cultivation Costs</span>
            <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-700 mt-2">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">Seeds, fertilizers, labor, machinery</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Net Farm Profit</span>
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-black mt-2 ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            ₹{netProfit.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {netProfit >= 0 ? 'Profitable cultivation season' : 'Operating at an initial investment deficit'}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-stone-700">Filter By Plot:</span>
          <select
            value={selectedFieldFilter}
            onChange={(e) => setSelectedFieldFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Farm Fields ({fields.length} Plots)</option>
            {fields.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-stone-500">
          Showing <strong>{filteredTransactions.length}</strong> transactions
        </div>
      </div>

      {/* Transactions Ledger Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Field / Crop</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTransactions.map((item) => {
                const isIncome = item.type === 'Income';
                return (
                  <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap font-medium">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      <div>{item.fieldName}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{item.crop}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-black text-sm whitespace-nowrap ${
                      isIncome ? 'text-green-600' : 'text-stone-900'
                    }`}>
                      {isIncome ? `+₹${item.amount.toLocaleString('en-IN')}` : `-₹${item.amount.toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-extrabold text-stone-900">Record Farm Transaction</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('Expense')}
                  className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                    type === 'Expense' 
                      ? 'bg-rose-50 text-rose-800 border-rose-300' 
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  Expense (Cost)
                </button>
                <button
                  type="button"
                  onClick={() => setType('Income')}
                  className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                    type === 'Income' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  Income (Sale)
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Target Field Plot</label>
                <select
                  value={fieldId}
                  onChange={(e) => setFieldId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {fields.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {type === 'Expense' ? (
                      <>
                        <option value="Seeds">Seeds</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticide">Pesticide</option>
                        <option value="Labor">Labor Wages</option>
                        <option value="Machinery">Machinery / Fuel</option>
                        <option value="Irrigation">Irrigation / Power</option>
                      </>
                    ) : (
                      <>
                        <option value="Sale Income">Produce Harvest Sale</option>
                        <option value="Machinery">Equipment Rent Income</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description / Receipt Note</label>
                <input
                  type="text"
                  placeholder="e.g. 5 bags of DAP purchased from cooperative"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
