<script setup lang="ts">
import UniversityMap, {Room, RoomsPropIn} from "~/components/UniversityMap.vue";

const rooms = ref<RoomsPropIn>({
  "3.1": {
    class: "red"
  },
  "3.2": {
    class: "red"
  },
  "3.3": {
    class: "red"
  },
})

function handleRoomMouseEnter(room: Room) {
  rooms.value[room.id].class = "blue"
}

function handleRoomMouseLeave(room: Room) {
  rooms.value[room.id].class = "red"
}
</script>

<template>
  <UniversityMap
    :rooms="rooms"
    @room-mouse-enter="handleRoomMouseEnter"
    @room-mouse-leave="handleRoomMouseLeave"
  />
</template>

<style>
.red {
  fill: red;
}

.blue {
  fill: blue;
}
</style>
