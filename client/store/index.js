import qs from "qs";
export const useIndex = defineStore("index", {

  state: () => ({
    baseURL : useRuntimeConfig().env.STRAPI_URL,
    isLoading: false,
    MainSliderData: [],
  }),
  getters: {},
  actions: {
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
        //console.log(data._value.data);
        this.MainSliderData = data._value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});