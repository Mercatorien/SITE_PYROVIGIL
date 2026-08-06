// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  telemetry: false,   // évite la question bloquante au démarrage

  // Écoute en IPv4 + IPv6 : sans cela Nitro peut ne binder que [::1] et
  // http://localhost:3000 (résolu en 127.0.0.1) reste inaccessible → page blanche.
  devServer: { host: '0.0.0.0', port: 3000 },

  // MapLibre GL : son web worker se bloque avec le pré-bundling Vite en dev
  // (requête maplibre-gl-worker.mjs pendante → carte jamais chargée). On l'exclut.
  vite: {
    optimizeDeps: { exclude: ['maplibre-gl'] },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

  css: ['~/assets/css/main.css'],

  // La console d'admin charge ses données en direct (API + Postgres) : elle ne doit
  // pas être pré-rendue au build (sinon [500] au générateur, faute de base). On la
  // sert en client-only → coquille SPA statique qui s'hydrate côté navigateur.
  routeRules: {
    '/pyro-admin': { ssr: false },
  },

  // Polices auto-hébergées au build (pas d'appel Google au runtime → perf + RGPD)
  googleFonts: {
    families: {
      Montserrat: [600, 700, 800],
      Lato: [400, 700],
      'IBM+Plex+Mono': [500, 600],
    },
    display: 'swap',
    download: true,
  },

  // NB : la config sensible (Postgres, ADMIN_PASSWORD, IPINFO_TOKEN) est lue
  // directement via process.env côté serveur (chargé depuis .env en dev par Nuxt,
  // via pm2/env en prod) — voir server/utils/db.ts.

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'PyroVigil - Experts DFCI',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Description par défaut (chaque page la surcharge via useSeoMeta / PageHero)
        { name: 'description', content: 'PyroVigil, bureau d\'études spécialisé en protection contre les feux de forêt : cartographie et gestion des Obligations Légales de Débroussaillement (OLD), études DFCI, formations certifiées Qualiopi, et l\'outil PyrOLD.' },
        { name: 'theme-color', content: '#E8651A' },
        // Open Graph / réseaux sociaux (défauts — surchargés par page)
        { property: 'og:site_name', content: 'PyroVigil' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'PyroVigil — Experts DFCI & OLD' },
        { property: 'og:description', content: 'Bureau d\'études DFCI/OLD et organisme de formation Qualiopi. Cartographie, études de défendabilité, servitudes DFCI et l\'outil PyrOLD.' },
        // URL ABSOLUE obligatoire pour les réseaux (LinkedIn/Facebook ne résolvent
        // pas les chemins relatifs). Sur GitHub Pages le site est sous /SITE_PYROVIGIL/.
        // À remplacer par https://www.pyrovigil.fr/img/og-image.png au passage sur Hostinger.
        { property: 'og:image', content: 'https://mercatorien.github.io/SITE_PYROVIGIL/img/og-image.png' },
        { property: 'og:image:secure_url', content: 'https://mercatorien.github.io/SITE_PYROVIGIL/img/og-image.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'PyroVigil — Bureau d\'études DFCI & OLD' },
        { property: 'og:locale', content: 'fr_FR' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://mercatorien.github.io/SITE_PYROVIGIL/img/og-image.png' },
      ],
      // favicon défini dans app.vue via asset() pour respecter le baseURL
    },
  },
})
