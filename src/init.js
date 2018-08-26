import store from "@/store/store";

export function initializeContent() {
  store.dispatch("loading/startLoading");
  store.dispatch("content/getHomePageData");
}

export function initializeUser() {
  store.dispatch("user/checkAuthState", { type: "none" });
}
