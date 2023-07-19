import { BookingApi } from "~/api/booking";

export default function useBookingApi() {
  const config = useApiConfig();
  return computed(() => {
    return new BookingApi(config.value);
  });
}
