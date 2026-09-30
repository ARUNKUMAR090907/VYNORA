import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import {
  Calculator,
  Sun,
  Home,
  Briefcase,
  IndianRupee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

const CalculatorPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('pmay');

  // PMAY Calculator State
  const [pmayLoanAmount, setPmayLoanAmount] = useState(2500000);
  const [pmayTenureYears, setPmayTenureYears] = useState(20);
  const [pmayCategory, setPmayCategory] = useState('EWS_LIG');

  // PM Surya Ghar Solar State
  const [solarMonthlyBill, setSolarMonthlyBill] = useState(2500);
  const [solarRoofArea, setSolarRoofArea] = useState(250);

  // MUDRA Business Loan State
  const [mudraLoanAmount, setMudraLoanAmount] = useState(350000);
  const [mudraTenureMonths, setMudraTenureMonths] = useState(36);

  // PMAY CLSS Calculation
  const calculatePmay = () => {
    let subsidyRate = 0.065;
    let maxSubsidizedPrincipal = 600000;
    let maxSubsidyAmount = 267000;

    if (pmayCategory === 'MIG1') {
      subsidyRate = 0.04;
      maxSubsidizedPrincipal = 900000;
      maxSubsidyAmount = 235000;
    } else if (pmayCategory === 'MIG2') {
      subsidyRate = 0.03;
      maxSubsidizedPrincipal = 1200000;
      maxSubsidyAmount = 230000;
    }

    const principalForSubsidy = Math.min(pmayLoanAmount, maxSubsidizedPrincipal);
    const estimatedSubsidy = Math.min(maxSubsidyAmount, Math.round(principalForSubsidy * subsidyRate * 7.5));
    const monthlyRate = 0.085 / 12;
    const months = pmayTenureYears * 12;

    const normalEmi = Math.round(
      (pmayLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
    const discountedEmi = Math.round(
      ((pmayLoanAmount - estimatedSubsidy) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );

    return {
      estimatedSubsidy,
      normalEmi,
      discountedEmi,
      monthlySavings: normalEmi - discountedEmi,
      lifetimeSavings: (normalEmi - discountedEmi) * months,
    };
  };

  // Solar Rooftop Calculation
  const calculateSolar = () => {
    let kw = 1;
    if (solarMonthlyBill > 3500 || solarRoofArea >= 300) kw = 3;
    else if (solarMonthlyBill > 1800 || solarRoofArea >= 200) kw = 2;

    let subsidy = 30000;
    let cost = 60000;
    let units = 120;

    if (kw === 2) {
      subsidy = 60000;
      cost = 120000;
      units = 240;
    } else if (kw >= 3) {
      subsidy = 78000;
      cost = 175000;
      units = 360;
    }

    const netCost = cost - subsidy;
    const monthlySaving = Math.round(units * 7.5);
    const annualSaving = monthlySaving * 12;
    const paybackYears = (netCost / annualSaving).toFixed(1);

    return { kw, cost, subsidy, netCost, monthlySaving, annualSaving, paybackYears };
  };

  // MUDRA Loan Calculation
  const calculateMudra = () => {
    const monthlyRate = 0.095 / 12;
    const emi = Math.round(
      (mudraLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, mudraTenureMonths)) /
      (Math.pow(1 + monthlyRate, mudraTenureMonths) - 1)
    );
    const totalPayable = emi * mudraTenureMonths;
    const totalInterest = totalPayable - mudraLoanAmount;

    let tier = 'Shishu (Up to ₹50,000)';
    if (mudraLoanAmount > 500000) tier = 'Tarun (₹5 Lakh to ₹20 Lakh)';
    else if (mudraLoanAmount > 50000) tier = 'Kishore (₹50,000 to ₹5 Lakh)';

    return { emi, totalPayable, totalInterest, tier };
  };

  const pmayResult = calculatePmay();
  const solarResult = calculateSolar();
  const mudraResult = calculateMudra();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Official DBT & Welfare Benefit Estimator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Government Subsidy & Savings Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Evaluate exact direct benefit transfer amounts, interest subsidies, and solar rooftop payback periods under central welfare programs.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'pmay', label: 'PMAY 2.0 Housing Subsidy', icon: Home },
            { id: 'solar', label: 'PM Surya Ghar Solar (₹78k)', icon: Sun },
            { id: 'mudra', label: 'MUDRA Collateral-Free Loan', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PMAY 2.0 HOUSING */}
        {activeTab === 'pmay' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Loan & Category Parameters</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Home Loan Principal: ₹{pmayLoanAmount.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="50000"
                    value={pmayLoanAmount}
                    onChange={(e) => setPmayLoanAmount(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loan Tenure: {pmayTenureYears} Years
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={pmayTenureYears}
                    onChange={(e) => setPmayTenureYears(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Income Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'EWS_LIG', label: 'EWS/LIG (< ₹6L)', sub: '6.5% Subsidy' },
                      { id: 'MIG1', label: 'MIG-I (₹6-12L)', sub: '4.0% Subsidy' },
                      { id: 'MIG2', label: 'MIG-II (₹12-18L)', sub: '3.0% Subsidy' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPmayCategory(c.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          pmayCategory === c.id
                            ? 'bg-green-50 border-green-600 text-green-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="text-xs">{c.label}</div>
                        <div className="text-[10px] text-green-700 font-semibold">{c.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Summary */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Eligible Government Subsidy
                </span>
                <div className="text-3xl font-black text-green-700">
                  ₹{pmayResult.estimatedSubsidy.toLocaleString('en-IN')}
                </div>
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span>Standard Bank EMI:</span>
                    <span className="font-semibold text-slate-800">₹{pmayResult.normalEmi.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discounted Net EMI:</span>
                    <span className="font-bold text-green-700">₹{pmayResult.discountedEmi.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Cashflow Savings:</span>
                    <span className="font-bold text-emerald-700">₹{pmayResult.monthlySavings.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                    <span>Lifetime Interest Savings:</span>
                    <span className="text-green-700">₹{pmayResult.lifetimeSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/copilot?scheme=pm-awas-yojana-urban')}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Ask AI How to Claim PMAY 2.0</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PM SURYA GHAR SOLAR */}
        {activeTab === 'solar' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Rooftop & Bill Inputs</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Electricity Bill: ₹{solarMonthlyBill.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={solarMonthlyBill}
                    onChange={(e) => setSolarMonthlyBill(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available Shadow-Free Rooftop: {solarRoofArea} sq. ft.
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={solarRoofArea}
                    onChange={(e) => setSolarRoofArea(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Solar Result */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Central Subsidy (Direct to Bank)
                </span>
                <div className="text-3xl font-black text-amber-600">
                  ₹{solarResult.subsidy.toLocaleString('en-IN')}
                </div>
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span>Recommended Capacity:</span>
                    <span className="font-bold text-slate-800">{solarResult.kw} kW System</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated System Cost:</span>
                    <span>₹{solarResult.cost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-700">
                    <span>Net Out-of-Pocket Cost:</span>
                    <span>₹{solarResult.netCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Estimated Payback Period:</span>
                    <span>{solarResult.paybackYears} Years (Free Power Thereafter)</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/copilot?scheme=pm-surya-ghar-muft-bijli')}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Apply on pmsuryaghar.gov.in</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MUDRA LOAN */}
        {activeTab === 'mudra' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Business Loan Amount</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loan Required: ₹{mudraLoanAmount.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="20000"
                    max="2000000"
                    step="10000"
                    value={mudraLoanAmount}
                    onChange={(e) => setMudraLoanAmount(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Repayment Tenure: {mudraTenureMonths} Months
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    step="6"
                    value={mudraTenureMonths}
                    onChange={(e) => setMudraTenureMonths(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* MUDRA Result */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Eligible MUDRA Tier (No Collateral)
                </span>
                <div className="text-xl font-black text-slate-900">{mudraResult.tier}</div>
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span>Monthly Repayment (EMI):</span>
                    <span className="font-bold text-green-700">₹{mudraResult.emi.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Over Tenure:</span>
                    <span>₹{mudraResult.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total Amount Payable:</span>
                    <span>₹{mudraResult.totalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/copilot?scheme=pm-mudra-yojana-pmmy')}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Ask AI for MUDRA Bank Linkage</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalculatorPage;
