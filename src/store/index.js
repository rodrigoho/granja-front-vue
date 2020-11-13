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
    intermediaries: [],
    getNonRelatedCustomersList: [],
    users: [],
    isAdmin: false,
    selectedUser: {},
    customerToEdit: null,
    selectedCustomer: {},
    selectedIntermediary: {},
    notifications: [],
    whiteEggsList: null,
    redEggsList: null,
    additionalFee: null,
    selectedCargoPacking: null,
    editingCargoPackingDate: null,
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
    getEditingCargoPackingDate(state) {
      return state.editingCargoPackingDate;
    },

    getSelectedCargoPacking(state) {
      return state.selectedCargoPacking;
    },

    // Users
    getUsers(state) {
      return state.users;
    },
    getIsAdmin(state) {
      return state.isAdmin;
    },

    // Intermediary Customers
    getIntermediaries(state) {
      return state.intermediaries;
    },
    getSelectedIntermediary(state) {
      return state.selectedIntermediary;
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
    getNonRelatedCustomersList(state) {
      return state.getNonRelatedCustomersList;
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
      localStorage.setItem('userId', payload.id);
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },

    // Cargo Packings
    SET_CARGO_PACKINGS(state, payload) {
      state.cargoPackings = payload;
    },
    SET_EDITING_CARGO_PACKING_DATE(state, payload) {
      state.editingCargoPackingDate = payload;
    },
    SET_SELECTED_CARGO_PACKING(state, payload) {
      state.selectedCargoPacking = payload;
    },
    SET_NOTIFICATIONS_COUNT(state, payload) {
      state.notifications = payload;
    },

    // Users
    SET_USERS_LIST(state, payload) {
      state.users = payload;
    },
    SET_SELECTED_USER(state, payload) {
      state.selectedUser = payload;
    },
    CREATE_USER(state, payload) {
      state.users.push(payload);
    },
    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },
    // End of users

    // Intermediary Customers
    CREATE_INTERMEDIARY(state, payload) {
      state.intermediaries.push(payload);
    },
    SET_INTERMEDIARIES_LIST(state, payload) {
      state.intermediaries = payload;
    },
    SET_SELECTED_INTERMEDIARY(state, payload) {
      state.selectedIntermediary = payload;
    },

    // Customers
    SET_CUSTOMERS_LIST(state, payload) {
      state.customers = payload;
    },
    SET_NON_RELATED_CUSTOMERS_LIST(state, payload) {
      state.getNonRelatedCustomersList = payload;
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
      const removeIndex = redEggs.findIndex((i) => {
        return i.id === payload.id;
      });
      redEggs.splice(removeIndex, 1, payload);
    },

    SET_ADDITIONAL_FEE(state, payload) {
      state.additionalFee = payload;
    },
    // Eggs

    // Notifications

    SET_NOTIFICATIONS_LIST(state, payload) {
      state.notifications = payload;
    },

    // Notifications

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
        const isAdmin = res.data.user.is_admin;
        localStorage.setItem('is-admin', isAdmin);
        commit('SET_IS_ADMIN', isAdmin);
        commit('SET_USER', res.data.user);
        commit('SET_TOKEN', res.data.token);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    logout: ({ commit }) => {
      localStorage.clear();
      commit('SET_IS_ADMIN', false);
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
    loadDueCargoPackings: async ({ commit }, page) => {
      try {
        const res = await api.get(`due-cargo-packing?page=${page}`);
        commit('SET_CARGO_PACKINGS', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadPaidCargoPackings: async ({ commit }, page) => {
      try {
        const res = await api.get(`paid-cargo-packing?page=${page}`);
        commit('SET_CARGO_PACKINGS', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    createCargoPacking: async ({ dispatch }, payload) => {
      try {
        const res = await api.post('cargo-packing', payload);
        await dispatch('loadCargoPackings', 1);
        return res;
      } catch (err) {
        console.log(err);
        throw err.response.data.error;
      }
    },
    updateCargoPacking: async ({ dispatch }, payload) => {
      try {
        const res = await api.put(`cargo-packing/${payload.cargoPackingId}`, payload.cargoPacking);
        await dispatch('loadCargoPackings', 1);
        return res;
      } catch (err) {
        console.log(err);
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
    loadCargoPackingToEdit: async ({ commit }, payload) => {
      try {
        const res = await api.get(`/cargo-packing-edit/${payload}`);
        commit('SET_SELECTED_CARGO_PACKING', res.data);
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadAnalysisCargoPackings: async ({ commit }) => {
      try {
        const res = await api.get(`analysis-cargo-packing`);
        commit('SET_CARGO_PACKINGS', res.data);
      } catch (err) {
        throw err.response.data.error;
      }
    },
    setEditingCargoPackingDate: ({ commit }, payload) => {
      commit('SET_EDITING_CARGO_PACKING_DATE', payload);
    },
    // End of Cargo Packings

    // Users
    createUser: async ({ commit }, payload) => {
      try {
        const res = await api.post('users', payload);
        commit('CREATE_USER', payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },

    loadUsers: async ({ commit }) => {
      try {
        const res = await api.get('users-list');
        console.log(res.data);
        commit('SET_USERS_LIST', res.data);
        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },

    loadSelectedUser: async ({ commit }, payload) => {
      try {
        const res = await api.get(`user/${payload}`);
        commit('SET_SELECTED_USER', res.data);
        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },

    updateUser: async (context, payload) => {
      try {
        const res = await api.put(`user/${payload.id}`, payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    // End of users

    // Intermediary Customers
    createIntermediaryCustomer: async ({ commit }, payload) => {
      try {
        const res = await api.post('intermediaries', payload);
        commit('CREATE_INTERMEDIARY', payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadIntermediaries: async ({ commit }) => {
      try {
        const res = await api.get('intermediaries');
        commit('SET_INTERMEDIARIES_LIST', res.data);
        console.log(res.data);
        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadSelectedIntermediary: async ({ commit }, payload) => {
      try {
        const res = await api.get(`intermediary/${payload}`);
        console.log(res.data);
        commit('SET_SELECTED_INTERMEDIARY', res.data);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    loadNonRelatedCustomers: async ({ commit }) => {
      try {
        const res = await api.get('non-related-customers');
        commit('SET_NON_RELATED_CUSTOMERS_LIST', res.data);

        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },
    updateIntermediary: async (context, payload) => {
      try {
        const res = await api.put(`intermediary/${payload.id}`, payload);
        return res;
      } catch (err) {
        throw err.response.data.error;
      }
    },

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
    // Eggs

    // Notifications

    loadNotifications: async ({ commit }) => {
      try {
        const res = await api.get('notifications');
        commit('SET_NOTIFICATIONS_LIST', res.data);
      } catch (err) {
        throw err.response.data.error;
      }
    },

    handleNotificationReading: async ({ dispatch }, payload) => {
      try {
        console.log('carai');
        const { id, users_to_notify } = payload;
        const teste = {
          users_to_notify: users_to_notify,
        };
        console.log('notification id', id);
        console.log('teste', teste);
        const res = await api.put(`notifications/${id}`, {
          users_to_notify: users_to_notify,
        });
        console.log(res.data);
        dispatch('loadNotifications');

        return res.data;
      } catch (err) {
        throw err.response.data.error;
      }
    },

    // Notifications
  },
  modules: {},
});
