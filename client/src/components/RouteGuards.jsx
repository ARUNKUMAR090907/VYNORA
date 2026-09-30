import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AUTH_STATUS } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const PageLoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center animate-pulse">
        <ShieldCheck className="w-7 h-7" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">Verifying Citizen Session</h3>
        <p className="text-xs text-slate-500">Connecting securely to VYNORA services...</p>
      </div>
    </div>
  </div>
);

/**
 * ProtectedRoute: Requires authenticated citizen with completed profile.
 * - If unauthenticated -> /login
 * - If profile incomplete -> /profile-questionnaire
 */
export const ProtectedRoute = ({ children }) => {
  const { authStatus, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || authStatus === AUTH_STATUS.UNKNOWN) {
    return <PageLoadingFallback />;
  }

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE) {
    return <Navigate to="/profile-questionnaire" replace />;
  }

  return children;
};

/**
 * QuestionnaireRoute: Requires authenticated citizen.
 * - If unauthenticated -> /login
 * - Allows profile completion or editing
 */
export const QuestionnaireRoute = ({ children }) => {
  const { authStatus, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || authStatus === AUTH_STATUS.UNKNOWN) {
    return <PageLoadingFallback />;
  }

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * PublicRoute: For login and register pages.
 * - If already logged in and profile complete -> /home
 * - If already logged in and profile incomplete -> /profile-questionnaire
 */
export const PublicRoute = ({ children }) => {
  const { authStatus, loading } = useContext(AuthContext);

  if (loading || authStatus === AUTH_STATUS.UNKNOWN) {
    return <PageLoadingFallback />;
  }

  if (authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE) {
    return <Navigate to="/home" replace />;
  }

  if (authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE) {
    return <Navigate to="/profile-questionnaire" replace />;
  }

  return children;
};
