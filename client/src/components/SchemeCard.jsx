import React, { useState } from 'react';
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
  Compass,
  Calculator,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';

export const SchemeCard = ({ scheme, userProfile, onAskCopilot, onOpenCalculator }) => {
  const [showDocs, setShowDocs] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const evaluation = evaluateSchemeEligibility(scheme, userProfile);

  const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 65) return 'bg-green-50 text-green-700 border-green-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const isCalculable = [
    'pm-awas-yojana-urban',
    'pm-awas-yojana-gramin',
    'pm-surya-ghar-muft-bijli',
    'pm-mudra-yojana',
    'sukanya-samriddhi-yojana',
    'atal-pension-yojana',
    'pmegp-subsidy-loan',
    'kisan-credit-card-kcc'
  ].includes(scheme.id) || scheme.tags?.some(t => ['Subsidy', 'Solar', 'Mudra', 'Pension', 'Savings', 'Loan'].includes(t));

  const applicationMilestones = [
    { step: 1, title: 'e-KYC & Aadhaar Linking', desc: 'Ensure active mobile is linked to Aadhaar & bank NPCI map.' },
    { step: 2, title: 'Document Compression', desc: `Compress ${scheme.requiredDocuments[0] || 'Certificates'} to under 100 KB in DigiLocker.` },
    { step: 3, title: 'Official Portal Registration', desc: `Create citizen profile on ${scheme.officialPortal || 'gov.in'} portal.` },
    { step: 4, title: 'Scrutiny & Field Inspection', desc: 'Nodal officer / Gram Panchayat physical or digital verification.' },
    { step: 5, title: 'DBT Direct Benefit Transfer', desc: 'Direct bank account disbursement or sanction order dispatch.' }
  ];

  return (
    <div 
      className="group relative rounded-2xl bg-white border border-slate-200 hover:border-green-300 hover:shadow-md p-5 sm:p-6 transition-all duration-200 shadow-xs flex flex-col justify-between"
      id={`scheme-card-${scheme.id}`}
    >
      
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            {scheme.category}
          </span>

          {/* Eligibility Score Badge */}
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs font-bold ${getScoreBadgeColor(evaluation.score)}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{evaluation.score}% Match</span>
          </div>
        </div>

        {/* Scheme Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-green-600 transition-colors font-sans">
          {scheme.title}
        </h3>

        {/* Ministry Subtitle */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1 mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{scheme.ministry}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {scheme.shortDescription}
        </p>

        {/* Benefit Callout Pill */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 space-y-0.5">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Direct Welfare Benefit
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center">
            <IndianRupee className="w-3.5 h-3.5 mr-0.5 inline flex-shrink-0 text-emerald-600" />
            <span>{scheme.benefitAmount}</span>
          </div>
        </div>

        {/* Eligibility Matching Insights */}
        {evaluation.matchedReasons.length > 0 && (
          <div className="mb-3 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-700 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 inline flex-shrink-0" />
              <span>Eligibility Insight:</span>
            </div>
            <p className="text-slate-600 pl-5 text-[11px] leading-relaxed">{evaluation.matchedReasons[0]}</p>
          </div>
        )}

        {/* Drawer Toggles: Documents & Roadmap */}
        <div className="space-y-1.5 border-t border-slate-100 pt-2 mb-3">
          
          {/* Required Documents Toggle */}
          <div>
            <button
              onClick={() => setShowDocs(!showDocs)}
              className="w-full flex items-center justify-between text-xs font-medium text-slate-600 hover:text-green-600 transition-colors py-1 cursor-pointer"
            >
              <span className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-green-600" />
                <span>Required Documents ({scheme.requiredDocuments.length})</span>
              </span>
              {showDocs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDocs && (
              <ul className="mt-1.5 pl-2 space-y-1 text-xs text-slate-600 border-l-2 border-green-400 ml-1.5 py-1 animate-in fade-in">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 5-Step Application Roadmap Toggle */}
          <div>
            <button
              onClick={() => setShowRoadmap(!showRoadmap)}
              className="w-full flex items-center justify-between text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              <span className="flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Application Roadmap (5 Steps)</span>
              </span>
              {showRoadmap ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showRoadmap && (
              <div className="mt-2 space-y-2 text-xs border-l-2 border-emerald-400 ml-1.5 pl-2.5 py-1 animate-in fade-in">
                {applicationMilestones.map((m) => (
                  <div key={m.step} className="space-y-0.5">
                    <div className="font-bold text-slate-800 flex items-center space-x-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold">
                        {m.step}
                      </span>
                      <span>{m.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">{m.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Action Buttons: Ask Copilot, Calculator & Official Portal */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        
        <div className="grid grid-cols-2 gap-2">
          {/* Core Heart Feature: Ask to Copilot Button */}
          <button
            id={`ask-copilot-btn-${scheme.id}`}
            onClick={() => onAskCopilot(scheme)}
            className="w-full py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs shadow-green-200 transition-all cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask Copilot</span>
          </button>

          {/* Official Portal Link */}
          <a
            href={scheme.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Quick Subsidy Calculator Trigger */}
        {isCalculable && onOpenCalculator && (
          <button
            onClick={onOpenCalculator}
            className="w-full py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Calculator className="w-3 h-3 text-emerald-600" />
            <span>Calculate Direct Subsidy / EMI Savings</span>
          </button>
        )}

      </div>

    </div>
  );
};

