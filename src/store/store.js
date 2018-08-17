import Vue from "vue";
import Vuex from "vuex";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "../config.js";

// Initialize
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
firestore.settings({ timestampsInSnapshots: true });

// Modules
import modules from "./modules/modules";

// Store functions
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

const initialState = {
  userIsAuthenticated: false,
  firestore: firestore,
  auth: auth,
  loading: false
};

export default new Vuex.Store({
  state: {
    userIsAuthenticated: initialState.userIsAuthenticated,
    loading: initialState.loading,
    firestore: firestore,
    auth: auth
  },
  modules: {
    ...modules
  },
  mutations,
  actions,
  getters
});
