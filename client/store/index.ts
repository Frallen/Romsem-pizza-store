import qs from "qs";
export const useIndex = defineStore("index", {

  state: () => ({
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
            `${useRuntimeConfig().public.strapi.url}/api/numbers/?${query}`
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
          `${useRuntimeConfig().public.strapi.url}/api/main-sliders/?${query}`
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
