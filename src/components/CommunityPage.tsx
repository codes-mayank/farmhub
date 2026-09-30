import React, { useState } from 'react';
import { CommunityQuestion } from '../types/farmhub';
import { COMMUNITY_QUESTIONS } from '../data/centralData';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  UserCheck, 
  Send 
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(COMMUNITY_QUESTIONS);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpvote = (id: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, upvotes: q.upvotes + 1 };
      }
      return q;
    }));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: CommunityQuestion = {
      id: `cq-${Date.now()}`,
      author: 'Ramesh Sharma',
      badge: 'Agra Farmer',
      question: newQuestionText,
      timestamp: 'Just now',
      answersCount: 1,
      upvotes: 1,
      topAnswer: {
        author: 'FarmHub Agro Advisory System',
        badge: 'Automated Diagnostic',
        text: 'Your question has been routed to local KVK Bichpuri agronomists and experienced regional farmers in Agra district.'
      }
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              Agra Farmer Knowledge Community
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Exchange field observations with fellow farmers, KVK agronomists, and soil scientists across Agra district.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Community Question</span>
        </button>
      </div>

      {/* Ask Question Collapsible Box */}
      {showAddForm && (
        <form onSubmit={handlePostQuestion} className="bg-white p-6 rounded-3xl border border-emerald-300 shadow-sm space-y-3 animate-fadeIn">
          <h3 className="text-sm font-black text-stone-900">Post a Question to Agra Farmers & Experts</h3>
          <textarea
            rows={3}
            required
            placeholder="e.g. Has anyone tried spraying boron on mustard during flowering in loamy soil?"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className="w-full text-xs p-3 rounded-2xl border border-stone-300 focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold text-stone-600 rounded-xl hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Post Question
            </button>
          </div>
        </form>
      )}

      {/* Question Threads */}
      <div className="space-y-4">
        {questions.map((q) => {
          const badgeColor = {
            'Agronomist': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'Senior Farmer': 'bg-amber-100 text-amber-800 border-amber-200',
            'Agra Farmer': 'bg-sky-100 text-sky-800 border-sky-200',
            'Soil Scientist': 'bg-purple-100 text-purple-800 border-purple-200'
          }[q.badge] || 'bg-stone-100 text-stone-700';

          return (
            <div 
              key={q.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-extrabold text-stone-900">{q.author}</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}>
                      {q.badge}
                    </span>
                    <span className="text-stone-400 text-[11px]">• {q.timestamp}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">{q.question}</h3>
                </div>

                <button
                  onClick={() => handleUpvote(q.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors text-xs font-black cursor-pointer shrink-0"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{q.upvotes}</span>
                </button>
              </div>

              {/* Verified Expert Answer */}
              {q.topAnswer && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-extrabold text-stone-900">{q.topAnswer.author}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {q.topAnswer.badge}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed font-medium pl-5">
                    "{q.topAnswer.text}"
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span>{q.answersCount} answers in thread</span>
                <span className="text-emerald-700 font-bold hover:underline cursor-pointer">
                  Reply to thread →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
