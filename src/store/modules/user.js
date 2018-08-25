import consoleLog from "@/../javascripts/consoleLog";

const state = {
  userIsAuthenticated: false,
  userMode: null,
  user: null
};
const getters = {
  getUser: state => {
    return state.user;
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
      is_validated: payload.isValidated
    };
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
        dispatch("app/getContent", { payload: null }, { root: true });
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
