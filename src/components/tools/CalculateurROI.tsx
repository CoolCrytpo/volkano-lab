import { useState } from 'react';

export default function CalculateurROI() {
  const [tempsTravail, setTempsTravail] = useState('');
  const [coutHoraire, setCoutHoraire] = useState('');
  const [frequence, setFrequence] = useState('52');
  const [coutOutil, setCoutOutil] = useState('');
  const [tempsSetup, setTempsSetup] = useState('');
  const [results, setResults] = useState<{ economieAnnuelle: number; coutAnnuel: number; roi: number; payback: number; tempsSaveAn: number } | null>(null);

  const calculer = () => {
    const h = parseFloat(tempsTravail) || 0;
    const ch = parseFloat(coutHoraire) || 0;
    const f = parseFloat(frequence) || 52;
    const co = parseFloat(coutOutil) || 0;
    const ts = parseFloat(tempsSetup) || 0;
    const tempsSaveAn = h * f;
    const economieAnnuelle = tempsSaveAn * ch;
    const coutAnnuel = co * 12 + ts * ch;
    const roi = coutAnnuel > 0 ? ((economieAnnuelle - coutAnnuel) / coutAnnuel) * 100 : 100;
    const payback = economieAnnuelle > 0 ? (coutAnnuel / economieAnnuelle) * 12 : 0;
    setResults({ economieAnnuelle, coutAnnuel, roi, payback, tempsSaveAn });
  };

  const fmt = (n: number, d = 0) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  const fieldStyle = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none font-mono transition-colors";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: 'Temps de travail à automatiser (h)', value: tempsTravail, setter: setTempsTravail, placeholder: 'ex: 2', help: 'Par occurrence' },
          { label: 'Coût horaire (€/h)', value: coutHoraire, setter: setCoutHoraire, placeholder: 'ex: 50', help: 'Votre taux horaire ou coût employé' },
          { label: "Coût outil (€/mois)", value: coutOutil, setter: setCoutOutil, placeholder: 'ex: 30', help: "Abonnement mensuel outil d'automatisation" },
          { label: 'Temps de setup (h)', value: tempsSetup, setter: setTempsSetup, placeholder: 'ex: 8', help: 'Temps de configuration initial' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} className={fieldStyle} />
            <p className="text-xs text-gray-400 mt-1">{f.help}</p>
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Fréquence (fois/an)</label>
          <select value={frequence} onChange={e => setFrequence(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none bg-white transition-colors">
            <option value="365">Quotidien (365x)</option>
            <option value="260">Jours ouvrés (260x)</option>
            <option value="52">Hebdomadaire (52x)</option>
            <option value="24">Bi-mensuel (24x)</option>
            <option value="12">Mensuel (12x)</option>
            <option value="4">Trimestriel (4x)</option>
          </select>
        </div>
      </div>

      <button onClick={calculer} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5">
        Calculer le ROI
      </button>

      {results && (
        <div className="bg-gray-950 rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Analyse ROI
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Temps économisé/an', value: `${fmt(results.tempsSaveAn)} h`, color: 'text-blue-400' },
              { label: 'Economie annuelle', value: `${fmt(results.economieAnnuelle)} €`, color: 'text-green-400' },
              { label: 'Coût annuel automatisation', value: `${fmt(results.coutAnnuel)} €`, color: 'text-amber-400' },
              { label: 'ROI', value: `${results.roi > 0 ? '+' : ''}${fmt(results.roi, 0)} %`, color: results.roi > 0 ? 'text-green-400' : 'text-red-400' },
              { label: 'Gain net annuel', value: `${fmt(results.economieAnnuelle - results.coutAnnuel)} €`, color: results.economieAnnuelle > results.coutAnnuel ? 'text-green-400' : 'text-red-400' },
              { label: 'Retour sur investissement', value: results.payback < 1 ? '< 1 mois' : `${fmt(results.payback, 1)} mois`, color: 'text-purple-400' },
            ].map(r => (
              <div key={r.label} className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">{r.label}</p>
                <p className={`font-mono font-bold text-xl ${r.color}`}>{r.value}</p>
              </div>
            ))}
          </div>
          {results.roi > 100 && <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm">&#10003; Automatisation très rentable — ROI supérieur à 100%</div>}
          {results.roi <= 0 && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">&#9888; Coût d'automatisation supérieur aux économies — Reconsidérer l'approche</div>}
        </div>
      )}
    </div>
  );
}
