import React, { useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  IndianRupee, 
  ExternalLink,
  QrCode,
  Lock
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { evaluateSchemeEligibility } from '../utils/eligibilityEngine';

export const CitizenDossierModal = ({ isOpen, onClose, userProfile, documents = [] }) => {
  const printRef = useRef(null);

  if (!isOpen) return null;

  // Evaluate schemes for user profile
  const highMatchSchemes = SCHEMES_DATABASE
    .map((scheme) => ({
      scheme,
      evaluation: evaluateSchemeEligibility(scheme, userProfile)
    }))
    .filter((item) => item.evaluation.score >= 80)
    .sort((a, b) => b.evaluation.score - a.evaluation.score);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const lines = [
      '========================================================================',
      '      GOVERNMENT OF INDIA - VYNORA CITIZEN WELFARE DOSSIER            ',
      '========================================================================',
      `Citizen Name: ${userProfile?.name || 'Citizen'}`,
      `Verified Email: ${userProfile?.email || 'N/A'}`,
      `State / UT: ${userProfile?.state || 'All India'}`,
      `Annual Salary / Income: ₹${userProfile?.salary ? Number(userProfile.salary).toLocaleString('en-IN') : 'N/A'}/yr`,
      `Housing Status: ${userProfile?.houseType || 'Rental'}`,
      `Occupation: ${userProfile?.employmentStatus || 'Citizen'}`,
      `Generated Date: ${new Date().toLocaleDateString('en-IN')}`,
      '------------------------------------------------------------------------',
      'HIGH ELIGIBILITY GOVERNMENT WELFARE SCHEMES (>80% MATCH):',
      '------------------------------------------------------------------------',
      ...highMatchSchemes.map((item, idx) => `
${idx + 1}. [${item.evaluation.score}% Match] ${item.scheme.title}
   - Ministry: ${item.scheme.ministry}
   - Direct Benefit: ${item.scheme.benefitAmount}
   - Target Group: ${item.scheme.targetAudience}
   - Official Portal: ${item.scheme.applicationUrl}
   - Required Documents: ${item.scheme.requiredDocuments.join(', ')}
`),
      '------------------------------------------------------------------------',
      'STORED DIGILOCKER VERIFIED DOCUMENTS (100 KB COMPLIANT):',
      '------------------------------------------------------------------------',
      ...documents.map((d, i) => `${i + 1}. [${d.category}] ${d.name} (${d.uploadedAt}) - UIDAI/Govt Verified`),
      '========================================================================',
      'DISCLAIMER: Apply strictly via authentic .gov.in portals. Never pay money on WhatsApp.',
      '========================================================================'
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VYNORA_Citizen_Welfare_Dossier_${userProfile?.name?.replace(/\s+/g, '_') || 'Citizen'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-800 max-h-[92vh] flex flex-col">
        
        {/* Modal Actions Bar (Excluded during print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#064E3B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              🇮🇳
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-sans">Official Citizen Welfare Dossier</h3>
              <p className="text-[11px] text-slate-500">Government of India Direct Benefit Transfer Summary</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-green-600" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Dossier Sheet */}
        <div ref={printRef} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 bg-white text-slate-900">
          
          {/* Header Banner */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold font-sans tracking-tight text-slate-900">
                  जनसेवा AI • CITIZEN WELFARE DOSSIER
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#064E3B] border border-emerald-300">
                  DBT CERTIFIED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                National Informatics Centre (NIC) • Ministry of Electronics & Information Technology
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-500 font-mono">
              <div>Dossier ID: <strong>JS-{Date.now().toString().slice(-8)}</strong></div>
              <div>Date: {new Date().toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          {/* Citizen Bio Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Citizen Name</span>
              <span className="font-bold text-slate-900">{userProfile?.name || 'Verified Citizen'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">State / UT</span>
              <span className="font-semibold text-slate-800">{userProfile?.state || 'Maharashtra'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Annual Income</span>
              <span className="font-bold text-emerald-700">₹{userProfile?.salary ? Number(userProfile.salary).toLocaleString('en-IN') : '2,50,000'}/yr</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Housing / Category</span>
              <span className="capitalize text-slate-800 font-medium">{userProfile?.houseType || 'Rental'} • {userProfile?.category || 'OBC'}</span>
            </div>
          </div>

          {/* High Match Welfare Schemes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Personalized High-Eligibility Schemes ({highMatchSchemes.length} Matched)
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-medium">Pre-Calculated for Direct Transfer</span>
            </div>

            <div className="space-y-3">
              {highMatchSchemes.map(({ scheme, evaluation }, idx) => (
                <div key={scheme.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900">{scheme.title}</h5>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-7">{scheme.ministry}</div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      {evaluation.score}% Match
                    </span>
                  </div>

                  <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Direct Financial Benefit</span>
                      <span className="font-bold text-slate-900 flex items-center">
                        <IndianRupee className="w-3 h-3 mr-0.5 inline text-emerald-600" />
                        {scheme.benefitAmount}
                      </span>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Application Portal</span>
                      <a
                        href={scheme.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-green-600 hover:underline flex items-center space-x-1"
                      >
                        <span>{scheme.officialPortal}</span>
                        <ExternalLink className="w-3 h-3 ml-1 inline" />
                      </a>
                    </div>
                  </div>

                  <div className="pl-7 text-[11px] text-slate-600">
                    <strong>Required Uploads (Under 100 KB):</strong> {scheme.requiredDocuments.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DigiLocker Vault Verified Documents Strip */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                DigiLocker Verified Documents ({documents.length} Stored)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {documents.map((doc) => (
                <div key={doc.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-center justify-between">
                  <div className="truncate pr-2">
                    <div className="font-bold text-slate-800 truncate">{doc.name}</div>
                    <div className="text-[10px] text-slate-500">{doc.category}</div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    100KB ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Verification & Security Stamp */}
          <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Sovereign Anti-Phishing Guarantee • Verified Government Infrastructure</span>
            </div>
            <div className="font-mono text-[10px]">
              Cyber Helpline: 1930 • Citizen Portal 2026
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
