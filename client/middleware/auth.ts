import { useUser } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  let userState = useUser();
  await userState.Profile()
  if (Object.entries(userState.user).length < 1) {
    return abortNavigation();
  }
});
