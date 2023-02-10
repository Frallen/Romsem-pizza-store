import { Error } from "~/composables/useAlert";
import qs from "qs";
import { useCatalog } from "~/store/catalog";
import {
  AuthType,
  updateInfoType,
  UserState,
  UserType,
} from "~/types/user.types";

export const useUser: any = defineStore("user", {
  state: (): UserState => ({
    isLoading: false,
    user: {} as UserType,
  }),
  getters: {
    favorited: (state) => {
      return (id: number) =>
        state.user.Favorites && state.user.Favorites.some((p) => p.id === id);
    },
    isAuth: (state) => {
      return Object.keys(state.user).length > 0;
    },
    usersReviews: (state) => {
      return useCatalog().reviews.filter(
        (p: any) => p.attributes.Owner.data.id === state.user.id
      );
    },
  },
  actions: {
    async createUser(obj: AuthType) {
      interface ResponseType {
        data: {
          value: {
            jwt: string;
          };
        };
        error: {
          value?: object;
        };
      }
      this.isLoading = true;
      let cookie = useCookie("user", {
        //Secure:true,
        sameSite: "strict",
        maxAge: 3600,
      });
      let { data, error } = await useFetch<ResponseType>(
        `${useRuntimeConfig().public.strapi.url}/api/auth/local/register`,
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
      }
      this.isLoading = false;
    },
    async authUser(obj: AuthType) {
      interface ResponseType {
        data: {
          value?: {
            jwt: string;
          };
        };
        error: {
          value?: object;
        };
      }

      this.isLoading = true;
      let cookie = useCookie("user", {
        //Secure:true,
        sameSite: "strict",
        maxAge: 3600,
      });
      let { data, error } = await useFetch<ResponseType>(
        `${useRuntimeConfig().public.strapi.url}/api/auth/local`,
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
            Error("Не верная пароль или такой почты не существует ");
            break;
          }
          default:
            Error("Повторите попытку позже");
        }
      } else {
        cookie.value = data.value.jwt;
      }
      this.isLoading = false;
    },

    async updateFavorites(id: number, status: string) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        //secure:true,
        sameSite: "strict",
        maxAge: 3600,
      });
      if (status) {
        let arr: (number | undefined)[] = [
          ...this.user.Favorites.map((p) => p.id),
        ];
        arr.push(id);
        let { data, error } = await useFetch(
          `${useRuntimeConfig().public.strapi.url}/api/users/${this.user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookie.value}`,
              "Content-Type": "application/json",
            },
            body: {
              Favorites: arr,
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
          `${useRuntimeConfig().public.strapi.url}/api/users/${this.user.id}`,
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

      await this.Profile();
      this.isLoading = false;
    },
    async updateProfile(info: updateInfoType) {
      this.isLoading = true;
      let cookie = useCookie("user", {
        //secure:true,
        sameSite: "strict",
        maxAge: 3600,
      });

      switch (true) {
        case info.hasOwnProperty("email"): {
          let { data, error } = await useFetch(
            `${useRuntimeConfig().public.strapi.url}/api/auth/change-password`,
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
          } else {
            await this.logout();
            Success(
              "Почта успешно изменена",
              "Можете входить в учетную запись с новыми данными"
            );
          }

          break;
        }
        case info.hasOwnProperty("userName"): {
          let { data, error } = await useFetch(
            `${useRuntimeConfig().public.strapi.url}/api/users/${this.user.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${cookie.value}`,
                "Content-Type": "application/json",
              },
              body: {
                FI: info.userName,
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
            Success(
              "Имя пользователя усешно изменено",
              "Можете входить в учетную запись с новыми данными"
            );
          }
          await this.Profile();
          break;
        }
        case info.hasOwnProperty("NewPassword"): {
          let { data, error } = await useFetch(
            `${useRuntimeConfig().public.strapi.url}/api/auth/change-password`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${cookie.value}`,
                "Content-Type": "application/json",
              },
              body: {
                currentPassword: info.CurrentPassword,
                password: info.NewPassword,
                passwordConfirmation: info.NewPassword,
              },
            }
          );
          if (error.value) {
            // console.log(error.value);
            switch (error.value.data.error.message) {
              default:
                Error("Не верный пароль или повторите попытку позже");
            }
          } else {
            Success(
              "Пароль усешно изменен",
              "Можете входить в учетную запись с новыми данными"
            );
            await this.logout();
          }

          break;
        }
      }

      this.isLoading = false;
    },
    async Profile() {
      interface ResponseType {
        data: {
          value?: UserType;
        };
        error: {
          value?: object;
        };
      }

      this.isLoading = true;
      let cookie = useCookie("user", {
        //secure:true,
        sameSite: "strict",
        maxAge: 3600,
      });
      if (cookie.value) {
        const query = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        );
        let { data, error } = await useFetch<ResponseType>(
          `${useRuntimeConfig().public.strapi.url}/api/users/me/?${query}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookie.value}`,
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
          this.user = { ...data.value } as UserType;
        }
      }
      this.isLoading = false;
    },
    async logout() {
      try {
        this.isLoading = true;
        let cookie = useCookie("user", {
          //Secure:true,
          sameSite: "strict",
          maxAge: 3600,
        });
        cookie.value = JSON.stringify("");
        this.user = {} as UserType;
        useRouter().push("/");
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
