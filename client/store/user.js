import { Error } from "~/composables/useAlert";
import qs from "qs";

export const useUser = defineStore("user", {
  state: () => ({
    isLoading: false,
    user: {},
  }),
  getters: {
    favorites: (state) => {
      return (id) => state.user.Favorites.some((p) => p.id === parseInt(id));
    },
  },
  actions: {
    async createUser(obj) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        HttpOnly: true,
        //Secure:true,
        sameSite: "strict",
      });
      let { data, error } = await useFetch(
        `${useRuntimeConfig().env.STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            FI: obj.userName,
            username: obj.email,
            email: obj.email,
            password: obj.password,
          },
        }
      );
      if (error.value) {
        // console.log(error.value.data.error.message);
        switch (error.value.data.error.message) {
          case "Email or Username are already taken": {
            Error("Данный адрес почты уже существует");
            break;
          }
          default:
            Error("Повторите попытку позже");
        }
      } else {
        cookie.value = data.value.jwt;
        await this.Profile();
      }
      this.isLoading = false;
    },
    async authUser(obj) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        HttpOnly: true,
        //Secure:true,
        sameSite: "strict",
      });
      let { data, error } = await useFetch(
        `${useRuntimeConfig().env.STRAPI_URL}/api/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            identifier: obj.email,
            password: obj.password,
          },
        }
      );
      if (error.value) {
        // console.log(error.value.data.error.message);
        switch (error.value.data.error.message) {
          case "Invalid identifier or password": {
            Error("Неправльная почта или пароль");
            break;
          }
          default:
            Error("Повторите попытку позже");
        }
      } else {
        cookie.value = data.value.jwt;
        await this.Profile(data.value.jwt);
      }

      this.isLoading = false;
    },

    async updateFavorites(id, status) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        httpOnly: true,
        //secure:true,
        sameSite: "strict",
      });
      if (status) {
        this.user.Favorites.push(id);
        let { data, error } = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/users/${this.user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookie.value}`,
              "Content-Type": "application/json",
            },
            body: {
              Favorites: this.user.Favorites,
            },
          }
        );
        if (error.value) {
          // console.log(error.value.data.error.message);
          switch (error.value.data.error.message) {
            default:
              Error("Повторите попытку позже");
          }
        }
      } else {
        let { data, error } = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/users/${this.user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookie.value}`,
              "Content-Type": "application/json",
            },
            body: {
              Favorites: this.user.Favorites.filter((p) => p.id !== id),
            },
          }
        );
        if (error.value) {
          // console.log(error.value.data.error.message);
          switch (error.value.data.error.message) {
            default:
              Error("Повторите попытку позже");
          }
        }
      }

      await this.Profile(cookie.value);
      this.isLoading = false;
    },
    async Profile(jwt) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        httpOnly: true,
        //secure:true,
        sameSite: "strict",
      });
      if (cookie.value || jwt) {
        const query = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );
        let { data, error } = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/users/me/?${query}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookie.value || jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (error.value) {
          // console.log(error.value.data.error.message);
          switch (error.value.data.error.message) {
            default:
              Error("Повторите попытку позже");
          }
        } else {
          this.user = { ...data.value };
        }
      }
      this.isLoading = false;
    },
    async logout() {
      try {
        this.isLoading = true;
        let cookie = useCookie("user", {
          HttpOnly: true,
          //Secure:true,
          sameSite: "strict",
        });
        cookie.value = null;
        this.user = {};
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
