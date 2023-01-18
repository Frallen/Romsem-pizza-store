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
          //...(data._value && {value: [data._value]})}
        };
        let cookie = useCookie("order");
        let order = [...(cookie.value ?? "")];

        if (order.length) {
          order.map((p) => {
            if (p.id === data.id) {
              //console.log(p.value.find((z) => z === obj.value[0]));
              if (!p.value.find((z) => z === obj.value[0])) {
                return (p.value = [...p.value, ...obj.value]);
              }
            }
          });

          !order.some((p) => p.id === obj.id) && order.push(obj);

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
    async removeItem(id, type) {
      this.isLoading = true;
      let cookie = useCookie("order");
      if (type) {
        console.log(  cookie.value.some((p) => {
          if (p.id === id) {
            return  Object.entries(p.value).length < 2;
          }
        }));
        if (
          cookie.value.some((p) => {
            if (p.id === id) {
             return  Object.entries(p.value).length < 2;
            }
          })
        ) {
          cookie.value = JSON.stringify(
            cookie.value.filter((p) => p.id !== id)
          );
        } else {
          cookie.value = cookie.value.map((z) => {
            if (z.id === id) {
              z.value = [...z.value.filter((p) => p !== type)];
            }
            return z;
          });
        }
      } else {
        cookie.value = JSON.stringify(cookie.value.filter((p) => p.id !== id));
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
