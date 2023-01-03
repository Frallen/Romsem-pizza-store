export const useUser = defineStore("user", {
  state: () => ({
    isLoading: false,
    user: [],
  }),
  getters: {},
  actions: {
    async createUser(data) {
      try {
        this.isLoading = true;

        let snap = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/auth/local/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              FI: data.userName,
              username: data.email,
              email: data.email,
              password: data.password,
            },
          }
        );
        localStorage.setItem(
          "user",
          JSON.stringify([snap.data.value.user, snap.data.value.jwt])
        );
        await this.Status();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async authUser(data) {
      try {
        this.isLoading = true;
        let snap = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/auth/local`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              identifier: data.email,
              password: data.password,
            },
          }
        );
        localStorage.setItem(
          "user",
          JSON.stringify([snap.data.value.user, snap.data.value.jwt])
        );
        await this.Status();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async Status() {
      try {
        if (process.client) {
          this.isLoading = true;
          this.user = JSON.parse(localStorage.getItem("user"));
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
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
