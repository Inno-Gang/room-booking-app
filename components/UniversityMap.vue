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
  smoothScroll: boolean,
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
    polygonPoints: "286.83 1114.34 327 1067.16 383.45 1113.89 343.65 1161.83 286.83 1114.34",
    id: "3.1",
    nameEn: "Meeting room 3.1",
    nameRu: "Переговорка 3.1",
  },
  {
    polygonPoints: "645.25 921.45 700.85 968.32 658.5 1018.34 602.04 972.13 645.25 921.45",
    id: "3.2",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "668.62 659.94 710.85 610.42 768.66 658.09 726.42 708.25 668.62 659.94",
    id: "3.3",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "950.19 673.19 992.11 623.74 936.99 576.17 894.18 626.83 950.19 673.19",
    id: "3.4",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "558.8 1270.43 651.22 1347.01 597.93 1410.02 505.34 1333.04 558.8 1270.43",
    id: "320",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "630.55 1099.06 683.85 1035.46 818.69 1149 765.39 1212.03 630.55 1099.06",
    id: "318",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "683.85 1035.46 704.95 1010.86 756.07 1054.12 790.51 1013.55 874.04 1083.55 818.69 1149 683.85 1035.46",
    id: "317",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "790.51 1013.55 824.36 973.55 772.87 930.19 793.99 905.62 929.09 1018.46 874.04 1083.55 790.51 1013.55",
    id: "316",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "1004.53 189.21 945.47 258.71 1005.98 309.71 1064.78 239.63 1004.53 189.21",
    id: "309A",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "98.45 1020.79 103.73 1025.3 98.73 1030.96 196.38 1113.46 190.88 1119.85 211.87 1137.8 217.83 1131.5 247.73 1156.14 179.07 1237.36 29.53 1112.91 56.93 1081.41 59.23 1083.16 72.59 1067.27 65.12 1060.61 98.45 1020.79",
    id: "300",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "422.7 1302.7 452.26 1327.54 447.29 1333.07 468.47 1351.28 473.9 1345.26 572.54 1427.21 577.93 1421.04 583.54 1425.77 549.5 1465.12 542.09 1459.04 528.59 1474.39 530.75 1476.52 504.24 1507.84 354.12 1382.76 377.87 1354.43 378.64 1355.04 422.7 1302.7",
    id: "321",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "1117.68 524.45 1140.5 543.39 1146.26 536.44 1163.72 551.05 1160.3 555.03 1166.39 560.16 1168.75 557.84 1249.62 625.31 1247.33 628.04 1253.08 633.02 1205.93 688.7 1200.27 684.08 1195.54 689.31 1114.52 621.64 1122.34 612.68 1116.21 607.43 1108.34 616.56 1070.27 584.8 1087.62 564.72 1085.2 562.7 1117.68 524.45",
    id: "312",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "1066.71 584.74 1199.68 696.06 1150.86 753.78 1143.04 747.31 1137.85 753.23 1145.68 760.11 1095.82 819.07 1087.84 812.66 1086.15 814.56 960.69 709.94 1066.71 584.74",
    id: "313",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "959.31 711.76 1084.65 816.38 1082.77 818.52 1090.64 825.39 1040.58 884.24 1034.95 879.36 1030.22 884.66 949.4 817.13 955.02 810.73 949.26 805.66 946.07 808.91 905.82 774.98 959.31 711.76",
    id: "314",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "903.78 334.18 864.47 301.57 860.83 305.6 854.93 300.27 857.15 298 844.96 287.84 843.66 289.19 838.9 285.25 835.35 288.94 827.81 282.65 832.39 277.4 812.16 260.41 807.39 265.76 788.55 249.85 793.38 244.47 776.19 230.16 773.74 232.64 768.58 228.36 721.23 284.43 726.65 288.94 723.12 292.84 804.33 360.41 810.33 353.74 816.2 359.15 810.58 365.67 846.9 396 865.34 374.64 867.85 376.93 903.78 334.18",
    id: "308",
    nameEn: "123",
    nameRu: "123",
  },
  {
    polygonPoints: "716.08 290.42 848.34 400.22 739.42 528.38 700.37 495.72 704.23 491.56 698.46 486.62 694.6 490.6 613.33 423.08 616.71 419.28 611.45 414.57 716.08 290.42",
    id: "307",
    nameEn: "123",
    nameRu: "123",
  }] as const;

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
  if (map) {
    panzoom(map, {
      // TODO: add bounds, min/max zoom, etc.
      minZoom: props.zoomSettings.minZoom,
      maxZoom: props.zoomSettings.maxZoom,
      bounds: true,
      boundsPadding: props.zoomSettings.boundsPadding,
      smoothScroll: props.zoomSettings.smoothScroll,
      beforeWheel: function (e) {
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        return !e.altKey;
      },
    });
  }
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
    <g
      id="map"
      class="svg-g">
      <path id="floor" class="cls-2"
            d="M1774.97,36.68L1744.52,.5h-382.36l-30.69,36.18h-102.42L1198.46,.5l-239.25,.25L.71,1133.93l487.33,406.02L1368.31,499.13h85.38v38h61.64v-38h186.16v50.63h126.54v-52h511.41V36.68h-564.47ZM420,1254.63l-125.06-103.99,14.69-17.24,34.02,28.43,39.8-47.94-33.55-27.77,30.43-35.8,34.59,29.07,50.13-59.05,89.75,74.87-134.81,159.43Zm280.21-331.13l-21.74,25.96-33.22-28.01-43.21,50.69,34.15,27.95-50.7,59.8-124.91-104.32,162.78-192.17,89.74,74.9-47.39,56.15,34.51,29.06Zm269.45-319.13l-32.67-28.2-42.81,50.66,33.37,27.62-88.16,104.25-41.51-34.39-63.27,74.87-83.12-69.57,41.6-49.21,33.34,27.86,42.24-50.16-33.29-27.45,170.11-200.86,35.14,28.56,47.85-56.66,90.02,75.09-108.82,127.59Zm277.75-98.7c-25.23,8.41-60.02,7.1-81.99-11.92-18.04-15.62-143.21-119.78-143.21-119.78l62.92-74.92-41.24-34.5,17.14-20.43s79.75,67.35,106.98,89c.4,.32,.8,.63,1.2,.93,8.06,6.04,18.05,8.96,28.12,8.6,0,0,24.31-1.29,27.24-.97,46.04,5.11,77.25,44.22,77.25,83.44,0,45.83-29.28,72.18-54.39,80.55Zm191.6-319.59c-4.02,27.02-12.61,58.12-17.39,68.35-2.89,6.18-19.11,44.71-55.23,48.66-23.44,2.56-46.47-29.73-55.96-50.79-5.59-12.41-27.07-45.28-10.54-70.37,13.13-19.94,46.22-29.44,51.52-30.97,2.33-.67,66.7-19.04,79.13-10.74,8.46,5.65,12.66,17.73,8.47,45.87Zm468.87,116.55c-3.46,11.29-35.04,13.93-35.04,13.93,0,0-32.85,3.4-51.1,3.14-19.4-.28-38.26-.04-52.9-3.59-10.17-2.47-34.48-2.82-34.11-16.13,.38-13.37,18.31-25.37,22.27-28.56,21.66-17.46,38.77-25.66,64.17-25.16,20.6,.41,22.81,1.84,29.87,4.27,19.14,6.58,61.64,36.43,56.83,52.11Z"/>

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
</template>

<style scoped>
.svg-g {
  fill: #939598
}
</style>
