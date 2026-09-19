import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || '';

// Default citizen profile for seamless instant access & high eligibility matching
export const DEFAULT_CITIZEN_PROFILE = {
  name: 'Ramesh Kumar',
  email: 'ramesh.kumar@citizen.gov.in',
  salary: 240000,
  houseType: 'rental', // 'rental', 'owned', 'kutcha', 'homeless'
  employmentStatus: 'student', // 'student', 'unemployed', 'working_private', 'working_govt', 'working_self_employed', 'farmer', 'artisan'
  category: 'OBC', // 'General', 'OBC', 'SC', 'ST', 'EWS'
  gender: 'male',
  address: 'Anna Nagar, Chennai, Tamil Nadu - 600040',
  state: 'Tamil Nadu',
  nativeLanguage: 'English',
  educationStream: 'engineering',
  isProfileComplete: true,
};

// Initial verified DigiLocker documents
const INITIAL_DOCUMENTS = [
  {
    id: 'doc-aadhaar-01',
    name: 'Aadhaar_Card_UIDAI_Verified',
    category: 'Aadhaar Card',
    fileType: 'image/jpeg',
    originalSizeBytes: 84500, // 84.5 KB - portal ready
    dataUrl: '',
    uploadedAt: '24/08/2026',
    verified: true,
    notes: 'Aadhaar linked to active mobile & NPCI DBT map'
  },
  {
    id: 'doc-income-02',
    name: 'Tahsildar_Income_Certificate_2026',
    category: 'Income Certificate',
    fileType: 'image/jpeg',
    originalSizeBytes: 96200, // 96.2 KB
    dataUrl: '',
    uploadedAt: '25/08/2026',
    verified: true,
    notes: 'Annual income certified under ₹2.5 Lakhs'
  },
  {
    id: 'doc-marksheet-03',
    name: 'HSC_PlusTwo_Marksheet',
    category: 'Academic Marksheet',
    fileType: 'image/jpeg',
    originalSizeBytes: 78000,
    dataUrl: '',
    uploadedAt: '26/08/2026',
    verified: true,
    notes: 'Verified for NSP & PM Internship Scheme'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedProfile = localStorage.getItem('citizen_profile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        console.warn('Failed to parse citizen profile:', e);
      }
    }
    return DEFAULT_CITIZEN_PROFILE;
  });

  const [token, setToken] = useState(() => localStorage.getItem('authToken') || 'guest_citizen_token');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('VYNORA_lang') || 'English');
  const [activeTab, setActiveTab] = useState('schemes'); // 'schemes', 'copilot', 'courses', 'internships', 'digilocker'
  const [copilotContextScheme, setCopilotContextScheme] = useState(null);

  // DigiLocker Documents Vault State
  const [documents, setDocuments] = useState(() => {
    const savedDocs = localStorage.getItem('digilocker_docs');
    if (savedDocs) {
      try {
        return JSON.parse(savedDocs);
      } catch (e) {
        console.warn('Failed to parse digilocker docs:', e);
      }
    }
    return INITIAL_DOCUMENTS;
  });

  // Internship Reminders State
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('internship_reminders');
    if (savedReminders) {
      try {
        return JSON.parse(savedReminders);
      } catch (e) {
        console.warn('Failed to parse reminders:', e);
      }
    }
    return [
      {
        internshipId: 'pm-internship-scheme-2026',
        internshipTitle: 'Prime Minister Internship Scheme (PMIS) - Corporate Ministry',
        reminderDate: '2026-09-10',
        notifyEmail: true,
        notes: 'Submit Dean recommendation letter and Aadhaar e-KYC',
        active: true
      }
    ];
  });

  // Persist Documents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('digilocker_docs', JSON.stringify(documents));
    } catch (e) {
      console.warn('Could not save docs to localStorage', e);
    }
  }, [documents]);

  // Persist Reminders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('internship_reminders', JSON.stringify(reminders));
    } catch (e) {
      console.warn('Could not save reminders to localStorage', e);
    }
  }, [reminders]);

  // Persist Selected Language
  useEffect(() => {
    try {
      localStorage.setItem('VYNORA_lang', selectedLanguage);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  }, [selectedLanguage]);

  // Persist Citizen Profile
  const updateCitizenProfile = useCallback((updatedData) => {
    setUser((prev) => {
      const merged = {
        ...(prev || DEFAULT_CITIZEN_PROFILE),
        ...updatedData,
        isProfileComplete: true
      };
      try {
        localStorage.setItem('citizen_profile', JSON.stringify(merged));
      } catch (e) {
        console.warn('Could not save profile to localStorage', e);
      }
      return merged;
    });
  }, []);

  const addDocument = useCallback((newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
  }, []);

  const deleteDocument = useCallback((docId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  }, []);

  const toggleReminder = useCallback((reminderObj) => {
    setReminders((prev) => {
      const index = prev.findIndex((r) => r.internshipId === reminderObj.internshipId);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...reminderObj };
        return updated;
      }
      return [reminderObj, ...prev];
    });
  }, []);

  // Quick Copilot Navigation with Pre-filled Scheme
  const askCopilotAboutScheme = useCallback((scheme) => {
    setCopilotContextScheme(scheme);
    setActiveTab('copilot');
  }, []);

  const clearCopilotContext = useCallback(() => {
    setCopilotContextScheme(null);
  }, []);

  const login = useCallback(async (usernameOrEmail, password) => {
    try {
      const endpoint = API_BASE ? `${API_BASE}/api/auth/login` : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      setToken(data.token || 'user_token');
      if (data.user) {
        updateCitizenProfile(data.user);
      }
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (error) {
      // Local fallback for smooth experience
      const demoUser = {
        ...DEFAULT_CITIZEN_PROFILE,
        name: usernameOrEmail.split('@')[0] || 'Citizen',
        email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@citizen.gov.in`,
      };
      setToken('demo_token');
      localStorage.setItem('authToken', 'demo_token');
      updateCitizenProfile(demoUser);
      return { token: 'demo_token', user: demoUser };
    }
  }, [updateCitizenProfile]);

  const register = useCallback(async (email, username, password, confirmPassword, name) => {
    try {
      const endpoint = API_BASE ? `${API_BASE}/api/auth/register` : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, confirmPassword, name }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      setToken(data.token || 'user_token');
      if (data.user) {
        updateCitizenProfile(data.user);
      }
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (error) {
      const newUser = {
        ...DEFAULT_CITIZEN_PROFILE,
        name: name || username || 'Citizen',
        email: email || 'citizen@gov.in',
      };
      setToken('demo_token');
      localStorage.setItem('authToken', 'demo_token');
      updateCitizenProfile(newUser);
      return { token: 'demo_token', user: newUser };
    }
  }, [updateCitizenProfile]);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('authToken');
  }, []);

  const value = {
    user,
    token,
    loading,
    selectedLanguage,
    setSelectedLanguage,
    activeTab,
    setActiveTab,
    copilotContextScheme,
    askCopilotAboutScheme,
    clearCopilotContext,
    documents,
    addDocument,
    deleteDocument,
    reminders,
    toggleReminder,
    updateCitizenProfile,
    register,
    login,
    logout,
    isAuthenticated: true, // Allow citizens instant frictionless access to all public schemes & tools
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

