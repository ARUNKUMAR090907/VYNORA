import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  ExternalLink,
  Bot,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  IndianRupee,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';

export const SchemeCard = ({ scheme, userProfile, onAskCopilot, onViewDetails, onOpenCalculator }) => {
  const [showDocs, setShowDocs] = useState(false);
  const navigate = useNavigate();

  // If score is already computed on scheme (from server or parent), use it; else evaluate
  const evaluation =
    scheme.matchScore !== undefined
      ? {
          score: scheme.matchScore,
          matchLevel: scheme.status || 'Eligible',
          matchedReasons: scheme.matchedReasons || [],
          unmetCriteria: scheme.unmatchedReasons || [],
          keyActionTip: scheme.keyActionTip || '',
        }
      : evaluateSchemeEligibility(scheme, userProfile);

  const score = evaluation.score;
  const slug = scheme.slug || scheme.id;

  const getScoreBadgeColor = (s) => {
    if (s >= 80) return 'bg-green-50 text-green-800 border-green-200';
    if (s >= 60) return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const portalUrl = scheme.applicationUrl || 'https://www.myscheme.gov.in';
  const portalName = scheme.officialPortal || 'Official Gov Portal';

  return (
    <div
      className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-sm p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between"
      id={`scheme-card-${slug}`}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            {scheme.category || 'Welfare'}
          </span>

          {/* Match Score Badge */}
          <div
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getScoreBadgeColor(
              score
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{score}% Match</span>
          </div>
        </div>

        {/* Scheme Title */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-green-700 transition-colors">
          <Link to={`/schemes/${slug}`}>{scheme.title}</Link>
        </h3>

        {/* Ministry */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1 mb-2.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{scheme.ministry || 'Government of India'}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3.5 line-clamp-2">
          {scheme.shortDescription}
        </p>

        {/* Benefit Callout */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 mb-3.5 space-y-0.5">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Direct Welfare Benefit
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {scheme.benefitAmount || 'Direct Benefit Transfer / Subsidy'}
          </div>
        </div>

        {/* Matched reasons snapshot */}
        {evaluation.matchedReasons && evaluation.matchedReasons.length > 0 && (
          <div className="mb-3 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{evaluation.matchedReasons[0]}</span>
            </div>
          </div>
        )}

        {/* Toggleable Required Documents Drawer */}
        {showDocs && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs mb-3 space-y-1.5 animate-in fade-in">
            <span className="font-bold text-slate-700 block">Required Certificates:</span>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              {(scheme.requiredDocuments || ['Aadhaar Card', 'Income Certificate', 'Bank Passbook']).map(
                (doc, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-green-700 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Docs Toggle Button */}
          <button
            type="button"
            onClick={() => setShowDocs(!showDocs)}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
          >
            <FileText size={13} />
            <span>{showDocs ? 'Hide Docs' : 'Required Docs'}</span>
            {showDocs ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {/* Ask AI Button */}
          <button
            type="button"
            onClick={() => {
              if (onAskCopilot) onAskCopilot(scheme);
              else navigate(`/copilot?scheme=${slug}`);
            }}
            className="px-3 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
          >
            <Bot size={14} className="text-green-700" />
            <span>Ask AI</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <Link
            to={`/schemes/${slug}`}
            className="flex-1 py-2 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            View Details
          </Link>

          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Apply on official portal: ${portalName}`}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Apply</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
