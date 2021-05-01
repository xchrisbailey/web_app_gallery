import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signInStatus: false
  },
  mutations: {
    SET_SIGN_IN_STATUS(state, status) {
      state.signInStatus = status;
    }
  },
  actions: {
    signOutUser(context) {
      context.commit("SET_SIGN_IN_STATUS", false);
    },
    singInUser(context) {
      context.commit("SET_SIGN_IN_STATUS", true);
    }
  },
  getters: {
    userCredential(state) {
      return state.signInStatus;
    }
  }
});
