import { Booking, Room } from "booking/types";

export default function useRoomsData(
  startDate: MaybeRef<Date>,
  endDate: MaybeRef<Date>,
) {
  const bookingApi = useBookingApi();
  const { me } = useMe();
  const { data: bookings, isLoading: bookingsLoading, isError: bookingsError } =
    useQuery({
      queryKey: ["bookings", startDate, endDate],
      queryFn: async ({ queryKey }) => {
        const [_, startDate, endDate] = queryKey;
        console.log("Querying bookings for", unref(startDate), unref(endDate));
        return await bookingApi.value.queryBookings({
          queryBookingsRequest: {
            endedAfter: unref(startDate),
            startedBefore: unref(endDate),
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
  const {
    data: bookableRooms,
    isLoading: bookableRoomsLoading,
    isError: bookableRoomsError,
  } = useQuery({
    queryKey: ["bookable-rooms"],
    queryFn: async (): Promise<Room[]> => {
      return await bookingApi.value.getRooms();
    },
  });

  const error = computed(() => (
    bookingsError.value || bookableRoomsError.value
  ));

  const loading = computed(() =>
    bookingsLoading.value || bookableRoomsLoading.value
  );

  const roomsData = computed(() => {
    const combinedRooms: Record<string, RoomData> = {};

    for (const localRoom of localRooms) {
      combinedRooms[localRoom.id] = {
        id: localRoom.id,
        name: localRoom.name,
        imageSrc: localRoom.imageSrc,
        bookable: null,
        available: true,
        bookedByMe: false,
      };
    }

    for (const bookableRoom of (bookableRooms.value ?? [])) {
      if (bookableRoom.id in combinedRooms) {
        combinedRooms[bookableRoom.id]!.bookable = true;
        combinedRooms[bookableRoom.id]!.name = bookableRoom.name;
      } else {
        combinedRooms[bookableRoom.id] = {
          id: bookableRoom.id,
          name: bookableRoom.name,
          bookable: true,
          available: true,
          bookedByMe: false,
        };
      }
    }

    for (const booking of (bookings.value ?? [])) {
      // Mark rooms as available / booked by me
      if (booking.room.id in combinedRooms) {
        combinedRooms[booking.room.id]!.available = false;
        combinedRooms[booking.room.id]!.bookedByMe =
          booking.ownerEmail === me.value?.emailAddress;
      }
    }

    return Object.values(combinedRooms);
  });

  return {
    loading,
    error,
    roomsData,
  };
}

export type RoomData = {
  id: string;
  name: string;
  imageSrc?: string;
  bookable: boolean | null;
  available: boolean | null;
  bookedByMe: boolean | null;
};

export type LocalRoomData = {
  id: string;
  name: string;
  imageSrc?: string;
};

export const localRooms = [
  { id: "3.5", name: "Meeting Room #3.5", imageSrc: "/room-photos/demo.webp" },
  { id: "3.4", name: "Meeting Room #3.4", imageSrc: "/room-photos/demo.webp" },
  { id: "3.3", name: "Meeting Room #3.3", imageSrc: "/room-photos/demo.webp" },
  { id: "3.2", name: "Meeting Room #3.2", imageSrc: "/room-photos/demo.webp" },
  { id: "3.1", name: "Meeting Room #3.1", imageSrc: "/room-photos/demo.webp" },
  { id: "301", name: "Lecture Room #301", imageSrc: "/room-photos/demo.webp" },
  { id: "303", name: "Lecture Room #303", imageSrc: "/room-photos/demo.webp" },
  { id: "304", name: "Lecture Room #304", imageSrc: "/room-photos/demo.webp" },
  { id: "305", name: "Lecture Room #305", imageSrc: "/room-photos/demo.webp" },
  { id: "312", name: "Lecture Room #312", imageSrc: "/room-photos/demo.webp" },
  { id: "313", name: "Lecture Room #313", imageSrc: "/room-photos/demo.webp" },
  { id: "314", name: "Lecture Room #314", imageSrc: "/room-photos/demo.webp" },
  { id: "318", name: "Lecture Room #318", imageSrc: "/room-photos/demo.webp" },
  { id: "320", name: "Lecture Room #320", imageSrc: "/room-photos/demo.webp" },
];
