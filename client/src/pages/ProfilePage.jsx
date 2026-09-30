import React, { useState, useEffect, useContext } from 'react';
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
  Save,
  ArrowLeft,
  AlertCircle,
  Building
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS, INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

const ProfilePage = () => {
  const { user, setUserFromProfileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    annualIncome: 240000,
    houseType: 'Rental',
    gender: 'Male',
    address: '',
    state: 'Tamil Nadu',
    district: '',
    pincode: '',
    nativeLanguage: 'English',
    community: 'General',
    occupationStatus: 'Student',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.username || '',
        email: user.email || '',
        annualIncome: user.annualIncome || 0,
        houseType: user.houseType || 'Rental',
        gender: user.gender || 'Male',
        address: user.address || '',
        state: user.state || 'Tamil Nadu',
        district: user.district || '',
        pincode: user.pincode || '',
        nativeLanguage: user.nativeLanguage || 'English',
        community: user.community || 'General',
        occupationStatus: user.occupationStatus || 'Student',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'annualIncome' ? (parseInt(value, 10) || 0) : value,
    }));
    setError('');
    setSavedSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSavedSuccess(false);

    try {
      const canonicalPayload = {
        name: formData.name.trim(),
        annualIncome: Number(formData.annualIncome) || 0,
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

      const res = await userService.updateProfile(canonicalPayload);
      if (res.user) {
        setUserFromProfileUpdate(res.user);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update citizen profile. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        <div>
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-green-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                Official Citizen Dossier
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Citizen Welfare Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Updating your profile triggers automatic recalculation of scheme match scores and DBT eligibility.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>Auto-Recalculation Active</span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Profile updated successfully! Government scheme eligibility scores have been recalculated.</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-800 text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Section 1: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
              <User size={16} className="text-green-700" />
              <span>1. Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Authenticated)</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang} ({LANGUAGE_LOCAL_NAMES[lang] || lang})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Financial & Housing */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
              <IndianRupee size={16} className="text-green-700" />
              <span>2. Financial & Housing Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Household Income (₹)</label>
                <input
                  type="number"
                  name="annualIncome"
                  step="10000"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dwelling / House Type</label>
                <select
                  name="houseType"
                  value={formData.houseType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  <option value="Rental">Rental Accommodation</option>
                  <option value="Owned">Owned Pucca House</option>
                  <option value="Kutcha">Kutcha / Semi-Pucca House</option>
                  <option value="Homeless">Homeless / Temporary Shelter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
              <MapPin size={16} className="text-green-700" />
              <span>3. Location & Domicile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State / UT</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g. Coimbatore"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 600040"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street / Locality"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Eligibility & Category */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
              <Briefcase size={16} className="text-green-700" />
              <span>4. Occupation & Social Category</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation Status</label>
                <select
                  name="occupationStatus"
                  value={formData.occupationStatus}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  <option value="Student">Student / Scholar</option>
                  <option value="Working Professional">Working Professional (Salaried)</option>
                  <option value="Self-employed">Self-employed / MSME Business</option>
                  <option value="Farmer">Farmer / Cultivator</option>
                  <option value="Artisan">Artisan / Traditional Craft</option>
                  <option value="Unemployed">Job Seeker / Unemployed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Social Community / Category</label>
                <select
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                >
                  <option value="General">General (Unreserved)</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-60 transition-all"
            >
              <Save size={15} />
              <span>{loading ? 'Saving to Database...' : 'Save Profile & Recalculate'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;
