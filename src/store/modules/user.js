import consoleLog from "@/../javascripts/consoleLog";

const state = {
  userIsAuthenticated: false,
  userMode: null
};
const mutations = {
  setUserState(state, payload) {
    state.userIsAuthenticated = payload.userIsAuthenticated;
    state.error = payload.error;
    state.errorMessage = payload.errorMessage;
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
        consoleLog("User created");
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
        consoleLog(error.message);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
