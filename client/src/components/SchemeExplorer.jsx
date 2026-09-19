import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  Calculator, 
  FileText,
  TrendingUp,
  Award
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { SchemeCard } from './SchemeCard';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';

export const SchemeExplorer = ({
  userProfile,
  onAskCopilot,
  onOpenProfile,
  onOpenCalculator,
  onOpenDossier
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  const categories = [
    'All',
    'Housing',
    'Healthcare',
    'Energy & Tech',
    'Financial & MSME',
    'Education',
    'Agriculture',
    'Women & Child',
    'Social Security',
    'Employment & Skilling',
    'Handicrafts & Artisans'
  ];

  // Evaluate and sort schemes
  const evaluatedSchemes = useMemo(() => {
    return SCHEMES_DATABASE.map((scheme) => {
      const evaluation = evaluateSchemeEligibility(scheme, userProfile);
      return {
        scheme,
        evaluation
      };
    });
  }, [userProfile]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return evaluatedSchemes
      .filter(({ scheme }) => {
        const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
        const matchesSearch = 
          scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (scheme.tags && scheme.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.evaluation.score - a.evaluation.score;
        }
        return a.scheme.title.localeCompare(b.scheme.title);
      });
  }, [evaluatedSchemes, selectedCategory, searchQuery, sortBy]);

  const highMatchCount = useMemo(() => {
    return evaluatedSchemes.filter(s => s.evaluation.score >= 80).length;
  }, [evaluatedSchemes]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header with Citizen Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#064E3B] border border-emerald-200">
              50+ Verified Welfare Schemes
            </span>
            {userProfile?.isProfileComplete ? (
              <span className="text-xs text-slate-500 font-medium flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                Personalized for <strong className="text-slate-800 mx-1">{userProfile.name}</strong> (₹{Number(userProfile.salary).toLocaleString('en-IN')}/yr • {userProfile.houseType})
              </span>
            ) : (
              <button
                onClick={onOpenProfile}
                className="text-xs text-green-600 font-bold underline hover:text-green-700 cursor-pointer"
              >
                Complete profile for 100% exact match scoring →
              </button>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Eligible Central & State Government Welfare Schemes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            AI evaluated matrix across Housing, Healthcare, Solar, MSME Credit, Scholarships, and Social Security.
          </p>
        </div>

        {/* Quick Action Tools: Dossier & Subsidy Calculator */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Subsidy Calculator</span>
            </button>
          )}

          {onOpenDossier && (
            <button
              onClick={onOpenDossier}
              className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Citizen Dossier</span>
            </button>
          )}
        </div>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="space-y-4 mb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by scheme name, ministry, tags (e.g. Solar, PMAY, Mudra, PMIS, Kaushal, Artisans)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-xs"
            />
          </div>

          {/* Sort By Selector */}
          <div className="md:col-span-4 flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-xs cursor-pointer"
            >
              <option value="match">Sort: Highest Match Score First</option>
              <option value="alphabetical">Sort: Alphabetical (A to Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-thin">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map(({ scheme }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              userProfile={userProfile}
              onAskCopilot={onAskCopilot}
              onOpenCalculator={onOpenCalculator}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No Schemes Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keyword or selected category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-green-600 font-bold underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};

