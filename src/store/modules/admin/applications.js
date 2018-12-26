const responsive = [
  {
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: "bottom"
      }
    }
  }
];

const state = {
  applicants: {},
  chartData: {
    years: {},
    diets: {},
    programmes: {},
    genders: {}
  }
};

const actions = {
  getApplicantData({ rootState, commit }, eventID) {
    const { firestore } = rootState;
    const applicants = {};
    const chartData = {
      years: {},
      diets: {},
      programmes: {},
      genders: {}
    };
    firestore
      .collection("events")
      .doc(eventID)
      .collection("applicants")
      .where("terms", "==", true)
      .onSnapshot(data => {
        data.forEach(d => {
          const applicant = d.data();
          applicant.id = d.id;
          applicants[applicant.email] = applicant;
          chartData.years[applicant.year] = chartData.years[applicant.year]
            ? chartData.years[applicant.year] + 1
            : 1;
          chartData.diets[applicant.diet] = chartData.diets[applicant.diet]
            ? chartData.diets[applicant.diet] + 1
            : 1;
          chartData.programmes[applicant.programme] = chartData.programmes[
            applicant.programme
          ]
            ? chartData.programmes[applicant.programme] + 1
            : 1;
          chartData.genders[applicant.gender] = chartData.genders[
            applicant.gender
          ]
            ? chartData.genders[applicant.gender] + 1
            : 1;
        });
        commit("setApplicants", applicants);
        commit("setChartData", chartData);
      });
  },
  removeApplicant({ rootState, dispatch }, payload) {
    const { firestore } = rootState;
    dispatch("loading/startLoading", { payload: null }, { root: true });
    firestore
      .collection("events")
      .doc(payload.formID)
      .collection("applicants")
      .doc(payload.id)
      .delete()
      .catch(error => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch("getApplicantData", payload.formID);
      });
  },
  updateApplicant({ rootState, dispatch }, payload) {
    const { firestore } = rootState;
    dispatch("loading/startLoading", { payload: null }, { root: true });
    firestore
      .collection("events")
      .doc(payload.formID)
      .collection("applicants")
      .doc(payload.id)
      .update(payload)
      .catch(error => {
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
  }
};

const mutations = {
  setApplicants(state, applicants) {
    state.applicants = applicants;
  },
  setChartData(state, chartData) {
    state.chartData = chartData;
  }
};

const getOptionsAndSeries = data => {
  const labels = Object.keys(data);
  const series = labels.map(d => data[d]);
  return { labels, series };
};

const chartObject = ({ labels, series }) => {
  const object = {
    options: {
      labels,
      responsive,
      dataLabels: {
        enabled: true
      }
    },
    series
  };
  return object;
};

const getters = {
  getDiets(state) {
    const { diets } = state.chartData;
    const { labels, series } = getOptionsAndSeries(diets);
    const chartData = chartObject({ labels, series });
    return chartData;
  },
  getYears(state) {
    const { years } = state.chartData;
    const { labels, series } = getOptionsAndSeries(years);
    const chartData = chartObject({ labels, series });
    return chartData;
  },
  getProgrammes(state) {
    const { programmes } = state.chartData;
    const { labels, series } = getOptionsAndSeries(programmes);
    const chartData = chartObject({ labels, series });
    return chartData;
  },
  getGenders(state) {
    const { genders } = state.chartData;
    const { labels, series } = getOptionsAndSeries(genders);
    const chartData = chartObject({ labels, series });
    return chartData;
  },
  getTotalAmount(state) {
    const { applicants } = state;
    const amount = Object.keys(applicants).length;
    return amount;
  }
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
};
