import React, { useState } from 'react';
import { Dossier, AnalysisResult, LegalDocument } from '../types';
import { DOMAINS } from '../constants';

interface DossiersProps {
  dossiers: Dossier[];
  onAnalyzeDossier: (id: string) => void;
  onCreateDossier?: (title: string, client: string, domain: string) => void;
}

const Dossiers: React.FC<DossiersProps> = ({ dossiers, onAnalyzeDossier, onCreateDossier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('Tous');
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDomain, setNewDomain] = useState(DOMAINS[0]);

  const filteredDossiers = dossiers.filter(d => 
    (filterDomain === 'Tous' || d.domain === filterDomain) &&
    (d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.client.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const availableDomains = ['Tous', ...DOMAINS];

  const handleCreate = () => {
    if (onCreateDossier && newTitle && newClient) {
      onCreateDossier(newTitle, newClient, newDomain);
      setIsCreating(false);
      setNewTitle('');
      setNewClient('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Modal Création Dossier */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
            <h3 className="text-3xl font-serif-legal font-bold text-slate-950 mb-8 flex items-center gap-4">
                <i className="fa-solid fa-folder-plus text-blue-600"></i>
                Nouvelle Affaire
            </h3>
            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 px-1">Intitulé de l'affaire</label>
                    <input 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ex: Fusion Acquisition - Groupe Alpha"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 px-1">Client / Contrepartie</label>
                    <input 
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        placeholder="Nom de l'entité ou du client"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 px-1">Spécialité Juridique</label>
                    <select 
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                        {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="flex gap-4 pt-8">
                    <button onClick={() => setIsCreating(false)} className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-2xl transition-all">Annuler</button>
                    <button onClick={handleCreate} className="flex-1 py-5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-blue-600 transition-all">Initialiser</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Viewer d'Analyse (Modal Haute Précision) */}
      {selectedAnalysis && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/10 animate-in slide-in-from-bottom-20 duration-700">
            {/* Header Viewer */}
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-950 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                  <i className="fa-solid fa-file-shield text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-serif-legal font-bold text-2xl text-slate-950">Expertise JurisIA Certifiée</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Référentiel : JurisIA v4.0 Élite</p>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">ID: {selectedAnalysis.id}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-100 text-slate-400 transition-all"><i className="fa-solid fa-download"></i></button>
                 <button onClick={() => setSelectedAnalysis(null)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-slate-300"><i className="fa-solid fa-xmark text-2xl"></i></button>
              </div>
            </div>
            
            {/* Contenu Viewer */}
            <div className="flex-1 overflow-y-auto p-16 space-y-16 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] custom-scrollbar">
              <section className="bg-blue-50/50 p-12 rounded-[3rem] border border-blue-100/50 relative">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">Memorandum Stratégique</h4>
                <div className="text-xl text-slate-900 leading-relaxed italic font-serif-legal">
                  "{selectedAnalysis.summary}"
                </div>
              </section>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] mb-8 border-l-4 border-slate-900 pl-6">Clauses sous Audit</h4>
                  <div className="space-y-4">
                    {selectedAnalysis.clauses.map((c, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                        <span className="text-blue-600 font-black mr-3">#0{i+1}</span> {c}
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <h4 className="text-[11px] font-black text-red-600 uppercase tracking-[0.5em] mb-8 border-l-4 border-red-500 pl-6">Risques Critique</h4>
                  <div className="space-y-4">
                    {selectedAnalysis.risks.map((r, i) => (
                      <div key={i} className="p-6 bg-red-50/30 rounded-[2rem] border border-red-100 text-xs text-red-900 font-bold leading-relaxed flex gap-5">
                        <i className="fa-solid fa-triangle-exclamation text-red-500 shrink-0 mt-1"></i> {r}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl">
                <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                   <i className="fa-solid fa-chess-knight"></i> Suggestions de Remédiation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedAnalysis.recommendations.map((rec, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-bold text-slate-300 flex gap-5 items-start">
                      <i className="fa-solid fa-check-double text-emerald-500 mt-1"></i>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Archive Immuable • Scellée le {selectedAnalysis.timestamp.toLocaleString('fr-FR')}</p>
               <button 
                onClick={() => setSelectedAnalysis(null)}
                className="px-12 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95"
               >
                Fermer l'Expertise
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre de Recherche Expert */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input 
              type="text" 
              placeholder="Rechercher une affaire, un client ou une pièce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
            />
          </div>
          <select 
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-slate-100 transition-all"
          >
            {availableDomains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-slate-950 text-white px-10 py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 shrink-0"
        >
          <i className="fa-solid fa-folder-plus text-blue-400"></i> Initialiser Affaire
        </button>
      </div>

      {/* Grille de Dossiers (Architecture Relationnelle) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredDossiers.map((d) => (
          <div key={d.id} className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full relative overflow-hidden">
            {/* Indicateur de statut latéral */}
            <div className={`absolute top-0 right-0 w-2.5 h-full ${
              d.status === 'Ouvert' ? 'bg-emerald-500' : 'bg-slate-200'
            }`}></div>

            <div className="flex items-start justify-between mb-10">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-slate-950 group-hover:text-blue-500 transition-all duration-700 shadow-inner group-hover:rotate-6">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border ${
                  d.status === 'Ouvert' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {d.status}
                </span>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">REF: {d.id}</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="font-serif-legal font-bold text-2xl text-slate-950 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{d.title}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">{d.client}</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      Vault Documentaire
                   </p>
                   <span className="text-[9px] font-black text-slate-300">{d.documents?.length || 0} PIÈCE(S)</span>
                </div>

                {d.documents && d.documents.length > 0 ? (
                  <div className="space-y-4">
                    {d.documents.slice(0, 3).map((doc, idx) => (
                      <div key={doc.id} className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 truncate group/doc">
                          <span className="truncate flex-1 pr-4 flex items-center gap-3">
                             <i className="fa-solid fa-file-pdf text-slate-300 group-hover/doc:text-red-500 transition-colors"></i>
                             {doc.name}
                          </span>
                          <span className="text-[8px] text-slate-300 uppercase shrink-0 font-black tracking-tighter">
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {/* Liste des analyses rattachées à ce document spécifique */}
                        {doc.analysisResults?.map((ana) => (
                           <button 
                             key={ana.id}
                             onClick={(e) => { e.stopPropagation(); setSelectedAnalysis(ana); }}
                             className="w-full text-left text-[9px] bg-blue-600/5 hover:bg-blue-600 hover:text-white text-blue-700 px-4 py-2.5 rounded-xl border border-blue-100 transition-all flex items-center justify-between font-black uppercase tracking-widest group/ana shadow-sm hover:shadow-blue-200"
                           >
                             <span className="flex items-center gap-3">
                               <i className="fa-solid fa-wand-magic-sparkles text-blue-400 group-hover/ana:text-white transition-colors"></i>
                               Analyse IA Certifiée
                             </span>
                             <i className="fa-solid fa-chevron-right text-[8px] opacity-0 group-hover/ana:opacity-100 group-hover/ana:translate-x-1 transition-all"></i>
                           </button>
                        ))}
                      </div>
                    ))}
                    {d.documents.length > 3 && (
                       <p className="text-[9px] font-black text-slate-300 uppercase text-center tracking-widest mt-2">+ {d.documents.length - 3} pièces supplémentaires</p>
                    )}
                  </div>
                ) : (
                  <div className="py-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center opacity-30 grayscale hover:opacity-60 transition-all cursor-pointer" onClick={() => onAnalyzeDossier(d.id)}>
                    <i className="fa-solid fa-cloud-upload text-3xl text-slate-200 mb-4"></i>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">Archive Documentaire Vide</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50 space-y-4">
              <button 
                onClick={() => onAnalyzeDossier(d.id)}
                className="w-full py-5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-5 shadow-2xl active:scale-95 group/btn"
              >
                <i className="fa-solid fa-file-import text-blue-400 group-hover/btn:rotate-12 transition-transform"></i>
                Alimenter le Dossier
              </button>
              
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-tag text-[10px] text-blue-400"></i>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.domain}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-calendar-day text-[10px] text-slate-300"></i>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(d.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dossiers;