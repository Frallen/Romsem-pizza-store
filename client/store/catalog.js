import qs from "qs";

export const useCatalog = defineStore("catalog", {
  state: () => ({
    //baseURL: useRuntimeConfig().env.STRAPI_URL,
    catalogItems: [],
    isLoading: false,
    size: [],
  }),
  getters: {
    sortedCategories: (state) => {
      return (data) =>
        state.catalogItems.filter((p) => p.attributes.type === data);
    },
    basketItems: (state) => {
      let cookie = useCookie("order");
      let order = [...(cookie.value ?? "")];
      let arr = state.catalogItems.filter(
        (p) => order.find((z) => z.id === p.id) && p
      );
      order.map((z) =>
        arr.map((p) => {
          if (z.id === p.id) {
            p.value = [...z.value];
          }
        })
      );

      return arr;
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
          `${useRuntimeConfig().env.STRAPI_URL}/api/catalog-items/?${query}`
        );

        this.catalogItems = data._value.data;
        //console.log(this.catalogItems);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = true;
      }
    },
    addToBasket(data) {
      try {
        this.isLoading = false;

        let obj = {
          id: data.id,
          value: [data._value],
        };
        let cookie = useCookie("order");
        let order = [...(cookie.value ?? "")];

        if (order.length) {
          order.map((p) => {
            if (p.id === data.id) {
              console.log(p.value.find((z) => z === obj.value[0]));
              if (!p.value.find((z) => z === obj.value[0])) {
                p.value = [...p.value, ...obj.value];
              }
            }
          });

          !order.find((p) => p.id === obj.id) && order.push(obj);
          //  console.log(order);

          cookie.value = JSON.stringify(order);
        } else {
          order.push(obj);
          cookie.value = JSON.stringify(order);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = true;
      }
    },
  },
});
