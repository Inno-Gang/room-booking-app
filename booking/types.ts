export type Room = {
  name: string;
  id: string;
  type: "MEETING_ROOM" | "LECTURE_ROOM";
  capacity: number;
  isBookable: boolean;
};

export type Booking = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  room: Room;
  ownerEmail: string;
};
