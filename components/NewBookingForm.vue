<script lang="ts" setup>
import { maskitoTimeOptionsGenerator } from "@maskito/kit";

const MASKITO_TIME_INPUT_OPTIONS = maskitoTimeOptionsGenerator({
  mode: "HH:MM",
});
const FULL_TIME_REGEXP = /^(\d\d):(\d\d)$/;

const props = defineProps<{
  canSubmit: boolean;
  loading: boolean;
  title: string;
  startDate: Date;
  endDate: Date;
  roomId: string | null;
  availableRooms: { id: string; name: string }[];
  availableRoomsLoading: boolean;
}>();
const emit = defineEmits<{
  (e: "update:title", newTitle: string): void;
  (e: "update:roomId", newRoomId: string | null): void;
  (e: "update:startDate", newStartDate: Date): void;
  (e: "update:endDate", newEndDate: Date): void;
}>();

const startDateTimestamp = ref(props.startDate.getTime());
const endDateTimestamp = ref(props.endDate.getTime());

const startTimeRawValue = ref("");
const endTimeRawValue = ref("");

// Sync `startDateTimestamp` and `startTimeRawValue` with `startDate` prop
watch(
  () => props.startDate,
  (newStartDate) => {
    startDateTimestamp.value = newStartDate.getTime();
    const hh = newStartDate.getHours().toString().padStart(2, "0");
    const mm = newStartDate.getMinutes().toString().padStart(2, "0");
    startTimeRawValue.value = `${hh}:${mm}`;
  },
  { immediate: true }
);

// Sync `endDateTimestamp` and `endTimeRawValue` with `endDate` prop
watch(
  () => props.endDate,
  (newEndDate) => {
    endDateTimestamp.value = newEndDate.getTime();
    const hh = newEndDate.getHours().toString().padStart(2, "0");
    const mm = newEndDate.getMinutes().toString().padStart(2, "0");
    endTimeRawValue.value = `${hh}:${mm}`;
  },
  { immediate: true }
);

const roomOptions = computed(() => {
  return props.availableRooms.map((room) => ({
    value: room.id,
    label: room.name,
  }));
});

function handleStartDateUpdate(timestamp: number) {
  const pickedDate = new Date(timestamp);
  pickedDate.setHours(props.startDate.getHours());
  pickedDate.setMinutes(props.startDate.getMinutes());
  emit("update:startDate", pickedDate);
}

function parseTimeFromRawString(raw: string): null | [number, number] {
  const fullTimeMatch = raw.match(FULL_TIME_REGEXP);
  if (!fullTimeMatch) {
    return null;
  }

  const [, hoursStr, minutesStr] = fullTimeMatch;
  let hours = parseInt(hoursStr, 10);
  let minutes = parseInt(minutesStr, 10);

  if (hours < 0) {
    hours = 0;
  } else if (hours > 23) {
    hours = 23;
  }
  if (minutes < 0) {
    minutes = 0;
  } else if (minutes > 59) {
    minutes = 59;
  }

  return [hours, minutes];
}

function handleStartTimeUpdate(value: string) {
  const parsedTime = parseTimeFromRawString(value);
  if (!parsedTime) {
    startTimeRawValue.value = value;
    return;
  }
  const [hours, minutes] = parsedTime;
  const updatedDate = new Date(props.startDate.getTime());
  updatedDate.setHours(hours);
  updatedDate.setMinutes(minutes);
  emit("update:startDate", updatedDate);
}

function handleEndTimeUpdate(value: string) {
  const parsedTime = parseTimeFromRawString(value);
  if (!parsedTime) {
    endTimeRawValue.value = value;
    return;
  }
  const [hours, minutes] = parsedTime;
  const updatedDate = new Date(props.endDate.getTime());
  updatedDate.setHours(hours);
  updatedDate.setMinutes(minutes);
  emit("update:endDate", updatedDate);
}

function handleRoomUpdate(optionValue: string) {
  emit("update:roomId", optionValue);
}
</script>

<template>
  <form class="new-booking-form">
    <NInput
      placeholder="Title"
      :input-props="{ name: 'title' }"
      v-bind:value="title"
      v-on:update:value="$emit('update:title', $event)"
    />
    <NDatePicker
      placeholder="Date"
      format="dd/MM/yyyy"
      type="date"
      :value="startDateTimestamp"
      @update:value="handleStartDateUpdate"
    />
    <NInputGroup class="new-booking-form__time-inputs-container">
      <NInput
        placeholder="hh:mm"
        :value="startTimeRawValue"
        @update:value="handleStartTimeUpdate"
        v-maskito="MASKITO_TIME_INPUT_OPTIONS"
      />
      <NInputGroupLabel>—</NInputGroupLabel>
      <NInput
        placeholder="hh:mm"
        :value="endTimeRawValue"
        @update:value="handleEndTimeUpdate"
        v-maskito="MASKITO_TIME_INPUT_OPTIONS"
      />
    </NInputGroup>
    <NSelect
      placeholder="Room"
      filterable
      clearable
      :options="roomOptions"
      :loading="availableRoomsLoading"
      :value="roomId"
      @update:value="handleRoomUpdate"
    />
    <NButton
      :loading="loading"
      :disabled="loading || !canSubmit"
      attr-type="submit"
      type="primary"
      ghost
      >Book the room</NButton
    >
  </form>
</template>

<style lang="scss" scoped>
.new-booking-form {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  &__time-inputs-container {
    text-align: center;
  }
}
</style>
