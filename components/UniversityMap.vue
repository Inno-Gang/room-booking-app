<script setup lang="ts">
import panzoom from "panzoom";

/* Types */

export type RoomsPropIn = {
  [id in RoomId]: RoomPropIn
}

export type RoomPropIn = {
  class: string,
}

export type RoomPropOut = {
  id: RoomId,
  class: string,
  polygonPoints: string,
}

export type Room = {
  id: string
  nameEn: string,
  nameRu: string,
}

type RoomId = typeof roomsData[number]["id"]

export type RoomData<ID extends string = string> = {
  id: ID,
  polygonPoints: string,
  nameEn: string,
  nameRu: string,
}

export type ZoomSettings = {
  minZoom: number,
  maxZoom: number,
  boundsPadding: number,
}

const props = defineProps<{
  rooms: RoomsPropIn,
  zoomSettings: ZoomSettings,
}>();

const emit = defineEmits<{
  (e: "roomMouseEnter", room: Room): void,
  (e: "roomMouseLeave", room: Room): void,
  (e: "roomMouseClick", room: Room): void,
}>();

/**
 * Rooms data.
 *
 * Items must be of type RoomData
 * Note: explicit typing will "break" `as const`
 */
const roomsData = [
  {
    id: "3.1",
    polygonPoints: "286.83 1114.34 327 1067.16 383.45 1113.89 343.65 1161.83 286.83 1114.34",
    nameEn: "Meeting room 3.1",
    nameRu: "Переговорка 3.1",
  },
  {
    id: "3.2",
    polygonPoints: "645.25 921.45 700.85 968.32 658.5 1018.34 602.04 972.13 645.25 921.45",
    nameEn: "Meeting room 3.2",
    nameRu: "Переговорка 3.2",
  },
  {
    id: "3.3",
    polygonPoints: "668.62 659.94 710.85 610.42 768.66 658.09 726.42 708.25 668.62 659.94",
    nameEn: "Meeting room 3.3",
    nameRu: "Переговорка 3.3",
  },
] as const;

const roomsDataMap = new Map<RoomId, Room>(roomsData.map((r) => [r.id, {
  id: r.id,
  nameEn: r.nameEn,
  nameRu: r.nameRu,
}]));

const mapSvgEl = ref<SVGElement | null>(null);

const rooms = computed(() => {
  return roomsData.map((roomData) => {
    const outPropData: RoomPropOut = {
      id: roomData.id,
      polygonPoints: roomData.polygonPoints,
      class: "",
    };
    const inPropData = props.rooms[roomData.id] ?? null;
    if (inPropData) {
      outPropData.class = inPropData.class;
    }
    return outPropData;
  });
});

onMounted(() => {
  const map = mapSvgEl.value;
  let zoom;
  if (map) {
    zoom = panzoom(map, {
      // TODO: add bounds, min/max zoom, etc.
      minZoom: props.zoomSettings.minZoom,
      maxZoom: props.zoomSettings.maxZoom,
      bounds: true,
      boundsPadding: props.zoomSettings.boundsPadding,
    });
  }
  const div = document.getElementById("test");
  for (let i = 0; i < roomsData.length; i++) {
    div?.children.item(0)?.insertAdjacentHTML("afterend", "<div style='position: absolute' id='info-" + roomsData[i].id + "'>" + roomsData[i].id + "</div>");
  }
  zoom.on("transform", function() {
    for (let i = 0; i < roomsData.length; i++) {
      let offsetX, offsetY;
      const roomDiv = document.getElementById("info-" + roomsData[i].id);
      if (div) {
        div.style["left"] = String(map?.getBoundingClientRect().left)
        div.style["top"] = String(map?.getBoundingClientRect().top)
        offsetX = (div.getBoundingClientRect().left - div.getBoundingClientRect().right) / 2;
        offsetY = (div.getBoundingClientRect().top - div.getBoundingClientRect().bottom) / 2;
        console.log(offsetX, offsetY);
      }
      if (roomDiv) {
        const room = document.getElementById(roomsData[i].id);
        const x = (room?.getBoundingClientRect().left + room?.getBoundingClientRect().right) / 2;
        const y = (room?.getBoundingClientRect().top + room?.getBoundingClientRect().bottom) / 2;
        roomDiv.style["left"] = (x + offsetX).toString() + "px";
        roomDiv.style["top"] = (y + offsetY).toString() + "px";
      }
    }
  });
});

function handleRoomMouseEnter(id: RoomId) {
  emit("roomMouseEnter", roomsDataMap.get(id)!);
}

function handleRoomMouseLeave(id: RoomId) {
  emit("roomMouseLeave", roomsDataMap.get(id)!);
}

function handleRoomMouseClick(id: RoomId) {
  emit("roomMouseClick", roomsDataMap.get(id)!);
}

</script>

<template>
  <svg ref="mapSvgEl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2339.94 1540.66">
    <g id="map" class="svg-g">
      <path
        id="floor"
        class="cls-2"
        d="M1774.97,36.68L1744.52,.5h-382.36l-30.69,36.18h-102.42L1198.46,.5l-239.25,.25L.71,1133.93l487.33,406.02L1368.31,499.13h85.38v38h61.64v-38h186.16v50.63h126.54v-52h511.41V36.68h-564.47ZM420,1254.63l-125.06-103.99,14.69-17.24,34.02,28.43,39.8-47.94-33.55-27.77,30.43-35.8,34.59,29.07,50.13-59.05,89.75,74.87-134.81,159.43Zm280.21-331.13l-21.74,25.96-33.22-28.01-43.21,50.69,34.15,27.95-50.7,59.8-124.91-104.32,162.78-192.17,89.74,74.9-47.39,56.15,34.51,29.06Zm269.45-319.13l-32.67-28.2-42.81,50.66,33.37,27.62-88.16,104.25-41.51-34.39-63.27,74.87-83.12-69.57,41.6-49.21,33.34,27.86,42.24-50.16-33.29-27.45,170.11-200.86,35.14,28.56,47.85-56.66,90.02,75.09-108.82,127.59Zm469.34-418.29c-4.02,27.02-12.61,58.12-17.39,68.35-2.89,6.18-19.11,44.71-55.23,48.66-23.44,2.56-46.47-29.73-55.96-50.79-5.59-12.41-27.07-45.28-10.54-70.37,13.13-19.94,46.22-29.44,51.52-30.97,2.33-.67,66.7-19.04,79.13-10.74,8.46,5.65,12.66,17.73,8.47,45.87Zm468.87,116.55c-3.46,11.29-35.04,13.93-35.04,13.93,0,0-32.85,3.4-51.1,3.14-19.4-.28-38.26-.04-52.9-3.59-10.17-2.47-34.48-2.82-34.11-16.13,.38-13.37,18.31-25.37,22.27-28.56,21.66-17.46,38.77-25.66,64.17-25.16,20.6,.41,22.81,1.84,29.87,4.27,19.14,6.58,61.64,36.43,56.83,52.11Z"
      />
      <MapRoom
        v-for="room in rooms"
        :polygon-points="room.polygonPoints"
        :id="room.id"
        :class="room.class"
        :key="room.id"
        @on-mouse-enter="handleRoomMouseEnter"
        @on-mouse-leave="handleRoomMouseLeave"
        @on-mouse-click="handleRoomMouseClick"
      />
    </g>
  </svg>

  <div id="test" style="position: absolute">
    <div>
      3.3
    </div>
  </div>

</template>

<style scoped>
.svg-g {
  fill: #939598
}
</style>
