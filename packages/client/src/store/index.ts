import Vue from "vue";
import Vuex from "vuex";
import { getUser } from "../services/signUpApi";
import { User } from "../types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signInStatus: false,
    userData: null as User | null,
  },
  mutations: {
    SET_SIGN_IN_STATUS(state, status){
      state.signInStatus = status
    },
    SET_USER_INFORMATION(state, status){
      state.userData = status
    }
    
  },
  actions: {
    updateUserCredentials(context){
      getUser()
      .then((user) => {
        context.commit('SET_SIGN_IN_STATUS',true)
        context.commit('SET_USER_INFORMATION', user)
      })
      .catch(error => {
        console.log(error);
        context.commit('SET_SIGN_IN_STATUS', false)
      })
    }
  },
  modules: {},
  getters:{
    userCredential(state){
      return state.signInStatus
    },
    userInformation(state){
      return state.userData
    }
  },
});
