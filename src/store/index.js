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
    customerToEdit: null,
    selectedCustomer: {},
    notifications: ['1', '2'],
    whiteEggsList: null,
    redEggsList: null,
    additionalFee: null,
    selectedCargoPacking: null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getToken(state) {
      return state.token;
    },

    // Cargo Packings
    getCargoPackings(state) {
      return state.cargoPackings;
    },

    getSelectedCargoPacking(state) {
      return state.selectedCargoPacking;
    },

    // Customers
    getCustomers(state) {
      return state.customers;
    },
    getSelectedCustomer(state) {
      return state.selectedCustomer;
    },
    getCustomerToEdit(state) {
      return state.customerToEdit;
    },
    // End of Customers

    // Eggs
    getRedEggsList(state) {
      return state.redEggsList;
    },

    getWhiteEggsList(state) {
      return state.whiteEggsList;
    },
    getAdditionalFee(state) {
      return state.additionalFee;
    },

    // User
    getUser(state) {
      return state.user;
    },
    getUserName(state) {
      return state.userName;
    },

    // Notifications
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
      state.userName = payload.name;
      localStorage.setItem('userName', payload.name);
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },

    // Cargo Packings
    SET_CARGO_PACKINGS(state, payload) {
      state.cargoPackings = payload;
    },
    CREATE_CARGO_PACKING(state, payload) {
      state.cargoPackings.push(payload);
    },
    SET_SELECTED_CARGO_PACKING(state, payload) {
      state.selectedCargoPacking = payload;
    },

    // Customers
    SET_CUSTOMERS_LIST(state, payload) {
      state.customers = payload;
    },
    SET_SELECTED_CUSTOMER(state, payload) {
      state.selectedCustomer = payload;
    },
    CREATE_CUSTOMER(state, payload) {
      state.customers.push(payload);
    },
    DELETE_CUSTOMER(state, payload) {
      const removeIndex = state.customers.findIndex((c) => c.id === payload);
      state.customers.splice(removeIndex, 1);
    },
    SET_CUSTOMER_TO_EDIT(state, payload) {
      state.customerToEdit = payload;
    },
    // End of Customers

    // Eggs
    SET_RED_EGGS_LIST(state, payload) {
      state.redEggsList = payload;
    },

    SET_WHITE_EGGS_LIST(state, payload) {
      state.whiteEggsList = payload;
    },

    UPDATE_WHITE_EGG(state, payload) {
      const whiteEggs = state.whiteEggsList;
      const removeIndex = whiteEggs.findIndex((i) => i.id === payload.id);
      whiteEggs.splice(removeIndex, 1, payload);
    },

    UPDATE_RED_EGG(state, payload) {
      const redEggs = state.redEggsList;
      console.log('antes\n' + JSON.stringify(redEggs));
      const removeIndex = redEggs.findIndex((i) => {
        // console.log(i.id);
        return i.id === payload.id;
      });
      console.log('removeIndex ' + removeIndex);
      console.log(payload);
      redEggs.splice(removeIndex, 1, payload);
      // console.log('depois' + JSON.stringify(redEggs));
    },

    SET_ADDITIONAL_FEE(state, payload) {
      state.additionalFee = payload;
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
        throw err.response.data.error;
      }
    },
    logout: ({ commit }) => {
      localStorage.removeItem('token');
      commit('LOGOUT');
    },

    // Cargo Packings
    loadCargoPackings: async ({ commit }, page) => {
      try {
        const res = await api.get(`cargo-packing?page=${page}`);
        commit('SET_CARGO_PACKINGS', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    createCargoPacking: async ({ commit }, payload) => {
      try {
        const res = await api.post('cargo-packing', payload);
        commit('CREATE_CARGO_PACKING', payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadSelectedCargoPacking: async ({ commit }, payload) => {
      try {
        const res = await api.get(`cargo-packing/${payload}`);
        commit('SET_SELECTED_CARGO_PACKING', res.data);
      } catch (err) {
        throw err.response.data.error;
      }
    },
    // End of Cargo Packings

    // Customers
    loadCustomers: async ({ commit }) => {
      try {
        const res = await api.get('customers');
        commit('SET_CUSTOMERS_LIST', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadSelectedCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.get(`customers/${payload}`);
        commit('SET_SELECTED_CUSTOMER', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    createCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.post('customers', payload);
        commit('CREATE_CUSTOMER', payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    deleteCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.delete(`customers/${payload}`);
        commit('DELETE_CUSTOMER', payload);
        return res;
      } catch (err) {
        console.log(err.response.data.error);
        throw err.response.data.error;
      }
    },
    setCustomerToEdit: ({ commit }, payload) => {
      commit('SET_CUSTOMER_TO_EDIT', payload);
    },
    editCustomer: async (context, payload) => {
      try {
        const res = await api.put(`customers/${payload.id}`, payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    // End of Customers

    // Eggs
    createEgg: async (context, payload) => {
      try {
        const res = await api.post('eggs', payload);
        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadEggsList: async ({ commit }) => {
      try {
        const redRes = await api.get('red-eggs');
        const whiteRes = await api.get('white-eggs');
        commit('SET_RED_EGGS_LIST', redRes.data);
        commit('SET_WHITE_EGGS_LIST', whiteRes.data);
        return [redRes, whiteRes];
      } catch (err) {
        throw err.response.data.error;
      }
    },
    updateEgg: async ({ commit, state }, payload) => {
      try {
        const whiteEgg = { id: payload.id, price: payload.price, size: payload.size };
        const currentRedEgg = state.redEggsList.find((e) => e.size === payload.size);
        console.log('additionalFee ' + JSON.stringify(state.additionalFee.current_fee_price));
        const redEgg = {
          ...payload,
          color: 'Vermelho',
          id: currentRedEgg.id,
          price: payload.price + parseInt(state.additionalFee.current_fee_price),
          size: payload.size,
        };
        const resWhite = await api.put('eggs', whiteEgg);
        const resRed = await api.put('eggs', redEgg);
        commit('UPDATE_WHITE_EGG', whiteEgg);
        commit('UPDATE_RED_EGG', redEgg);
        return [resWhite, resRed];
      } catch (err) {
        throw err.response.data.error;
      }
    },
    createAdditionalFee: async ({ commit }, payload) => {
      try {
        const res = api.post('additional-fee', payload);
        commit('SET_ADDITIONAL_FEE', res.data);
        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadAdditionalFee: async ({ commit }) => {
      try {
        const additionalFee = await api.get('additional-fee');
        commit('SET_ADDITIONAL_FEE', additionalFee.data[0]);
        return additionalFee;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    updateAdditionalFee: async ({ commit, dispatch }, payload) => {
      try {
        const res = await api.put(`additional-fee/${payload.id}`, payload);
        commit('SET_ADDITIONAL_FEE', payload);
        dispatch('loadAdditionalFee');
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
  },
  modules: {},
});
