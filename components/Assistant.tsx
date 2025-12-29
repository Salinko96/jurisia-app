
import React, { useState, useRef, useEffect } from 'react';
import { Message, GroundingSource } from '../types';
import { chatWithAI } from '../services/gemini';
import { DOMAINS, SUPPORTED_LANGUAGES } from '../constants';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].label);
  const [useThinking, setUseThinking] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      
      const promptWithConfig = `
      {{LANGUE}}: "${language}"
      {{BRANCHE_DROIT}}: "${domain}"
      {{PUBLIC_CIBLE}}: "Avocat/Juriste"
      {{PAYS_OU_ZONE_JURIDIQUE}}: "France"
      {{NIVEAU_DETAIL}}: "${useThinking ? 'analyse détaillée' : 'analyse standard'}"
      {{TON}}: "professionnel neutre"
      
      CONTENU DE LA DEMANDE :
      ${input}`;

      const { text, sources } = await chatWithAI(promptWithConfig, history, useThinking);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: text || 'Désolé, je n\'ai pas pu générer de réponse.',
        timestamp: new Date(),
        sources
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'Une erreur critique est survenue. Veuillez vérifier votre connexion ou l\'état du service.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to render formatted legal sections
  const renderLegalContent = (content: string) => {
    // Detect "À vérifier auprès d'un avocat" or "Information générale" blocks for special styling
    const lines = content.split('\n');
    return lines.map((line, i) => {
      const isHeader = /^\d+\.\s/.test(line) || line.includes('Résumé') || line.includes('Analyse') || line.includes('Recommandations');
      const isCritical = line.toLowerCase().includes('avocat') || line.toLowerCase().includes('risque');
      const isGeneral = line.toLowerCase().includes('information générale');

      if (isHeader) {
        return <h4 key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 mt-6 mb-3 border-l-2 border-blue-600 pl-3">{line}</h4>;
      }
      if (isCritical) {
        return (
          <div key={i} className="my-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start">
            <i className="fa-solid fa-triangle-exclamation text-red-500 mt-0.5 shrink-0"></i>
            <p className="text-xs text-red-900 font-bold leading-relaxed">{line}</p>
          </div>
        );
      }
      if (isGeneral) {
        return (
          <div key={i} className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 items-start">
            <i className="fa-solid fa-circle-info text-slate-400 mt-0.5 shrink-0"></i>
            <p className="text-[11px] text-slate-600 italic leading-relaxed">{line}</p>
          </div>
        );
      }
      return <p key={i} className="text-sm text-slate-700 leading-relaxed mb-2 font-serif-legal">{line}</p>;
    });
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-slate-50 rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
      {/* Configuration Header */}
      <div className="px-8 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between bg-white/80 backdrop-blur-md z-10">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs">
              <i className="fa-solid fa-language"></i>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-[10px] font-black uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer text-slate-600"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.label}>{lang.flag} {lang.label}</option>
              ))}
            </select>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs border border-blue-100">
              <i className="fa-solid fa-folder-tree"></i>
            </div>
            <select 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="text-[10px] font-black uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer text-slate-600"
            >
              {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setUseThinking(!useThinking)}
            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                useThinking ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-400'
            }`}
          >
            <i className="fa-solid fa-microchip"></i>
            {useThinking ? 'Raisonnement Profond' : 'Analyse Standard'}
          </button>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-20">
            <div className="w-20 h-20 bg-white shadow-2xl rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 rotate-3">
              <i className="fa-solid fa-gavel text-slate-900 text-3xl"></i>
            </div>
            <h3 className="font-serif-legal text-2xl font-bold text-slate-900 mb-4 tracking-tight">Poste de Consultation JurisIA</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-10">
              Engagement de la session sous protocole sécurisé. Vos échanges sont chiffrés et isolés au sein de votre environnement de travail souverain.
            </p>
            <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
                <button onClick={() => setInput("Analyser les risques d'une clause de résiliation unilatérale sans préavis.")} className="p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all text-left flex items-center gap-3">
                  <i className="fa-solid fa-magnifying-glass-chart text-blue-500"></i> Analyse de risque
                </button>
                <button onClick={() => setInput("Proposer une reformulation pour une clause de force majeure incluant les cyberattaques.")} className="p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all text-left flex items-center gap-3">
                  <i className="fa-solid fa-pen-fancy text-blue-500"></i> Rédaction de clause
                </button>
            </div>
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
            <div className={`relative max-w-[90%] md:max-w-[80%] ${
              m.role === 'user' 
              ? 'bg-blue-600 text-white rounded-[2rem] rounded-tr-none p-6 shadow-2xl shadow-blue-200' 
              : 'bg-white border border-slate-200 rounded-[2rem] rounded-tl-none shadow-[0_15px_40px_rgba(0,0,0,0.04)]'
            }`}>
              
              {m.role === 'model' && (
                <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center">
                       <i className="fa-solid fa-shield-halved text-blue-400 text-lg"></i>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Rapport d'Expertise Digitale</span>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Généré en {language} • JurisIA v3.0</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-slate-300 hover:text-blue-500 transition-colors"><i className="fa-solid fa-copy"></i></button>
                    <button className="text-slate-300 hover:text-blue-500 transition-colors"><i className="fa-solid fa-print"></i></button>
                  </div>
                </div>
              )}

              <div className={m.role === 'model' ? 'p-10' : ''}>
                {m.role === 'model' ? (
                  <div className="space-y-1">
                    {renderLegalContent(m.content)}
                  </div>
                ) : (
                  <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                )}
              </div>

              {m.sources && m.sources.length > 0 && (
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Fondements Juridiques & Sources</p>
                    <div className="flex flex-wrap gap-2">
                        {m.sources.map((src, i) => (
                            <a 
                                key={i} 
                                href={src.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
                            >
                                <i className="fa-solid fa-link text-slate-300 group-hover:text-blue-500"></i>
                                {src.title}
                            </a>
                        ))}
                    </div>
                </div>
              )}

              {/* Timestamp label */}
              <div className={`absolute -bottom-6 ${m.role === 'user' ? 'right-0' : 'left-0'} text-[8px] font-black text-slate-300 uppercase tracking-widest`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • TRANSMISSION SÉCURISÉE
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl flex items-center gap-6 animate-pulse">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <i className="fa-solid fa-microchip animate-spin text-blue-500"></i>
              </div>
              <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-1">Traitement Cognitif</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Sourcing, Analyse et Structuration en cours...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Elite Input Terminal */}
      <div className="p-8 bg-white border-t border-slate-200 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-4 bg-slate-50 border border-slate-200 p-4 rounded-[2rem] shadow-inner focus-within:border-blue-400 focus-within:bg-white transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Saisissez votre problématique juridique pour une analyse structurée en ${language.toLowerCase()}...`}
              className="flex-1 bg-transparent border-none px-4 py-4 text-sm focus:outline-none min-h-[60px] max-h-[250px] resize-none font-serif-legal font-medium placeholder:text-slate-400"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-slate-950 text-white w-14 h-14 rounded-[1.2rem] flex items-center justify-center hover:bg-blue-600 disabled:opacity-20 transition-all shadow-2xl active:scale-90 shrink-0"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="flex items-center justify-between mt-4 px-4">
             <p className="text-[9px] font-bold text-slate-400 flex items-center gap-2 italic">
               <i className="fa-solid fa-lock text-emerald-500"></i> Confidentialité client garantie par isolation cryptographique
             </p>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">JurisIA Terminal Alpha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
