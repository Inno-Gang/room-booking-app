<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import panzoom, { PanZoom } from "panzoom";
import { State } from "~/components/UniversityMapRoom.vue";

const theme = useThemeVars();

export type ZoomSettings = {
  minZoom: number;
  maxZoom: number;
  boundsPadding: number;
  smoothScroll: boolean;
};

export type RoomStates = {
  [key in string]?: {
    hovered?: boolean;
    state?: State;
  };
};

const props = defineProps<{
  focusedRoomId?: string;
  roomStates: RoomStates;
  zoomSettings: ZoomSettings;
}>();

const emit = defineEmits<{
  (e: "roomMouseEnter", roomId: string): void;
  (e: "roomMouseLeave", roomId: string): void;
  (e: "roomMouseClick", roomId: string): void;
}>();

const roomCenters: Record<string, { x: number; y: number }> = {
  "3.5": { x: 1484.51, y: 503.28 },
  "3.4": { x: 943.14, y: 624.68 },
  "3.3": { x: 718.64, y: 659.34 },
  "3.2": { x: 651.44, y: 969.89 },
  "3.1": { x: 335.14, y: 1114.49 },
  "320": { x: 578.28, y: 1340.22 },
  "318": { x: 722.62, y: 1125.74 },
  "314": { x: 999.31, y: 798.87 },
  "313": { x: 1078.57, y: 701.15 },
  "312": { x: 1162.97, y: 605.39 },
  "305": { x: 481.42, y: 700.82 },
  "304": { x: 426.89, y: 765.33 },
  "303": { x: 370.55, y: 831.62 },
  "301": { x: 183.84, y: 1011.03 },
};

const rooms = [
  {
    id: "3.5",
    props: {
      svgData: {
        rect: {
          x: 1453.69,
          y: 469.42,
          width: 61.64,
          height: 67.71,
        },
      },
    },
  },
  {
    id: "3.4",
    props: {
      svgData: {
        polygon: {
          points:
            "950.19 673.19 992.11 623.74 936.99 576.17 894.18 626.83 950.19 673.19",
        },
      },
    },
  },
  {
    id: "3.3",
    props: {
      svgData: {
        polygon: {
          points:
            "668.62 659.94 710.85 610.42 768.66 658.09 726.42 708.25 668.62 659.94",
        },
      },
    },
  },
  {
    id: "3.2",
    props: {
      svgData: {
        polygon: {
          points:
            "645.25 921.45 700.85 968.32 658.5 1018.34 602.04 972.13 645.25 921.45",
        },
      },
    },
  },
  {
    id: "3.1",
    props: {
      svgData: {
        polygon: {
          points:
            "286.83 1114.34 327 1067.16 383.45 1113.89 343.65 1161.83 286.83 1114.34",
        },
      },
    },
  },
  {
    id: "320",
    props: {
      svgData: {
        polygon: {
          points:
            "558.8 1270.43 651.22 1347.01 597.93 1410.02 505.34 1333.04 558.8 1270.43",
        },
      },
    },
  },
  {
    id: "318",
    props: {
      svgData: {
        polygon: {
          points:
            "630.55 1099.06 683.85 1035.46 818.69 1149 765.39 1212.03 630.55 1099.06",
        },
      },
    },
  },
  {
    id: "314",
    props: {
      svgData: {
        polygon: {
          points:
            "904.36 775.37 959.68 709.96 1094.25 823.18 1039.62 887.78 904.36 775.37",
        },
      },
    },
  },
  {
    id: "313",
    props: {
      svgData: {
        polygon: {
          points:
            "1066.38 583.11 959.46 710.21 1094.25 823.18 1201.67 696.17 1066.38 583.11",
        },
      },
    },
  },
  {
    id: "312",
    props: {
      svgData: {
        polygon: {
          points:
            "1201.67 696.17 1259.57 627.71 1124.39 514.6 1066.38 583.11 1201.67 696.17",
        },
      },
    },
  },
  {
    id: "305",
    props: {
      svgData: {
        polygon: {
          points:
            "521.63 788.68 575.59 724.72 441.37 612.97 387.25 676.95 521.63 788.68",
        },
      },
    },
  },
  {
    id: "304",
    props: {
      svgData: {
        polygon: {
          points:
            "466.12 853.71 521.63 788.68 387.25 676.95 332.15 742.08 466.12 853.71",
        },
      },
    },
  },
  {
    id: "303",
    props: {
      svgData: {
        polygon: {
          points:
            "466.12 853.71 332.15 742.08 274.98 809.68 409.03 921.16 466.12 853.71",
        },
      },
    },
  },
  {
    id: "301",
    props: {
      svgData: {
        polygon: {
          points:
            "203.08 1082.33 257.9 1017.35 164.98 939.73 109.79 1004.97 203.08 1082.33",
        },
      },
    },
  },
];

const mapSvgEl = ref<SVGElement | null>(null);
const panZoom = ref<PanZoom | null>(null);

onMounted(() => {
  const map = mapSvgEl.value;
  if (map) {
    panZoom.value = panzoom(map, {
      minZoom: props.zoomSettings.minZoom,
      maxZoom: props.zoomSettings.maxZoom,
      bounds: true,
      boundsPadding: props.zoomSettings.boundsPadding,
      smoothScroll: props.zoomSettings.smoothScroll,
    });
  }
});

function handleRoomMouseEnter(roomId: string) {
  emit("roomMouseEnter", roomId);
}
function handleRoomMouseLeave(roomId: string) {
  emit("roomMouseLeave", roomId);
}
function handleRoomMouseClick(roomId: string) {
  emit("roomMouseClick", roomId);
}
</script>

<template>
  <svg
    ref="mapSvgEl"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2339.94 1540.66"
    class="university-map"
  >
    <g>
      <path
        class="university-map__floor"
        d="M1774.97,36.68L1744.52,.5h-382.36l-30.69,36.18h-102.42L1198.46,.5l-239.25,.25L.71,1133.93l487.33,406.02L1368.31,499.13h85.38v38h61.64v-38h186.16v50.63h126.54v-52h511.41V36.68h-564.47ZM420,1254.63l-125.06-103.99,14.69-17.24,34.02,28.43,39.8-47.94-33.55-27.77,30.43-35.8,34.59,29.07,50.13-59.05,89.75,74.87-134.81,159.43Zm280.21-331.13l-21.74,25.96-33.22-28.01-43.21,50.69,34.15,27.95-50.7,59.8-124.91-104.32,162.78-192.17,89.74,74.9-47.39,56.15,34.51,29.06Zm269.45-319.13l-32.67-28.2-42.81,50.66,33.37,27.62-88.16,104.25-41.51-34.39-63.27,74.87-83.12-69.57,41.6-49.21,33.34,27.86,42.24-50.16-33.29-27.45,170.11-200.86,35.14,28.56,47.85-56.66,90.02,75.09-108.82,127.59Zm277.75-98.7c-25.23,8.41-60.02,7.1-81.99-11.92-18.04-15.62-143.21-119.78-143.21-119.78l62.92-74.92-41.24-34.5,17.14-20.43s79.75,67.35,106.98,89c.4,.32,.8,.63,1.2,.93,8.06,6.04,18.05,8.96,28.12,8.6,0,0,24.31-1.29,27.24-.97,46.04,5.11,77.25,44.22,77.25,83.44,0,45.83-29.28,72.18-54.39,80.55Zm191.6-319.59c-4.02,27.02-12.61,58.12-17.39,68.35-2.89,6.18-19.11,44.71-55.23,48.66-23.44,2.56-46.47-29.73-55.96-50.79-5.59-12.41-27.07-45.28-10.54-70.37,13.13-19.94,46.22-29.44,51.52-30.97,2.33-.67,66.7-19.04,79.13-10.74,8.46,5.65,12.66,17.73,8.47,45.87Zm468.87,116.55c-3.46,11.29-35.04,13.93-35.04,13.93,0,0-32.85,3.4-51.1,3.14-19.4-.28-38.26-.04-52.9-3.59-10.17-2.47-34.48-2.82-34.11-16.13,.38-13.37,18.31-25.37,22.27-28.56,21.66-17.46,38.77-25.66,64.17-25.16,20.6,.41,22.81,1.84,29.87,4.27,19.14,6.58,61.64,36.43,56.83,52.11Z"
      />
      <UniversityMapRoom
        v-for="room in rooms"
        :key="room.id"
        :svg-data="room.props.svgData"
        :hovered="roomStates[room.id]?.hovered"
        :state="roomStates[room.id]?.state ?? 'available'"
        class="university-map__room"
        @on-mouse-enter="handleRoomMouseEnter(room.id)"
        @on-mouse-leave="handleRoomMouseLeave(room.id)"
        @on-mouse-click="handleRoomMouseClick(room.id)"
      />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.university-map {
  stroke: v-bind("theme.borderColor");
  stroke-width: 2px;

  &__floor {
    fill: #999;
  }
}
</style>
