<script setup lang="ts">
const props = defineProps<{
  polygonPoints: string,
  id: string,
  class: string,
}>()

const emit = defineEmits<{
  (e: "onMouseEnter", id: string): void
  (e: "onMouseLeave", id: string): void
}>()

const polygonEl = ref<HTMLElement | null>(null)

onMounted(() => {
  // Using Vue's template refs (https://vuejs.org/guide/essentials/template-refs.html)
  // don't work with polygon element for some reason;
  // so use it like this.
  polygonEl.value = document.getElementById(props.id)
  polygonEl.value?.addEventListener("mouseenter", () => {
    emit("onMouseEnter", props.id)
  })
  polygonEl.value?.addEventListener("mouseleave", () => {
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
