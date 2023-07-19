<script setup lang="ts">
import { darkTheme, GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "var(--font-display)",
    fontFamilyMono: "var(--font-mono)",
  },
};
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NDialogProvider>
      <NMessageProvider>
        <ClientOnly>
          <NuxtPage />
        </ClientOnly>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
