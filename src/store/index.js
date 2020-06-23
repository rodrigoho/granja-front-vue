import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userName: localStorage.getItem('userName') || 'Usuário',
    token: localStorage.getItem('token') || null,
    customers: [],
    notifications: ['1', '2'],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getToken(state) {
      return state.token;
    },
    getCustomers(state) {
      return state.customers;
    },
    getUser(state) {
      return state.user;
    },
    getUserName(state) {
      return state.userName;
    },
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
      state.userName = payload.name;
      console.log(payload.name);
      localStorage.setItem('userName', payload.name);
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    SET_CUSTOMERS(state, payload) {
      state.customers = payload;
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      state.userName = 'Usuário';
      state.token = null;
      state.loggedIn = false;
    },
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        const res = await api.post('sessions', payload);
        commit('SET_USER', res.data.user);
        commit('SET_TOKEN', res.data.token);
        return res;
      } catch (err) {
        console.log(err);
        throw err.response.data.error;
      }
    },
    logout: ({ commit }) => {
      localStorage.removeItem('token');
      commit('LOGOUT');
    },
    loadCustomers: async ({ commit }) => {
      try {
        const res = await api.get('cargo-packing');
        commit('SET_CUSTOMERS', res.data);
        return res;
      } catch (err) {
        console.log(err.response.data.error);
        throw err;
      }
    },
  },
  modules: {},
});
