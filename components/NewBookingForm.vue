<script lang="ts" setup>
defineProps({
  title: String,
  disabled: Boolean,
});
defineEmits(["update:title"]);
</script>

<template>
  <form class="new-booking-form">
    <SquareInput
      :model-value="title"
      placeholder="Title"
      @update:model-value="(val) => $emit('update:title', val)"
    />
    <SquareButton
      :disabled="disabled"
      class="book-btn"
      type="submit"
    >
      Book the room
    </SquareButton>
  </form>
</template>

<style lang="scss" scoped>
.new-booking-form {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
