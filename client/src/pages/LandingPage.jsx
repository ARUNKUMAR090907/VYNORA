import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AUTH_STATUS } from '../context/AuthContext';

import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bot,
  FolderLock,
  BookOpen,
  GraduationCap,
  Calculator,
  CheckCircle2,
  Building,
  Lock,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const { authStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAuthenticated =
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE ||
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      

      {/* Main Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
           
            {/* Platform Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>Citizen Welfare Intelligence & Scheme Discovery Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-1900 tracking-tight leading-tight sm:leading-none " style={{ fontWeight: '900' }}>
             <h1 style={{ fontWeight: '900',color: 'green',fontSize: '8rem',fontFamily: 'arial' }}> VYNORA</h1>
              <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-slate-900 bg-clip-text text-transparent">
                Precision Personalized.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Understand which Central & State welfare initiatives, Direct Benefit Transfers (DBT), housing subsidies, solar incentives, and skilling programs match your profile. Powered by an explainable eligibility engine and multilingual AI copilot.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {isAuthenticated ? (
                <Link
                  to="/home"
                  className="px-7 py-3.5 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm flex items-center space-x-2 shadow-sm shadow-green-200 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-7 py-3.5 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm flex items-center space-x-2 shadow-sm shadow-green-200 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Create Citizen Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/login"
                    className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>

                  <Link
                    to="/demo"
                    className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Synthetic Demo Sandbox</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                Explainable Match Scoring
              </span>
              <span className="flex items-center">
                <Lock className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
                Private & Secure Authentication
              </span>
              <span className="flex items-center">
                <Building className="w-3.5 h-3.5 text-green-700 mr-1.5" />
                Verified Official Government Portals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Highlights */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              One Cohesive Citizen Intelligence Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Transforming complex welfare criteria and policy notifications into actionable citizen guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Explainable Eligibility Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No opaque or random percentages. Clear criteria matching across income limits, domicile, housing type, community, and occupation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Grounded Multilingual AI Copilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interact in English, Tamil, Hindi, Telugu, Kannada, or Malayalam. Grounded strictly in verified government facts to prevent hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <FolderLock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">DigiLocker & 100KB Compressor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audit documents, check portal readiness, and compress certificate scans to under 100 KB to avoid government upload rejection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs text-center border-t border-slate-800 space-y-2">
        <p className="font-semibold text-slate-300">
          VYNORA — Citizen Welfare Intelligence Platform
        </p>
        <p className="text-slate-500 max-w-xl mx-auto px-4">
          Independent citizen welfare discovery platform. Information is compiled from official central and state government portals (.gov.in / .nic.in). Final benefit approvals are governed by respective authorities.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
