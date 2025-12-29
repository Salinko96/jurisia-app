
import React, { useState } from 'react';
import { Dossier, CalculationResult } from '../types';

interface CalculatorProps {
  dossiers: Dossier[];
  onAttachCalculation: (dossierId: string, result: CalculationResult) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ dossiers, onAttachCalculation }) => {
  const [startDate, setStartDate] = useState('');
  const [type, setType] = useState('civil');
  const [selectedDossierId, setSelectedDossierId] = useState('');
  const [calculation, setCalculation] = useState<{label: string, resultDate: string} | null>(null);

  const calculateDeadline = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    
    let end;
    let label = "";
    
    switch(type) {
      case 'civil':
        end = new Date(date.setFullYear(date.getFullYear() + 5));
        label = "Prescription de droit commun (Civil)";
        break;
      case 'travail':
        end = new Date(date.setFullYear(date.getFullYear() + 2));
        label = "Prescription - Action sur l'exécution du contrat de travail";
        break;
      case 'commercial':
        end = new Date(date.setFullYear(date.getFullYear() + 5));
        label = "Prescription Commerciale";
        break;
      case 'consommation':
        end = new Date(date.setFullYear(date.getFullYear() + 2));
        label = "Action des professionnels contre les consommateurs";
        break;
      default:
        end = new Date();
    }

    setCalculation({
      label,
      resultDate: end.toLocaleDateString('fr-FR')
    });
  };

  const handleSaveToDossier = () => {
    if (!calculation || !selectedDossierId) return;

    const result: CalculationResult = {
      id: Date.now().toString(),
      label: calculation.label,
      startDate: startDate,
      resultDate: calculation.resultDate,
      timestamp: new Date()
    };

    onAttachCalculation(selectedDossierId, result);
    alert('Calcul enregistré avec succès dans le dossier.');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-blue-600"></i>
          Calculateur de Délais & Prescription
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type de délai / Action</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="civil">Droit Commun Civil (5 ans)</option>
              <option value="travail">Droit du Travail - Exécution (2 ans)</option>
              <option value="commercial">Droit Commercial (5 ans)</option>
              <option value="consommation">Droit de la Consommation (2 ans)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date de départ (point de départ du délai)</label>
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <button 
            onClick={calculateDeadline}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            Calculer l'échéance
          </button>
        </div>

        {calculation && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div className="flex-1">
                <p className="text-blue-900 font-bold mb-1">Résultat du calcul</p>
                <p className="text-blue-800 text-sm leading-relaxed">
                  La date de prescription estimée pour : <span className="font-semibold">{calculation.label}</span> est le <span className="font-bold text-lg block mt-1">{calculation.resultDate}</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <i className="fa-solid fa-folder-plus text-slate-400"></i>
                Enregistrer dans un dossier
              </h4>
              <div className="flex gap-3">
                <select 
                  value={selectedDossierId}
                  onChange={(e) => setSelectedDossierId(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un dossier...</option>
                  {dossiers.map(d => (
                    <option key={d.id} value={d.id}>{d.title} ({d.client})</option>
                  ))}
                </select>
                <button 
                  onClick={handleSaveToDossier}
                  disabled={!selectedDossierId}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md shadow-emerald-100"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 text-amber-800 text-xs">
        <i className="fa-solid fa-circle-info text-amber-500 mt-0.5"></i>
        <p>Les délais de prescription varient selon la nature de l'action. Ce calculateur fournit une estimation basée sur les règles générales du droit français. En cas d'enjeu important, contactez immédiatement un avocat.</p>
      </div>
    </div>
  );
};

export default Calculator;
