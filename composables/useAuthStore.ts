import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: null,
    accessToken: null,
  } as {
    loading: boolean;
    error: string | null;
    accessToken: string | null;
  }),

  actions: {
    loginStarted() {
      this.loading = true;
      this.error = null;
    },
    loginError(error: string) {
      this.loading = false;
      this.error = error;
    },
    loginSuccess(accesToken: string) {
      this.accessToken = accesToken;
      this.loading = false;
      this.error = null;
    },
    logout() {
      this.accessToken = null;
      this.loading = false;
      this.error = null;
    },
  },

  getters: {
    loggedIn: (store) => !!store.accessToken,
    token: (store) => store.accessToken,
  },

  persist: true,
});
