
import React from 'react';
import { UserRegistration } from '../types';

const MOCK_REGISTRATIONS: UserRegistration[] = [
  { id: 'u1', name: 'Maître Alice Vignon', email: 'alice.v@cabinet-vignon.fr', role: 'Avocat', status: 'Vérifié', date: new Date(Date.now() - 3600000), progress: 100 },
  { id: 'u2', name: 'Pierre Durand', email: 'pierre.durand@techcorp.com', role: 'Entreprise', status: 'En attente', date: new Date(Date.now() - 7200000), progress: 65 },
  { id: 'u3', name: 'Sonia Lefebvre', email: 'sonia.le@gmail.com', role: 'Particulier', status: 'Vérifié', date: new Date(Date.now() - 86400000), progress: 90 },
  { id: 'u4', name: 'Jean Dupont', email: 'j.dupont@univ-paris.fr', role: 'Étudiant', status: 'Bloqué', date: new Date(Date.now() - 172800000), progress: 40 },
  { id: 'u5', name: 'Marc Roussel', email: 'm.roussel@legal-plus.fr', role: 'Avocat', status: 'En attente', date: new Date(Date.now() - 259200000), progress: 20 },
];

const RegistrationDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Inscrits</div>
          <div className="text-3xl font-black text-slate-800">1,284</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up"></i> +12% ce mois
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">En attente KYC</div>
          <div className="text-3xl font-black text-amber-600">24</div>
          <div className="text-[10px] text-slate-400 font-bold mt-2 italic underline cursor-pointer">
            Voir les dossiers prioritaires
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profils Avocats</div>
          <div className="text-3xl font-black text-blue-600">412</div>
          <div className="text-[10px] text-slate-400 font-bold mt-2">32% de la base totale</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversion Premium</div>
          <div className="text-3xl font-black text-emerald-600">18.5%</div>
          <div className="text-[10px] text-slate-400 font-bold mt-2">Objectif: 20%</div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-list-check text-blue-600"></i>
            Dernières Inscriptions
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              <i className="fa-solid fa-download text-slate-400"></i> Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
              <i className="fa-solid fa-user-plus"></i> Inviter un utilisateur
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Complétion</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REGISTRATIONS.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {reg.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{reg.name}</div>
                        <div className="text-[10px] text-slate-400">{reg.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 px-2 py-1 bg-slate-100 rounded-lg">{reg.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                      reg.status === 'Vérifié' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      reg.status === 'En attente' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-bold text-slate-400">{reg.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            reg.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${reg.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 font-medium">
                      {reg.date.toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase">
                      {reg.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDashboard;
