<template>
  <b-container>
    <b-row align-h="center">
      <b-card header="Login" class="login-card">
        <b-form @submit.prevent="submit">
          <b-form-group>
            <b-form-input size="sm" v-model="form.email" type="email" required placeholder="Digite seu email" />
          </b-form-group>

          <b-form-group>
            <b-form-input size="sm" v-model="form.password" type="password" placeholder="Digite sua senha" />
          </b-form-group>
          <span>{{ loginError }}</span>
          <b-button
            v-if="usersList && !usersList.count"
            class="new-user-button"
            type="button"
            variant="primary"
            size="sm"
            @click="handleNewUser"
            >Novo usuário</b-button
          >
          <b-button class="login-button" type="submit" variant="primary" size="sm">Entrar</b-button>
        </b-form>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    token: '',
    loginError: '',
    form: {
      email: '',
      password: '',
    },
    usersList: null,
  }),
  created() {
    this.handleLoadUsers();
  },
  methods: {
    ...mapActions(['login', 'loadUsers']),
    async handleLoadUsers() {
      this.usersList = await this.loadUsers();
    },
    handleNewUser() {
      this.$router.push({ name: 'newUser', params: { isAdmin: true } });
    },
    async submit() {
      try {
        await this.login(this.form);
        this.$router.push({ name: 'home' });
      } catch (err) {
        this.loginError = err.response.data.error;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-card {
  margin-top: 10rem;
  width: 20rem;
}
.login-button {
  float: right;
}

span {
  color: red;
}
</style>
