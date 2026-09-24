export default defineNuxtConfig({
  compatibilityDate: '2025-09-01', ssr: true, buildDir: process.env.NODE_ENV === "production" ? ".nuxt-build" : ".nuxt", devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'], css: ['~/assets/css/main.css'],
  nitro: { preset: 'cloudflare-module' },
  app: { head: { htmlAttrs: { lang: 'en' }, link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;450;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' }
  ] } }
})
