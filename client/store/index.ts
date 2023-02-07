import qs from "qs";
export const useIndex = defineStore("index", {

  state: () => ({
    baseURL : useRuntimeConfig().public.strapi.url,
    isLoading: false,
    Phones:[],
    MainSliderData: [],
  }),
  getters: {},
  actions: {
    async GetPhones(){
      try {
        const query = qs.stringify(
            {
              populate: "*",
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
        );
        this.isLoading = true;
        let { data } = await useFetch(
            `${this.baseURL}/api/numbers/?${query}`
        );
        // @ts-ignore
        this.Phones = data.value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async getSlides() {
      try {
        const query = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );
        this.isLoading = true;
        let { data } = await useFetch(
          `${this.baseURL}/api/main-sliders/?${query}`
        );
        // @ts-ignore
        this.MainSliderData = data.value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
