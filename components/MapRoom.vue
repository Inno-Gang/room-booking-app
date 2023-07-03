<script setup lang="ts">
import { useEventListener } from "@vueuse/core";

const props = defineProps<{
  polygonPoints: string,
  id: string,
  class: string,
}>();

const emit = defineEmits<{
  (e: "onMouseEnter", id: string): void
  (e: "onMouseLeave", id: string): void
  (e: "onMouseClick", id: string): void
}>();

const polygonEl = ref<SVGPolygonElement | null>(null);

onMounted(() => {
  useEventListener(polygonEl, "mouseenter", () => {
    emit("onMouseEnter", props.id);
  });
  useEventListener(polygonEl, "mouseleave", () => {
    emit("onMouseLeave", props.id);
  });
  useEventListener(polygonEl, "click", () => {
    emit("onMouseClick", props.id);
  });

});
</script>

<template>
  <polygon
    ref="polygonEl"
    :points="$props.polygonPoints"
    :class="$props.class"
    :id="$props.id"
  />
</template>
