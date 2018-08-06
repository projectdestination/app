import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from 'buefy'
import firebase from 'firebase';
import "./registerServiceWorker";

import "material-icons/iconfont/material-icons.css";

Vue.use(firebase);
Vue.use(Buefy);

var config = {
    apiKey: "AIzaSyCYhkCnNCsOZ6x96YYks6oDvYuc6J2WHkw",
    authDomain: "testing-c9e00.firebaseapp.com",
    databaseURL: "https://testing-c9e00.firebaseio.com",
    projectId: "testing-c9e00",
    storageBucket: "testing-c9e00.appspot.com",
    messagingSenderId: "401773423892"
  };
  firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
