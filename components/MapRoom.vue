<script setup lang="ts">
import {useEventListener} from "@vueuse/core";

const props = defineProps<{
  polygonPoints: string,
  id: string,
  class: string,
}>()

const emit = defineEmits<{
  (e: "onMouseEnter", id: string): void
  (e: "onMouseLeave", id: string): void
}>()

onMounted(() => {
  // Using Vue's template refs (https://vuejs.org/guide/essentials/template-refs.html)
  // don't work with polygon element for some reason, so use it like this.
  const polygonEl = document.getElementById(props.id)

  useEventListener(polygonEl, "mouseenter", () => {
    emit("onMouseEnter", props.id)
  })
  useEventListener(polygonEl, "mouseleave", () => {
    emit("onMouseLeave", props.id)
  })
})
</script>

<template>
  <polygon
    :points="$props.polygonPoints"
    :class="$props.class"
    :id="$props.id"
  />
</template>
