
import React, { useState } from 'react';
import { View } from '../types';
import { AuthService } from '../services/auth';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  setView: (view: View) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulation d'un délai réseau
      await new Promise(r => setTimeout(r, 1000));
      // Ajout de await ici pour résoudre la promesse
      const { user } = await AuthService.login(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="w-full max-w-lg z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-600"></div>
            <div 
              className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer"
              onClick={() => setView(View.HOME)}
            >
              <i className="fa-solid fa-scale-balanced text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-serif-legal font-bold text-white tracking-tight mb-2">Authentification JurisIA</h2>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Accès Poste de Travail Sécurisé</p>
          </div>

          <form onSubmit={handleLogin} className="p-12 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3 animate-pulse">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Identifiant Professionnel</label>
                <div className="relative group">
                  <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"></i>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.nom@cabinet.fr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Clé d'Accès Cryptographique</label>
                <div className="relative group">
                  <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"></i>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500" />
                Maintenir la session
              </label>
              <button type="button" className="hover:text-blue-600 transition-colors">Clé perdue ?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Validation du Token...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-shield-check text-blue-400"></i>
                  Ouvrir la session
                </>
              )}
            </button>

            <div className="pt-6 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Nouveau praticien ? {' '}
                <button 
                  type="button" 
                  onClick={() => setView(View.REGISTER)}
                  className="text-blue-600 font-black uppercase tracking-widest hover:underline"
                >
                  Créer un compte expert
                </button>
              </p>
            </div>
          </form>

          <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-tighter text-slate-500">
              <i className="fa-solid fa-lock"></i> AES-256 bits
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-tighter text-slate-500">
              <i className="fa-solid fa-fingerprint"></i> RGPD Certifié
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-tighter text-slate-500">
              <i className="fa-solid fa-globe"></i> Hosting FR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
