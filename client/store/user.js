import { Error } from "~/composables/useAlert";

export const useUser = defineStore("user", {
  state: () => ({
    isLoading: false,
    user: [],
  }),
  getters: {},
  actions: {
    async createUser(obj) {
      this.isLoading = true;

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
        console.log(error.value.data.error.message);
        switch (error.value.data.error.message) {
          case "Email or Username are already taken": {
             Error("Данный адрес почты уже существует");
             break;
          }
          default:
            Error("Повторите попытку позже");
        }
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify([data.value.user, data.value.jwt])
        );
        await this.Status();
      }
      this.isLoading = false;
    },
    async authUser(obj) {
      this.isLoading = true;
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
        console.log(error.value.data.error.message);
        switch (error.value.data.error.message) {
          case "Invalid identifier or password": {
             Error("Неправльная почта или пароль");
             break;
          }
          default:
            Error("Повторите попытку позже");
        }
      } else {

        localStorage.setItem(
          "user",
          JSON.stringify([data.value.user, data.value.jwt])
        );
        await this.Status();
      }

      this.isLoading = false;
    },
    async Status() {
      this.isLoading = true;
      if (process.client) {
        this.user = JSON.parse(localStorage.getItem("user"));
      }

      this.isLoading = false;
    },
    async logout() {
      try {
        this.isLoading = true;
        localStorage.setItem("user", JSON.stringify([]));
        await this.Status();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
