export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',

  ssr: true,

  runtimeConfig: {
    smtpHost: '',
    smtpPort: 465,
    smtpUser: 'contact@oraclesteps.com',
    smtpPassword: '',
  },

  buildDir:
    process.env.NODE_ENV === 'production'
      ? '.nuxt-build'
      : '.nuxt',

  devtools: {
    enabled: false
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sansation:wght@400;700&family=Lato:wght@400;700&display=swap'
        }
      ]
    }
  }
})