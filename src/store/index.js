import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userName: localStorage.getItem('userName') || 'Usuário',
    token: localStorage.getItem('token') || null,
    cargoPackings: [],
    customers: [],
    selectedCustomer: {},
    notifications: ['1', '2'],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getToken(state) {
      return state.token;
    },
    getCargoPackings(state) {
      return state.cargoPackings;
    },
    getCustomers(state) {
      return state.customers;
    },
    getSelectedCustomer(state) {
      return state.selectedCustomer;
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
    SET_CARGO_PACKINGS(state, payload) {
      state.cargoPackings = payload;
    },
    SET_CUSTOMERS_LIST(state, payload) {
      state.customers = payload;
    },
    SET_SELECTED_CUSTOMER(state, payload) {
      state.selectedCustomer = payload;
    },
    CREATE_CUSTOMER(state, payload) {
      state.customers.push(payload);
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
    loadCargoPackings: async ({ commit }) => {
      try {
        const res = await api.get('cargo-packing');
        commit('SET_CARGO_PACKINGS', res.data);
        return res;
      } catch (err) {
        console.log(err.response.data.error);
        throw err;
      }
    },
    loadCustomers: async ({ commit }) => {
      try {
        const res = await api.get('customers');
        commit('SET_CUSTOMERS_LIST', res.data);
        return res;
      } catch (err) {
        console.log(err.response.data.error);
        throw err;
      }
    },
    loadSelectedCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.get(`customers/${payload}`);
        commit('SET_SELECTED_CUSTOMER', res.data);
        return res;
      } catch (err) {
        console.log(err.response.data.error);
        throw err;
      }
    },
    createCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.post('customers', payload);
        commit('CREATE_CUSTOMER', payload);
        return res.data;
      } catch (err) {
        console.log(err.response.data.error);
        throw err;
      }
    },
  },
  modules: {},
});
