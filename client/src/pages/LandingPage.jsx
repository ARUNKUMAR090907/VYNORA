import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  FolderLock, 
  BookOpen, 
  GraduationCap, 
  Calculator, 
  FileText,
  CheckCircle2,
  Building2,
  Lock,
  Compass
} from 'lucide-react';

const LandingPage = () => {
  const { setActiveTab } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleExplore = (tab = 'schemes') => {
    setActiveTab(tab);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      {/* Main Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Government Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>National Citizen Welfare & DBT Intelligence Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
              Government Schemes.<br />
              <span className="bg-gradient-to-r from-green-600 via-indigo-600 to-green-800 bg-clip-text text-transparent">
                Precision Personalized.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Discover 50+ verified Central & State welfare initiatives, Direct Benefit Transfers (DBT), housing subsidies, solar incentives, and skilling certifications. AI evaluated specifically for your income, state, and profile.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/register"
                className="px-7 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center space-x-2 shadow-sm shadow-green-200 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Create a New Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/login"
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <button
                onClick={() => handleExplore('schemes')}
                className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-green-600" />
                <span>Instant Guest Portal</span>
              </button>
            </div>


            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                100% Free Public Service
              </span>
              <span className="flex items-center">
                <Lock className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
                Private & Client-Side Encrypted
              </span>
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-green-600 mr-1.5" />
                Direct Benefit Transfer (DBT) Ready
              </span>
            </div>

          </div>

          {/* Featured Highlights Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            {/* Card 1: Precision Eligibility Engine */}
            <div 
              onClick={() => handleExplore('schemes')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover hover:border-green-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                  AI Eligibility Scoring Engine
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Real-time algorithmic matching across income brackets, housing status, state jurisdiction, and caste reservation guidelines.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-600">
                <span>View 50+ Schemes</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Sovereign AI Copilot */}
            <div 
              onClick={() => handleExplore('copilot')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover hover:border-green-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                  Sovereign Multilingual Copilot
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Voice-enabled bilingual guidance in Tamil (தமிழ்) and English. Includes phishing link spam verifier and 100KB portal document compressor.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Open Copilot AI</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: DigiLocker & Citizen Dossier */}
            <div 
              onClick={() => handleExplore('digilocker')}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover hover:border-green-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FolderLock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                  DigiLocker & Citizen Dossier
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Store verified identity documents, generate 1-click ZIP upload bundles for official portals, and export printable welfare dossiers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Access Vault</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Quick Statistics Banner */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-green-600">50+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Verified Schemes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹5 Lakh</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Ayushman Health Cover</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">₹2.67 Lakh</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">PMAY Housing Subsidy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">₹20 Lakh</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Mudra Loan Ceiling</div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">VYNORA Sovereign Citizen Portal</span>
            <span>•</span>
            <span>Government of India & State Welfare Gateway</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Direct Benefit Transfer (DBT)</span>
            <span>•</span>
            <span>100% Client-Side Privacy</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

