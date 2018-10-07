const actions = {
  sendAttachment({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { functions } = rootState;
    console.log(rootState);
    const slackMessage = functions.httpsCallable("slackMessage");
    slackMessage(payload)
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: "Message sent", type: "success" },
          { root: true }
        );
      })
      .catch(error => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
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
  actions
};
