// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Romsem сеть пиццерий",
      meta: [
        { name: "description", content: "Пицца,роллы,суши,wok,салаты,супы." },
      ],
    },
  },
  css: ["@/assets/styles/main.less", "sweetalert2/dist/sweetalert2.min.css"],
  build: {},
  imports: {
    dirs: ["store"],
  },
  image: {
    strapi: {
      baseURL: "http://localhost:1337/uploads/",
    },
    cloudinary: {
      baseURL: "https://res.cloudinary.com/devqrrkig/image/fetch/",
    },
  },
  modules: [
    ["@nuxtjs/robots"],
    ["nuxt-icon"],
    ["@vueuse/nuxt"],
    [
      "@nuxtjs/web-vitals",
      {
        webVitals: {
          // provider: '', // auto detectd
          debug: false,
          disabled: false,
        },
      },
    ],
    ["nuxt-swiper"],
    ["@nuxt/image-edge"],
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
        url: process.env.STRAPI_URL || "http://localhost:1337",
        entities: ["catalog-items", "about", "Review"],
        key: process.env.API_KEY,
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
