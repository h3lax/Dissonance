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
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    public: {
      NUXT_PUBLIC_WS_URL: process.env.NUXT_PUBLIC_WS_URL, // ex: https://dissonance-ws.onrender.com
      hintCooldownSec: 15 * 60,
    },
  },

  app: {
    head: {
      title: 'Dissonance'
    },
  },
});
