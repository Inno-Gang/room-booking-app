<template>
  <div class="plate">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
$borders-color: #D4D4D4;

.plate {
  border: 1px solid $borders-color;
  border-radius: 4px;
}

</style>
