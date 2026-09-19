import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  RefreshCw, 
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  LogIn
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS } from '../data/indianStates';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'otp'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regState, setRegState] = useState('Tamil Nadu');
  const [regCategory, setRegCategory] = useState('OBC');

  // OTP Fallback state
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState('email');
  const [previewOtp, setPreviewOtp] = useState(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: loginEmail, password: loginPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      if (data.token) {
        localStorage.setItem('VYNORA_auth_token', data.token);
      }
      if (data.user) {
        localStorage.setItem('VYNORA_user_profile', JSON.stringify(data.user));
        localStorage.setItem('VYNORA_user_email', data.user.email);
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
      }

      setSuccessMessage('Signed in successfully! Welcome back.');
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Account Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          username: regEmail.split('@')[0] || regName.toLowerCase().replace(/\s+/g, ''),
          password: regPassword,
          confirmPassword: regConfirmPassword,
          phone: regPhone,
          state: regState,
          category: regCategory,
          nativeLanguage: 'English',
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account.');
      }

      if (data.token) {
        localStorage.setItem('VYNORA_auth_token', data.token);
      }
      if (data.user) {
        localStorage.setItem('VYNORA_user_profile', JSON.stringify(data.user));
        localStorage.setItem('VYNORA_user_email', data.user.email);
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
      }

      setSuccessMessage('Account created successfully! Connecting to citizen profile...');
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!otpEmail || !otpEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setPreviewOtp(data.previewOtp);
      setOtpStep('code');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, otp: otpCode }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP code');
      }

      if (onAuthSuccess) {
        onAuthSuccess(data.user || { email: otpEmail, name: 'Verified Citizen' });
      }
      onClose();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-800">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 pt-6 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#064E3B] text-white shadow-sm mb-2.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
            {activeTab === 'login' && 'Sign In to VYNORA AI'}
            {activeTab === 'register' && 'Create New Citizen Account'}
            {activeTab === 'otp' && 'Instant OTP Login'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeTab === 'login' && 'Secure access to your DigiLocker & scheme benefits'}
            {activeTab === 'register' && 'Join the Sovereign Citizen Welfare Network'}
            {activeTab === 'otp' && 'Fast passwordless 2FA verification'}
          </p>

          {/* Navigation Tabs Strip */}
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl mt-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
              className={`py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-green-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
              className={`py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'register' ? 'bg-white text-green-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('otp'); setErrorMessage(''); }}
              className={`py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'otp' ? 'bg-white text-green-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Quick OTP</span>
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN / LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="citizen.demo@nic.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('otp')}
                    className="text-[11px] text-green-600 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Helper Hint */}
              <div className="p-2.5 bg-green-50/70 border border-green-200/60 rounded-xl text-[11px] text-green-800 flex items-center justify-between">
                <span>Demo Credential: <strong>citizen.demo@nic.in</strong></span>
                <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-green-200">Citizen@123</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">Don't have an account yet? </span>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
                  className="text-xs font-bold text-green-600 hover:underline cursor-pointer"
                >
                  Create New Account
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CREATE NEW ACCOUNT / REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar / ரமேஷ் குமார்"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="citizen@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Min 6 chars"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    State / UT
                  </label>
                  <select
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={regCategory}
                    onChange={(e) => setRegCategory(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="OBC">OBC (BC/MBC)</option>
                    <option value="General">General (OC)</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-slate-500">Already registered? </span>
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
                  className="text-xs font-bold text-green-600 hover:underline cursor-pointer"
                >
                  Sign In Here
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: QUICK OTP LOGIN FORM */}
          {activeTab === 'otp' && (
            <div>
              {otpStep === 'email' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Email for One-Time Password (OTP)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="citizen@example.com"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {previewOtp && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center space-y-1">
                      <p className="text-[11px] text-green-700 font-medium">Direct Verification Code:</p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-mono text-lg font-bold text-green-800 tracking-widest bg-white px-3 py-0.5 rounded-lg border border-green-200 shadow-xs">
                          {previewOtp}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(previewOtp)}
                          className="text-[10px] underline font-semibold text-green-700 hover:text-green-900 cursor-pointer"
                        >
                          Auto-Fill
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        maxLength={6}
                        required
                        autoFocus
                        placeholder="847291"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-mono tracking-widest text-center text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 4}
                    className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtpStep('email')}
                      className="text-xs text-slate-500 underline"
                    >
                      Change Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
