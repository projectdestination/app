import consoleLog from "@/../javascripts/consoleLog";

const state = {
  form: null
};
const getters = {};
const mutations = {
  setFormData(state, payload) {
    state.form = payload;
  }
};
const actions = {
  getFormData({ rootState, commit }, eventID) {
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(eventID)
      .onSnapshot(data => {
        const event = data.data();
        const formData = event.form;
        if (formData) {
          commit("setFormData", formData);
        }
      });
  },
  updateForm({ rootState, dispatch }, form) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(form.form_id)
      .update({
        form
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  addStudent({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("students")
      .where("email", "==", payload.email)
      .get()
      .then(data => {
        const emailAlreadyExists = !data.empty;
        if (!emailAlreadyExists) {
          firestore
            .collection("students")
            .doc(payload.email)
            .set({ ...payload })
            .catch(error => {
              consoleLog(error.message);
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
            })
            .then(() => {
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
            });
        } else {
          dispatch("loading/stopLoading", { payload: null }, { root: true });
        }
      });
  },
  addApplicant({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(payload.formID)
      .collection("applicants")
      .where("email", "==", payload.email)
      .get()
      .then(data => {
        const emailAlreadyExists = !data.empty;
        if (!emailAlreadyExists) {
          firestore
            .collection("events")
            .doc(payload.formID)
            .collection("applicants")
            .doc(payload.email)
            .set({ ...payload })
            .catch(error => {
              consoleLog(error.message);
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
              dispatch(
                "errors/setError",
                { error: true, message: error.message },
                { root: true }
              );
            })
            .then(() => {
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
              dispatch(
                "errors/setError",
                {
                  error: true,
                  message: "You are now registred on this event.",
                  type: "success"
                },
                { root: true }
              );
            });
        } else {
          dispatch("loading/stopLoading", { payload: null }, { root: true });
          dispatch(
            "errors/setError",
            {
              error: true,
              message: "You are already registred on this event.",
              type: "warning"
            },
            { root: true }
          );
        }
      });
  },
  registerStudent({ rootState }, payload) {
    const { firestore } = rootState;
    firestore.collection("students").where("email", "==", payload.email);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
