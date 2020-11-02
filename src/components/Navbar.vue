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
        <b-nav-item :to="{ name: 'intermediaries' }">Intermediários</b-nav-item>
        <b-nav-item v-if="getIsAdmin || isAdmin" :to="{ name: 'users' }">Usuários</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- <div
          class="notifications"
          @click="handleNotificationsClick"
          size="sm"
          variant="primary"
          style="min-width: 120px"
        >
          Notificações <b-badge variant="light">{{ getNotifications }}</b-badge>
        </div> -->
        <!-- <b-nav-item-dropdown text="Notificações" right>
          <b-dropdown-item class="style-notifications" v-for="notification in notificationsList" :key="notification.id"
            >{{ notification.text }}<b-badge variant="light">{{ getNotifications }}</b-badge></b-dropdown-item
          >
        </b-nav-item-dropdown> -->
        <b-dropdown variant="primary" right>
          <template #button-content>
            Notificações <b-badge class="teste">{{ notificationsList.length }}</b-badge>
          </template>
          <b-dropdown-item
            class="style-notifications"
            v-for="notification in notificationsList"
            :key="notification.id"
            @click="handleNotificationClick(notification.cargo_packing_id)"
            >{{
              `${notification.message} por ${notification.user.name}, cliente: ${notification.customer_name}, nota: ${notification.receipt_number}`
            }}</b-dropdown-item
          >
        </b-dropdown>

        <b-nav-item-dropdown :text="getUserName" right>
          <b-dropdown-item @click="handleEdit">Alterar senha</b-dropdown-item>
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
  data() {
    return {};
  },
  mounted() {
    this.handleAnalysisLoading();
  },
  methods: {
    ...mapActions(['logout', 'loadAnalysisCargoPackings']),
    async handleLogout() {
      await this.logout();
      this.$router.push({ name: 'login' });
    },
    handleNotificationClick(cargoPackingId) {
      const sameRoute = this.$route.path.split('/')[1] === 'cargo-packing-details';
      if (sameRoute) {
        return this.$router.push({ name: `home`, params: { toRoute: `/cargo-packing-details/${cargoPackingId}` } });
      }
      console.log('NAO');
      this.$router.push({ path: `/cargo-packing-details/${cargoPackingId}` });
    },
    async handleEdit() {
      console.log(localStorage.getItem('userId'));
    },
    async handleAnalysisLoading() {
      await this.loadAnalysisCargoPackings();
    },
    async handleNotificationsClick() {
      this.loadAnalysisCargoPackings();
    },
  },
  computed: {
    ...mapGetters(['getUserName', 'getNotifications', 'getIsAdmin']),
    isAdmin() {
      return JSON.parse(localStorage.getItem('is-admin'));
    },
    notificationsList() {
      const userId = localStorage.getItem('userId');
      const t = this.getNotifications;
      const arrayDeTeste = [];
      t.forEach((n) => {
        console.log(JSON.stringify(n));
        console.log(n.users_to_notify);
        console.log(n.users_to_notify.includes(parseInt(userId)));
        if (n.users_to_notify.includes(parseInt(userId))) {
          console.log(n);
          arrayDeTeste.push(n);
        }
      });
      console.log(userId, arrayDeTeste);

      return arrayDeTeste;
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  background: #fff;
}

.notifications {
  color: white;
  background: rgba(0, 123, 255, 0.9);
}

.style-notifications {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.teste {
  background: red;
  border-radius: 4px;
}
</style>
