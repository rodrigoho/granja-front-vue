<template>
  <div>
    <b-navbar type="light" class="navbar" fixed="top">
      <b-navbar-brand href="#">
        <img src="@/assets/granja-small.png" />
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Romaneios</b-nav-item>
        <b-nav-item :to="{ name: 'eggs' }">Ovos</b-nav-item>
        <b-nav-item :to="{ name: 'customers' }">Clientes</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button @click="handleNotificationsClick" size="sm" variant="primary" style="min-width: 120px">
          Notificações <b-badge variant="light">{{ getNotifications }}</b-badge>
        </b-button>
        <b-nav-item-dropdown :text="getUserName" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item @click="handleLogout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  created() {
    this.handleAnalysisLoading();
  },
  methods: {
    ...mapActions(['logout', 'loadAnalysisCargoPackings']),
    async handleLogout() {
      await this.logout();
      this.$router.push({ name: 'login' });
    },
    async handleAnalysisLoading() {
      await this.loadAnalysisCargoPackings();
    },
    async handleNotificationsClick() {
      this.loadAnalysisCargoPackings();
    },
  },
  computed: {
    ...mapGetters(['getUserName', 'getNotifications']),
  },
};
</script>

<style scoped lang="scss">
.navbar {
  background: #fff;
}
</style>
