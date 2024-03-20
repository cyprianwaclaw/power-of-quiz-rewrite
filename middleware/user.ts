import { useAuth } from "@/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authState = useAuth();

  if (authState.loggedIn) {
    return navigateTo("/panel");
  }
});
