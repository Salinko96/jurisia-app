
import React from 'react';
import { View } from '../types';

interface HomePageProps {
  setView: (view: View) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      {/* Dynamic Glass Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-blue-600 transition-all duration-500 rotate-3 group-hover:rotate-0">
            <i className="fa-solid fa-scale-balanced text-white text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl text-white tracking-tighter uppercase italic leading-none">JurisIA</span>
            <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em] leading-none mt-1">Intelligence Élite</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 bg-slate-950/20 backdrop-blur-xl border border-white/10 px-10 py-4 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
          <a href="#vision" className="hover:text-blue-400 transition-colors">Vision</a>
          <a href="#expertise" className="hover:text-blue-400 transition-colors">Expertise</a>
          <a href="#capacites" className="hover:text-blue-400 transition-colors">Capacités</a>
          <a href="#securite" className="hover:text-blue-400 transition-colors">Souveraineté</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(View.DASHBOARD)}
            className="px-8 py-3.5 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
          >
            Espace Praticien
          </button>
        </div>
      </nav>

      {/* Hero: The Legal Matrix */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[180px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[180px] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10"></div>
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
            <i className="fa-solid fa-shield-halved text-blue-500 animate-pulse"></i>
            Hébergement Souverain & Sécurisé (FR/UE)
          </div>
          
          <h1 className="font-serif-legal text-7xl md:text-[10rem] font-bold text-white mb-8 tracking-tighter leading-[0.9] max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Le Droit <br />
            <span className="text-gradient">Redéfini</span>.
          </h1>
          
          <p className="max-w-3xl mx-auto text-slate-400 text-xl md:text-2xl mb-16 leading-relaxed font-light animate-in fade-in duration-1000 delay-300">
            Libérez votre expertise des tâches itératives. JurisIA déploie une intelligence spécialisée pour l'analyse, la rédaction et la stratégie juridique de haut niveau.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in duration-1000 delay-500">
            <button 
              onClick={() => setView(View.DASHBOARD)}
              className="group relative px-14 py-7 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)] active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Ouvrir le Cabinet Digital <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <button 
              onClick={() => setView(View.REGISTRATION)}
              className="px-14 py-7 bg-transparent text-white border border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all active:scale-95"
            >
              Consultation Démo
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Authority Bar */}
      <div className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8">Conçu pour les plus hauts standards</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all text-slate-900">
             <span className="font-serif-legal text-2xl font-bold italic">Cabinet & Associés</span>
             <span className="font-black text-xl tracking-tighter italic uppercase">Lex Impact</span>
             <span className="font-serif-legal text-2xl font-bold">Notaire Partner</span>
             <span className="font-black text-xl tracking-tighter uppercase">Society Group</span>
          </div>
        </div>
      </div>

      {/* NEW SECTION: L'INGÉNIERIE JURIDIQUE DE PRÉCISION */}
      <section id="expertise" className="py-48 bg-slate-950 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-600/5 blur-[120px] rounded-full -translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/2 sticky top-32">
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">L'Arsenal du Praticien</span>
              <h2 className="font-serif-legal text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-10">
                Une Ingénierie <br />
                <span className="text-gradient">Sans Compromis</span>.
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-xl">
                La pratique du droit exige une rigueur absolue. JurisIA intègre des protocoles de vérification multicouches pour garantir l'intégrité de chaque analyse et la conformité de chaque draft.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group cursor-default">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-stamp text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight uppercase">Sceau de Conformité</h4>
                    <p className="text-slate-500 text-xs mt-1">Validation automatique face à la hiérarchie des normes en vigueur.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group cursor-default">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-briefcase text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight uppercase">Secret Professionnel Digital</h4>
                    <p className="text-slate-500 text-xs mt-1">Isolation stricte des données de consultation (Local Vault).</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group cursor-default">
                  <div className="w-12 h-12 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-scale-unbalanced-flip text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight uppercase">Raisonnement Jurisprudentiel</h4>
                    <p className="text-slate-500 text-xs mt-1">Moteur d'inférence basé sur les derniers arrêts de la Cour de Cassation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all"></div>
                  <i className="fa-solid fa-building-columns text-4xl text-blue-500 mb-8 block"></i>
                  <h3 className="text-white font-serif-legal font-bold text-2xl mb-4 leading-tight">Institutionnel</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">Une architecture logicielle validée par des comités d'éthique juridique et conforme aux directives des barreaux.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative group overflow-hidden translate-y-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-600/20 transition-all"></div>
                  <i className="fa-solid fa-file-signature text-4xl text-emerald-500 mb-8 block"></i>
                  <h3 className="text-white font-serif-legal font-bold text-2xl mb-4 leading-tight">Formalisme Pur</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">Chaque acte généré respecte scrupuleusement le formalisme juridique et les mentions obligatoires du code civil.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-600/20 transition-all"></div>
                  <i className="fa-solid fa-shield-halved text-4xl text-indigo-500 mb-8 block"></i>
                  <h3 className="text-white font-serif-legal font-bold text-2xl mb-4 leading-tight">Souveraineté</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">Hébergement SecNumCloud compatible. Aucune donnée n'est traitée hors du territoire européen.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative group overflow-hidden translate-y-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full -mr-16 -mt-16 group-hover:bg-amber-600/20 transition-all"></div>
                  <i className="fa-solid fa-magnifying-glass-chart text-4xl text-amber-500 mb-8 block"></i>
                  <h3 className="text-white font-serif-legal font-bold text-2xl mb-4 leading-tight">Audit Profond</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">Détection de signaux faibles dans les contrats complexes (indices de risque, clauses dormantes).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section: The Intellectual Partner */}
      <section id="vision" className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Philosophie JurisIA</span>
              <h2 className="font-serif-legal text-5xl md:text-6xl font-bold text-slate-950 leading-[1.1] mb-8">
                L'Expertise <br /> Augmentée, <br /> Jamais Remplacée.
              </h2>
              <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-10">
                Nous croyons que l'IA ne doit pas seulement "générer du texte", mais comprendre la substance même du droit. Notre moteur cognitive analyse la hiérarchie des normes pour vous offrir une précision de niveau <i>Partner</i>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-950 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-code-compare text-blue-600"></i> Comparaison Critique
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Identifier les écarts entre les versions contractuelles et la doctrine actuelle.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-950 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-gavel text-blue-600"></i> Veille Active
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Adaptation en temps réel aux nouveaux arrêts et réformes législatives.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 p-4 bg-white shadow-2xl rounded-[3rem] border border-slate-100">
                 <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2070" 
                    alt="Legal Authority" 
                    className="rounded-[2.5rem] w-full object-cover aspect-square shadow-inner"
                 />
                 <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl text-white max-w-xs animate-bounce-slow border border-white/5">
                    <i className="fa-solid fa-bolt text-blue-400 text-3xl mb-4"></i>
                    <p className="text-sm font-light leading-relaxed">"Une réduction de 70% du temps de recherche jurisprudentielle."</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-blue-400">Statistique Moyenne</p>
                 </div>
               </div>
               <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilites Grid: Modern SaaS Elite */}
      <section id="capacites" className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">Fonctionnalités Métiers</h2>
            <h3 className="font-serif-legal text-5xl font-bold text-slate-950 mb-6">Un écosystème complet.</h3>
            <p className="text-slate-500 font-light text-lg">Huit modules spécialisés conçus pour chaque étape de la pratique juridique moderne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
                icon="fa-brain-circuit" 
                title="Assistant Consultation" 
                desc="Réponses argumentées, structurées et fondées sur le corpus juridique français."
                onClick={() => setView(View.ASSISTANT)}
            />
            <FeatureCard 
                icon="fa-file-shield" 
                title="Audit de Documents" 
                desc="Détection automatisée des clauses léonines, abusives ou à risques."
                onClick={() => setView(View.ANALYZER)}
            />
            <FeatureCard 
                icon="fa-pen-nib" 
                title="Rédaction Assistée" 
                desc="Génération de drafts d'actes personnalisés avec respect pur du formalisme."
                onClick={() => setView(View.MODELS)}
            />
            <FeatureCard 
                icon="fa-folder-tree" 
                title="Case Management" 
                desc="Gestion centralisée de vos dossiers avec archivage intelligent des analyses."
                onClick={() => setView(View.DOSSIERS)}
            />
            <FeatureCard 
                icon="fa-hourglass-start" 
                title="Délais & Forclusion" 
                desc="Calcul précis des délais de prescription et de forclusion selon les codes."
                onClick={() => setView(View.CALCULATOR)}
            />
            <FeatureCard 
                icon="fa-user-graduate" 
                title="Learning & Search" 
                desc="Espace dédié à la formation et à la recherche documentaire augmentée."
                onClick={() => setView(View.REGISTRATION)}
            />
          </div>
        </div>
      </section>

      {/* Security: The Sovereign Promise */}
      <section id="securite" className="py-40 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
               <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-2xl shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-8">
                  <i className="fa-solid fa-user-shield"></i>
               </div>
               <h2 className="font-serif-legal text-5xl md:text-6xl font-bold mb-10 leading-tight">Secret Professionnel & Souveraineté Digitale.</h2>
               <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
                 Nous ne transigeons jamais avec la confidentialité. Vos données ne sont jamais utilisées pour entraîner nos modèles globaux. Votre cabinet bénéficie d'une instance logicielle étanche et cryptée en AES-256.
               </p>
               <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i> RGPD COMPLIANT (FRANCE)
                  </li>
                  <li className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i> ZERO DATA LEAK POLICY
                  </li>
                  <li className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i> CHIFFREMENT MILITAIRE
                  </li>
               </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-600/5 rounded-full border border-white/5 flex items-center justify-center p-20 animate-spin-slow">
                 <div className="w-full h-full border border-white/10 rounded-full flex items-center justify-center p-20">
                    <i className="fa-solid fa-key text-blue-500 text-6xl opacity-20"></i>
                 </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-slate-900 border border-white/10 p-12 rounded-[3rem] shadow-2xl text-center max-w-sm">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                       <i className="fa-solid fa-lock text-xl"></i>
                    </div>
                    <h4 className="font-bold text-xl mb-4">Garantie Souveraine</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light italic">
                      "Les données de consultation ne quittent jamais l'espace de travail crypté du praticien."
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Final Invitation */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="font-serif-legal text-6xl md:text-7xl font-bold text-slate-950 mb-12">Prêt pour l'excellence ?</h2>
          <p className="text-xl text-slate-500 font-light mb-16 max-w-2xl mx-auto">Rejoignez la nouvelle génération de praticiens du droit qui utilisent JurisIA pour démultiplier leur impact.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button onClick={() => setView(View.DASHBOARD)} className="px-12 py-7 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl">
                Essai Institutionnel
             </button>
             <button onClick={() => setView(View.REGISTRATION)} className="px-12 py-7 bg-white text-slate-950 border border-slate-200 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
                Demander un Devis
             </button>
          </div>
        </div>
      </section>

      {/* Footer Elite */}
      <footer className="bg-slate-950 py-24 px-8 border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20 border-b border-white/5 pb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-scale-balanced text-white"></i>
                </div>
                <span className="font-black text-3xl text-white tracking-tighter italic">JurisIA</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                La référence de l'intelligence juridique souveraine. Conçue pour les avocats, notaires et directions juridiques d'élite.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              <div>
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Modules</h4>
                <ul className="space-y-4 text-xs text-slate-500">
                  <li><a href="#" className="hover:text-blue-400">Assistant Chat</a></li>
                  <li><a href="#" className="hover:text-blue-400">Audit IA</a></li>
                  <li><a href="#" className="hover:text-blue-400">Générateur</a></li>
                  <li><a href="#" className="hover:text-blue-400">API Gateway</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Ressources</h4>
                <ul className="space-y-4 text-xs text-slate-500">
                  <li><a href="#" className="hover:text-blue-400">Centre d'aide</a></li>
                  <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400">Webinaires</a></li>
                  <li><a href="#" className="hover:text-blue-400">Blog Tech</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Compagnie</h4>
                <ul className="space-y-4 text-xs text-slate-500">
                  <li><a href="#" className="hover:text-blue-400">À propos</a></li>
                  <li><a href="#" className="hover:text-blue-400">Carrières</a></li>
                  <li><a href="#" className="hover:text-blue-400">Presse</a></li>
                  <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Suivez-nous</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><i className="fa-brands fa-x-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2025 JurisIA Élite France. Conçu avec rigueur par LegalTech Labs.</p>
            <div className="flex items-center gap-8 grayscale opacity-20">
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Logo_CNIL_2016.png" className="h-6" alt="CNIL" />
               <img src="https://upload.wikimedia.org/wikipedia/fr/b/bd/Logo_RGPD.png" className="h-6" alt="RGPD" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white p-12 rounded-[3rem] border border-slate-100 hover:border-blue-200 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] hover:-translate-y-4"
    >
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl mb-8 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="font-serif-legal font-bold text-slate-900 text-2xl mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 flex-1">{desc}</p>
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-blue-600 transition-all">
        Activer le module <i className="fa-solid fa-arrow-right-long group-hover:translate-x-3 transition-transform"></i>
      </div>
    </div>
  );
};

export default HomePage;
