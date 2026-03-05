import { useState } from 'react';

const domainesData = ['E-commerce', 'SaaS / Logiciel', 'Conseil / Freelance', 'Education / Formation', 'Santé / Bien-être', 'Immobilier', 'Finance / Crypto', 'Marketing / Création de contenu'];
const niveauxTech = ['Débutant (no-code)', 'Intermédiaire (outils low-code)', 'Avancé (développement)'];
const typesActivite = ['Solo / Indépendant', 'Petite équipe (2-5)', 'Startup', 'Side-project'];

interface Idea { titre: string; desc: string; potentiel: string; difficulte: string; ia: string; }

const ideasDatabase: Record<string, Idea[]> = {
  'E-commerce': [
    { titre: 'Boutique de niche IA-curated', desc: "Utiliser l'IA pour sélectionner et décrire automatiquement des produits de niche sur Shopify. L'IA rédige les fiches produits, gère le SEO et personnalise les recommandations.", potentiel: '★★★★☆', difficulte: 'Faible', ia: 'Génération de contenu, personnalisation' },
    { titre: 'Service de dropshipping augmenté', desc: "Dropshipping classique dopé à l'IA : détection automatique des tendances, rédaction des publicités, A/B testing automatisé sur les visuels.", potentiel: '★★★☆☆', difficulte: 'Faible', ia: 'Détection tendances, copywriting' },
  ],
  'SaaS / Logiciel': [
    { titre: 'SaaS micro-niche automatisé', desc: "Outil SaaS résolvant un problème ultra-spécifique (ex: gestion des relances clients pour freelances). IA intégrée pour l'automatisation des relances.", potentiel: '★★★★★', difficulte: 'Elevée', ia: 'Automatisation workflow, NLP' },
    { titre: 'API wrapper no-code', desc: "Interface no-code pour utiliser des APIs complexes (OpenAI, Stripe, etc.) sans coder. Cibler les PME non-tech.", potentiel: '★★★★☆', difficulte: 'Intermédiaire', ia: 'Interface conversationnelle' },
  ],
  'Finance / Crypto': [
    { titre: 'Newsletter fiscalité crypto premium', desc: "Veille hebdomadaire sur la réglementation crypto française avec analyse IA des changements légaux. Modèle abonnement 15€/mois.", potentiel: '★★★☆☆', difficulte: 'Faible', ia: 'Veille automatique, résumé IA' },
    { titre: 'Outil d\'analyse de portefeuille DeFi', desc: "Dashboard connecté aux wallets pour analyser les positions DeFi, calculer les gains/pertes et estimer la fiscalité automatiquement.", potentiel: '★★★★☆', difficulte: 'Elevée', ia: 'Analyse de données, ML prédictif' },
  ],
};

const defaultIdeas: Idea[] = [
  { titre: 'Assistant IA pour votre domaine', desc: "Développer un assistant IA spécialisé dans votre secteur d'activité. Utiliser les APIs existantes (OpenAI, Anthropic) pour créer une expérience sur-mesure pour votre cible.", potentiel: '★★★★☆', difficulte: 'Intermédiaire', ia: 'LLM spécialisé, RAG' },
  { titre: 'Formation en ligne augmentée par l\'IA', desc: "Créer des formations sur votre expertise, avec IA qui adapte le parcours à chaque apprenant et génère des exercices personnalisés.", potentiel: '★★★★☆', difficulte: 'Faible', ia: "Personnalisation, génération d'exercices" },
  { titre: "Service d'automatisation clé-en-main", desc: "Agence d'automatisation no-code pour PME. Analyser les processus, créer des workflows sur n8n/Make, livrer clé-en-main avec formation.", potentiel: '★★★★★', difficulte: 'Faible', ia: 'No-code, workflow automation' },
];

export default function GenerateurIdeesBusiness() {
  const [domaine, setDomaine] = useState('');
  const [niveau, setNiveau] = useState('');
  const [type, setType] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const generer = () => {
    const domainIdeas = ideasDatabase[domaine] || [];
    const allIdeas = [...domainIdeas, ...defaultIdeas].slice(0, 3);
    setIdeas(allIdeas);
  };

  const selStyle = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none bg-white transition-colors";
  const potentielColor = (p: string) => p.startsWith('★★★★★') ? 'text-green-600' : p.startsWith('★★★★') ? 'text-blue-600' : 'text-amber-600';

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Domaine d'activité</label>
          <select value={domaine} onChange={e => setDomaine(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {domainesData.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau technique</label>
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {niveauxTech.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type d'activité</label>
          <select value={type} onChange={e => setType(e.target.value)} className={selStyle}>
            <option value="">Sélectionner...</option>
            {typesActivite.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <button onClick={generer} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5">
        Générer des idées
      </button>

      {ideas.length > 0 && (
        <div className="space-y-4">
          {ideas.map((idea, i) => (
            <div key={i} className="border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{idea.titre}</h3>
                <div className="flex gap-3 text-sm flex-shrink-0">
                  <span className={`font-semibold ${potentielColor(idea.potentiel)}`}>{idea.potentiel}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{idea.difficulte}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{idea.desc}</p>
              <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                <span className="font-semibold">IA :</span>
                <span>{idea.ia}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
