// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import VueSweetalert2 from 'vue-sweetalert2';
export default defineNuxtConfig({
  css: ["maz-ui/css/main.css", "@/assets/styles/main.less","sweetalert2/dist/sweetalert2.min.css"],
  build: {
    transpile: ["maz-ui"],
  },
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
        STRAPI_URL: `http://localhost:1337`,
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
