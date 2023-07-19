<script setup lang="ts">
import UniversityMap, {
  ZoomSettings,
  RoomStates,
} from "~/components/UniversityMap.vue";

const emit = defineEmits<{
  (e: "room-click", roomId: string): void;
}>();

const props = defineProps<{
  focusedRoomId?: string;
}>();

const roomStates = ref<RoomStates>({
  "3.5": { state: "available", hovered: false },
  "3.4": { state: "available", hovered: false },
  "3.3": { state: "available", hovered: false },
  "3.2": { state: "available", hovered: false },
  "3.1": { state: "available", hovered: false },
  "301": { state: "available", hovered: false },
  "303": { state: "available", hovered: false },
  "304": { state: "available", hovered: false },
  "305": { state: "available", hovered: false },
  "312": { state: "available", hovered: false },
  "313": { state: "available", hovered: false },
  "314": { state: "available", hovered: false },
  "318": { state: "available", hovered: false },
  "320": { state: "available", hovered: false },
});

const zoomSettings = ref<ZoomSettings>({
  minZoom: 0.5, // relative to size of element
  maxZoom: 3, // relative to size of element
  boundsPadding: 0.3, // relative to size of element
  smoothScroll: false,
});

function handleRoomMouseEnter(roomId: string) {
  roomStates.value[roomId] = {
    ...roomStates.value[roomId],
    hovered: true,
  };
}

function handleRoomMouseLeave(roomId: string) {
  roomStates.value[roomId] = {
    ...roomStates.value[roomId],
    hovered: false,
  };
}

function handleRoomMouseClick(roomId: string) {
  emit("room-click", roomId);
}
</script>

<template>
  <div class="bookings-map">
    <UniversityMap
      class="bookings-map__map"
      :room-states="roomStates"
      :zoom-settings="zoomSettings"
      :focused-room-id="focusedRoomId"
      @room-mouse-enter="handleRoomMouseEnter"
      @room-mouse-leave="handleRoomMouseLeave"
      @room-mouse-click="handleRoomMouseClick"
    />
  </div>
</template>

<style scoped lang="scss">
.bookings-map {
  overflow: hidden;
  position: relative;

  &__map {
    position: absolute;
  }
}
</style>
