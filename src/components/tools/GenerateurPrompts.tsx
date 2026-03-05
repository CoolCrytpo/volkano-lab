import { useState } from 'react';

const objectifs = ['Rédiger un email', 'Créer du contenu', 'Analyser des données', 'Résoudre un problème', 'Planifier un projet', 'Générer des idées', 'Reformuler un texte', 'Créer un plan'];
const typesContenu = ['Email professionnel', 'Article de blog', 'Post réseaux sociaux', 'Rapport', 'Présentation', 'Code', 'Script', 'Pitch'];
const niveaux = ['Simple (réponse directe)', 'Intermédiaire (structuré)', 'Expert (approfondi, étapes, exemples)'];
const contextes = ['Entrepreneur solo', 'PME / TPE', 'Grande entreprise', 'Education', 'Personnel', 'Développeur'];

export default function GenerateurPrompts() {
  const [objectif, setObjectif] = useState('');
  const [type, setType] = useState('');
  const [niveau, setNiveau] = useState('');
  const [contexte, setContexte] = useState('');
  const [precisions, setPrecisions] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const generer = () => {
    if (!objectif) return;
    const niveauDetail = niveau.includes('Simple') ? 'une réponse directe et concise' : niveau.includes('Intermédiaire') ? 'une réponse structurée avec des sections claires' : 'une analyse approfondie avec des étapes détaillées, des exemples concrets et des alternatives';
    const p = `Tu es un expert spécialisé dans ${contexte || 'le domaine concerné'}.

Objectif : ${objectif}${type ? ` sous forme de ${type.toLowerCase()}` : ''}.
${precisions ? `\nContexte spécifique : ${precisions}` : ''}

Fournis ${niveauDetail}.${niveau.includes('Expert') ? '\n\nInclus :\n- Une structure claire avec titres\n- Des exemples concrets\n- Des points d\'attention importants\n- Une checklist de vérification si pertinent' : ''}

Adapte le ton et le style à un public professionnel francophone.`;
    setPrompt(p);
  };

  const copier = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selStyle = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none bg-white transition-colors";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Objectif</label>
          <select value={objectif} onChange={e => setObjectif(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {objectifs.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type de contenu</label>
          <select value={type} onChange={e => setType(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {typesContenu.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau de détail</label>
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {niveaux.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contexte</label>
          <select value={contexte} onChange={e => setContexte(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {contextes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Précisions supplémentaires (optionnel)</label>
        <textarea value={precisions} onChange={e => setPrecisions(e.target.value)} rows={3} placeholder="Ex: pour une startup SaaS en phase de croissance, ton professionnel mais accessible..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none transition-colors" />
      </div>
      <button onClick={generer} disabled={!objectif} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:shadow-none">
        Générer le prompt
      </button>
      {prompt && (
        <div className="bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <span className="text-white font-semibold text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>Prompt généré</span>
            <button onClick={copier} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
              {copied ? '✓ Copié !' : 'Copier'}
            </button>
          </div>
          <pre className="p-6 text-green-400 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-auto max-h-80">{prompt}</pre>
        </div>
      )}
    </div>
  );
}
