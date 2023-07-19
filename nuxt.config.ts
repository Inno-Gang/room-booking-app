// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      bookingApiBase: "http://localhost:1234",
    },
  },
  devtools: { enabled: true },
  devServer: {
    host: "127.0.0.1",
    port: 3000,
  },
  css: ["~/assets/css/globals.css"],
  modules: [
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "unplugin-icons/nuxt",
    "@bg-dev/nuxt-naiveui",
    "@hebilicious/vue-query-nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  naiveui: {
    colorModePreference: "light",
    themeConfig: {},
  },
  googleFonts: {
    subsets: ["cyrillic", "latin"],
    families: {
      "IBM+Plex+Sans": [400],
      "IBM+Plex+Mono": [400],
    },
  },
});
