import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
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
  ArrowLeft 
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS, INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

const ProfilePage = () => {
  const { user, updateCitizenProfile, setActiveTab } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || 'Ramesh Kumar',
    email: user?.email || 'citizen@gov.in',
    salary: user?.salary ?? 240000,
    houseType: user?.houseType || 'rental',
    gender: user?.gender || 'male',
    address: user?.address || 'Anna Nagar, Chennai, Tamil Nadu',
    state: user?.state || 'Tamil Nadu',
    nativeLanguage: user?.nativeLanguage || 'Tamil',
    employmentStatus: user?.employmentStatus || 'student',
    educationStream: user?.educationStream || 'engineering',
    category: user?.category || 'OBC',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCitizenProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* Back Link */}
        <button
          onClick={() => {
            setActiveTab('schemes');
            navigate('/home');
          }}
          className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-green-600 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Schemes Explorer</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                Verified Citizen Record
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Citizen Welfare Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your profile parameters determine precision percentage match scoring across all 50+ government schemes.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Matching Active</span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Citizen profile saved successfully! Scheme eligibility scores updated in real-time.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          
          {/* Identity & Contact Group */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <User className="w-4 h-4 text-green-600" />
              <span>Personal Identity & Demographics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Legal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female (Eligible for Women Empowerment schemes)</option>
                  <option value="other">Other / Transgender</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Social Category / Reservation</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  <option value="General">General / Open Category</option>
                  <option value="OBC">OBC (Other Backward Classes)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Economic & Housing Group */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span>Economic & Housing Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Annual Family Income: <strong className="text-emerald-700">₹{Number(formData.salary).toLocaleString('en-IN')}/year</strong>
                </label>
                <input
                  type="range"
                  min="30000"
                  max="1500000"
                  step="10000"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹30K (BPL)</span>
                  <span>₹3L (EWS)</span>
                  <span>₹6L (LIG)</span>
                  <span>₹15L (MIG)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Housing Status</label>
                <select
                  name="houseType"
                  value={formData.houseType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  <option value="rental">Rental Accommodation (PMAY 2.0 Priority)</option>
                  <option value="owned">Own Pucca House (Solar Rooftop Priority)</option>
                  <option value="kutcha">Kutcha / Temporary House (PMAY-Gramin Priority)</option>
                  <option value="homeless">Homeless / Shelter Required</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Occupation / Employment</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  <option value="student">Student (Scholarships & PM Internship)</option>
                  <option value="working_self_employed">Self-Employed / MSME Entrepreneur (Mudra / PMEGP)</option>
                  <option value="farmer">Farmer / Agriculturalist (PM-Kisan & KCC)</option>
                  <option value="artisan">Artisan / Traditional Craftsperson (PM Vishwakarma)</option>
                  <option value="unemployed">Unemployed Youth (Skilling & Apprenticeship)</option>
                  <option value="working_private">Private Sector Salaried Employee</option>
                  <option value="working_govt">Government Employee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Education Stream / Field</label>
                <select
                  name="educationStream"
                  value={formData.educationStream}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  <option value="engineering">Engineering / B.E / B.Tech / Diploma</option>
                  <option value="sciences">Pure & Applied Sciences / B.Sc / M.Sc</option>
                  <option value="commerce">Commerce / Banking / B.Com / MBA</option>
                  <option value="arts">Arts / Humanities / BA</option>
                  <option value="medical">Medical / Nursing / Allied Health</option>
                  <option value="law">Law / Legal Studies</option>
                  <option value="school">School / Higher Secondary (10th/12th)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jurisdiction & Language */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>State Jurisdiction & Language</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">State / Union Territory</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Advisory Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                >
                  {INDIAN_LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {LANGUAGE_LOCAL_NAMES[l]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Residential Address / District</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="District, City, Pincode..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-xs cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Eligibility Engine</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProfilePage;

