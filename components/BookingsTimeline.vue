<script setup lang="ts">

import useElementMove from "~/composables/useElementMove";
import useCursor from "~/composables/usePointer";

const props = defineProps<{
  start: Date,
  end: Date,
  selectedTime?: Date,
}>()

const MILLISECONDS_IN_5_MINUTES = 1000 * 60 * 5
const containerEl = ref<HTMLElement | null>(null)

const timeTicks = computed(() => {
  const ticks = [];
  let currentTime = props.start.getTime();
  while (currentTime < props.end.getTime()) {
    ticks.push(currentTime);
    currentTime += MILLISECONDS_IN_5_MINUTES;
  }
  return ticks;
})

const {isMoving, totalDeltaX} = useElementMove(containerEl)
const cursor = computed(() => isMoving.value ? 'grabbing' : null)
useCursor(cursor)
</script>

<template>
  <div
    ref="containerEl"
    :class="{'timeline-container': true, 'dragging': isMoving}"
  >
    <span class="timeline-main-tick"/>
    <div
      class="ticks-container"
      :style="{ transform: 'translateX(' + totalDeltaX + 'px)' }"
    >
      <span
        v-for="tick in timeTicks"
        :key="tick"
        class="timeline-tick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline-container {
  position: relative;
  display: flex;
  padding: 12px 4px 4px;

  &:hover {
    cursor: grab;
  }

  &.dragging:hover {
    cursor: grabbing;
  }
}

.ticks-container {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.timeline-tick {
  width: 1px;
  height: 12px;
  background-color: #c0c0c0;
}

.timeline-main-tick {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 1px;
  height: 18px;

  background-color: #FF724B;
}
</style>
