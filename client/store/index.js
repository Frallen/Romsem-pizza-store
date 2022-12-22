import qs from "qs";
export const useIndex = defineStore("index", {

  state: () => ({
    baseURL : useRuntimeConfig().env.STRAPI_URL,
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
        this.Phones = data._value.data;
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
        this.MainSliderData = data._value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
