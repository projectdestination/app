import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Buefy from 'buefy'
import "./registerServiceWorker";

import "material-icons/iconfont/material-icons.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.state.firestore
      .collection("content")
      .doc("home_page")
      .onSnapshot(data => {
        this.$store.commit("content/updateData", data.data().pages);
      });
  }
}).$mount("#app");
