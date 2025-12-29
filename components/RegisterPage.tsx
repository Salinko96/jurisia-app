
import React, { useState } from 'react';
import { View, UserRole } from '../types';
import { AuthService } from '../services/auth';

interface RegisterPageProps {
  onRegisterSuccess: (user: any) => void;
  setView: (view: View) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, setView }) => {
  const [role, setRole] = useState<UserRole>('avocat');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firmName, setFirmName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Veuillez accepter les conditions générales.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await new Promise(r => setTimeout(r, 1500));
      const user = AuthService.register(email, password, firstName, lastName, role, firmName);
      onRegisterSuccess(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Visual Side */}
      <div className="lg:w-1/3 bg-slate-950 p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
        </div>

        <div className="relative z-10">
          <div 
            className="flex items-center gap-3 cursor-pointer group mb-20"
            onClick={() => setView(View.HOME)}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
              <i className="fa-solid fa-scale-balanced text-xl"></i>
            </div>
            <span className="font-serif-legal font-bold text-2xl tracking-tight">JurisIA</span>
          </div>

          <h1 className="text-4xl font-serif-legal font-bold leading-tight mb-8">
            Rejoignez <br /> 
            <span className="text-blue-500">l'Élite Juridique</span>.
          </h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
            Accédez à un arsenal d'intelligence artificielle conçu pour multiplier votre capacité d'analyse par dix.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
              <p className="text-sm text-slate-300">Confidentialité absolue garantie par isolation cryptographique.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
              <p className="text-sm text-slate-300">Conformité RGPD & Hébergement Souverain certifié.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
              <p className="text-sm text-slate-300">Veille législative automatisée en temps réel.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-20 border-t border-white/5">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 italic">
              <i className="fa-solid fa-medal text-blue-500"></i> Certifié "LegalTech d'Excellence" 2025
           </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 bg-slate-50 p-8 lg:p-24 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-1">Inscription Expert</h2>
              <p className="text-slate-500 text-sm">Configurez votre environnement de travail en 2 minutes.</p>
            </div>
            <button 
              onClick={() => setView(View.LOGIN)}
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1"
            >
              Déjà inscrit ? Connexion
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-10">
            {error && (
              <div className="p-5 bg-red-50 border border-red-100 rounded-[1.5rem] text-red-600 text-xs font-bold flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            {/* Profile Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Profil Professionnel</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['avocat', 'entreprise', 'particulier'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`p-6 rounded-[2rem] border transition-all text-left flex flex-col gap-3 group ${
                      role === r 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-1' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400'
                    }`}
                  >
                    <i className={`fa-solid ${
                      r === 'avocat' ? 'fa-user-tie' : r === 'entreprise' ? 'fa-building' : 'fa-user'
                    } text-xl ${role === r ? 'text-blue-400' : 'text-slate-300 group-hover:text-blue-500'}`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                      {r === 'avocat' ? 'Avocat / Cabinet' : r === 'entreprise' ? 'Direction Juridique' : 'Particulier Expert'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Prénom</label>
                  <input 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Email Professionnel</label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="j.dupont@cabinet.fr"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Nom</label>
                  <input 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Dupont"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Clé de Sécurité</label>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Minimum 8 caractères"
                  />
                </div>
              </div>
            </div>

            {role !== 'particulier' && (
              <div className="animate-in fade-in duration-300">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                  {role === 'avocat' ? 'Nom du Cabinet' : 'Raison Sociale'}
                </label>
                <input 
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  placeholder={role === 'avocat' ? "Cabinet Dupont & Associés" : "TechCorp Solutions SA"}
                />
              </div>
            )}

            <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100/50">
              <label className="flex items-start gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded-sm border-blue-200 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 leading-relaxed font-medium">
                  Je certifie être un professionnel du droit (pour les comptes avocats) ou un utilisateur corporatif. J'accepte les <button type="button" className="text-blue-600 font-bold hover:underline">Conditions Générales d'Utilisation</button> et la <button type="button" className="text-blue-600 font-bold hover:underline">Politique de Confidentialité</button>. Mes données seront traitées sur des serveurs souverains.
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-gear animate-spin"></i>
                  Génération du Profil...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus text-blue-400"></i>
                  Initialiser mon Espace Élite
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
