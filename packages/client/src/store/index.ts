import { getUser } from "@/services/signUpApi";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signInStatus: undefined as undefined | boolean
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
    },
    updateSignInStatus(context) {
      return getUser()
        .then(() => {
          context.dispatch("singInUser");
        })
        .catch(() => {
          context.dispatch("signOutUser");
        });
    }
  },
  getters: {
    userCredential(state) {
      return state.signInStatus;
    }
  }
});
