import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    articles: collection({
      label: 'Articles',
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
      label: 'Outils',
      slugField: 'slug',
      path: 'src/content/tools/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'URL Slug' } }),
        title: fields.text({ label: 'Titre' }),
        description: fields.text({
          label: 'Description courte',
          validation: { length: { min: 20, max: 160 } },
        }),
        image: fields.image({
          label: 'Image de couverture',
          directory: 'public/images/tools',
          publicPath: '/images/tools/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        premium: fields.checkbox({ label: 'Contenu Premium' }),
        priceFiat: fields.number({
          label: 'Prix en EUR (Stripe)',
          description: 'Laissez vide si gratuit',
        }),
        priceCrypto: fields.text({
          label: 'Prix en USDC (Stripe Crypto)',
          description: 'Laissez vide si gratuit',
        }),
        stripeProductId: fields.text({
          label: 'ID Produit Stripe',
          description: 'Sera rempli automatiquement après création dans Stripe',
        }),
        downloadUrl: fields.text({
          label: 'Lien de téléchargement/accès',
          description: 'URL vers le fichier ou page de contenu',
        }),
        content: fields.document({
          label: 'Contenu',
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
      label: 'Pages',
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
          label: 'Clé publique Stripe',
          description: 'Ne pas partager la clé secrète ici',
        }),
      },
    }),
  },
});
