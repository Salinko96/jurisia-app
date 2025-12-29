
import React, { useState } from 'react';
import { View, User } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, user, onLogout, children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: View.HOME, label: 'Accueil Public', icon: 'fa-house-user' },
    { id: View.DASHBOARD, label: 'Tableau de bord', icon: 'fa-chart-line', protected: true },
    { id: View.ASSISTANT, label: 'Assistant IA', icon: 'fa-robot', protected: true },
    { id: View.ANALYZER, label: 'Analyse Doc', icon: 'fa-file-magnifying-glass', protected: true },
    { id: View.REGISTRATION, label: 'Inscriptions', icon: 'fa-users-gear', protected: true },
    { id: View.DOSSIERS, label: 'Dossiers', icon: 'fa-folder-open', protected: true },
    { id: View.MODELS, label: 'Modèles', icon: 'fa-file-invoice', protected: true },
    { id: View.CALCULATOR, label: 'Calculateur', icon: 'fa-calculator', protected: true },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0 relative z-20">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
        
        <div 
          onClick={() => setView(View.HOME)}
          className="p-8 border-b border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition-all group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
            <i className="fa-solid fa-scale-balanced text-white text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-legal font-bold text-2xl tracking-tight leading-none">JurisIA</span>
            <span className="text-[7px] font-black text-blue-400 uppercase tracking-[0.4em] mt-1">Plateforme Élite</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                currentView === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                : 'text-slate-500 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <i className={`fa-solid ${item.icon} w-5 text-center text-sm ${currentView === item.id ? 'text-white' : 'group-hover:text-blue-400'}`}></i>
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              {item.protected && !user && (
                <i className="fa-solid fa-lock text-[8px] text-slate-700 relative z-10"></i>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <i className="fa-solid fa-circle-nodes text-blue-500"></i>
              Système Souverain
            </p>
            <div className="space-y-2">
               <div className="flex items-center justify-between text-[8px] font-bold text-slate-400">
                  <span>Serveur</span>
                  <span className="text-emerald-500 flex items-center gap-1"><span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> Operationnel</span>
               </div>
               <div className="flex items-center justify-between text-[8px] font-bold text-slate-400">
                  <span>Cryptage</span>
                  <span className="text-blue-400">AES-256</span>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-10 py-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
             <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                {navItems.find(n => n.id === currentView)?.label}
             </h1>
             <div className="flex items-center gap-2 text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                <span className="text-blue-500">JurisIA Console</span> 
                <i className="fa-solid fa-chevron-right text-[6px]"></i> 
                Session {user ? 'Authentifiée' : 'Anonyme'}
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-slate-100">
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center relative">
                  <i className="fa-solid fa-bell"></i>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                </button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                  <i className="fa-solid fa-gear"></i>
                </button>
            </div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-4 group"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{user.firstName} {user.lastName}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none italic">{user.role} expert</div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-all">
                    <span className="text-white text-xs font-black">{user.firstName[0]}{user.lastName[0]}</span>
                  </div>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3 z-50 animate-in zoom-in-95 duration-200">
                      <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <i className="fa-solid fa-address-card text-lg"></i>
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">{user.email}</div>
                          <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">Compte Vérifié</div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button 
                          onClick={() => { setView(View.PROFILE); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                        >
                          <i className="fa-solid fa-user-gear w-5"></i> Mon Profil Expert
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                          <i className="fa-solid fa-id-card-clip w-5"></i> Paramètres du Cabinet
                        </button>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <button 
                          onClick={() => { onLogout(); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase tracking-widest"
                        >
                          <i className="fa-solid fa-power-off w-5"></i> Déconnexion
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setView(View.LOGIN)}
                  className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => setView(View.REGISTER)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>
        </header>
        
        <div className="p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
