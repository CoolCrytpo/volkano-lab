export const siteConfig = {
  siteName: "Volkano Lab",
  tagline: "Comprendre avant d'agir.",
  domainPrimary: "volkanolab.com",
  domainSecondary: ["volkanolab.fr", "volkanolab.re"],
  email: "contact@volkanolab.re",
  location: "La Réunion",
  legalStatus: "Projet indépendant — La Réunion",
  siret: null as string | null,
  showSiret: false,
  ownerName: "Sébastien Rivière",
  companyName: null as string | null,

  // Social links
  social: {
    facebook: "#",
    linkedin: "#",
    whatsapp: "#",
  },

  // Navigation
  navigation: [
    { name: "Accueil", href: "/" },
    { name: "Décrypter", href: "/decrypter" },
    { name: "Boîte à outils", href: "/outils" },
    { name: "À propos", href: "/a-propos" },
  ],

  // Footer links
  footerLinks: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],

  // Colors (palette magma)
  colors: {
    primary: "#E85D04",   // volkano-fire (CTA principal)
    dark: "#0D0D0F",      // volkano-dark
    white: "#FFFFFF",
    accent: "#34A2ED",    // Bleu tech
    lightGray: "#F5F5F5",
  },

  // SEO Keywords
  keywords: [
    "outils pédagogiques blockchain et IA",
    "simulateur crypto France",
    "IA pour entrepreneur",
    "automatisation",
    "outils numériques",
  ],
};

export type SiteConfig = typeof siteConfig;
