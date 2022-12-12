//composition API
import qs from "qs";

export const useCatalog = defineStore("catalog", {
  state: () => ({
    baseURL: useRuntimeConfig().env.STRAPI_URL,
    catalogItems: [],
    isLoading: false,
    size: [],
  }),
  getters: {
    sortedCategories: (state) => {
      return (data) =>
        state.catalogItems.filter((p) => p.attributes.type === data);
    },
  },
  actions: {
    /// параметры к api https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
    async getDeals() {
      try {
        this.isLoading = true;
        const query = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );

        let { data } = await useFetch(
          `${this.baseURL}/api/catalog-items/?${query}`
        );

        this.catalogItems = data._value.data;
        //console.log(this.catalogItems);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = true;
      }
    },
    /*
    async SizeProduct() {
      try {
        this.isLoading = true;
        const query = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );

        let { data } = await useFetch(
          `${this.baseURL}/api/product-sizes/?${query}`
        );
        this.size = data._value.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = true;
      }
    },*/
  },
});
