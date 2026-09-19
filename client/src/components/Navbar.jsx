import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
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
  Sliders
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';

const Navbar = ({ onOpenCalculator, onOpenDossier, onOpenProfile }) => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    selectedLanguage, 
    setSelectedLanguage,
    logout 
  } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navTabs = [
    { id: 'schemes', label: 'Schemes Explorer', icon: ShieldCheck, route: '/home' },
    { id: 'copilot', label: 'AI Copilot (ஜனசேவா)', icon: Bot, badge: 'Sovereign AI', route: '/home' },
    { id: 'courses', label: 'Courses & Skilling', icon: BookOpen, route: '/home' },
    { id: 'internships', label: 'Govt Internships', icon: GraduationCap, badge: 'PMIS 2026', route: '/home' },
    { id: 'digilocker', label: 'DigiLocker Vault', icon: FolderLock, route: '/home' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/home') {
      navigate('/home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & National Emblem Mark */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/home" 
              onClick={() => setActiveTab('schemes')}
              className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-green-700 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-green-200" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
                    VYNORA
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                    GOV
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 -mt-0.5 tracking-wide">
                  Citizen Welfare Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80 shadow-xs">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && location.pathname === '/home';
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-green-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-green-100 text-green-800' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Calculator, Dossier, Language, Profile */}
          <div className="hidden sm:flex items-center space-x-2">
            
            {/* Quick Subsidy Calculator Button */}
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                title="Open Subsidy & Savings Calculator"
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-700 hover:text-emerald-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xl:inline">Calculator</span>
              </button>
            )}

            {/* Quick Citizen Dossier Button */}
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                title="Generate Official Citizen Dossier"
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-200 text-slate-700 hover:text-green-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-green-600" />
                <span className="hidden xl:inline">Dossier</span>
              </button>
            )}

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
                    Select Advisory Language
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
                      {selectedLanguage === lang && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Citizen Profile Pill */}
            <div className="relative">
              <button
                onClick={() => {
                  if (onOpenProfile) onOpenProfile();
                  else navigate('/profile');
                }}
                className="pl-2.5 pr-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-xs transition-colors"
                title="Edit Citizen Profile & Income"
              >
                <div className="w-6 h-6 rounded-lg bg-green-600 text-white flex items-center justify-center text-[11px] font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">
                    {user?.name || 'Ramesh Kumar'}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-medium leading-tight">
                    ₹{user?.salary ? Number(user.salary).toLocaleString('en-IN') : '2.4L'}/yr
                  </div>
                </div>
              </button>
            </div>

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
          
          {/* Mobile Navigation Tabs */}
          <div className="space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-bold border border-green-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Action Tools in Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {onOpenCalculator && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>Calculator</span>
              </button>
            )}

            {onOpenDossier && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDossier();
                }}
                className="py-2 px-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-green-600" />
                <span>Citizen Dossier</span>
              </button>
            )}
          </div>

          {/* Profile & Settings Trigger */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenProfile) onOpenProfile();
                else navigate('/profile');
              }}
              className="flex items-center space-x-2 text-xs font-bold text-slate-800"
            >
              <User className="w-4 h-4 text-green-600" />
              <span>{user?.name || 'Citizen Profile'}</span>
            </button>

            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs text-green-600 font-semibold"
            >
              Full Profile →
            </Link>
          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;

