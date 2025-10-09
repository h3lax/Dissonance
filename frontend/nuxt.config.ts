import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    experimental:{
      websocket:true
    },
    preset: 'node-server',
  },

  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,

    public: {
      hintCooldownSec: 15 * 60, // 15 minutes entre deux requêtes
    },
  },
});
