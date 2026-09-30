import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { CopilotPage } from '../components/CopilotPage';
import { SCHEMES_DATABASE } from '../data/schemesData';

const CopilotPageWrapper = () => {
  const { user, selectedLanguage, setSelectedLanguage, addDocument } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const schemeSlug = searchParams.get('scheme') || null;
  const initialQuery = searchParams.get('q') || null;

  // Resolve scheme context from slug
  const [schemeContext, setSchemeContext] = useState(null);

  useEffect(() => {
    if (schemeSlug) {
      const found = SCHEMES_DATABASE.find(
        (s) => s.slug === schemeSlug || s.id === schemeSlug
      );
      if (found) {
        setSchemeContext(found);
      }
    }
  }, [schemeSlug]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main className="flex-1">
        <CopilotPage
          userProfile={user}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          initialSchemeContext={schemeContext}
          onClearSchemeContext={() => setSchemeContext(null)}
          onSaveToDigiLocker={addDocument}
          initialQuery={initialQuery}
        />
      </main>
    </div>
  );
};

export default CopilotPageWrapper;
