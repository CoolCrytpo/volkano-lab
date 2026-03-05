import { useState } from 'react';

interface Investment { montant: string; prix: string; }

export default function CalculateurDCA() {
  const [investments, setInvestments] = useState<Investment[]>([
    { montant: '', prix: '' },
    { montant: '', prix: '' },
  ]);
  const [prixActuel, setPrixActuel] = useState('');
  const [results, setResults] = useState<{ totalInvesti: number; totalUnites: number; prixMoyen: number; valeurActuelle: number; performance: number } | null>(null);

  const addRow = () => setInvestments(prev => [...prev, { montant: '', prix: '' }]);
  const removeRow = (i: number) => setInvestments(prev => prev.filter((_, idx) => idx !== i));
  const updateRow = (i: number, field: keyof Investment, value: string) => {
    setInvestments(prev => prev.map((inv, idx) => idx === i ? { ...inv, [field]: value } : inv));
  };

  const calculer = () => {
    let totalInvesti = 0, totalUnites = 0;
    investments.forEach(inv => {
      const m = parseFloat(inv.montant) || 0;
      const p = parseFloat(inv.prix) || 0;
      if (m > 0 && p > 0) { totalInvesti += m; totalUnites += m / p; }
    });
    const prixMoyen = totalUnites > 0 ? totalInvesti / totalUnites : 0;
    const pActuel = parseFloat(prixActuel) || 0;
    const valeurActuelle = totalUnites * pActuel;
    const performance = totalInvesti > 0 ? ((valeurActuelle - totalInvesti) / totalInvesti) * 100 : 0;
    setResults({ totalInvesti, totalUnites, prixMoyen, valeurActuelle, performance });
  };

  const fmt = (n: number, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-3 text-sm font-semibold text-gray-500 px-1">
          <span className="col-span-2">Montant investi (€)</span>
          <span className="col-span-2">Prix d'achat (€)</span>
          <span></span>
        </div>
        {investments.map((inv, i) => (
          <div key={i} className="grid grid-cols-5 gap-3">
            <input type="number" placeholder="ex: 200" value={inv.montant} onChange={e => updateRow(i, 'montant', e.target.value)}
              className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none font-mono transition-colors" />
            <input type="number" placeholder="ex: 45000" value={inv.prix} onChange={e => updateRow(i, 'prix', e.target.value)}
              className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none font-mono transition-colors" />
            <button onClick={() => removeRow(i)} className="flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors text-lg">×</button>
          </div>
        ))}
        <button onClick={addRow} className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
          <span>+</span> Ajouter un achat
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Prix actuel (€)</label>
        <input type="number" placeholder="ex: 60000" value={prixActuel} onChange={e => setPrixActuel(e.target.value)}
          className="w-full md:w-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none font-mono transition-colors" />
      </div>

      <button onClick={calculer} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5">
        Calculer mon DCA
      </button>

      {results && (
        <div className="bg-gray-950 rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Analyse DCA
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total investi', value: `${fmt(results.totalInvesti)} €`, color: 'text-white' },
              { label: 'Prix moyen DCA', value: `${fmt(results.prixMoyen)} €`, color: 'text-blue-400' },
              { label: 'Valeur actuelle', value: `${fmt(results.valeurActuelle)} €`, color: 'text-green-400' },
              { label: 'Performance', value: `${results.performance > 0 ? '+' : ''}${fmt(results.performance, 1)} %`, color: results.performance >= 0 ? 'text-green-400' : 'text-red-400' },
            ].map(r => (
              <div key={r.label} className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">{r.label}</p>
                <p className={`font-mono font-bold text-xl ${r.color}`}>{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
