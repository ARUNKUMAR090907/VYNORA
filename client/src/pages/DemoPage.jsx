import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Sparkles } from 'lucide-react';

const DemoPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState('Initializing synthetic demo citizen...');

  useEffect(() => {
    let isMounted = true;
    async function activateDemo() {
      try {
        if (isMounted) setStatus('Authenticating demo citizen (Ramesh Patel - Small Farmer, TN)...');
        await login('demo_citizen', 'DemoCitizen123!');
        if (isMounted) setStatus('Loading personalized scheme discovery...');
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 500);
      } catch (err) {
        console.error('Demo login error:', err);
        if (isMounted) {
          setStatus('Redirecting to login...');
          setTimeout(() => navigate('/login', { replace: true }), 1000);
        }
      }
    }

    activateDemo();
    return () => {
      isMounted = false;
    };
  }, [login, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <div className="text-center space-y-4 max-w-sm px-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">VYNORA Demo Sandbox</h2>
          <p className="text-xs text-slate-500 mt-1">{status}</p>
        </div>
        <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-green-600 rounded-full animate-pulse" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
