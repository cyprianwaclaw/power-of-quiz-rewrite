// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   pageTransition: {
  //     name: 'rotate',
  //     mode: 'out-in'
  //   }
  // },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', 'nuxt-primevue', 'nuxt-lazy-load'],
  css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss', 'primevue/resources/themes/aura-light-green/theme.css'],
})
