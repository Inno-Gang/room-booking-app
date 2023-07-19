<script lang="ts" setup>
import { useThemeVars } from "naive-ui";
import { BookingItem } from "~/components/BookingsList.vue";
import { ResponseError } from "~/api/booking";

definePageMeta({
  middleware: ["auth"],
});

const theme = useThemeVars();
const bookingApi = useBookingApi();
const authStore = useAuthStore();
const router = useRouter();
const queryClient = useQueryClient();
const message = useMessage();

authStore.$subscribe(
  (_, state) => {
    if (!state.accessToken) {
      router.push("/login");
    }
  },
  { immediate: true }
);

function handleRequestError(err: unknown) {
  if (err instanceof ResponseError) {
    if (err.response.status >= 400 && err.response.status < 500) {
      err.response.json().then((res) => {
        message.error(res.detail);
      });
      return;
    }
  }
  message.error("Something went wrong. Try again later.");
}

const { myBookings, myBookingsError, myBookingsLoading } = useMyBookings();
const myBookingsTransformed = computed(() => {
  return (myBookings.value ?? []).map((booking) => ({
    ...booking,
    start: new Date(booking.start),
    end: new Date(booking.end),
    location: booking.room.name,
  })) as BookingItem[];
});

const initialBookingStart = new Date();
const initialBookingEnd = new Date(
  initialBookingStart.getTime() + 30 * 60 * 1000
);

const title = ref("");

const dateStart = ref(initialBookingStart);
const dateEnd = ref(initialBookingEnd);

watch(
  dateStart,
  (newDateStart) => {
    const rounded = roundDate5Min(newDateStart);
    if (rounded.getTime() !== newDateStart.getTime()) {
      dateStart.value = rounded;
    }

    if (dateStart.value.getTime() >= dateEnd.value.getTime()) {
      // move date end to the next day
      dateEnd.value = new Date(dateEnd.value.getTime() + 24 * 60 * 60 * 1000);
    }
  },
  { immediate: true }
);

watch(
  dateEnd,
  (newDateEnd) => {
    const rounded = roundDate5Min(newDateEnd);
    if (rounded.getTime() !== newDateEnd.getTime()) {
      dateEnd.value = rounded;
    }

    if (dateStart.value.getTime() >= dateEnd.value.getTime()) {
      // move date end to the next day
      dateEnd.value = new Date(dateEnd.value.getTime() + 24 * 60 * 60 * 1000);
    }
  },
  { immediate: true }
);

const selectedRoomId = ref<string | null>(null);
const { roomsData, loading: roomsDataLoading } = useRoomsInfo(
  dateStart,
  dateEnd
);
const {
  data: roomBookings,
  isError: roomBookingsError,
  isLoading: roomBookingsLoading,
} = useRoomBookings(selectedRoomId);

const isBooking = ref(false);

const selectedRoomInfo = useRoomInfo(selectedRoomId);

const canSubmitForm = computed(() => {
  if (
    !(
      !!title.value &&
      !!selectedRoomId.value &&
      !!dateStart.value &&
      !!dateEnd.value
    )
  ) {
    return false;
  }

  const selectedRoomData = roomsData.value.find(
    (r) => r.id === selectedRoomId.value
  );

  if (selectedRoomData?.bookable && selectedRoomData.available) {
    return true;
  }
  return false;
});

function handleSubmit() {
  isBooking.value = true;
  bookingApi.value
    .bookRoom({
      roomId: selectedRoomId.value,
      bookRoomRequest: {
        title: title.value,
        start: dateStart.value,
        end: dateEnd.value,
      },
    })
    .then(() => {
      title.value = "";
      selectedRoomId.value = null;
      message.success("Room booked!");
    })
    .catch(handleRequestError)
    .finally(() => {
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      isBooking.value = false;
    });
}

function handleMapRoomClick(roomId: string) {
  selectedRoomId.value = roomId;
}

function handleBookingCancelation(id: string) {
  bookingApi.value
    .deleteBooking({
      bookingId: id,
    })
    .then(() => {
      message.info("Booking cancelled");
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    })
    .catch(handleRequestError);
}
</script>

<template>
  <main class="root">
    <div class="root__left">
      <NCard content-style="padding: 0;">
        <div class="booking-plate">
          <NTabs
            animated
            justify-content="space-evenly"
            type="line"
            pane-style="padding: 0"
          >
            <NTabPane name="new-booking">
              <template #tab>New Booking</template>
              <NewBookingForm
                class="booking-plate__new-booking"
                :available-rooms="
                  roomsData.filter((r) => r.bookable && r.available)
                "
                :available-rooms-loading="roomsDataLoading"
                :loading="isBooking"
                :can-submit="canSubmitForm"
                v-model:room-id="selectedRoomId"
                v-model:title="title"
                v-model:start-date="dateStart"
                v-model:end-date="dateEnd"
                @submit.prevent="handleSubmit"
              />
            </NTabPane>
            <NTabPane name="my-bookings">
              <template #tab>
                <div class="my-bookings__tab">
                  My Bookings
                  <n-badge
                    :value="myBookings?.length ?? 0"
                    :offset="['50%', '0']"
                    :max="9"
                    type="success"
                  ></n-badge>
                </div>
              </template>
              <BookingsList
                :loading="myBookingsLoading"
                :error="
                  myBookingsError
                    ? typeof myBookingsError === 'string'
                      ? myBookingsError
                      : 'Failed to load your bookings'
                    : undefined
                "
                :bookings="myBookingsTransformed"
                @cancel-booking="handleBookingCancelation"
                class="my-bookings__content"
              />
            </NTabPane>
          </NTabs>
        </div>
      </NCard>
      <RoomCard
        v-if="selectedRoomId != null"
        :name="selectedRoomInfo?.name ?? '—'"
        :events="selectedRoomInfo?.events ?? []"
        :capacity="3"
        :image-src="selectedRoomInfo?.imageSrc"
      />
    </div>
    <div class="root__right">
      <ClientOnly>
        <NCard class="header">
          <div class="header__content">
            <TimeInfo />
            <ProfileButton />
          </div>
        </NCard>
      </ClientOnly>
      <NCard class="map" :content-style="{ padding: 0 }">
        <div class="map__content">
          <BookingsMap
            :focused-room-id="selectedRoomId ?? undefined"
            @room-click="handleMapRoomClick"
            class="map"
          />
        </div>
      </NCard>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$root-padding: 48px;
$spacing: 20px;

.root {
  min-height: 100vh;
  margin: 0;
  padding: $root-padding;
  display: flex;
  gap: $spacing;

  &__left {
    flex: 0 0 300px;
  }

  &__right {
    flex-grow: 1;
  }

  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: $spacing;
  }
}

.header {
  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.map {
  min-height: 50vh;
  max-height: 1000px;

  flex-grow: 1;

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

.my-bookings {
  &__tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  &__content {
    max-height: 500px;
    overflow-y: auto;
  }
}

.booking-plate {
  padding-top: 8px;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid v-bind("theme.borderColor");
  }

  &__new-booking {
    padding: 30px;
  }
}

.map {
  flex-grow: 1;
}
</style>
