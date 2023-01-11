import qs from "qs";
import { Error, Success } from "~/composables/useAlert";
import { useUser } from "~/store/user";
export const useCatalog = defineStore("catalog", {
  state: () => ({
    //baseURL: useRuntimeConfig().env.STRAPI_URL,
    catalogItems: [],
    isLoading: false,
    size: [],
    orders: [],
  }),
  getters: {
    filteredItem: (state) => {
      return (id) => state.catalogItems.find((p) => p.id === parseInt(id));
    },
    searchedItems: (state) => {
      return (data) =>
        data
          ? state.catalogItems.filter((p) =>
              p.attributes.Title.toLowerCase().includes(data.toLowerCase())
            )
          : state.catalogItems;
    },
    sortedCategories: (state) => {
      return (data) =>
        state.catalogItems.filter(
          (p) => p.attributes.type.toLowerCase() === data.toLowerCase()
        );
    },
    favoriteItems: (state) => {
      if (useUser().isAuth) {
        return state.catalogItems.filter(
          (p) => useUser().user.Favorites.some((z) => z.id === p.id) && p
        );
      } else return false;
    },
    filteredStock: (state) => {
      return state.catalogItems.filter((p) => p.attributes.stock);
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
      this.isLoading = true;
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );

      let { data, error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/catalog-items/?${query}`
      );

      //console.log(this.catalogItems);

      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.catalogItems = data._value.data;
      }
      this.isLoading = false;
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
              //console.log(p.value.find((z) => z === obj.value[0]));
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
        Error("Повторите попытку позже");
      } finally {
        this.isLoading = false;
      }
    },
    async addOrder(data, sum, phone) {
      this.isLoading = true;
      let cookie = useCookie("order");
      let { error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            data: {
              OrderItems: JSON.stringify(data),
              Sum: sum.toFixed(2),
              PhoneNumber: phone,
              Owner: useUser().user ? useUser().user.email : phone,
            },
          },
        }
      );
      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        cookie.value = JSON.stringify([]);
        Success(
          "Заказ успешно создан!",
          "Ожидайте звонка нашего специалиста или позвоните по номеру"
        );
      }

      this.isLoading = false;
    },
    async userOrders() {
      this.isLoading = true;
      let cookie = useCookie("user", {
        httpOnly: true,
        //secure:true,
        sameSite: "strict",
      });
      const query = qs.stringify(
        {
          populate: "*",

          filters: {
            Owner: {
              $eq: useUser().user.email,
            },
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );

      let { data, error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/orders/?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie.value}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.orders = data._value.data;
      }
      this.isLoading = false;
    },
  },
});
