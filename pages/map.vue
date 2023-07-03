<script setup lang="ts">
import UniversityMap, { Room, RoomsPropIn, ZoomSettings } from "~/components/UniversityMap.vue";

const rooms = ref<RoomsPropIn>({
  "3.1": { class: "room" },
  "3.2": { class: "room" },
  "3.3": { class: "room" },
  "3.4": { class: "room" },
  "320": { class: "room" },
  "318": { class: "room" },
  "317": { class: "room" },
  "316": { class: "room" },
  "309A": { class: "room" },
  "300": { class: "room" },
  "321": { class: "room" },
  "312": { class: "room" },
  "313": { class: "room" },
  "314": { class: "room" },
  "308": { class: "room" },
  "307": { class: "room" },
});

const zoomSettings = ref<ZoomSettings>({
  minZoom: 0.5,      // relative to size of element
  maxZoom: 2,        // relative to size of element
  boundsPadding: 0.3, // relative to size of element
  smoothScroll: false,
});


function handleRoomMouseEnter(room: Room) {
  rooms.value[room.id].class = "enter";
}

function handleRoomMouseLeave(room: Room) {
  rooms.value[room.id].class = "leave";
}

function handleRoomMouseClick(room: Room) {
  alert(room.id);
}

</script>

<template>
  <UniversityMap
    :rooms="rooms"
    :zoom-settings="zoomSettings"
    @room-mouse-enter="handleRoomMouseEnter"
    @room-mouse-leave="handleRoomMouseLeave"
    @room-mouse-click="handleRoomMouseClick"
  />
</template>

<style>
.room {
  fill: #C0DFCA
}

.leave {
  fill: #C0DFCA;
}

.enter {
  cursor: pointer;
  fill: #6ACD8A;
}
</style>
