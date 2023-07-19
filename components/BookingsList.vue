<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import IconLocation from "~icons/carbon/location";
import IconTime from "~icons/carbon/time";

const theme = useThemeVars();

export type BookingItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
};

defineProps<{
  error?: string;
  loading?: boolean;
  bookings: BookingItem[];
}>();

const emit = defineEmits<{
  (e: "cancel-booking", id: string): void;
}>();

const dialog = useDialog();

function handleCancelClick(id: string) {
  dialog.warning({
    title: "Cancel booking",
    content: "Are you sure you want to cancel the booking?",
    positiveText: "Confirm",
    negativeText: "Close",
    onPositiveClick: () => {
      emit("cancel-booking", id);
    },
  });
}
</script>

<template>
  <div class="my-bookings">
    <p v-if="error" class="my-bookings__error">
      {{ error }}
    </p>
    <NCard v-else-if="loading">
      <template #header>
        <n-skeleton text width="60%" />
      </template>
      <n-skeleton text :repeat="2" />
    </NCard>
    <p v-else-if="bookings.length === 0" class="my-bookings__empty">
      You have no active bookings
    </p>
    <NCard
      v-for="booking in bookings"
      :key="booking.id"
      closable
      class="my-bookings__item"
      :bordered="false"
      :title="booking.title"
      @close="handleCancelClick(booking.id)"
    >
      <div class="my-bookings__item__content">
        <div class="my-bookings__item__row">
          <IconTime class="my-bookings__item__row-icon" />
          <span>{{ formatDuration(booking.start, booking.end) }}</span>
        </div>
        <div class="my-bookings__item__row">
          <IconLocation class="my-bookings__item__row-icon" />
          <span>{{ booking.location }}</span>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.my-bookings {
  &__error,
  &__empty {
    padding: 30px;
    margin: 0;
    font-size: v-bind("theme.fontSizeSmall");
  }

  &__error {
    color: v-bind("theme.errorColor");
  }

  &__empty {
    color: v-bind("theme.textColorDisabled");
  }

  &__item {
    &:not(:last-child) {
      border-bottom: 1px solid v-bind("theme.dividerColor");
    }

    &__heading-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &__heading {
      margin: 0;
      font-size: v-bind("theme.fontSizeLarge");
      font-weight: v-bind("theme.fontWeightStrong");
      color: v-bind("theme.textColor1");
    }

    &__close {
      cursor: pointer;

      display: flex;
      align-items: center;

      padding: 0;

      font-size: 16px;
      color: v-bind("theme.closeIconColor");

      background: none;
      border: none;
      border-radius: v-bind("theme.borderRadiusSmall");

      &:hover {
        color: v-bind("theme.closeIconColorHover");
        background-color: v-bind("theme.closeColorHover");
      }

      &:active {
        color: v-bind("theme.closeIconColorPressed");
        background-color: v-bind("theme.closeColorPressed");
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 12px;

      font-size: v-bind("theme.fontSizeSmall");
    }

    &__row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    &__row-icon {
      font-size: 0.8125rem;
      color: v-bind("theme.primaryColor");
    }
  }
}
</style>
