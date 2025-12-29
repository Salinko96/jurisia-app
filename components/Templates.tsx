
import React, { useState } from 'react';
import { MOCK_MODELS } from '../constants';
import { generateDraft } from '../services/gemini';

const Templates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    setIsGenerating(true);
    try {
      const result = await generateDraft(selectedTemplate.name, { context: "Génération standard" });
      setDraft(result || 'Erreur lors de la génération.');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la génération du draft.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {!selectedTemplate ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Civil', 'Affaires', 'Travail', 'Immobilier'].map(cat => (
              <button key={cat} className="p-4 bg-white rounded-xl border border-slate-200 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-all text-center">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MODELS.map((m) => (
              <div key={m.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{m.category}</span>
                  <h3 className="font-bold text-slate-800 mt-2 mb-3">{m.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{m.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(m)}
                  className="w-full bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  Utiliser ce modèle
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <button onClick={() => { setSelectedTemplate(null); setDraft(null); }} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-arrow-left"></i> Retour aux modèles
            </button>
            <h3 className="font-bold text-xl">{selectedTemplate.name}</h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
            {!draft ? (
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-xl space-y-4">
                  <h4 className="font-bold text-slate-700">Paramètres de génération</h4>
                  <p className="text-sm text-slate-500">L'IA va générer une première version de ce document en respectant les mentions légales standards. Vous pourrez ensuite l'ajuster.</p>
                  
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-sparkles"></i>}
                    Générer le brouillon par IA
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-2">
                    <i className="fa-solid fa-check-circle"></i> Brouillon généré
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <i className="fa-solid fa-copy"></i>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <i className="fa-solid fa-download"></i>
                    </button>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none text-sm whitespace-pre-wrap font-serif">
                  {draft}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-800 italic text-center">
            Attention : Ce document est généré par une intelligence artificielle et doit impérativement être relu par un professionnel du droit avant signature ou envoi.
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
