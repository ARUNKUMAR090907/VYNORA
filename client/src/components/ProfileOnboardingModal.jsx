import React, { useState } from 'react';
import { 
  User, 
  IndianRupee, 
  Home, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Sparkles, 
  AlertCircle,
  X
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS, INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

export const ProfileOnboardingModal = ({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile,
  email
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [salary, setSalary] = useState(initialProfile?.salary ?? 250000);
  const [houseType, setHouseType] = useState(initialProfile?.houseType || 'rental');
  const [gender, setGender] = useState(initialProfile?.gender || 'male');
  const [address, setAddress] = useState(initialProfile?.address || '');
  const [state, setState] = useState(initialProfile?.state || 'Tamil Nadu');
  const [nativeLanguage, setNativeLanguage] = useState(initialProfile?.nativeLanguage || 'Tamil');
  const [employmentStatus, setEmploymentStatus] = useState(initialProfile?.employmentStatus || 'student');
  const [educationStream, setEducationStream] = useState(
    initialProfile?.educationStream || 'engineering'
  );
  const [category, setCategory] = useState(initialProfile?.category || 'OBC');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!address.trim()) {
      setError('Please provide your residential district or address.');
      return;
    }

    const updated = {
      email,
      name: name.trim(),
      salary: Number(salary),
      houseType,
      gender,
      address: address.trim(),
      state,
      nativeLanguage,
      employmentStatus,
      educationStream: employmentStatus === 'student' ? educationStream : undefined,
      category,
      isProfileComplete: true,
      createdAt: initialProfile?.createdAt || new Date().toISOString()
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8 p-6 sm:p-8 text-slate-800 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                Direct Citizen Profiling
              </span>
              <span className="text-xs text-emerald-700 font-semibold">100% Secure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-sans">
              Personal Information & Scheme Matching
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Your details determine real-time eligibility scores across Central & State government schemes.
            </p>
          </div>

          {initialProfile?.isProfileComplete && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 py-4 space-y-5 flex-1">
          
          {/* 1. Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar / Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'male', label: 'Male' },
                  { id: 'female', label: 'Female' },
                  { id: 'transgender', label: 'Other' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      gender === g.id
                        ? 'bg-green-600 text-white border-green-600 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Employment & Occupation Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>Citizen Profile Category</span>
              <span className="text-[11px] text-green-600 lowercase font-normal">determines student vs worker schemes</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'student', label: 'College Student', icon: GraduationCap },
                { id: 'working_salaried', label: 'Working (Salaried)', icon: Briefcase },
                { id: 'working_self_employed', label: 'Self-Employed / MSME', icon: Briefcase },
                { id: 'job_seeker', label: 'Job Seeker', icon: User },
                { id: 'farmer', label: 'Farmer / Agriculture', icon: Home },
                { id: 'homemaker', label: 'Homemaker', icon: Home },
              ].map((emp) => {
                const Icon = emp.icon;
                const isSelected = employmentStatus === emp.id;
                return (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => setEmploymentStatus(emp.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-green-50 border-green-500 text-green-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold leading-tight">{emp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2b. If Student: Stream Selector */}
          {employmentStatus === 'student' && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Academic Stream (For Government Internships)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'engineering', label: 'Engineering' },
                  { id: 'medical', label: 'Medical' },
                  { id: 'arts', label: 'Arts / Humanities' },
                  { id: 'law', label: 'Law' },
                  { id: 'commerce', label: 'Commerce / MBA' },
                  { id: 'sciences', label: 'Sciences' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setEducationStream(st.id)}
                    className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      educationStream === st.id
                        ? 'bg-green-600 text-white border-green-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Annual Income / Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Annual Household Income / Salary
              </label>
              <span className="font-mono text-sm font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-lg border border-green-200">
                ₹{Number(salary).toLocaleString('en-IN')} / year
              </span>
            </div>
            
            <input
              type="range"
              min={0}
              max={1500000}
              step={25000}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>₹0 (EWS)</span>
              <span>₹2.5 Lakh (BPL)</span>
              <span>₹6 Lakh (LIG)</span>
              <span>₹10 Lakh (MIG)</span>
              <span>₹15+ Lakh</span>
            </div>
          </div>

          {/* 4. House Type & Social Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                House Ownership Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rental', label: 'Rental' },
                  { id: 'owned', label: 'Owned' },
                  { id: 'ancestral', label: 'Ancestral / Other' },
                ].map((ht) => (
                  <button
                    key={ht.id}
                    type="button"
                    onClick={() => setHouseType(ht.id)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                      houseType === ht.id
                        ? 'bg-green-600 text-white border-green-600 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ht.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Social Category (Reservation & Grants)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {['General', 'OBC', 'SC', 'ST', 'EWS'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 text-[11px] font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-green-600 text-white border-green-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. State / UT & Native Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                State / Union Territory
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                >
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Native Language (For AI Copilot)
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {LANGUAGE_LOCAL_NAMES[lang]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 6. District / Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Address / District & PIN Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ward No 4, Shivaji Nagar, Pune - 411005"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            />
          </div>

        </form>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            <span>Updates matching score instantly</span>
          </div>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile & View Eligible Schemes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
