<script lang="ts" setup>
import TimePlate from "~/components/TimePlate.vue";

const route = useRoute();
const tab = computed<"new-booking" | "my-bookings">(() => {
  if (route.query["tab"] === "my-bookings") {
    return "my-bookings";
  }
  return "new-booking";
});

const title = ref("");
const canSubmit = computed(() => {
  return title.value.length === 0;
});

function handleSubmit() {
  window.alert(`New booking: ${title.value}`);
}
</script>

<template>
  <div class="sidebar">
    <TimePlate/>
    <Plate>
      <div class="booking-plate__header">
        <NuxtLink
          :class="{
            'booking-plate__section-item': true,
            'active': tab === 'new-booking',
          }"
          :to="{ path: '/', query: { tab: 'new-booking' } }"
        >
          New booking
        </NuxtLink>
        <NuxtLink
          :class="{
            'booking-plate__section-item': true,
            'active': tab === 'my-bookings',
          }"
          :to="{ path: '/', query: { tab: 'my-bookings' } }"
        >
          My bookings
        </NuxtLink>
      </div>
      <MyBookings
        v-if="tab === 'my-bookings'"
        class="booking-plate__body"
      />
      <NewBookingForm
        v-else
        class="booking-plate__body"
        :disabled="canSubmit"
        v-model:title="title"
        @submit.prevent="handleSubmit"
      />
    </Plate>
  </div>
</template>

<style lang="scss" scoped>
$borders-color: #D4D4D4;
$plates-spacing: 16px;
$content-spacing: 20px;
$active-section: #40BA21;
$plates-width: 410px;

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

  width: $plates-width + (48px * 2);
  height: 100%;
  padding: 48px;

  background-color: transparent;

  & > *:not(:last-child) {
    margin-bottom: $plates-spacing;
  }
}

.booking-plate__header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid $borders-color;
}

.booking-plate__body {
  padding: 30px;
}

.booking-plate__section-item {
  position: relative;

  padding-top: 16px;
  padding-bottom: 16px;

  font-size: 1.25rem;
  color: inherit;
  text-decoration: inherit;

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
</style>
