<template>
  <div class="user-details">
    <r-header :title="'Usuário'" :buttonTitle="'Voltar aos usuários'" :toRouteName="'users'" :shouldShowButton="true" />
    <b-container>
      <b-card align-h="center" class="align-cards">
        <template v-slot:header>
          <h4 class="mb-0">{{ user.name }}</h4>
        </template>
        <b-row cols="2">
          <b-col><label-value :values="userData" /></b-col>
          <b-col
            ><div><strong>Endereço:</strong></div>
            {{ address }}</b-col
          >
        </b-row>
        <template v-slot:footer>
          <div class="footer">
            <b-button size="sm" variant="primary" @click="handleEdit">Editar</b-button>
            <!-- <b-button size="sm" variant="danger" @click="handleDelete">Remover</b-button> -->
          </div>
        </template>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import LabelValue from '@/components/LabelValue.vue';
import { mapActions } from 'vuex';
export default {
  name: 'UserDetails',
  components: {
    RHeader,
    LabelValue,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('selectedUser')),
    };
  },
  methods: {
    ...mapActions(['deleteUser', 'loadUsers', 'setUserToEdit']),
    async handleEdit() {
      await this.setUserToEdit(this.user);
      this.$router.push({ name: 'newUser' });
    },
    handleDelete() {
      this.$bvModal
        .msgBoxConfirm('Deseja mesmo excluir este usuário?', {
          centered: true,
          size: 'sm',
          buttonSize: 'sm',
          okTitle: 'Sim',
          cancelTitle: 'Cancelar',
        })
        .then(async (value) => {
          if (value) {
            this.deleteUser(this.customer.id);
            await this.loadCustomers();

            this.$router.push({ name: 'users' });
          }
        })
        .catch((err) => {
          console.log(err);
          // An error occurred
        });
    },
  },
  computed: {
    userdata: () => {
      const c = JSON.parse(localStorage.getItem('selectedUser'));
      return [
        {
          label: 'Nome',
          value: c.name,
        },
        {
          label: 'CNPJ',
          value: c.cnpj ? c.cnpj : '-',
        },
        {
          label: 'Telefone',
          value: c.phone,
        },
        {
          label: 'Email',
          value: c.email ? c.email : '-',
        },
        {
          label: 'Desconto',
          value: c.discount,
        },
        {
          label: 'Taxa ovo vermelho',
          value: c.red_egg_tax,
        },
        {
          label: 'Fundo Rural',
          value: c.rural_fund_tax,
        },
        {
          label: 'ICMS',
          value: c.icms_tax,
        },
      ];
    },
    address: () => {
      const c = JSON.parse(localStorage.getItem('selectedUser')).address;
      const { public_area: publicArea, complement, neighborhood, city, state, number } = c;
      let address = `${publicArea}, ${complement}, ${number}, ${neighborhood}, ${city}, ${state}`;
      address = address.replace('undefined, ', '');
      address = address.replace(', ,', ',');
      return address;
    },
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  background: #fff;
  margin: 50px auto;
  width: 700px;
}
.row {
  padding: 0 5px;
}
.footer {
  button + button {
    margin-left: 10px;
  }
}
</style>
