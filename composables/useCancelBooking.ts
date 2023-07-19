import { Booking } from "~/booking/types";

export default function useCancelBooking() {
  const queryClient = useQueryClient();
  const { mutate: cancelBooking, isLoading: isCanceling, isError } =
    useMutation({
      mutationKey: ["my-bookings"],
      mutationFn: async (bookingId: string) => {
        // TODO
        return;
      },
      onSuccess: (_, cancelledBookingId) => {
        queryClient.setQueryData(
          ["my-bookings"],
          (oldMyBookings: Booking[] | undefined) => {
            if (!oldMyBookings) {
              // There were no "my-bookings" before, its better to refetch them
              queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
            } else {
              return oldMyBookings.filter(
                (booking) => booking.id !== cancelledBookingId,
              );
            }
          },
        );
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      },
    });
  return {
    cancelBooking,
    isCanceling,
    isError,
  };
}
