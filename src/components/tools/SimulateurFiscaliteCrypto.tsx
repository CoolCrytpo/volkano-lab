import { useState } from 'react';

interface Results {
  plusValue: number;
  impot: number;
  netApresImpot: number;
  tauxEffectif: number;
}

export default function SimulateurFiscaliteCrypto() {
  const [montantInvesti, setMontantInvesti] = useState('');
  const [montantVendu, setMontantVendu] = useState('');
  const [frais, setFrais] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const calculer = () => {
    const investi = parseFloat(montantInvesti) || 0;
    const vendu = parseFloat(montantVendu) || 0;
    const f = parseFloat(frais) || 0;
    const plusValue = Math.max(0, vendu - investi - f);
    const impot = plusValue * 0.30;
    const netApresImpot = vendu - f - impot;
    setResults({ plusValue, impot, netApresImpot, tauxEffectif: vendu > 0 ? (impot / vendu) * 100 : 0 });
  };

  const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Montant total investi (€)', value: montantInvesti, setter: setMontantInvesti, placeholder: 'ex: 5000', help: "Coût d'acquisition total" },
          { label: 'Montant de cession (€)', value: montantVendu, setter: setMontantVendu, placeholder: 'ex: 8000', help: 'Prix de vente total' },
          { label: 'Frais (€)', value: frais, setter: setFrais, placeholder: 'ex: 50', help: 'Frais de plateforme inclus' },
        ].map(field => (
          <div key={field.label}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
            <input
              type="number"
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-mono text-lg"
            />
            <p className="text-xs text-gray-400 mt-1">{field.help}</p>
          </div>
        ))}
      </div>

      <button onClick={calculer} className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5">
        Calculer l'imposition
      </button>

      {/* Results */}
      {results && (
        <div className="bg-gray-950 rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Résultats estimés
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Plus-value brute', value: `${fmt(results.plusValue)} €`, color: results.plusValue > 0 ? 'text-green-400' : 'text-red-400' },
              { label: 'Impôt (30% flat tax)', value: `${fmt(results.impot)} €`, color: 'text-amber-400' },
              { label: 'Net après impôt', value: `${fmt(results.netApresImpot)} €`, color: 'text-blue-400' },
              { label: 'Taux effectif', value: `${results.tauxEffectif.toFixed(1)} %`, color: 'text-purple-400' },
            ].map(r => (
              <div key={r.label} className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">{r.label}</p>
                <p className={`font-mono font-bold text-xl ${r.color}`}>{r.value}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-4">* Estimation basée sur la flat tax 30% (PFU). Cas particuliers (TMI, exonérations) non inclus. Consulter un expert-comptable.</p>
        </div>
      )}
    </div>
  );
}
