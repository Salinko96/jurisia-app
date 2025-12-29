
import React, { useState, useRef, useEffect } from 'react';
import { analyzeDocument } from '../services/gemini';
import { Dossier, AnalysisResult, LegalDocument, User } from '../types';
import { StorageService } from '../services/storage';

interface DocAnalyzerProps {
  user: User;
  targetDossier?: Dossier;
  dossiers: Dossier[];
  onRefreshDossiers: () => void;
}

interface UploadStatus {
  step: 'idle' | 'uploading' | 'scanning' | 'encrypting' | 'ocr' | 'ready' | 'error';
  progress: number;
  fileName?: string;
  fileSize?: string;
  logs: string[];
}

const DocAnalyzer: React.FC<DocAnalyzerProps> = ({ user, targetDossier, dossiers, onRefreshDossiers }) => {
  const [selectedDossierId, setSelectedDossierId] = useState(targetDossier?.id || '');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ 
    step: 'idle', 
    progress: 0, 
    logs: [] 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [uploadStatus.logs]);

  const addLog = (msg: string) => {
    setUploadStatus(prev => ({
      ...prev,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ${msg}`]
    }));
  };

  const handleUpload = async (file: File) => {
    if (!selectedDossierId) {
      alert("Veuillez affecter ce document à un dossier client.");
      return;
    }

    setUploadStatus({ 
      step: 'uploading', 
      progress: 10, 
      fileName: file.name, 
      logs: ["Lancement de l'upload Cloud sécurisé..."] 
    });

    try {
      // 1. Upload vers Supabase Storage
      addLog("Transfert vers le bucket jurisia-docs...");
      const storagePath = await StorageService.uploadFile(user.id, selectedDossierId, file);
      
      // 2. Création de l'entrée en base
      addLog("Scellement des métadonnées en base de données...");
      const newDoc = await StorageService.addDocument(user.id, selectedDossierId, {
        name: file.name,
        fileSize: file.size,
        fileType: file.type,
        path: storagePath
      });

      setUploadStatus(prev => ({ 
        ...prev, 
        step: 'ready', 
        progress: 100, 
        logs: [...prev.logs, "Document archivé et sécurisé avec succès."] 
      }));

      // Simulation OCR (Dans une version finale, on appellerait une Edge Function d'extraction)
      setText(`[DOCUMENT_ID:${newDoc.id}]\nContenu extrait du document ${file.name}.\nPrêt pour analyse IA.`);
      onRefreshDossiers();

    } catch (err: any) {
      console.error(err);
      setUploadStatus(prev => ({ ...prev, step: 'error', logs: [...prev.logs, "ERREUR : " + err.message] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleAnalyze = async () => {
    if (!text.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    
    try {
      const data = await analyzeDocument(text);
      const docIdMatch = text.match(/DOCUMENT_ID:([A-Z0-9-]+)/i);
      const docId = docIdMatch ? docIdMatch[1] : null;

      if (docId) {
        const saved = await StorageService.saveAnalysis(user.id, docId, data);
        setResults({ ...saved, title: uploadStatus.fileName || "Analyse IA" });
        onRefreshDossiers();
      }
    } catch (error) {
      alert("Erreur lors de l'analyse.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setUploadStatus({ step: 'idle', progress: 0, logs: [] });
    setText('');
    setResults(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-12rem)]">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] mb-4">Cible d'affectation</p>
          <select 
            value={selectedDossierId}
            onChange={(e) => setSelectedDossierId(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" className="text-slate-900">-- Sélectionner une affaire --</option>
            {dossiers.map(d => (
              <option key={d.id} value={d.id} className="text-slate-900">{d.client} — {d.title}</option>
            ))}
          </select>
        </div>
        
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-200 flex-1 p-8 flex flex-col">
          {uploadStatus.step === 'idle' ? (
            <div 
              onClick={() => selectedDossierId && fileInputRef.current?.click()}
              className={`flex-1 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-12 transition-all cursor-pointer ${
                !selectedDossierId ? 'opacity-20 bg-slate-50 cursor-not-allowed' : 'hover:border-blue-600 hover:bg-blue-50'
              }`}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-200 mb-6"></i>
              <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.4em]">Importer une pièce</h4>
            </div>
          ) : uploadStatus.step === 'ready' ? (
            <div className="flex-1 flex flex-col animate-in fade-in">
              <div className="bg-slate-950 text-white p-6 rounded-[2rem] flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center"><i className="fa-solid fa-file-shield"></i></div>
                  <span className="text-sm font-bold truncate max-w-[150px]">{uploadStatus.fileName}</span>
                </div>
                <button onClick={resetUpload} className="text-white/40 hover:text-red-400"><i className="fa-solid fa-rotate-right"></i></button>
              </div>
              <div className="flex-1 bg-slate-50 rounded-[2rem] p-6 text-[11px] font-mono text-slate-500 overflow-y-auto">
                {text}
              </div>
              <button onClick={handleAnalyze} disabled={isAnalyzing} className="mt-6 w-full bg-slate-950 text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 flex items-center justify-center gap-4 shadow-2xl">
                {isAnalyzing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                Lancer l'audit Cloud IA
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-8"></div>
              <div className="w-full bg-slate-950 rounded-2xl p-4 font-mono text-[9px] text-blue-400 h-40 overflow-y-auto text-left shadow-2xl">
                 {uploadStatus.logs.map((log, i) => <div key={i}>{log}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-7 bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-200 overflow-y-auto custom-scrollbar">
        {!results ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <i className="fa-solid fa-microchip text-6xl text-slate-100 mb-8"></i>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em]">Prêt pour le rapport d'expertise</h4>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in">
             <div className="border-b border-slate-100 pb-8">
                <span className="px-4 py-1.5 bg-slate-950 text-white text-[9px] font-black uppercase rounded-full mb-4 inline-block">Rapport Cloud Certifié</span>
                <h3 className="text-4xl font-serif-legal font-bold text-slate-950">{results.title}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Audit généré le {results.timestamp.toLocaleString('fr-FR')}</p>
             </div>
             
             <section className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
                <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-[0.4em] mb-4">Résumé Exécutif</h4>
                <p className="text-lg text-slate-800 font-serif-legal italic leading-relaxed">"{results.summary}"</p>
             </section>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] border-l-4 border-slate-900 pl-4">Points d'Audit</h4>
                  {results.clauses.map((c, i) => <div key={i} className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-700">{c}</div>)}
                </div>
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-red-600 uppercase tracking-[0.4em] border-l-4 border-red-500 pl-4">Risques</h4>
                  {results.risks.map((r, i) => <div key={i} className="p-4 bg-red-50 rounded-2xl text-xs text-red-900 font-bold">{r}</div>)}
                </div>
             </div>
             
             <section className="bg-slate-950 p-10 rounded-[3rem] text-white">
                <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-6">Recommandations Stratégiques</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.recommendations.map((rec, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl text-[11px] flex gap-3"><i className="fa-solid fa-check text-emerald-500"></i> {rec}</div>
                  ))}
                </div>
             </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocAnalyzer;
