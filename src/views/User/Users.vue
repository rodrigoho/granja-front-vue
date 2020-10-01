<template>
  <div class="users">
    <r-header :title="'Usuários'" :buttonTitle="'Novo usuário'" :toRouteName="'newUser'" :shouldShowButton="true" />
    <b-container>
      <b-row align-h="center" class="align-cards">
        <user v-for="(user, idx) in getUsers.rows" :key="idx" :user="user" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import User from '@/components/User.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UsersList',
  components: {
    RHeader,
    User,
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...mapActions(['loadUsers']),
  },
  computed: {
    ...mapGetters(['getUsers']),
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  align-items: flex-end;
}
</style>
