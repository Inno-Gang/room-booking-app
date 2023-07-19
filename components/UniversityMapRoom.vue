<script setup lang="ts">
import { useThemeVars } from "naive-ui";

const theme = useThemeVars();

export type SVGData =
  | {
      polygon: {
        points: string;
      };
      rect?: null;
    }
  | {
      polygon?: null;
      rect: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
      };
    };

export type Props = {
  state: State;
  svgData: SVGData;
  hovered?: boolean;
};

export type State = "available" | "unavailable" | "my";

defineProps<Props>();
const emit = defineEmits<{
  (e: "onMouseEnter"): void;
  (e: "onMouseLeave"): void;
  (e: "onMouseClick"): void;
}>();

const svgEl = ref<SVGPolygonElement | SVGRectElement | null>(null);

onMounted(() => {
  useEventListener(svgEl, "mouseenter", () => {
    emit("onMouseEnter");
  });
  useEventListener(svgEl, "mouseleave", () => {
    emit("onMouseLeave");
  });
  useEventListener(svgEl, "click", () => {
    emit("onMouseClick");
  });
});
</script>

<template>
  <polygon
    v-if="svgData.polygon"
    ref="svgEl"
    :class="['svg-room', `state-${state}`, { hovered: hovered }]"
    :points="svgData.polygon.points"
  />
  <rect
    v-else
    ref="svgEl"
    :class="['svg-room', `state-${state}`, { hovered: hovered }]"
    :x="svgData.rect.x"
    :y="svgData.rect.y"
    :width="svgData.rect.width"
    :height="svgData.rect.height"
  />
</template>

<style scoped lang="scss">
.svg-room {
  stroke: v-bind("theme.borderColor");
  stroke-width: 2px;
  fill: v-bind("theme.primaryColor");
  opacity: 0.3;

  &.hovered {
    fill: v-bind("theme.primaryColorHover");
    opacity: 0.7;
    cursor: pointer;
  }

  &.state-available {
  }

  &.state-unavailable {
    fill: v-bind("theme.textColorDisabled");

    &.hovered {
      fill: v-bind("theme.textColorDisabled");
    }
  }

  &.state-my {
  }
}
</style>
