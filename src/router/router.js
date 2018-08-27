import Vue from "vue";
import Router from "vue-router";
import Routes from "./routes/routes";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...Routes],
  scrollBehavior(/* to, from, savedPosition */) {
    return { x: 0, y: 0 };
  }
});
