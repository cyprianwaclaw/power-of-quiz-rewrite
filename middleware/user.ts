import { useAuth } from "@/store/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authState = useAuth();

  if (authState.loggedIn) {
    return navigateTo("/");
  }
});
