import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { userService } from '../services/userService';
import { 
  User, 
  IndianRupee, 
  Home, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS, INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

const ProfileQuestionnairePage = () => {
  const { user, updateCitizenProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    annualIncome: user?.salary ? String(user.salary) : '250000',
    houseType: user?.houseType === 'owned' ? 'Owned' : 'Rental',
    gender: 'Male',
    address: user?.address || '',
    state: user?.state || 'Tamil Nadu',
    nativeLanguage: user?.nativeLanguage || 'English',
    community: user?.category || 'General',
    religion: 'Hindu',
    occupationStatus: 'Student',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!formData.annualIncome.trim()) {
      setError('Please enter your annual income');
      setLoading(false);
      return;
    }

    try {
      // 1. Update in backend if online
      try {
        await userService.updateProfile({
          ...formData,
          salary: formData.annualIncome,
          houseType: formData.houseType.toLowerCase(),
          employmentStatus: formData.occupationStatus.toLowerCase(),
          category: formData.community,
        });
      } catch (backendErr) {
        console.warn('Backend update notice (persisting locally):', backendErr);
      }

      // 2. Update in React Context & Local Storage
      updateCitizenProfile({
        ...formData,
        salary: formData.annualIncome,
        houseType: formData.houseType.toLowerCase(),
        employmentStatus: formData.occupationStatus.toLowerCase(),
        category: formData.community,
        isProfileComplete: true,
      });

      // 3. Navigate directly to Home Page with eligible schemes
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
        
        {/* Step Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            <span>Step 2 of 2: Citizen Profile Questionnaire</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tell Us About Yourself
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Answer these simple questions so our AI engine can calculate your precision eligibility scores for 50+ Central and State welfare schemes.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-800 text-xs font-bold animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>1. Full Legal Name</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
            </div>

            {/* 2. Annual Income (type='text') */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>2. Annual Income (₹)</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                required
                placeholder="e.g. 250000 or 2.5 Lakhs"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-medium"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Enter numbers or format like 2.5 Lakhs</span>
            </div>

            {/* 3. House Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>3. House Type</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                <option value="Owned">Owned (Own House)</option>
                <option value="Rental">Rental (Tenant Accommodation)</option>
              </select>
            </div>

            {/* 4. Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>4. Gender</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* 5. State */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>5. State / Union Territory</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Native Language */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>6. Native Language</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                <option value="English">English (Default)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="Malayalam">Malayalam (മലയാളം)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
              </select>
            </div>

            {/* 7. Community / Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>7. Community / Category</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            {/* 8. Religion */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>8. Religion</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
              >
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Jain">Jain</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* 9. Student or Working People / Occupation */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>9. Student or Working People</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                name="occupationStatus"
                value={formData.occupationStatus}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer font-medium"
              >
                <option value="Student">Student (School / College / Higher Education)</option>
                <option value="Working Professional">Working Professional (Salaried / Private Employee)</option>
                <option value="Self-Employed">Self-Employed / Business Owner / MSME Entrepreneur</option>
                <option value="Farmer">Farmer / Agriculturalist</option>
                <option value="Artisan">Artisan / Traditional Craftsperson</option>
                <option value="Unemployed">Unemployed Youth / Job Seeker</option>
              </select>
            </div>

            {/* 10. Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center space-x-1">
                <span>10. Residential Address / District</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="District, City, Pincode..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
            </div>

          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Calculating Eligibility & Saving...' : 'Calculate My Eligibility & View Schemes'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};

export default ProfileQuestionnairePage;

