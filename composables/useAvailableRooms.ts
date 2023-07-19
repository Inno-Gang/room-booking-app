import { Room } from "~/booking/types";

export default function useAvailableRooms(
  from: MaybeRef<Date>,
  to: MaybeRef<Date>,
) {
  const bookingApi = useBookingApi();
  const {
    data: availableRooms,
    isLoading: availableRoomsLoading,
    isError: availableRoomsError,
  } = useQuery({
    queryKey: [
      "free-rooms",
      unref(from).toISOString(),
      unref(to).toISOString(),
    ],
    refetchInterval: 10000,
    queryFn: async ({ queryKey }): Promise<Room[]> => {
      const [, from, to] = queryKey;
      return bookingApi.value.getFreeRooms({
        getFreeRoomsRequest: {
          start: from,
          end: to,
        },
      });
    },
  });

  return {
    availableRooms,
    availableRoomsLoading,
    availableRoomsError,
  };
}
