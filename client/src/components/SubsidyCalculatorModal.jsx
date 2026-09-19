import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  IndianRupee, 
  Sun, 
  Home, 
  Briefcase, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Download,
  Info,
  CheckCircle2
} from 'lucide-react';

export const SubsidyCalculatorModal = ({ isOpen, onClose, userProfile, onOpenCopilotWithContext }) => {
  const [activeTab, setActiveTab] = useState('pmay');

  // PMAY Calculator State
  const [pmayLoanAmount, setPmayLoanAmount] = useState(2500000);
  const [pmayTenureYears, setPmayTenureYears] = useState(20);
  const [pmayCategory, setPmayCategory] = useState('EWS_LIG'); // EWS_LIG, MIG1, MIG2

  // PM Surya Ghar Solar Calculator State
  const [solarMonthlyBill, setSolarMonthlyBill] = useState(2500);
  const [solarRoofArea, setSolarRoofArea] = useState(250); // sq ft

  // PM Mudra Business Loan State
  const [mudraLoanAmount, setMudraLoanAmount] = useState(350000);
  const [mudraTenureMonths, setMudraTenureMonths] = useState(36);
  const [mudraInterestRate, setMudraInterestRate] = useState(9.5);

  // Sukanya Samriddhi State
  const [ssyAnnualDeposit, setSsyAnnualDeposit] = useState(60000);
  const [ssyGirlAge, setSsyGirlAge] = useState(3);

  // Atal Pension Yojana State
  const [apyAge, setApyAge] = useState(24);
  const [apyTargetPension, setApyTargetPension] = useState(5000);

  if (!isOpen) return null;

  // 1. PMAY CLSS Calculation
  const calculatePmaySubsidy = () => {
    let subsidyRate = 0.065; // 6.5% for EWS/LIG
    let maxSubsidizedPrincipal = 600000;
    let maxSubsidyAmount = 267000;

    if (pmayCategory === 'MIG1') {
      subsidyRate = 0.04; // 4%
      maxSubsidizedPrincipal = 900000;
      maxSubsidyAmount = 235000;
    } else if (pmayCategory === 'MIG2') {
      subsidyRate = 0.03; // 3%
      maxSubsidizedPrincipal = 1200000;
      maxSubsidyAmount = 230000;
    }

    const principalForSubsidy = Math.min(pmayLoanAmount, maxSubsidizedPrincipal);
    const estimatedSubsidy = Math.min(maxSubsidyAmount, Math.round(principalForSubsidy * subsidyRate * 7.5));
    
    // Normal monthly EMI estimate at 8.5%
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
      lifetimeSavings: (normalEmi - discountedEmi) * months
    };
  };

  // 2. PM Surya Ghar Solar Calculation
  const calculateSolarSubsidy = () => {
    // Recommend kW based on bill
    let recommendedKw = 1;
    if (solarMonthlyBill > 3500 || solarRoofArea >= 300) recommendedKw = 3;
    else if (solarMonthlyBill > 1800 || solarRoofArea >= 200) recommendedKw = 2;

    let subsidy = 30000;
    let estimatedCost = 60000;
    let monthlyUnits = 120;

    if (recommendedKw === 2) {
      subsidy = 60000;
      estimatedCost = 120000;
      monthlyUnits = 240;
    } else if (recommendedKw >= 3) {
      subsidy = 78000;
      estimatedCost = 165000;
      monthlyUnits = 360;
    }

    const netPayable = estimatedCost - subsidy;
    const annualSavings = Math.round(monthlyUnits * 7.5 * 12);
    const paybackYears = (netPayable / annualSavings).toFixed(1);

    return {
      recommendedKw,
      estimatedCost,
      subsidy,
      netPayable,
      monthlyUnits,
      annualSavings,
      paybackYears
    };
  };

  // 3. PM Mudra Loan Calculation
  const calculateMudraLoan = () => {
    let tier = 'Shishu (Up to ₹50,000)';
    if (mudraLoanAmount > 1000000) tier = 'Tarun Plus (₹10 Lakh to ₹20 Lakh)';
    else if (mudraLoanAmount > 500000) tier = 'Tarun (₹5 Lakh to ₹10 Lakh)';
    else if (mudraLoanAmount > 50000) tier = 'Kishore (₹50,000 to ₹5 Lakh)';

    const r = (mudraInterestRate / 100) / 12;
    const n = mudraTenureMonths;
    const emi = Math.round((mudraLoanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalAmount = emi * n;
    const totalInterest = totalAmount - mudraLoanAmount;

    return {
      tier,
      emi,
      totalInterest,
      totalAmount,
      collateralRequired: '₹0 (100% Collateral-Free)'
    };
  };

  // 4. Sukanya Samriddhi Yojana (SSY) Calculation
  const calculateSsy = () => {
    const interestRate = 0.082; // 8.2% p.a.
    const depositYears = 15;
    let totalDeposited = ssyAnnualDeposit * depositYears;
    let corpus = 0;

    // Compound interest simulation for 15 years deposit + 6 years maturity growth
    for (let yr = 1; yr <= 21; yr++) {
      if (yr <= depositYears) {
        corpus = (corpus + ssyAnnualDeposit) * (1 + interestRate);
      } else {
        corpus = corpus * (1 + interestRate);
      }
    }

    const maturityAmount = Math.round(corpus);
    const interestEarned = maturityAmount - totalDeposited;

    return {
      totalDeposited,
      interestEarned,
      maturityAmount,
      maturityAge: 21 + ssyGirlAge,
      taxSaved: Math.round(ssyAnnualDeposit * 0.3) // 30% tax bracket equivalent
    };
  };

  // 5. Atal Pension Yojana (APY) Calculation
  const calculateApy = () => {
    // APY monthly contribution table approximation per ₹1,000 pension at age
    const baseTable = {
      18: 42, 19: 46, 20: 50, 21: 54, 22: 59, 23: 65, 24: 70, 25: 76,
      26: 82, 27: 90, 28: 97, 29: 106, 30: 116, 31: 126, 32: 138, 33: 151,
      34: 165, 35: 181, 36: 198, 37: 218, 38: 240, 39: 264, 40: 291
    };

    const multiplier = apyTargetPension / 1000;
    const monthlyContribution = (baseTable[apyAge] || 70) * multiplier;
    const yearsOfContribution = 60 - apyAge;
    const totalInvested = monthlyContribution * 12 * yearsOfContribution;
    const corpusToNominee = apyTargetPension * 1700; // e.g. ₹8.5 Lakh for ₹5,000 pension

    return {
      monthlyContribution,
      yearsOfContribution,
      totalInvested,
      corpusToNominee,
      monthlyPension: apyTargetPension
    };
  };

  const pmayRes = calculatePmaySubsidy();
  const solarRes = calculateSolarSubsidy();
  const mudraRes = calculateMudraLoan();
  const ssyRes = calculateSsy();
  const apyRes = calculateApy();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-800 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                  Sovereign Citizen Subsidy & Benefit Calculator
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  DBT Live 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official financial models for Central Government housing, solar, loans, and pension schemes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center space-x-1.5 px-6 pt-3 pb-2 border-b border-slate-200 bg-white overflow-x-auto">
          {[
            { id: 'pmay', label: 'PMAY 2.0 Housing Subsidy', icon: Home },
            { id: 'solar', label: 'PM Surya Ghar Solar', icon: Sun },
            { id: 'mudra', label: 'Mudra Business Loan EMI', icon: Briefcase },
            { id: 'ssy', label: 'Sukanya Samriddhi (8.2%)', icon: Heart },
            { id: 'apy', label: 'Atal Pension Matrix', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-green-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Calculator Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* TAB 1: PMAY 2.0 HOUSING SUBSIDY */}
          {activeTab === 'pmay' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Home Loan Amount</span>
                    <span className="text-green-700 font-mono text-sm">₹{Number(pmayLoanAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={6000000}
                    step={100000}
                    value={pmayLoanAmount}
                    onChange={(e) => setPmayLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>₹5 Lakh</span>
                    <span>₹30 Lakh</span>
                    <span>₹60 Lakh</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Loan Tenure</span>
                    <span className="text-green-700 font-mono text-sm">{pmayTenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={1}
                    value={pmayTenureYears}
                    onChange={(e) => setPmayTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Income Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'EWS_LIG', label: 'EWS / LIG', sub: 'Income <= ₹6L (6.5% Subsidy)' },
                      { id: 'MIG1', label: 'MIG - 1', sub: 'Income ₹6L-₹9L (4% Subsidy)' },
                      { id: 'MIG2', label: 'MIG - 2', sub: 'Income ₹9L-₹12L (3% Subsidy)' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPmayCategory(c.id)}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          pmayCategory === c.id
                            ? 'bg-green-50 border-green-500 text-green-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-xs">{c.label}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{c.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Government Subsidy Outcome
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-sans flex items-center">
                    <IndianRupee className="w-6 h-6 mr-0.5 inline" />
                    <span>₹{Number(pmayRes.estimatedSubsidy).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct Credit Linked Subsidy (CLSS) credited upfront to reduce principal loan liability.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Normal Monthly EMI:</span>
                    <span className="font-bold text-slate-800">₹{Number(pmayRes.normalEmi).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Subsidized EMI:</span>
                    <span className="font-bold text-emerald-700">₹{Number(pmayRes.discountedEmi).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    Total Lifetime Interest Saved: <strong>₹{Number(pmayRes.lifetimeSavings).toLocaleString('en-IN')}</strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PM SURYA GHAR SOLAR */}
          {activeTab === 'solar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Average Monthly Electricity Bill</span>
                    <span className="text-green-700 font-mono text-sm">₹{solarMonthlyBill} / month</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={250}
                    value={solarMonthlyBill}
                    onChange={(e) => setSolarMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Usable Roof Area</span>
                    <span className="text-green-700 font-mono text-sm">{solarRoofArea} sq. ft.</span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={600}
                    step={20}
                    value={solarRoofArea}
                    onChange={(e) => setSolarRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 space-y-1">
                  <div className="font-bold flex items-center">
                    <Sun className="w-4 h-4 text-amber-500 mr-1" />
                    Recommended System: {solarRes.recommendedKw} kW Rooftop Solar Plant
                  </div>
                  <p className="text-[11px] text-green-800">
                    Generates approx {solarRes.monthlyUnits} units/month, making your domestic electricity 100% free.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Direct Government Central Subsidy (DBT)
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-sans">
                    ₹{Number(solarRes.subsidy).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Transferred directly to your bank account within 30 days of net-meter commissioning.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Estimated Turnkey Cost:</span>
                    <span className="font-bold text-slate-800">₹{Number(solarRes.estimatedCost).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Net Citizen Payable:</span>
                    <span className="font-bold text-green-700">₹{Number(solarRes.netPayable).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                  <span>Annual Electricity Bill Savings: <strong>₹{Number(solarRes.annualSavings).toLocaleString('en-IN')}/yr</strong></span>
                  <span className="font-bold text-[11px] bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    Payback: {solarRes.paybackYears} Yrs
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PM MUDRA LOAN EMI */}
          {activeTab === 'mudra' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Business Loan Amount</span>
                    <span className="text-green-700 font-mono text-sm">₹{Number(mudraLoanAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={2000000}
                    step={25000}
                    value={mudraLoanAmount}
                    onChange={(e) => setMudraLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>₹50K (Shishu)</span>
                    <span>₹5 Lakh (Kishore)</span>
                    <span>₹10 Lakh (Tarun)</span>
                    <span>₹20 Lakh (Tarun+)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Loan Tenure</span>
                    <span className="text-green-700 font-mono text-sm">{mudraTenureMonths} Months ({(mudraTenureMonths/12).toFixed(1)} Yrs)</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={84}
                    step={6}
                    value={mudraTenureMonths}
                    onChange={(e) => setMudraTenureMonths(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Interest Rate (% p.a.)</span>
                    <span className="text-green-700 font-mono text-sm">{mudraInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={7.5}
                    max={14.0}
                    step={0.25}
                    value={mudraInterestRate}
                    onChange={(e) => setMudraInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Monthly Loan EMI
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                    ₹{Number(mudraRes.emi).toLocaleString('en-IN')} / month
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Category: <strong className="text-green-700">{mudraRes.tier}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Total Interest:</span>
                    <span className="font-bold text-rose-700">₹{Number(mudraRes.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Total Repayable:</span>
                    <span className="font-bold text-slate-800">₹{Number(mudraRes.totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    Collateral Security Required: <strong>None (100% Guaranteed by CGTMSE)</strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUKANYA SAMRIDDHI (SSY) */}
          {activeTab === 'ssy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Yearly Investment in Daughter's Account</span>
                    <span className="text-green-700 font-mono text-sm">₹{Number(ssyAnnualDeposit).toLocaleString('en-IN')} / yr</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={150000}
                    step={5000}
                    value={ssyAnnualDeposit}
                    onChange={(e) => setSsyAnnualDeposit(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>₹5,000</span>
                    <span>₹75,000</span>
                    <span>₹1.5 Lakh (80C Max)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Girl Child Current Age</span>
                    <span className="text-green-700 font-mono text-sm">{ssyGirlAge} Years</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={ssyGirlAge}
                    onChange={(e) => setSsyGirlAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                  <div className="font-bold">Government Sovereign Interest: 8.2% Compound p.a.</div>
                  <p className="text-[11px] text-emerald-800">
                    Highest guaranteed risk-free rate in India. Deposits required for 15 years; grows till 21 years.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Estimated Tax-Free Maturity Fund
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-sans">
                    ₹{Number(ssyRes.maturityAmount).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Matures when daughter turns {ssyRes.maturityAge} years old for higher education/marriage.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Total Deposited:</span>
                    <span className="font-bold text-slate-800">₹{Number(ssyRes.totalDeposited).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Pure Interest Wealth:</span>
                    <span className="font-bold text-emerald-700">₹{Number(ssyRes.interestEarned).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-green-100/70 rounded-xl border border-green-200 text-xs text-green-950 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>
                    Triple Tax Exemption (EEE): <strong>Zero tax on deposit, interest, and maturity!</strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ATAL PENSION YOJANA (APY) */}
          {activeTab === 'apy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Your Current Age (Entry Age)</span>
                    <span className="text-green-700 font-mono text-sm">{apyAge} Years</span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={40}
                    step={1}
                    value={apyAge}
                    onChange={(e) => setApyAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>18 Years (Lowest Premium)</span>
                    <span>40 Years (Max Entry Age)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Guaranteed Monthly Pension at Age 60
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1000, 2000, 3000, 4000, 5000].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setApyTargetPension(p)}
                        className={`py-2 px-1 text-center rounded-xl border transition-all cursor-pointer ${
                          apyTargetPension === p
                            ? 'bg-green-600 text-white font-bold shadow-xs border-green-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 text-xs font-semibold'
                        }`}
                      >
                        ₹{p.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Monthly Contribution Required
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 font-sans">
                    ₹{apyRes.monthlyContribution} / month
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Auto-debited from your bank account for {apyRes.yearsOfContribution} years till age 60.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Guaranteed Pension:</span>
                    <span className="font-bold text-emerald-700">₹{Number(apyRes.monthlyPension).toLocaleString('en-IN')} / month</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Nominee Return Corpus:</span>
                    <span className="font-bold text-slate-800">₹{Number(apyRes.corpusToNominee).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    Guaranteed for life to Subscriber & Spouse, with full corpus return to legal heirs.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 text-green-600" />
            <span>Figures based on current FY 2026-27 Government of India guidelines.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
