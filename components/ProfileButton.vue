<script setup lang="ts">
import LogoutIcon from "~icons/carbon/logout";
import { NIcon } from "naive-ui";

const authApi = useAuthApi();
const authStore = useAuthStore();
const { me, isLoading, error } = useMe();

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

function handleSelect(option: string) {
  if (option === "logout") {
    authApi.value.logout().finally(() => {
      authStore.logout();
    });
  }
}
</script>

<template>
  <NDropdown
    trigger="click"
    @select="handleSelect"
    :options="[
      {
        key: 'logout',
        label: 'Logout',
        icon: renderIcon(LogoutIcon),
        disabled: isLoading || !!error,
      },
    ]"
  >
    <NButton :loading="isLoading">
      {{ isLoading ? "Loading..." : error ? "Error" : me?.emailAddress }}
    </NButton>
  </NDropdown>
</template>
