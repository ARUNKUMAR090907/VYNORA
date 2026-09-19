import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileQuestionnairePage from './pages/ProfileQuestionnairePage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Tab-sync wrapper for direct URL deep-linking
const TabRoutedHomePage = ({ tabId }) => {
  const { setActiveTab } = useContext(AuthContext);
  useEffect(() => {
    if (tabId) {
      setActiveTab(tabId);
    }
  }, [tabId, setActiveTab]);

  return <HomePage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing & Direct Civic Tools */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/schemes" element={<TabRoutedHomePage tabId="schemes" />} />
      <Route path="/copilot" element={<TabRoutedHomePage tabId="copilot" />} />
      <Route path="/courses" element={<TabRoutedHomePage tabId="courses" />} />
      <Route path="/internships" element={<TabRoutedHomePage tabId="internships" />} />
      <Route path="/digilocker" element={<TabRoutedHomePage tabId="digilocker" />} />

      {/* Profile & Auth */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile-questionnaire" element={<ProfileQuestionnairePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

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

