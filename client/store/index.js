import qs from "qs";
export const useIndex = defineStore("index", {
  state: () => ({
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
          `http://localhost:1337/api/main-sliders/?${query}`
        );
        console.log(data._value.data);
        this.MainSliderData = data._value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
