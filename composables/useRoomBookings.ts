const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

export default function useRoomBookings(roomId: MaybeRef<string | null>) {
  const bookingApi = useBookingApi();
  const now = new Date();
  const nowPlusWeek = new Date(now.getTime() + WEEK_IN_MS);
  return useQuery({
    queryKey: ["room-bookings", roomId],
    queryFn: async (ctx) => {
      const roomId = unref(ctx.queryKey[1]);

      if (!roomId) {
        throw new Error("roomId is required");
      }

      return await bookingApi.value.queryBookings({
        queryBookingsRequest: {
          endedAfter: now.toISOString(),
          startedBefore: nowPlusWeek.toISOString(),
          roomIdIn: [roomId],
        },
      });
    },
    enabled: unref(roomId) != null,
  });
}
