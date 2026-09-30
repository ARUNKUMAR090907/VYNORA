import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { userService } from '../services/userService';
import { INDIAN_STATES_AND_UTS, INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';
import {
  User,
  IndianRupee,
  Home,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building,
  Users
} from 'lucide-react';

const TOTAL_STEPS = 6;
const DRAFT_KEY = 'vynora_questionnaire_draft';

const OCCUPATION_OPTIONS = [
  { id: 'Student', label: 'Student / Scholar', desc: 'Enrolled in school, college, or university', icon: GraduationCap },
  { id: 'Working Professional', label: 'Working Professional', desc: 'Salaried employee in private or government sector', icon: Briefcase },
  { id: 'Self-employed', label: 'Self-Employed / Business', desc: 'MSME owner, trader, shopkeeper, or consultant', icon: Building },
  { id: 'Farmer', label: 'Farmer / Agri Worker', desc: 'Small, marginal farmer or agricultural cultivator', icon: Sparkles },
  { id: 'Artisan', label: 'Artisan / Traditional Craft', desc: 'Weaver, carpenter, potter, or skilled traditional artisan', icon: Users },
  { id: 'Unemployed', label: 'Job Seeker / Unemployed', desc: 'Actively preparing for jobs or seeking livelihood skilling', icon: User },
];

const HOUSE_OPTIONS = [
  { id: 'Owned', label: 'Owned House', desc: 'Own pucca residential property' },
  { id: 'Rental', label: 'Rental Accommodation', desc: 'Rented house / room in urban or rural locality' },
  { id: 'Kutcha', label: 'Kutcha / Semi-Pucca House', desc: 'Temporary mud / thatch / non-concrete dwelling' },
  { id: 'Homeless', label: 'Shelter / Homeless', desc: 'No permanent home or shelter' },
];

const COMMUNITY_OPTIONS = ['General', 'OBC', 'SC', 'ST', 'EWS'];

const ProfileQuestionnairePage = () => {
  const { user, setUserFromProfileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data from draft or existing user record
  const [formData, setFormData] = useState(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
    } catch (e) {
      console.warn('Failed to parse questionnaire draft:', e);
    }

    return {
      name: user?.name || '',
      gender: user?.gender || 'Male',
      age: '24',
      annualIncome: user?.annualIncome ? String(user.annualIncome) : '240000',
      houseType: user?.houseType || 'Rental',
      state: user?.state || 'Tamil Nadu',
      district: user?.district || 'Chennai',
      address: user?.address || '',
      pincode: user?.pincode || '',
      community: user?.community || 'OBC',
      occupationStatus: user?.occupationStatus || 'Student',
      nativeLanguage: user?.nativeLanguage || 'English',
    };
  });

  // Save draft whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Could not save draft:', e);
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  // Step validation
  const validateStep = (step) => {
    setError('');
    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Please enter your legal full name.');
        return false;
      }
      if (!formData.gender) {
        setError('Please select your gender.');
        return false;
      }
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 14 || ageNum > 100) {
        setError('Please enter a valid age between 14 and 100.');
        return false;
      }
    } else if (step === 2) {
      const incomeNum = parseInt(String(formData.annualIncome).replace(/\D/g, ''), 10);
      if (isNaN(incomeNum) || incomeNum < 0) {
        setError('Please enter a valid annual income in Rupees.');
        return false;
      }
      if (!formData.houseType) {
        setError('Please select your housing type.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.state) {
        setError('Please select your State / UT.');
        return false;
      }
      if (!formData.district.trim()) {
        setError('Please enter your District.');
        return false;
      }
      if (!formData.address.trim()) {
        setError('Please enter your residential locality/address.');
        return false;
      }
      if (formData.pincode && !/^\d{6}$/.test(formData.pincode.trim())) {
        setError('Please enter a valid 6-digit Pincode.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.community) {
        setError('Please select your social reservation category.');
        return false;
      }
    } else if (step === 5) {
      if (!formData.occupationStatus) {
        setError('Please select your current occupation or student status.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setLoading(true);
    setError('');

    const canonicalPayload = {
      name: formData.name.trim(),
      annualIncome: parseInt(String(formData.annualIncome).replace(/\D/g, ''), 10) || 0,
      houseType: formData.houseType,
      gender: formData.gender,
      address: formData.address.trim(),
      state: formData.state,
      district: formData.district.trim(),
      pincode: formData.pincode.trim(),
      nativeLanguage: formData.nativeLanguage,
      community: formData.community,
      occupationStatus: formData.occupationStatus,
    };

    try {
      // 1. Authoritative backend save & server eligibility recalculation
      const response = await userService.updateProfile(canonicalPayload);

      if (!response.success || !response.user) {
        throw new Error(response.message || 'Server did not confirm profile completion.');
      }

      // 2. Clear draft from storage
      localStorage.removeItem(DRAFT_KEY);

      // 3. Update React context state
      setUserFromProfileUpdate(response.user);
      setSaveSuccess(true);

      // 4. Navigate directly to Home
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 600);
    } catch (err) {
      // Section 52: Clean offline / failure message
      setError(
        'VYNORA cannot reach the server right now. Your unsaved changes have not been submitted. Please check your connection and retry.'
      );
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
    
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Header and Progress Indicator */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-xs font-medium text-slate-500">{progressPercent}% Completed</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-3 text-rose-800 text-xs font-semibold animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Profile verified! Computing your personalized welfare schemes...</span>
            </div>
          )}

          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 1: Personal Information</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your official details as recorded in government identity documents.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Legal Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => handleChange('gender', g)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.gender === g
                            ? 'bg-green-50 border-green-600 text-green-800 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Age (Years)</label>
                  <input
                    type="number"
                    min="14"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="e.g. 24"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Used to evaluate age limits for scholarships, pensions, and internships.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FINANCIAL & HOUSING INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 2: Financial & Housing Status</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Government schemes use household income and dwelling type to evaluate eligibility ceilings.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Annual Household Income (₹ INR / Year)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      step="10000"
                      value={formData.annualIncome}
                      onChange={(e) => handleChange('annualIncome', e.target.value)}
                      placeholder="e.g. 240000"
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 font-medium"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      { label: 'Under ₹1.5 Lakh (BPL)', val: '140000' },
                      { label: '₹2.5 Lakh (EWS limit)', val: '240000' },
                      { label: '₹5 Lakh (LIG limit)', val: '480000' },
                      { label: '₹8 Lakh (OBC creamy layer ceiling)', val: '750000' },
                    ].map((pill) => (
                      <button
                        type="button"
                        key={pill.val}
                        onClick={() => handleChange('annualIncome', pill.val)}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer font-medium"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Current House / Dwelling Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HOUSE_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => handleChange('houseType', opt.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          formData.houseType === opt.id
                            ? 'bg-green-50 border-green-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                          {formData.houseType === opt.id && (
                            <CheckCircle2 className="w-4 h-4 text-green-700" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION & RESIDENCE */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 3: Location & State</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Many welfare initiatives and subsidies are tailored to specific State or Union Territory domiciles.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">State / Union Territory</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                    >
                      {INDIAN_STATES_AND_UTS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">District</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      placeholder="e.g. Coimbatore, Madurai, Bengaluru"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Residential Address / Village / Locality
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="e.g. 14, Gandhi Road, Anna Nagar"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Postal Pincode (6 Digits)</label>
                  <input
                    type="text"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    placeholder="e.g. 600040"
                    className="w-full max-w-xs px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SOCIAL CATEGORY / COMMUNITY */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 4: Social / Eligibility Category</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Required to identify specific reservation quotas, educational scholarships, and DBT grants.
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {COMMUNITY_OPTIONS.map((comm) => (
                    <div
                      key={comm}
                      onClick={() => handleChange('community', comm)}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        formData.community === comm
                          ? 'bg-green-50 border-green-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm font-bold text-slate-900 block">{comm}</span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        {comm === 'General'
                          ? 'Unreserved'
                          : comm === 'EWS'
                          ? 'Economically Weaker'
                          : comm === 'OBC'
                          ? 'Other Backward Class'
                          : `${comm} Category`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: OCCUPATION */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 5: Current Occupation</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select your primary livelihood status to uncover relevant skilling, subsidies, and business loans.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OCCUPATION_OPTIONS.map((occ) => {
                  const Icon = occ.icon;
                  const isSelected = formData.occupationStatus === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => handleChange('occupationStatus', occ.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-green-50 border-green-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{occ.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{occ.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: LANGUAGE PREFERENCE */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 6: Native Language Preference</h2>
                <p className="text-xs text-slate-500 mt-1">
                  VYNORA AI Copilot and scheme summaries will converse and explain requirements in your chosen language.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INDIAN_LANGUAGES.map((lang) => {
                  const localName = LANGUAGE_LOCAL_NAMES[lang] || lang;
                  const isSelected = formData.nativeLanguage === lang;
                  return (
                    <div
                      key={lang}
                      onClick={() => handleChange('nativeLanguage', lang)}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-green-50 border-green-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{lang}</span>
                      <span className="text-xs text-green-700 font-semibold mt-0.5 block">{localName}</span>
                    </div>
                  );
                })}
              </div>

              {/* Review Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mt-4 text-xs">
                <span className="font-bold text-slate-700 block">Review Citizen Dossier Summary:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Name: <span className="font-semibold text-slate-900">{formData.name}</span></div>
                  <div>Annual Income: <span className="font-semibold text-slate-900">₹{Number(formData.annualIncome).toLocaleString('en-IN')}/yr</span></div>
                  <div>State: <span className="font-semibold text-slate-900">{formData.state}</span></div>
                  <div>Occupation: <span className="font-semibold text-slate-900">{formData.occupationStatus}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-50 cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-all"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="px-7 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-all disabled:opacity-60"
              >
                <span>{loading ? 'Saving Profile & Calculating...' : 'Save Profile & View Home'}</span>
                {!loading && <CheckCircle2 size={16} />}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileQuestionnairePage;
