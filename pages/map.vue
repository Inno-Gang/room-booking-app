<script setup lang="ts">
import UniversityMap, { Room, RoomsPropIn, ZoomSettings } from "~/components/UniversityMap.vue";

const rooms = ref<RoomsPropIn>({
  "3.1": {
    class: "room",
  },
  "3.2": {
    class: "room",
  },
  "3.3": {
    class: "room",
  },
});

const zoomSettings = ref<ZoomSettings>({
  minZoom: 0.5,       // relative to size of element
  maxZoom: 2,         // relative to size of element
  boundsPadding: 0.3, // relative to size of element
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
  fill: #6ACD8A;
}
</style>
