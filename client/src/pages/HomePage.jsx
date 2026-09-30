import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { eligibilityService } from '../services/eligibilityService';
import { schemeService } from '../services/schemeService';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';
import SchemeCard from '../components/SchemeCard';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bot,
  GraduationCap,
  BookOpen,
  FolderLock,
  Calculator,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

const HomePage = () => {
  const { user, selectedLanguage } = useContext(AuthContext);
  const navigate = useNavigate();

  const [topSchemes, setTopSchemes] = useState([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [quickCopilotQuery, setQuickCopilotQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPersonalizedDashboard() {
      setLoading(true);
      try {
        // 1. Fetch server eligibility calculation
        const eligRes = await eligibilityService.getEligibleSchemes();
        const serverResults = eligRes.schemes || [];

        // 2. Map full scheme objects from database matching slugs or IDs
        const allSchemesRes = await schemeService.getAllSchemes().catch(() => ({ schemes: SCHEMES_DATABASE }));
        const allSchemesList = allSchemesRes.schemes || SCHEMES_DATABASE;

        // Build scored schemes
        const enriched = serverResults.map((r) => {
          const matchedScheme = allSchemesList.find(
            (s) => s.slug === r.slug || s.id === r.slug || s._id === r.schemeId
          );
          return {
            ...(matchedScheme || {}),
            matchScore: r.matchScore,
            status: r.status,
            matchedReasons: r.matchedReasons,
            unmatchedReasons: r.unmatchedReasons,
            needsVerification: r.needsVerification,
          };
        });

        if (isMounted) {
          // Top eligible: score >= 75
          const eligible = enriched.filter((s) => s.matchScore >= 75);
          setTopSchemes(eligible.length > 0 ? eligible.slice(0, 4) : enriched.slice(0, 4));

          // Recommended: based on occupation & state
          const recommended = enriched.filter((s) => s.matchScore >= 50 && s.matchScore < 75);
          setRecommendedSchemes(recommended.slice(0, 4));

          // Fetch summary
          const sumRes = await eligibilityService.getEligibilitySummary().catch(() => null);
          if (sumRes?.summary) {
            setSummary(sumRes.summary);
          }
        }
      } catch (err) {
        console.warn('Dashboard online load notice, using client evaluation:', err.message);
        // Fallback to client eligibility engine
        if (isMounted) {
          const clientEvaluations = SCHEMES_DATABASE.map((s) => ({
            ...s,
            ...evaluateSchemeEligibility(s, user),
            matchScore: evaluateSchemeEligibility(s, user).score,
          })).sort((a, b) => b.matchScore - a.matchScore);

          setTopSchemes(clientEvaluations.slice(0, 4));
          setRecommendedSchemes(clientEvaluations.slice(4, 8));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPersonalizedDashboard();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleAskCopilot = (scheme) => {
    navigate(`/copilot?scheme=${scheme.slug || scheme.id}`);
  };

  const handleQuickCopilotSubmit = (e) => {
    e.preventDefault();
    if (quickCopilotQuery.trim()) {
      navigate(`/copilot?q=${encodeURIComponent(quickCopilotQuery.trim())}`);
    } else {
      navigate('/copilot');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Personalized Welcome Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-green-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Welfare Intelligence</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Welcome, {user?.name || user?.username || 'Citizen'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Based on your annual income of <strong className="text-white">₹{Number(user?.annualIncome || 0).toLocaleString('en-IN')}</strong>, domicile in <strong className="text-white">{user?.state || 'India'}</strong>, and occupation as a <strong className="text-white">{user?.occupationStatus || 'Citizen'}</strong>, here is your verified welfare assessment.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/schemes"
                className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Explore All Schemes</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/15 transition-all"
              >
                Edit Dossier & Income
              </Link>
            </div>
          </div>
        </section>

        {/* Eligibility Snapshot Counters */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              High Match Schemes
            </span>
            <div className="text-2xl sm:text-3xl font-black text-green-700">
              {summary ? summary.eligible : topSchemes.length}
            </div>
            <p className="text-[11px] text-slate-500">Criteria matches &gt; 80%</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Likely Eligible
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {summary ? summary.likelyEligible : recommendedSchemes.length}
            </div>
            <p className="text-[11px] text-slate-500">Requires minor verifications</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              State & DBT Programs
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">42+</div>
            <p className="text-[11px] text-slate-500">Active verified portals</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              AI Evaluation
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">Active</div>
            <p className="text-[11px] text-slate-500">Grounded & verified</p>
          </div>
        </section>

        {/* SECTION: Top Eligible Schemes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Top Eligible Schemes for You</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                VYNORA calculated matches based on your income ceiling and domicile.
              </p>
            </div>
            <Link
              to="/schemes"
              className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse p-5" />
              ))}
            </div>
          ) : topSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.slug || scheme.id}
                  scheme={scheme}
                  onAskCopilot={() => handleAskCopilot(scheme)}
                  onViewDetails={() => navigate(`/schemes/${scheme.slug || scheme.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">No high-match schemes found.</p>
              <Link to="/schemes" className="text-xs font-bold text-green-700 underline">
                Browse catalog to check eligibility
              </Link>
            </div>
          )}
        </section>

        {/* SECTION: AI Copilot Prompt Launcher */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Ask VYNORA AI Copilot
                </h3>
                <p className="text-xs text-slate-500">
                  Multilingual citizen advisor grounded in official scheme criteria.
                </p>
              </div>
            </div>
            <Link
              to="/copilot"
              className="text-xs font-bold text-green-700 hover:underline flex items-center space-x-1"
            >
              <span>Open Full Copilot</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <form onSubmit={handleQuickCopilotSubmit} className="relative">
            <input
              type="text"
              value={quickCopilotQuery}
              onChange={(e) => setQuickCopilotQuery(e.target.value)}
              placeholder="Ask anything: e.g. How to get ₹78,000 PM Surya Ghar Solar Subsidy?"
              className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
            >
              Ask AI
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium text-[11px] self-center">Popular:</span>
            {[
              'Am I eligible for PMAY 2.0 Housing Subsidy?',
              'PM Surya Ghar Rooftop Solar criteria',
              'MUDRA ₹20 Lakh Business Loan',
              'PM Internship Scheme ₹5,000 stipend',
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => navigate(`/copilot?q=${encodeURIComponent(q)}`)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION: Recommended & Complementary Programs */}
        {recommendedSchemes.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <span>Recommended Welfare & Skilling</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Schemes where your profile meets core target parameters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.slug || scheme.id}
                  scheme={scheme}
                  onAskCopilot={() => handleAskCopilot(scheme)}
                  onViewDetails={() => navigate(`/schemes/${scheme.slug || scheme.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Skilling, Internships & Documents Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <Link
            to="/courses"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-green-700 transition-colors">
              Government Skilling Courses
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              NSDC, PMKVY, and certified technical training with 100% free or subsidized access.
            </p>
          </Link>

          <Link
            to="/internships"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-green-700 transition-colors">
              Central Govt Internships
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              PM Internship Scheme (PMIS 2026), NITI Aayog, and MeitY research openings.
            </p>
          </Link>

          <Link
            to="/digilocker"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-green-700 transition-colors">
              DigiLocker & 100KB Compressor
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Verify documents and compress files under 100 KB for portal-ready application upload.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
