import { Booking } from "booking/types";

export default function useMyBookings() {
  const bookingApi = useBookingApi();
  const {
    data: myBookings,
    isLoading: myBookingsLoading,
    error: myBookingsError,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async (): Promise<Booking[]> => {
      return await bookingApi.value.getMyBookings();
    },
  });

  return { myBookings, myBookingsLoading, myBookingsError };
}
