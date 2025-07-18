// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  ssr: true,
  // image: {
  //   quality: 80,
  // },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    'nuxt-primevue',
    'nuxt-lazy-load',
    '@primevue/nuxt-module',
    '@nuxt/image'
  ],

  css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss', 'primevue/resources/themes/aura-light-green/theme.css'],
  compatibilityDate: '2024-10-24',
})