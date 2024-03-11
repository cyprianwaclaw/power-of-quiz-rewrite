// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon'],
  css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss'],
})
