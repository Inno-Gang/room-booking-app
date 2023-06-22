<script lang="ts" setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement>();

function handleInputClick() {
  inputRef.value?.focus();
}
</script>

<template>
  <div class="container" @click="handleInputClick">
    <input
      ref="inputRef"
      :value="modelValue"
      class="input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<style lang="scss" scoped>

$placeholder-color: #AAAAAA;
$border-color: #D4D4D4;
$font-size: 1.25rem;

.container {
  padding: 16px 20px;
  font-size: $font-size;
  border: 1px solid $border-color;

  &:hover {
    cursor: text;
  }
}

.input {
  width: 100%;
  margin: 0;
  padding: 0;

  font-size: $font-size;

  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;

  &::placeholder {
    color: $placeholder-color;
  }
}
</style>
