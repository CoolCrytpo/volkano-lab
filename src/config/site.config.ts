export const siteConfig = {
  siteName: "Zangoun",
  tagline: "Comprendre la technologie pour agir.",
  domainPrimary: "zangoun.com",
  domainSecondary: ["zangoun.fr", "zangoun.re"],
  email: "contact@zangoun.com",
  location: "La Réunion",
  legalStatus: "Projet indépendant — La Réunion",
  siret: null as string | null,
  showSiret: false,
  ownerName: "Sébastien Rivière",
  companyName: null as string | null,
  social: {
    facebook: "#",
    linkedin: "#",
    whatsapp: "#",
    twitter: "#",
  },
  navigation: [
    { name: "Outils", href: "/outils" },
    { name: "Guides", href: "/guides" },
    { name: "Lab", href: "/lab" },
    { name: "Projets", href: "/projets" },
    { name: "À propos", href: "/a-propos" },
  ],
  footerLinks: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
  colors: {
    primary: "#34A2ED",
    dark: "#0D0D0F",
    white: "#FFFFFF",
    accent: "#E85D04",
    lightGray: "#F5F5F5",
  },
  keywords: [
    "IA pour entrepreneur",
    "simulateur crypto France",
    "automatisation",
    "blockchain pédagogie",
    "outils tech pratiques",
    "fiscalité crypto",
    "DCA crypto calculateur",
  ],
};

export type SiteConfig = typeof siteConfig;
