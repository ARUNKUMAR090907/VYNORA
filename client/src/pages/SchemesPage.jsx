import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import SchemeCard from '../components/SchemeCard';
import { schemeService } from '../services/schemeService';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  Building,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = [
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
  'Handicrafts & Artisans',
];

const SchemesPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);

  useEffect(() => {
    async function loadSchemes() {
      setLoading(true);
      try {
        const res = await schemeService.getAllSchemes();
        const rawSchemes = res.schemes && res.schemes.length > 0 ? res.schemes : SCHEMES_DATABASE;

        // Score each scheme with the current user's profile
        const scored = rawSchemes.map((s) => {
          const evalResult = evaluateSchemeEligibility(s, user);
          return {
            ...s,
            matchScore: evalResult.score,
            status: evalResult.matchLevel,
            matchedReasons: evalResult.matchedReasons,
            unmatchedReasons: evalResult.unmetCriteria,
            keyActionTip: evalResult.keyActionTip,
          };
        });

        // Default sort descending by match score
        scored.sort((a, b) => b.matchScore - a.matchScore);
        setSchemes(scored);
      } catch (err) {
        console.warn('Failed to load schemes from API, falling back to local dataset:', err);
        const scored = SCHEMES_DATABASE.map((s) => {
          const evalResult = evaluateSchemeEligibility(s, user);
          return {
            ...s,
            matchScore: evalResult.score,
            status: evalResult.matchLevel,
            matchedReasons: evalResult.matchedReasons,
            unmatchedReasons: evalResult.unmetCriteria,
            keyActionTip: evalResult.keyActionTip,
          };
        }).sort((a, b) => b.matchScore - a.matchScore);

        setSchemes(scored);
      } finally {
        setLoading(false);
      }
    }

    loadSchemes();
  }, [user]);

  // Filter schemes
  const filteredSchemes = schemes.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      (s.shortDescription && s.shortDescription.toLowerCase().includes(q)) ||
      (s.category && s.category.toLowerCase().includes(q)) ||
      (s.ministry && s.ministry.toLowerCase().includes(q)) ||
      (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)));

    const matchesCategory =
      selectedCategory === 'All' ||
      (s.category && s.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesState =
      selectedState === 'All' ||
      (s.eligibilityCriteria?.states &&
        (s.eligibilityCriteria.states.includes('All India') ||
          s.eligibilityCriteria.states.includes(selectedState)));

    const matchesScore = s.matchScore >= minMatchScore;

    return matchesQuery && matchesCategory && matchesState && matchesScore;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Title */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Government Welfare Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Browse verified central and state welfare initiatives. Match scores and eligibility reasons are computed using your verified citizen profile.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scheme name, benefit, ministry, or keyword (e.g. solar, loan, housing)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
              />
            </div>

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
              >
                <option value="All">All States & UTs (All India)</option>
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Match Status Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing <strong className="text-slate-800">{filteredSchemes.length}</strong> verified government schemes
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-medium">Filter by match:</span>
              <button
                onClick={() => setMinMatchScore(0)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  minMatchScore === 0 ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMinMatchScore(60)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  minMatchScore === 60 ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                &ge; 60%
              </button>
              <button
                onClick={() => setMinMatchScore(80)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  minMatchScore === 80 ? 'bg-green-100 text-green-800' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                &ge; 80% Eligible
              </button>
            </div>
          </div>
        </div>

        {/* Scheme Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-52 bg-white rounded-2xl border border-slate-200 animate-pulse p-6" />
            ))}
          </div>
        ) : filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.slug || scheme.id}
                scheme={scheme}
                onAskCopilot={() => navigate(`/copilot?scheme=${scheme.slug || scheme.id}`)}
                onViewDetails={() => navigate(`/schemes/${scheme.slug || scheme.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No schemes matched your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, selecting "All Categories", or removing state filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedState('All');
                setMinMatchScore(0);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SchemesPage;
