import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Bot,
  BookOpen,
  GraduationCap,
  FolderLock,
  Calculator,
  FileText,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Globe,
  Sliders,
  LogIn,
  UserPlus
} from 'lucide-react';
import { AuthContext, AUTH_STATUS } from '../context/AuthContext';
import { INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

const Navbar = ({ onOpenCalculator, onOpenDossier }) => {
  const {
    user,
    authStatus,
    selectedLanguage,
    setSelectedLanguage,
    logout,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const isAuthenticated =
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE ||
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE;

  const navLinks = [
    { label: 'Home', path: '/home', icon: ShieldCheck, authRequired: true },
    { label: 'Schemes', path: '/schemes', icon: ShieldCheck },
    { label: 'AI Copilot', path: '/copilot', icon: Bot, badge: 'AI' },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Internships', path: '/internships', icon: GraduationCap },
    { label: 'Documents', path: '/digilocker', icon: FolderLock },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link
              to={isAuthenticated ? '/home' : '/'}
              className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-green-700 transition-colors">
                <ShieldCheck className="w-5 h-5 text-green-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base font-black text-slate-900 tracking-tight font-sans">
                    VYNORA
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-green-50 text-green-700 border border-green-200">
                    WELFARE
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 -mt-0.5 tracking-wide">
                  Citizen Intelligence Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-green-700 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-green-100 text-green-800">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Tools: Calculator, Language, User Profile / Auth */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Subsidy Calculator */}
            <Link
              to="/calculator"
              title="Subsidy & Benefits Calculator"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Calculator</span>
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800">
                  {LANGUAGE_LOCAL_NAMES[selectedLanguage] || selectedLanguage}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in"
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Advisory Language
                  </div>
                  {INDIAN_LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedLanguage === lang ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{LANGUAGE_LOCAL_NAMES[lang]}</span>
                      {selectedLanguage === lang && <span className="w-1.5 h-1.5 rounded-full bg-green-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authenticated Citizen Profile Dropdown OR Sign In Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="pl-2 pr-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-green-700 text-white flex items-center justify-center text-[11px] font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <div className="text-left hidden md:block max-w-[120px] truncate">
                    <div className="text-[11px] font-bold text-slate-800 leading-tight truncate">
                      {user.name || user.username}
                    </div>
                    <div className="text-[9px] text-green-700 font-semibold leading-tight">
                      ₹{Number(user.annualIncome || 0).toLocaleString('en-IN')}/yr
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900 truncate">{user.name || user.username}</div>
                      <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User size={14} className="text-slate-400" />
                      <span>Citizen Profile</span>
                    </Link>

                    <Link
                      to="/profile-questionnaire"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Sliders size={14} className="text-slate-400" />
                      <span>Edit Questionnaire</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2 cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold shadow-xs transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700 font-bold border border-green-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Action Tools */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              to="/calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Subsidy Calculator</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-xs font-bold text-slate-800"
                >
                  <User className="w-4 h-4 text-green-700" />
                  <span>{user.name || user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-600 font-bold flex items-center space-x-1"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-center rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-center rounded-xl bg-green-700 text-xs font-bold text-white shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
