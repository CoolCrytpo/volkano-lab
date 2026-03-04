import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'CoolCrytpo',
      name: 'volkano-lab',
    },
    branchPrefix: 'keystatic/',
  },

  ui: {
    brand: {
      name: 'Volkano Lab Admin',
    },
  },

  collections: {
    articles: collection({
      label: 'Articles (Décrypter)',
      slugField: 'slug',
      path: 'src/content/articles/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'URL Slug' } }),
        title: fields.text({ label: 'Titre' }),
        description: fields.text({
          label: 'Description courte',
          description: 'Utilisée dans les listes et le SEO',
          validation: { length: { min: 20, max: 160 } },
        }),
        date: fields.date({ label: 'Date de publication' }),
        author: fields.text({ label: 'Auteur', defaultValue: 'Volkano Lab' }),
        image: fields.image({
          label: 'Image de couverture',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        readingTime: fields.text({ label: 'Temps de lecture', defaultValue: '5 min' }),
        tldr: fields.array(fields.text({ label: 'Point clé' }), {
          label: 'TL;DR (Points clés)',
          itemLabel: (props) => props.value,
        }),
        impact: fields.text({
          label: 'Impact concret',
          description: 'Explication de l\'impact pratique',
          multiline: true,
        }),
        risks: fields.text({
          label: 'Risques & Conformité',
          description: 'Optionnel - Informations sur les risques',
          multiline: true,
        }),
        checklist: fields.array(fields.text({ label: 'Action' }), {
          label: 'Checklist action',
          itemLabel: (props) => props.value,
        }),
        content: fields.document({
          label: 'Contenu',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/articles',
            publicPath: '/images/articles/',
          },
        }),
      },
    }),

    tools: collection({
      label: 'Boîte à outils',
      slugField: 'slug',
      path: 'src/content/tools/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'URL Slug' } }),
        title: fields.text({ label: 'Titre de l\'outil' }),
        description: fields.text({
          label: 'Description courte',
          validation: { length: { min: 20, max: 160 } },
        }),
        image: fields.image({
          label: 'Image de couverture',
          directory: 'public/images/tools',
          publicPath: '/images/tools/',
        }),

        // ── Catégorisation ──
        category: fields.select({
          label: 'Catégorie principale',
          description: 'Correspond aux 3 grandes sections de la Boîte à outils',
          options: [
            { label: '🟢 Ressources gratuites', value: 'gratuit' },
            { label: '🟠 Ressources premium', value: 'premium' },
            { label: '🔵 Produits & services', value: 'services' },
          ],
          defaultValue: 'gratuit',
        }),
        subcategory: fields.select({
          label: 'Sous-catégorie',
          options: [
            // Gratuit
            { label: 'Templates', value: 'templates' },
            { label: 'Guides pratiques', value: 'guides' },
            { label: 'Outils recommandés', value: 'outils-recommandes' },
            // Premium
            { label: 'eBooks', value: 'ebooks' },
            { label: 'Dossiers premium', value: 'dossiers' },
            { label: 'Méthodes détaillées', value: 'methodes' },
            // Services
            { label: 'Coaching', value: 'coaching' },
            { label: 'Packs stratégiques', value: 'packs' },
            { label: 'Divertissement éducatif', value: 'divertissement' },
          ],
          defaultValue: 'templates',
        }),

        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags (IA, Crypto, Automatisation…)',
          itemLabel: (props) => props.value,
        }),

        // ── Tarification ──
        premium: fields.checkbox({
          label: 'Contenu payant',
          description: 'Cochez si cet outil nécessite un paiement',
          defaultValue: false,
        }),
        priceFiat: fields.number({
          label: 'Prix en EUR (€)',
          description: 'En euros entiers. Ex: 29 pour 29€. Laissez vide si gratuit.',
        }),
        priceCrypto: fields.text({
          label: 'Prix en USDC (crypto)',
          description: 'Ex: "29 USDC". Laissez vide si non disponible.',
        }),
        stripeProductId: fields.text({
          label: 'ID Produit Stripe',
          description: 'Rempli après création dans Stripe Dashboard (format: prod_xxx)',
        }),

        downloadUrl: fields.text({
          label: 'Lien d\'accès / téléchargement',
          description: 'URL Gumroad, Notion, PDF, etc.',
        }),

        // ── Contenu riche ──
        content: fields.document({
          label: 'Contenu de la page',
          description: 'Corps principal de la page outil — format riche avec titres, listes, images',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/tools',
            publicPath: '/images/tools/',
          },
        }),
      },
    }),

    pages: collection({
      label: 'Pages statiques',
      slugField: 'slug',
      path: 'src/content/pages/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'URL Slug' } }),
        title: fields.text({ label: 'Titre de la page' }),
        description: fields.text({
          label: 'Meta description (SEO)',
          validation: { length: { min: 20, max: 160 } },
        }),
        content: fields.document({
          label: 'Contenu',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/pages',
            publicPath: '/images/pages/',
          },
        }),
      },
    }),

    settings: collection({
      label: 'Paramètres du site',
      slugField: 'key',
      path: 'src/content/settings/*',
      format: { data: 'json' },
      schema: {
        key: fields.slug({ name: { label: 'Clé' } }),
        siteName: fields.text({ label: 'Nom du site' }),
        tagline: fields.text({ label: 'Slogan' }),
        email: fields.text({ label: 'Email de contact' }),
        stripePublishableKey: fields.text({
          label: 'Clé publique Stripe (pk_live_xxx ou pk_test_xxx)',
          description: 'Clé côté client uniquement — ne pas mettre la clé secrète ici',
        }),
      },
    }),
  },
});
