import consoleLog from "@/../javascripts/consoleLog";
import router from "@/router/router";

const state = {
  userIsAuthenticated: false,
  userMode: null,
  user: null
};
const getters = {
  getUser: state => {
    return state.user;
  },
  getNavBar: state => {
    const auth = state.userIsAuthenticated;
    const isAdmin = state.user.user_type === "admin";
    const isSuper = state.user.user_type === "super";
    const createEventText =
      isAdmin || isSuper ? "Create event" : "Request event";
    const homeRoute = isAdmin || isSuper ? "/app/admin" : "/app/main";
    return {
      right: [
        auth && {
          text: createEventText,
          icon: "date_range",
          class: "is-success",
          route: "/app/event/request",
          type: "navigate",
          disabled: true
        },
        auth &&
          !(isAdmin || isSuper) && {
            text: "Company profile",
            icon: "store",
            class: "is-twitter",
            route: "/app/company",
            type: "navigate",
            disabled: true
          },
        {
          text: auth ? "Log out" : "Sign in",
          icon: auth ? "lock" : "lock_open",
          class: auth ? "is-danger" : "is-success",
          route: null,
          type: auth ? "log_out" : "log_in",
          disabled: false
        }
      ],
      left: [
        auth && {
          text: "Home",
          route: homeRoute
        },
        (isAdmin || isSuper) && {
          text: "Events",
          route: "/app/admin/events"
        },
        (isAdmin || isSuper) && {
          text: "Users",
          route: "/app/admin/users"
        },
        (isAdmin || isSuper) && {
          text: "Companies",
          route: "/app/admin/companies"
        },
        (isAdmin || isSuper) && {
          text: "Content",
          route: "/app/admin/content/home"
        },
        isSuper && {
          text: "Super user controls",
          route: "/app/super"
        }
      ]
    };
  }
};
const mutations = {
  setUserState(state, payload) {
    state.userIsAuthenticated = payload.userIsAuthenticated;
    state.userMode = payload.userMode;
    state.user = payload.user;
  },
  formInputState(state, payload) {
    state.formData = payload;
  }
};
const actions = {
  createUser({ rootState, commit, dispatch }, payload, callbackFunction) {
    const { auth } = rootState;
    const { email, password } = payload;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const authPayload = {
          userIsAuthenticated: true
        };
        commit("setUserState", authPayload);
        dispatch("addUserData", payload);
        callbackFunction && callbackFunction();
      })
      .catch(error => {
        const payload = {
          userIsAuthenticated: false
        };
        commit("setUserState", payload);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  addUserData({ rootState, dispatch }, payload) {
    const { firestore, auth } = rootState;
    const { uid } = auth.currentUser;
    const updatedPayload = {
      ...payload,
      company_key: payload.companyKey,
      first_name: payload.firstName,
      last_name: payload.lastName,
      is_validated: payload.isValidated,
      user_type: payload.userType
    };
    delete updatedPayload.userType;
    delete updatedPayload.password;
    delete updatedPayload.selectedCompanyDomain;
    delete updatedPayload.emailName;
    delete updatedPayload.companyKey;
    delete updatedPayload.lastName;
    delete updatedPayload.firstName;
    delete updatedPayload.isValidated;

    firestore
      .collection("users")
      .doc(uid)
      .set({ ...updatedPayload, id: uid })
      .then(() => {
        consoleLog("User updated");
        router.push("/app/main");
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  validateAndCreateUser({ commit, dispatch }, payload) {
    // TODO: Move this logic to Firebase Cloud Functions.
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const {
      companyKey,
      firstName,
      lastName,
      email,
      role,
      phone,
      password
    } = payload;
    const emailIsOk =
      email.includes("@") && email.includes(".") && email.length > 5;
    const firstNameIsOk = firstName.length > 1;
    const lastNameIsOk = lastName.length > 1;
    const hasSelectedCompany = companyKey !== "";
    const hasSelectedRole = role !== "";
    const phoneIsOk = phone.length > 5;
    const passwordIsOk = password.length > 6;
    const errors = {
      firstName: !firstNameIsOk,
      lastName: !lastNameIsOk,
      emailName: !emailIsOk,
      role: !hasSelectedRole,
      phone: !phoneIsOk,
      password: !passwordIsOk
    };
    const formData = { ...payload, errors };
    const everythingIsOk =
      firstNameIsOk &&
      lastNameIsOk &&
      hasSelectedCompany &&
      hasSelectedRole &&
      phoneIsOk &&
      passwordIsOk &&
      emailIsOk;
    commit("formInputState", formData);
    const failed = () => {
      dispatch("loading/stopLoading", { payload: null }, { root: true });
      dispatch(
        "errors/setError",
        {
          error: true,
          message:
            "There's something wrong with your input.. If you need help, contact help@projectdestination.se."
        },
        { root: true }
      );
    };
    everythingIsOk ? dispatch("createUser", payload) : failed();
  },
  getUserData({ rootState, commit, dispatch }, payload) {
    const { firestore } = rootState;
    firestore
      .collection("users")
      .doc(payload)
      .get()
      .then(doc => {
        const data = doc.data();
        commit("setUserState", {
          user: { ...data },
          userIsAuthenticated: true,
          userMode: data.user_type
        });
        const { user_type } = data;
        if (user_type === "regular") {
          dispatch("app/getContent", { payload: null }, { root: true });
        } else if (["admin", "super"].includes(user_type)) {
          dispatch("admin/getContent", { payload: null }, { root: true });
        }
      })
      .catch(error => {
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  signUserIn({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { auth } = rootState;
    const { email, password } = payload;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        dispatch("getUserData", data.user.uid);
      })
      .catch(error => {
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  checkAuthState({ rootState, dispatch, commit }) {
    const { auth } = rootState;
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch("getUserData", user.uid);
      } else {
        commit("setUserState", {
          user: "nouser",
          userMode: null,
          userIsAuthenticated: false
        });
      }
    });
  },
  signUserOut({ rootState, commit, dispatch }) {
    const { auth } = rootState;
    auth
      .signOut()
      .then(() => {
        commit("setUserState", {
          user: "nouser",
          userMode: null,
          userIsAuthenticated: false
        });
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        router.push("/");
      })
      .catch(error => {
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
