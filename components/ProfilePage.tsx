
import React, { useState } from 'react';
import { User } from '../types';
import { AuthService } from '../services/auth';

interface ProfilePageProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [firmName, setFirmName] = useState(user.firmName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccess(false);

    try {
      await new Promise(r => setTimeout(r, 800));
      // Ajout de await pour résoudre l'appel asynchrone
      const updatedUser = await AuthService.updateProfile(user.id, { firstName, lastName, firmName });
      onUpdate(updatedUser);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Erreur lors de la mise à jour.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-slate-950 p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
        <div className="w-32 h-32 rounded-[2.5rem] bg-blue-600 flex items-center justify-center text-4xl font-black shadow-inner relative z-10 border border-white/10">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div className="relative z-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-3xl font-serif-legal font-bold">{user.firstName} {user.lastName}</h2>
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400">
              Profil {user.role}
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">{user.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
             <span className="flex items-center gap-2"><i className="fa-solid fa-calendar"></i> Inscription : {user.joinedDate.toLocaleDateString()}</span>
             <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
             <span className={`flex items-center gap-2 ${user.status === 'actif' ? 'text-emerald-500' : 'text-amber-500'}`}>
               <i className={`fa-solid ${user.status === 'actif' ? 'fa-circle-check' : 'fa-clock'}`}></i> 
               Statut {user.status.replace('_', ' ')}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Navigation / Actions */}
        <div className="lg:col-span-1 space-y-4">
           <button className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] text-left flex items-center gap-4 group hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <span className="block font-black text-[10px] uppercase tracking-widest">Sécurité</span>
                <span className="block text-[8px] text-slate-400 uppercase tracking-tighter">Gestion des accès</span>
              </div>
           </button>
           <button className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] text-left flex items-center gap-4 group hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-credit-card"></i>
              </div>
              <div>
                <span className="block font-black text-[10px] uppercase tracking-widest">Facturation</span>
                <span className="block text-[8px] text-slate-400 uppercase tracking-tighter">Plans et abonnements</span>
              </div>
           </button>
           <button className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] text-left flex items-center gap-4 group hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div>
                <span className="block font-black text-[10px] uppercase tracking-widest">Notifications</span>
                <span className="block text-[8px] text-slate-400 uppercase tracking-tighter">Alertes législatives</span>
              </div>
           </button>
        </div>

        {/* Update Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
              <i className="fa-solid fa-user-gear text-blue-600"></i>
              Édition du Profil Expert
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
                  <i className="fa-solid fa-circle-check"></i>
                  Modifications enregistrées avec succès
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Prénom</label>
                  <input 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Nom</label>
                  <input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {user.role !== 'particulier' && (
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                    {user.role === 'avocat' ? 'Nom du Cabinet' : 'Raison Sociale'}
                  </label>
                  <input 
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              )}

              <div className="pt-4 flex gap-4">
                 <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
                 >
                   {isUpdating ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
                   Mettre à jour mon profil
                 </button>
              </div>
            </form>
          </div>

          <div className="mt-10 p-8 bg-red-50/50 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-black text-red-600 uppercase text-[10px] tracking-widest mb-1">Destruction du Compte</h4>
              <p className="text-[11px] text-slate-500 font-medium">Cette action supprimera définitivement vos dossiers et vos analyses.</p>
            </div>
            <button className="px-6 py-3 border border-red-200 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95">
              Demander la résiliation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
