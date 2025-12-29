
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import Dossiers from './components/Dossiers';
import DocAnalyzer from './components/DocAnalyzer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import { View, Dossier, AuthState, User } from './types';
import { StorageService } from './services/storage';
import { AuthService } from './services/auth';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.HOME);
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ user: null, token: null, isAuthenticated: false });

  useEffect(() => {
    const initAuth = async () => {
      const state = await AuthService.getAuthState();
      setAuth(state);
      if (state.user) await loadDossiers(state.user.id);
      setIsLoaded(true);
    };

    initAuth();

    // Listener de session Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const state = await AuthService.getAuthState();
        setAuth(state);
        if (state.user) loadDossiers(state.user.id);
      } else if (event === 'SIGNED_OUT') {
        setAuth({ user: null, token: null, isAuthenticated: false });
        setDossiers([]);
        setView(View.HOME);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadDossiers = async (userId: string) => {
    try {
      const data = await StorageService.getDossiers(userId);
      setDossiers(data);
    } catch (err) {
      console.error("Erreur de chargement des dossiers", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px]">Connexion Sécurisée...</p>
        </div>
      </div>
    );
  }

  // Routage public
  if (currentView === View.HOME) return <HomePage setView={setView} />;
  if (currentView === View.LOGIN) return <LoginPage onLoginSuccess={() => setView(View.DASHBOARD)} setView={setView} />;
  if (currentView === View.REGISTER) return <RegisterPage onRegisterSuccess={() => setView(View.DASHBOARD)} setView={setView} />;

  const renderView = () => (
    <ProtectedRoute isAuthenticated={auth.isAuthenticated} onRedirect={setView}>
      {(() => {
        switch (currentView) {
          case View.DASHBOARD: return <Dashboard setView={setView} />;
          case View.ASSISTANT: return <Assistant />;
          case View.ANALYZER: return auth.user && <DocAnalyzer user={auth.user} dossiers={dossiers} onRefreshDossiers={() => loadDossiers(auth.user!.id)} />;
          case View.DOSSIERS: return <Dossiers dossiers={dossiers} onCreateDossier={(t, c, d) => StorageService.addDossier(auth.user!.id, {title: t, client: c, domain: d}).then(() => loadDossiers(auth.user!.id))} onAnalyzeDossier={() => setView(View.ANALYZER)} />;
          case View.PROFILE: return auth.user && <ProfilePage user={auth.user} onUpdate={(u) => setAuth({ ...auth, user: u })} />;
          default: return <Dashboard setView={setView} />;
        }
      })()}
    </ProtectedRoute>
  );

  return (
    <Layout currentView={currentView} setView={setView} user={auth.user} onLogout={AuthService.logout}>
      {renderView()}
    </Layout>
  );
};

export default App;
