<script lang="ts" setup>
import { useNow } from "@vueuse/core";

const now = useNow();
const time = computed(() => {
  return now.value.toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
});
const fullDate = computed(() => {
  return now.value.toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});
</script>

<template>
  <Plate class="time-plate">
    <span class="time-plate__time">{{ time }}</span>
    <div class="time-plate__date-container">
      <span class="time-plate__date">{{ fullDate }}</span>
      <span class="time-plate__timezone">Moscow Time, UTC+3</span>
    </div>
  </Plate>
</template>

<style lang="scss" scoped>
$color-secondary: #AAAAAA;

.time-plate {
  display: flex;
  padding: 16px 36px;
}

.time-plate__time {
  margin-right: 30px;
  font-family: var(--font-mono);
  font-size: 3rem;
}

.time-plate__date-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.time-plate__date {
  white-space: nowrap;
}

.time-plate__timezone {
  color: $color-secondary;
}
</style>
