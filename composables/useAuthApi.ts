import { AuthApi } from "~/api/booking";

export default function useAuthApi() {
  const config = useApiConfig();
  return computed(() => {
    return new AuthApi(config.value);
  });
}
