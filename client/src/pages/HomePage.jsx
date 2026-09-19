import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { HeroCarousel } from '../components/HeroCarousel';
import { SchemeExplorer } from '../components/SchemeExplorer';
import { CopilotPage } from '../components/CopilotPage';
import { CoursesPage } from '../components/CoursesPage';
import { InternshipsPage } from '../components/InternshipsPage';
import { DigiLockerPage } from '../components/DigiLockerPage';
import { CitizenDossierModal } from '../components/CitizenDossierModal';
import { SubsidyCalculatorModal } from '../components/SubsidyCalculatorModal';
import { ProfileOnboardingModal } from '../components/ProfileOnboardingModal';

const HomePage = () => {
  const { 
    user, 
    updateCitizenProfile,
    activeTab, 
    setActiveTab, 
    selectedLanguage, 
    setSelectedLanguage,
    copilotContextScheme,
    askCopilotAboutScheme,
    clearCopilotContext,
    documents,
    addDocument,
    deleteDocument,
    reminders,
    toggleReminder
  } = useContext(AuthContext);

  // Modal visibility states
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-green-100 selection:text-green-900 font-sans">
      
      {/* Top Minimalist Sticky Header */}
      <Navbar
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area based on active tab */}
      <main className="flex-1 pb-16">
        
        {/* TAB 1: SCHEMES EXPLORER & HERO */}
        {activeTab === 'schemes' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Hero Carousel with Welfare Statistics */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <HeroCarousel 
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            </div>

            {/* Scheme Catalog & Match Scoring Grid */}
            <SchemeExplorer
              userProfile={user}
              onAskCopilot={askCopilotAboutScheme}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onOpenCalculator={() => setIsCalculatorOpen(true)}
              onOpenDossier={() => setIsDossierOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: VYNORA MULTILINGUAL SOVEREIGN AI COPILOT */}
        {activeTab === 'copilot' && (
          <div className="animate-in fade-in duration-200">
            <CopilotPage
              userProfile={user}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              initialSchemeContext={copilotContextScheme}
              onClearSchemeContext={clearCopilotContext}
              onSaveToDigiLocker={addDocument}
            />
          </div>
        )}

        {/* TAB 3: NATIONAL SKILLING & VOCATIONAL COURSES */}
        {activeTab === 'courses' && (
          <div className="animate-in fade-in duration-200">
            <CoursesPage
              userProfile={user}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          </div>
        )}

        {/* TAB 4: CENTRAL & STATE GOVT INTERNSHIPS (PMIS 2026) */}
        {activeTab === 'internships' && (
          <div className="animate-in fade-in duration-200">
            <InternshipsPage
              userProfile={user}
              reminders={reminders}
              onToggleReminder={toggleReminder}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          </div>
        )}

        {/* TAB 5: DIGILOCKER VAULT & 100KB COMPRESSOR */}
        {activeTab === 'digilocker' && (
          <div className="animate-in fade-in duration-200">
            <DigiLockerPage
              documents={documents}
              onAddDocument={addDocument}
              onDeleteDocument={deleteDocument}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">VYNORA Sovereign Citizen Portal</span>
            <span>•</span>
            <span>Government of India & State Welfare Gateway</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Direct Benefit Transfer (DBT)</span>
            <span>•</span>
            <span>100% Client-Side Privacy & Encryption</span>
            <span>•</span>
            <span>Zero External API Dependency</span>
          </div>
        </div>
      </footer>

      {/* GLOBAL MODALS */}
      {/* 1. Citizen Welfare Dossier Modal */}
      <CitizenDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        userProfile={user}
        documents={documents}
      />

      {/* 2. Subsidy & EMI Savings Calculator Modal */}
      <SubsidyCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        userProfile={user}
        onOpenCopilotWithContext={askCopilotAboutScheme}
      />

      {/* 3. Citizen Profile & Income Onboarding Modal */}
      <ProfileOnboardingModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialProfile={user}
        onSaveProfile={(updatedProfile) => {
          updateCitizenProfile(updatedProfile);
          setIsProfileModalOpen(false);
        }}
        email={user?.email || 'citizen@gov.in'}
      />

    </div>
  );
};

export default HomePage;
