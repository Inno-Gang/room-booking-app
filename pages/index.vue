<script lang="ts" setup>
import { useNow } from "@vueuse/core";

const title = ref("");
const disabled = computed(() => {
  return title.value.length === 0;
});

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
  <div class="sidebar">
    <div class="plate time-plate">
      <span class="time-plate__time">{{ time }}</span>
      <div class="time-plate__date-container">
        <span class="time-plate__date">{{ fullDate }}</span>
        <span class="time-plate__timezone">Moscow Time, UTC+3</span>
      </div>
    </div>
    <div class="plate">
      <div class="booking-plate__header">
        <span class="booking-plate__section-item active">New booking</span>
        <span class="booking-plate__section-item">My bookings</span>
      </div>
      <div class="booking-plate__body">
        <SquareInput v-model="title" placeholder="Title"/>
        <SquareButton :disabled="disabled" class="book-btn">Book the room</SquareButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

$borders-color: #D4D4D4;
$plates-spacing: 16px;
$color-secondary: #AAAAAA;
$content-spacing: 20px;
$active-section: #40BA21;

.sidebar {
  position: sticky;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;

  overflow-x: hidden;
  overflow-y: auto;
  display: inline-flex;
  flex-direction: column;

  height: 100%;
  padding: 48px;

  background-color: transparent;
}

.plate {
  width: 410px;
  border: 1px solid $borders-color;
  border-radius: 4px;
}

.plate:not(:last-child) {
  margin-bottom: $plates-spacing;
}

.booking-plate__header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid $borders-color;
}

.booking-plate__section-item {
  position: relative;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 1.25rem;

  &.active::after {
    content: "";

    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    display: block;

    width: 100%;
    height: 2px;

    background-color: $active-section;
  }
}

.booking-plate__body {
  display: flex;
  flex-direction: column;
  padding: 30px;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
}

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
