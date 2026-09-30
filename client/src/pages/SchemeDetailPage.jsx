import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { schemeService } from '../services/schemeService';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  ExternalLink,
  Bot,
  ArrowLeft,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Info,
  Check,
  X
} from 'lucide-react';

const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadScheme() {
      setLoading(true);
      setError('');
      try {
        const res = await schemeService.getSchemeById(id);
        if (res.scheme) {
          setScheme(res.scheme);
        } else {
          throw new Error('Scheme not found');
        }
      } catch (err) {
        // Fallback to local schemes database — match by slug or id
        const localMatch = SCHEMES_DATABASE.find(
          (s) =>
            s.slug === id ||
            s.id === id ||
            s.slug?.toLowerCase() === id?.toLowerCase() ||
            s.id?.toLowerCase() === id?.toLowerCase()
        );
        if (localMatch) {
          setScheme(localMatch);
        } else {
          setError('Scheme not found in verified government database.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-4">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
          <div className="h-64 bg-white rounded-3xl border border-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto w-full px-4 py-16 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Scheme Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'The requested scheme could not be located.'}</p>
          <Link
            to="/schemes"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-green-700 text-white rounded-xl text-xs font-bold"
          >
            <ArrowLeft size={14} />
            <span>Return to Schemes</span>
          </Link>
        </div>
      </div>
    );
  }

  // Evaluate scheme against current citizen
  const evaluation = evaluateSchemeEligibility(scheme, user);
  const portalUrl = scheme.applicationUrl || 'https://www.myscheme.gov.in';
  const portalName = scheme.officialPortal || 'Official Government Portal';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Schemes Explorer</span>
          </button>
        </div>

        {/* Hero Header Card */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
                {scheme.category || 'Welfare'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {scheme.ministry || 'Government of India'}
              </span>
            </div>

            {/* Match Badge */}
            <div
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${
                evaluation.score >= 80
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : evaluation.score >= 60
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{evaluation.score}% Match ({evaluation.matchLevel})</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {scheme.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {scheme.shortDescription}
            </p>
          </div>

          {/* Benefit Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-green-900 uppercase tracking-wider block">
                Primary Benefit Value
              </span>
              <div className="text-lg sm:text-xl font-black text-green-800">
                {scheme.benefitAmount || 'Direct Welfare Subsidy'}
              </div>
              <span className="text-xs text-green-700 font-medium">{scheme.benefitType}</span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => navigate(`/copilot?scheme=${scheme.slug || scheme.id}`)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-green-300 text-green-800 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Bot size={15} />
                <span>Ask AI Advisor</span>
              </button>

              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs transition-all"
              >
                <span>Apply Officially</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Personalized Match Breakdown */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span>VYNORA Citizen Eligibility Assessment</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched Criteria */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
              <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Criteria You Meet</span>
              </span>
              <ul className="space-y-1 text-xs text-emerald-800">
                {evaluation.matchedReasons.map((r, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unmet or Needs Review */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-slate-500" />
                <span>Verification / Specific Caveats</span>
              </span>
              {evaluation.unmetCriteria.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-600">
                  {evaluation.unmetCriteria.map((u, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600">
                  All key profile parameters (income, residence, category) align with configured scheme criteria.
                </p>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * Note: This is an automated preliminary estimate. Statutory eligibility and benefit disbursements are verified strictly by the concerned government ministry.
          </p>
        </section>

        {/* Required Documents & How to Apply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Documents */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>Mandatory Documents</span>
            </h3>

            <ul className="space-y-2.5">
              {(scheme.requiredDocuments || ['Aadhaar Card with mobile OTP linked', 'Income Certificate', 'Bank Passbook linked to NPCI/DBT']).map((doc, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                to="/digilocker"
                className="text-xs font-bold text-green-700 hover:underline flex items-center space-x-1"
              >
                <span>Compress & organize documents in DigiLocker</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </section>

          {/* How to Apply */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Building className="w-4 h-4 text-slate-700" />
              <span>Application Guidance</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">1.</span>
                <span>Visit the official designated portal at <strong className="text-slate-800">{portalName}</strong>.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">2.</span>
                <span>Complete Aadhaar e-KYC via OTP authentication. Ensure active mobile link.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">3.</span>
                <span>Upload certified income proof, residential address, and bank passbook seeded with DBT/NPCI map.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">4.</span>
                <span>Track application reference number via the official State/Central portal.</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                <span>Open {portalName}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SchemeDetailPage;
