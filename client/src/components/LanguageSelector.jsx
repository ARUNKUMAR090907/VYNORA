import React, { useState, useContext } from 'react';
import { Globe } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/userService';

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];

const LanguageSelector = () => {
  const { user } = useContext(AuthContext);
  const [selectedLang, setSelectedLang] = useState(user?.nativeLanguage || 'English');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = async (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);

    try {
      await userService.updateProfile({ nativeLanguage: lang });
    } catch (error) {
      console.error('Failed to update language:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{selectedLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                selectedLang === lang ? 'bg-green-50 text-green-600 font-semibold' : ''
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
