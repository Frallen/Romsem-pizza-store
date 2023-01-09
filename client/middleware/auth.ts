import { useUser } from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  let userState = useUser();

  if (Object.entries(userState.user).length < 1) {
    return abortNavigation();
  }
});
