/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        volkano: {
          // Palette magma/lave — remplace l'orange Telecom
          fire:   '#E85D04',   // CTA principal
          lava:   '#F48C06',   // hover / variante chaude
          ember:  '#FAA307',   // badges / accents
          glow:   '#FFBA08',   // highlight texte
          magma:  '#9D0208',   // rouge profond
          // Aliases compatibilité rétro (évite de tout casser)
          orange: '#E85D04',   // redirigé vers fire
          // Neutres
          dark:   '#0D0D0F',   // fond principal (légèrement plus sombre qu'avant)
          blue:   '#34A2ED',   // crypto/tech — inchangé
          light:  '#F5F5F5',
          gray:   '#F5F5F5',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.04)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
        'grid-pattern-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
        'magma-gradient': 'linear-gradient(135deg, #9D0208 0%, #E85D04 50%, #FAA307 100%)',
        'fire-gradient':  'linear-gradient(135deg, #E85D04 0%, #FFBA08 100%)',
        'ember-glow':     'radial-gradient(ellipse at center, rgba(232,93,4,0.3) 0%, transparent 70%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232,93,4,0.3)' },
          '50%':       { boxShadow: '0 0 40px rgba(250,163,7,0.5)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
