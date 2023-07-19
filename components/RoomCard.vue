<script setup lang="ts">
export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

const props = defineProps<{
  name: string;
  capacity: number;
  imageSrc: string | undefined;
  events: Event[];
}>();

type TimelinePoint = {
  id: string;
  title: string;
  type: "event" | "free";
  time: string;
};

function generateTimelinePointsFromEvents(events: Event[]): TimelinePoint[] {
  const points: TimelinePoint[] = [];
  const sorted = events.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  for (let i = 0; i < sorted.length - 1; i++) {
    const eventA = sorted[i];
    const eventB = sorted[i + 1];

    points.push({
      id: eventA.id,
      title: eventA.title,
      type: "event",
      time: `${eventA.startDate.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Moscow",
      })}`,
    });

    const interval = eventB.startDate.getTime() - eventA.endDate.getTime();

    if (interval > 0) {
      points.push({
        id: `${eventA.id}-free`,
        title: `Free (${durationText(interval)})`,
        type: "free",
        time: `${eventA.endDate.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Moscow",
        })}`,
      });
    }
  }

  if (sorted.length > 0) {
    const lastEvent = sorted[sorted.length - 1];
    points.push({
      id: lastEvent.id,
      title: lastEvent.title,
      type: "event",
      time: `${lastEvent.startDate.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Moscow",
      })}`,
    });
  }

  return points;
}

const points = computed(() => generateTimelinePointsFromEvents(props.events));
</script>

<template>
  <NCard class="room-info">
    <template #cover>
      <div class="room-info__cover">
        <h3 class="room-info__cover-title">{{ name }}</h3>
        <NuxtImg
          class="room-info__cover-img"
          width="250"
          height="125"
          :src="imageSrc ?? '404'"
        />
      </div>
    </template>
    <NTimeline>
      <NTimelineItem
        v-for="point in points"
        :title="point.title"
        :type="point.type === 'free' ? 'success' : 'default'"
        :line-type="point.type === 'free' ? 'dashed' : 'default'"
        :time="point.time"
        :key="point.id"
      />
    </NTimeline>
  </NCard>
</template>

<style lang="scss">
$img-height: 125px;

.room-info {
  &__cover {
    width: 100%;
    height: $img-height;
    position: relative;
    margin-bottom: 20px;

    &-img {
      object-fit: cover;
    }

    &-title {
      font-weight: 400;
      margin: 0;
      color: #eee;
      background: rgba($color: #000, $alpha: 0.2);
      position: absolute;
      left: 8px;
      bottom: 8px;
      font-size: 14px;
      padding: 2px 6px;
      border-radius: 6px;
      backdrop-filter: blur(10px);
      transition: opacity 0.25s;
    }
  }

  /* Hide room title when cover is hovered, but show if title is hovered. */
  .room-info__cover:hover {
    .room-info__cover-title:not(:hover) {
      transition: opacity 0.15s;
      opacity: 0;
    }
  }
}
</style>
