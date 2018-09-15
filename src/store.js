import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    updateAvailable: false
  },
  mutations: {
    updateAvailableOn(state) {
      state.updateAvailable = true;
    },
    updateAvailableOff(state) {
      state.updateAvailable = false;
    }
  },
  actions: {
    updateAvailableOn(context) {
      context.commit("updateAvailableOn");
    },
    updateAvailableOff(context) {
      context.commit("updateAvailableOff");
    }
  }
});
