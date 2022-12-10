// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  css: ["@/assets/styles/main.less"],
  imports: {
    dirs: ["store"],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || "http://localhost:1337/api",
        entities: ["catalog-items", "about", "Review"],
        key: process.env.API_KEY,
      },
      env: {
        STRAPI_URL: `http://localhost:1337/api`,
      },
    },
  },

  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/styles/_var.less" ;@import "@/assets/styles/_mixins.less" ;`,
        },
      },
    },
  },
});
