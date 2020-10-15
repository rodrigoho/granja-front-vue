<template>
  <div class="new-user">
    <r-header :title="'Usuário'" :buttonTitle="'Voltar aos usuários'" :toRouteName="'users'" :shouldShowButton="true" />
    <b-container>
      <b-row align-h="center">
        <b-card :header="header" class="login-card">
          <b-form @submit.prevent="submit">
            <b-form-group>
              <b-form-input
                size="sm"
                v-model="form.name"
                :disabled="isEditing"
                type="text"
                required
                placeholder="Nome completo"
              />
            </b-form-group>

            <b-form-group>
              <b-form-input
                size="sm"
                v-model="form.email"
                :disabled="isEditing"
                type="email"
                required
                placeholder="Email"
              />
            </b-form-group>

            <b-form-group v-if="isEditing">
              <b-form-input size="sm" v-model="form.oldPassword" type="password" placeholder="Senha atual" />
            </b-form-group>

            <b-form-group>
              <b-form-input size="sm" v-model="form.password" type="password" placeholder="Senha" />
            </b-form-group>

            <b-form-group>
              <b-form-input
                size="sm"
                v-model="form.confirmPassword"
                type="password"
                placeholder="Digite novamente a senha"
              />
            </b-form-group>
            <span>{{ createUserError }}</span>
            <b-button class="login-button" type="submit" variant="primary" size="sm">Salvar</b-button>
          </b-form>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import RHeader from '@/components/RHeader.vue';

export default {
  name: 'newUser',
  components: {
    RHeader,
  },
  data: () => ({
    token: '',
    createUserError: '',
    form: {
      id: null,
      email: '',
      name: '',
      loggedUserId: null,
      isAdmin: null,
      password: '',
    },
  }),
  mounted() {
    this.$route.params.id
      ? this.handleUserLoading(this.$route.params.id)
      : console.log('não tenho id', this.$route.params.isAdmin);
  },
  methods: {
    ...mapActions(['login', 'updateUser', 'loadSelectedUser', 'createUser']),
    async submit() {
      try {
        if (this.$route.params.id) {
          await this.updateUser({ ...this.form });
          this.$router.push({ name: 'users' });
        } else {
          console.log('opa');
          const newUser = {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            is_admin: this.$route.params.isAdmin,
          };
          console.log('after opa');
          await this.createUser(newUser);
          // }
          this.$router.push({ name: 'login' });
        }
      } catch (err) {
        this.$toasted.show(`${err}`, {
          theme: 'outline',
          duration: 2000,
          action: [
            {
              text: 'Cancelar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
            {
              text: 'Ok',
            },
          ],
        });
      }
    },
    async handleUserLoading(userId) {
      const user = await this.loadSelectedUser(userId);
      console.log(user);
      this.form.loggedUserId = parseInt(localStorage.getItem('userId'), 10);
      this.form.id = parseInt(this.$route.params.id, 10);
      this.form.isAdmin = localStorage.getItem('is-admin');
      this.form.email = user.email;
      this.form.name = user.name;
      this.form.password = user.password;
    },
  },
  computed: {
    header() {
      return this.$route.params.id ? 'Editando Usuário' : 'Novo Usuário';
    },
    isEditing() {
      return !!this.$route.params.id;
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
