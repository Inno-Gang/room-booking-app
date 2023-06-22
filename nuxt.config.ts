// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/globals.css"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    subsets: ["cyrillic", "latin"],
    families: {
      "IBM+Plex+Sans": [400],
      "IBM+Plex+Mono": [400],
    },
  },
});
