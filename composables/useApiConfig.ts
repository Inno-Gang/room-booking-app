import { Configuration } from "~/api/booking";

export default function useApiConfig() {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  return computed(() => {
    return new Configuration({
      basePath: runtimeConfig.public.bookingApiBase,
      apiKey: authStore.accessToken
        ? `Bearer ${authStore.accessToken}`
        : undefined,
      fetchApi: async (input, init) => {
        const response = await fetch(input, init);
        if (response.status === 401) {
          authStore.logout();
          console.log("fetching");

          const refreshResponse = await fetch(
            runtimeConfig.public.bookingApiBase + "/auth/refresh",
            { method: "POST " },
          );

          console.log("resp", refreshResponse);

          if (!refreshResponse.ok) {
            authStore.logout();
          } else {
            const newAccessToken = await refreshResponse.json();
            if (typeof newAccessToken === "string") {
              authStore.loginSuccess(newAccessToken);
              // Retry request after re-auth
              return await fetch(input, init);
            } else {
              authStore.logout();
              return response;
            }
          }

          return response;
        } else {
          return response;
        }
      },
    });
  });
}
