export type MapRoomSVGData =
  & {
    center: { x: number; y: number };
  }
  & (
    | {
      polygon: {
        points: string;
      };
    }
    | {
      rect: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
    }
  );

export type RoomData<ID extends string = string> = {
  id: ID;
  name: string;
};

export type RoomsData = {
  [key in string]?: RoomData<key>;
};
