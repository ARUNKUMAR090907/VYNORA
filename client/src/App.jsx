import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider, AUTH_STATUS } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileQuestionnairePage from './pages/ProfileQuestionnairePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SchemesPage from './pages/SchemesPage';
import SchemeDetailPage from './pages/SchemeDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import CalculatorPage from './pages/CalculatorPage';
import CopilotPageWrapper from './pages/CopilotPageWrapper';
import DemoPage from './pages/DemoPage';

// Feature page wrappers (components exposed as pages)
import Navbar from './components/Navbar';
import { CoursesPage } from './components/CoursesPage';
import { InternshipsPage } from './components/InternshipsPage';
import { DigiLockerPage } from './components/DigiLockerPage';

// ────────────────────────────────────────────────────
// Context-connected wrappers for feature pages
// ────────────────────────────────────────────────────

const CoursesPageWrapper = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main className="flex-1">
        <CoursesPage userProfile={user} />
      </main>
    </div>
  );
};

const InternshipsPageWrapper = () => {
  const { user, reminders, toggleReminder } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main className="flex-1">
        <InternshipsPage
          userProfile={user}
          reminders={reminders}
          onToggleReminder={toggleReminder}
        />
      </main>
    </div>
  );
};

const DigiLockerPageWrapper = () => {
  const { documents, addDocument, deleteDocument } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main className="flex-1">
        <DigiLockerPage
          documents={documents}
          onAddDocument={addDocument}
          onDeleteDocument={deleteDocument}
        />
      </main>
    </div>
  );
};

// ────────────────────────────────────────────────────
// Loading Screen
// ────────────────────────────────────────────────────

const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-green-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-black text-slate-900">VYNORA</p>
        <p className="text-xs text-slate-500 mt-0.5">Loading your welfare dashboard...</p>
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────
// App Routes
// ────────────────────────────────────────────────────

const AppRoutes = () => {
  const { authStatus, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  const isAuthenticated =
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE ||
    authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE;

  const isProfileComplete = authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE;

  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth pages — redirect to home if already logged in */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={isProfileComplete ? '/home' : '/profile-questionnaire'} replace />
            : <LoginPage />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to={isProfileComplete ? '/home' : '/profile-questionnaire'} replace />
            : <RegisterPage />
        }
      />
      <Route path="/demo" element={<DemoPage />} />

      {/* Profile Questionnaire */}
      <Route
        path="/profile-questionnaire"
        element={
          authStatus === AUTH_STATUS.UNAUTHENTICATED
            ? <Navigate to="/login" state={{ from: { pathname: '/profile-questionnaire' } }} replace />
            : <ProfileQuestionnairePage />
        }
      />

      {/* Home Dashboard — requires full profile */}
      <Route
        path="/home"
        element={
          authStatus === AUTH_STATUS.UNAUTHENTICATED
            ? <Navigate to="/login" replace />
            : authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE
            ? <Navigate to="/profile-questionnaire" replace />
            : <HomePage />
        }
      />

      {/* Profile Edit */}
      <Route
        path="/profile"
        element={
          authStatus === AUTH_STATUS.UNAUTHENTICATED
            ? <Navigate to="/login" replace />
            : <ProfilePage />
        }
      />

      {/* Schemes – public */}
      <Route path="/schemes" element={<SchemesPage />} />
      <Route path="/schemes/:id" element={<SchemeDetailPage />} />

      {/* AI Copilot */}
      <Route path="/copilot" element={<CopilotPageWrapper />} />

      {/* Skilling Courses */}
      <Route path="/courses" element={<CoursesPageWrapper />} />

      {/* Internships */}
      <Route path="/internships" element={<InternshipsPageWrapper />} />

      {/* DigiLocker & Document Vault */}
      <Route path="/digilocker" element={<DigiLockerPageWrapper />} />

      {/* Subsidy & Benefit Calculator */}
      <Route path="/calculator" element={<CalculatorPage />} />

      {/* Catch-all → landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// ────────────────────────────────────────────────────
// Root App
// ────────────────────────────────────────────────────

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
