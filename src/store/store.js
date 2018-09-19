import Vue from "vue";
import Vuex from "vuex";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "../config.js";

// Initialized
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
firestore.settings({ timestampsInSnapshots: true });

// Modules
import modules from "./modules/modules";

// Store functions
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

Vue.use(Vuex);

const initialState = {
  userIsAuthenticated: false,
  firebase: firebase,
  firestore: firestore,
  auth: auth,
  bucket: storage,
  loading: false
};

export default new Vuex.Store({
  state: {
    userIsAuthenticated: initialState.userIsAuthenticated,
    loading: initialState.loading,
    firebase: firebase,
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
