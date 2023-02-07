import qs from "qs";
import { Error, Success, AddedToBasket } from "~/composables/useAlert";
import { useUser } from "~/store/user";
import {
  CatalogState
} from "~/types/catalog.types";

export type isLoading = boolean;
export const useCatalog:any = defineStore("catalog", {
  state: ():CatalogState => ({
    catalogItems: [] ,
    isLoading: false ,
    orders: [] ,
    reviews: [],
  }),
  getters: {
    filteredItem: (state) => {
      return (id: number) => state.catalogItems.find((p) => p.id === id);
    },
    searchedItems: (state) => {
      return (str: string) =>
        str
          ? state.catalogItems.filter((p) =>
              p.attributes.Title.toLowerCase().includes(str.toLowerCase())
            )
          : state.catalogItems;
    },
    sortedCategories: (state) => {
      return (str: string) =>
        state.catalogItems.filter(
          (p) => p.attributes.type.toLowerCase() === str.toLowerCase()
        );
    },
    favoriteItems: (state) => {
      if (useUser().isAuth) {
        return state.catalogItems.filter(
          (p) => useUser().user.Favorites.some((z) => z.id === p.id) && p
        );
      } else return false;
    },
    ReviewsByProduct: (state) => {
      return (id: number) =>
        state.reviews.filter((p) => p.attributes.catalog_item.data.id === id);
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
    addToBasket(data: object) {
      try {
        this.isLoading = false;
        type ObjectSend = {
          id: number;
          value: object[];
        };
        let obj: ObjectSend = {
          id: data.id,
          value: [data._value],
        };
        let cookie = useCookie("order");
        let order = [...(cookie.value ?? "")];

        if (order.length) {
          order.map((p) => {
            if (p.id === data.id) {
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
        AddedToBasket();
      } catch (e) {
        Error("Повторите попытку позже");
      } finally {
        this.isLoading = false;
      }
    },
    async addOrder(data: object, sum: number, phone: string) {
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
              Owner:
                Object.entries(useUser().user).length > 0
                  ? useUser().user.email
                  : phone,
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
    async removeItem(id: number, type: string) {
      this.isLoading = true;
      let cookie: object = useCookie("order");
      if (type) {
        if (
          cookie.value.some((p) => {
            if (p.id === id) {
              return Object.entries(p.value).length < 2;
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
    async getReviews() {
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
        `${useRuntimeConfig().public.strapi.url}/api/reviews/?${query}`
      );

      //console.log(this.catalogItems);

      if (error.value) {
        switch (error.value.data.error.message) {
          default:
            Error("Повторите попытку позже");
        }
      } else {
        this.reviews = data._value.data;
      }
      this.isLoading = false;
    },
    async addReview(review: object, itemId: number, ownerId: number) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        httpOnly: true,
        //secure:true,
        sameSite: "strict",
      });
      let { error } = await useFetch(
        `${useRuntimeConfig().public.strapi.url}/api/reviews`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie.value}`,
            "Content-Type": "application/json",
          },
          body: {
            data: {
              Title: review.title,
              Text: review.text,
              Owner: ownerId,
              catalog_item: itemId,
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
      }
      await this.getReviews();
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
