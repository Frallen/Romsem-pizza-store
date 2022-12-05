// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"

export default defineNuxtConfig({
  css: ["@/assets/styles/main.less"],

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
