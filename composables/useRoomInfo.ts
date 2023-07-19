import { Booking } from "api/booking";
import { localRooms } from "./useRoomsInfo";

export default function useRoomInfo(
  roomId: MaybeRef<string | null | undefined>,
) {
  const bookingApi = useBookingApi();
  const roomData = computed(() => {
    return localRooms.find((r) => r.id === unref(roomId));
  });
  const roomDataPresent = computed(() => roomData.value !== undefined);
  const roomBookings = useQuery({
    queryKey: ["room-bookings", roomId],
    enabled: roomDataPresent,
    queryFn: async ({ queryKey }) => {
      const now = new Date();
      const nowPlusWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const [, roomId] = queryKey;
      return await bookingApi.value.queryBookings({
        queryBookingsRequest: {
          endedAfter: now,
          startedBefore: nowPlusWeek,
          roomIdIn: [roomId],
        },
      });
    },
    select: (rawBookings: Booking[]): Booking[] => {
      return rawBookings.map((b) => ({
        ...b,
        start: new Date(b.start),
        end: new Date(b.end),
      }));
    },
  });

  return computed(() => {
    if (!roomDataPresent.value || !roomData.value) {
      return null;
    }

    const room = roomData.value;
    const bookings = roomBookings.data.value ?? [];

    const events = bookings.filter((b) => b.room.id === room.id).map((b) => ({
      id: b.id,
      startDate: b.start,
      endDate: b.end,
      title: b.title,
    })) as RoomInfo["events"];

    return {
      id: room.id,
      name: room.name,
      imageSrc: room.imageSrc,
      events,
    };
  });
}

export type RoomInfo = {
  id: string;
  name: string;
  imageSrc?: string;
  events: {
    id: string;
    startDate: Date;
    endDate: Date;
    title: string;
  }[];
};
