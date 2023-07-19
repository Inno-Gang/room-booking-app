export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const auth = useAuthStore();
    if (!auth.loggedIn) {
      return navigateTo("/login");
    }
  }
});
