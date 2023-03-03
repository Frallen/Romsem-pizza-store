import qs from "qs";
import { IndexState } from "~/types/index.types";
import { Error } from "~/composables/useAlert";
export const useIndex = defineStore("index", {
  state: (): IndexState => ({
    isLoading: false,
    Phones: [],
    MainSliderData: [],
    Articles: [],
  }),
  getters: {
    getArticle: (state) => {
      return (id: number) => state.Articles.find((p) => p.id === id);
    },
  },
  actions: {
    async GetPhones() {
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      this.isLoading = true;
      let { data, error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/numbers/?${query}`
      );

      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.Phones = data.value.data;
      }
      this.isLoading = false;
    },
    async getSlides() {
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      this.isLoading = true;
      let { data, error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/main-sliders/?${query}`
      );

      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.MainSliderData = data.value.data;
      }
      this.isLoading = false;
    },
    async getArticles() {
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      this.isLoading = true;
      let { data, error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/articles/?${query}`
      );

      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.Articles = data.value.data;
      }
      this.isLoading = false;
    },
  },
});
