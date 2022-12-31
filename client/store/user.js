export const useUser = defineStore("user", {
  state: () => ({
    isLoading: false,
    isAuth: false,
    jwt: String,
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
        this.user=snap.data.value.user
        this.jwt=snap.data.value.jwt

      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async authUser(data) {
      try {
        this.isLoading = true;
        let user = await useFetch(
          `${useRuntimeConfig().env.STRAPI_URL}/api/auth/local`,
          {
            email: data.email,
            password: data.password,
          }
        );
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
