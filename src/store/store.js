import Vue from "vue";
import Vuex from "vuex";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../config.js";
// Initialize
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Modules
import modules from "./modules/modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userIsAuthenticated: false,
    firestore: firestore,
    loading: false
  },
  modules: {
    ...modules
  },
  mutations: {},
  actions: {},
  getters: {}
});
