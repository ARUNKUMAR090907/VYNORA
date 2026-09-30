import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AUTH_STATUS = {
  UNKNOWN: 'UNKNOWN',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  AUTHENTICATED_PROFILE_INCOMPLETE: 'AUTHENTICATED_PROFILE_INCOMPLETE',
  AUTHENTICATED_PROFILE_COMPLETE: 'AUTHENTICATED_PROFILE_COMPLETE',
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('vynora_token'));
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.UNKNOWN);
  const [loading, setLoading] = useState(true);

  // Language preference
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    return localStorage.getItem('vynora_lang') || 'English';
  });

  const setSelectedLanguage = useCallback((lang) => {
    setSelectedLanguageState(lang);
    localStorage.setItem('vynora_lang', lang);
  }, []);

  // DigiLocker Documents Vault (Clean client state, real status tracking)
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem('vynora_user_docs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vynora_user_docs', JSON.stringify(documents));
    } catch (e) {
      console.warn('Failed to save documents to localStorage:', e);
    }
  }, [documents]);

  const addDocument = useCallback((doc) => {
    setDocuments((prev) => [doc, ...prev]);
  }, []);

  const deleteDocument = useCallback((docId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  }, []);

  // Internship reminders state
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('vynora_reminders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vynora_reminders', JSON.stringify(reminders));
    } catch (e) {
      console.warn('Failed to save reminders:', e);
    }
  }, [reminders]);

  const toggleReminder = useCallback((reminderItem) => {
    setReminders((prev) => {
      const exists = prev.find((r) => r.internshipId === reminderItem.internshipId);
      if (exists) {
        return prev.filter((r) => r.internshipId !== reminderItem.internshipId);
      }
      return [reminderItem, ...prev];
    });
  }, []);

  // Initialize and verify authentication on startup
  const initAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('vynora_token');
    if (!storedToken) {
      setToken(null);
      setUser(null);
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
      setLoading(false);
      return;
    }

    try {
      const data = await authService.getMe();
      if (data?.user) {
        setUser(data.user);
        setToken(storedToken);
        const isComplete = Boolean(data.user.profileCompleted);
        setAuthStatus(
          isComplete
            ? AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE
            : AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE
        );
        if (data.user.nativeLanguage) {
          setSelectedLanguage(data.user.nativeLanguage);
        }
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.warn('Session verification failed, logging out:', err.message);
      localStorage.removeItem('vynora_token');
      setToken(null);
      setUser(null);
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    } finally {
      setLoading(false);
    }
  }, [setSelectedLanguage]);

  useEffect(() => {
    initAuth();

    // Listen for unauthorized 401 events from Axios interceptor
    const handleUnauthorized = () => {
      localStorage.removeItem('vynora_token');
      setToken(null);
      setUser(null);
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    };

    window.addEventListener('vynora:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('vynora:unauthorized', handleUnauthorized);
  }, [initAuth]);

  // Login action
  const login = useCallback(async (usernameOrEmail, password) => {
    const data = await authService.login({ usernameOrEmail, password });
    if (!data.token || !data.user) {
      throw new Error('Invalid login response from server.');
    }

    localStorage.setItem('vynora_token', data.token);
    setToken(data.token);
    setUser(data.user);

    const isComplete = Boolean(data.user.profileCompleted);
    setAuthStatus(
      isComplete
        ? AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE
        : AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE
    );

    if (data.user.nativeLanguage) {
      setSelectedLanguage(data.user.nativeLanguage);
    }

    return data;
  }, [setSelectedLanguage]);

  // Register action
  const register = useCallback(async (email, username, password, confirmPassword, name) => {
    const data = await authService.register({
      email,
      username,
      password,
      confirmPassword,
      name,
    });

    if (!data.token || !data.user) {
      throw new Error('Invalid registration response from server.');
    }

    localStorage.setItem('vynora_token', data.token);
    setToken(data.token);
    setUser(data.user);

    // Newly registered user always has incomplete profile
    setAuthStatus(AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE);

    return data;
  }, []);

  // Logout action
  const logout = useCallback(() => {
    localStorage.removeItem('vynora_token');
    localStorage.removeItem('vynora_questionnaire_draft');
    setToken(null);
    setUser(null);
    setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
  }, []);

  // Update local user state after questionnaire or profile edit
  const setUserFromProfileUpdate = useCallback((updatedUser) => {
    if (!updatedUser) return;
    setUser(updatedUser);
    const isComplete = Boolean(updatedUser.profileCompleted);
    setAuthStatus(
      isComplete
        ? AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE
        : AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE
    );
    if (updatedUser.nativeLanguage) {
      setSelectedLanguage(updatedUser.nativeLanguage);
    }
  }, [setSelectedLanguage]);

  // Refresh user data from server
  const refreshUser = useCallback(async () => {
    try {
      const data = await authService.getMe();
      if (data?.user) {
        setUserFromProfileUpdate(data.user);
      }
    } catch (e) {
      console.warn('Failed to refresh user:', e.message);
    }
  }, [setUserFromProfileUpdate]);

  const value = {
    user,
    token,
    authStatus,
    loading,
    isAuthenticated:
      authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE ||
      authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_INCOMPLETE,
    isProfileComplete: authStatus === AUTH_STATUS.AUTHENTICATED_PROFILE_COMPLETE,
    selectedLanguage,
    setSelectedLanguage,
    login,
    register,
    logout,
    refreshUser,
    setUserFromProfileUpdate,
    documents,
    addDocument,
    deleteDocument,
    reminders,
    toggleReminder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
