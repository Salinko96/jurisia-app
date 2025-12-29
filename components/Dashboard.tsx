
import React from 'react';
import { View } from '../types';
import { MOCK_DOSSIERS } from '../constants';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="space-y-8">
      {/* Hero / Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fa-solid fa-folder"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-slate-500">Dossiers actifs</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fa-solid fa-file-signature"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">48</div>
            <div className="text-sm text-slate-500">Documents analysés</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-slate-500">Échéances à venir</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Dossiers */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-lg">Dossiers récents</h2>
            <button 
              onClick={() => setView(View.DOSSIERS)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Voir tout
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_DOSSIERS.map((dossier) => (
              <div key={dossier.id} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">{dossier.title}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <span>{dossier.client}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{dossier.domain}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  dossier.status === 'Ouvert' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {dossier.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <h2 className="font-bold text-lg">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setView(View.ASSISTANT)}
              className="p-6 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors text-left"
            >
              <i className="fa-solid fa-comment-dots text-2xl mb-4 block text-blue-400"></i>
              <div className="font-bold">Consulter l'IA</div>
              <p className="text-xs text-slate-400 mt-1">Posez une question juridique complexe</p>
            </button>
            <button 
              onClick={() => setView(View.ANALYZER)}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-left shadow-sm"
            >
              <i className="fa-solid fa-file-export text-2xl mb-4 block text-blue-600"></i>
              <div className="font-bold text-slate-800">Analyser un acte</div>
              <p className="text-xs text-slate-500 mt-1">Détectez les risques et les clauses clés</p>
            </button>
            <button 
              onClick={() => setView(View.MODELS)}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-left shadow-sm"
            >
              <i className="fa-solid fa-file-pen text-2xl mb-4 block text-emerald-600"></i>
              <div className="font-bold text-slate-800">Modèles d'actes</div>
              <p className="text-xs text-slate-500 mt-1">Générez des contrats et courriers</p>
            </button>
            <button 
              onClick={() => setView(View.CALCULATOR)}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-left shadow-sm"
            >
              <i className="fa-solid fa-calendar-check text-2xl mb-4 block text-amber-600"></i>
              <div className="font-bold text-slate-800">Délais légaux</div>
              <p className="text-xs text-slate-500 mt-1">Calculer prescription et forclusion</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
