<script lang="ts" setup>
import { useThemeVars } from "naive-ui";

const theme = useThemeVars();

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
  <div class="time-info">
    <span class="time-info__time">{{ time }}</span>
    <div class="time-info__date-container">
      <span class="time-info__date">{{ fullDate }}</span>
      <span class="time-info__timezone">Moscow Time, UTC+3</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-secondary: #aaaaaa;

.time-info {
  display: flex;

  &__time {
    margin-right: 24px;
    font-family: v-bind("theme.fontFamilyMono");
    font-size: 2.125rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  &__date-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  &__date {
    font-size: 1rem;
    white-space: nowrap;
  }

  &__timezone {
    font-size: v-bind("theme.fontSizeTiny");
    color: v-bind("theme.textColorDisabled");
  }
}
</style>
