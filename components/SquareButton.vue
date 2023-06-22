<template>
  <button class="btn" v-bind="$attrs">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
$text-normal-color: #ffffff;
$bg-normal-color: #40BA21;
$bg-hover-color: #369c1c;
$text-disabled-color: #aaaaaa;
$bg-disabled-color: #eeeeee;


.btn {
  cursor: pointer;

  padding: 16px 20px;

  font-size: 1.325rem;
  font-weight: 400;
  line-height: 1.5;
  color: $text-normal-color;

  background-color: $bg-normal-color;
  border: none;
  border-radius: 0;
  outline: none;
  box-shadow: none;

  transition-timing-function: ease;
  transition-duration: 0.5s;
  transition-property: background-color;

  &:disabled {
    cursor: not-allowed;
    color: $text-disabled-color;
    background-color: $bg-disabled-color;
    transition-duration: unset;
  }

  &:not(:disabled):hover {
    background-color: $bg-hover-color;
    transition-duration: 0.2s;
  }
}
</style>
