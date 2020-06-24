<template>
  <div class="new-cargo-packing">
    <b-container fluid>
      <r-header
        :title="'Romaneio'"
        :buttonTitle="'Voltar à pagina anterior'"
        :toRouterName="'home'"
      />
      <b-card align-h="center" class="align-cards">
        <h4>Cliente</h4>
        <div class="flex">
          <b-form-select
            id="input-3"
            v-model="selectedUserId"
            :options="customersList"
            @change="handleCustomerSelect"
            size="sm"
            class="teste"
          >
            <template v-slot:first>
              <b-form-select-option :value="null" disabled
                >Selecione um cliente</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
        <!-- CargoPacking form -->
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <!-- Customer data section -->
          <h3>Dados</h3>
          <div class="flex">
            <!-- Customer name -->
            <b-form-group
              id="input-group-name"
              label="Nome completo:"
              label-for="input-name"
              class="same"
            >
              <b-form-input
                id="input-name"
                v-model="form.customerName"
                required
                size="sm"
                placeholder="Digite o nome completo"
              ></b-form-input>
            </b-form-group>

            <!-- Customer email -->
            <b-form-group
              id="input-group-email"
              label="Email:"
              label-for="input-email"
              class="same"
            >
              <b-form-input
                id="input-email"
                v-model="form.customerEmail"
                type="email"
                required
                size="sm"
                placeholder="Digite o email"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="flex">
            <!-- Customer phone number -->
            <b-form-group
              id="input-group-phone"
              label="Telefone:"
              label-for="input-phone"
              description="(61) 99999-9999"
              class="same"
            >
              <b-form-input
                id="input-phone"
                type="text"
                v-model="form.customerPhone"
                required
                size="sm"
                placeholder="Digite o telefone"
              ></b-form-input>
            </b-form-group>

            <!-- Customer CNPJ -->
            <b-form-group
              id="input-group-cnpj"
              label="CNPJ:"
              label-for="input-cnpj"
              class="same"
              description="00.000.000/0001-01"
            >
              <b-form-input
                id="input-cnpj"
                v-model="form.customerCnpj"
                type="text"
                required
                size="sm"
                placeholder="Digite o CNPJ"
              ></b-form-input>
            </b-form-group>
          </div>

          <!-- Customer Fees -->
          <h3>Taxas</h3>
          <div class="flex">
            <!-- Customer Discount -->
            <b-form-group
              id="input-group-discount"
              label="Desconto:"
              label-for="input-discount"
              description="1.0 ou 2.0"
              class="same"
            >
              <b-form-input
                id="input-discount"
                type="text"
                v-model="form.customerDiscount"
                placeholder="Valor do desconto"
                size="sm"
              ></b-form-input>
            </b-form-group>

            <!-- Customer Rural fund discount -->
            <b-form-group
              id="input-group-rural-fund"
              label="Fundo Rural:"
              label-for="input-rural-fund"
              description="(61) 99999-9999"
              class="same"
            >
              <b-form-input
                id="input-rural-fund"
                type="text"
                v-model="form.customerRuralFund"
                required
                size="sm"
                placeholder="Valor do fundo rural"
              ></b-form-input>
            </b-form-group>

            <!-- Customer ICMS -->
            <b-form-group
              id="input-group-icms"
              label="ICMS:"
              label-for="input-icms"
              class="same"
              description="1.2"
            >
              <b-form-input
                id="input-icms"
                v-model="form.customerIcms"
                type="text"
                required
                size="sm"
                placeholder="Valor do ICMS"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="form-buttons">
            <b-button type="reset" variant="danger" size="sm">Limpar</b-button>
            <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
          </div>
        </b-form>
      </b-card>
      <!-- <r-header
        :title="'Romaneios'"
        :buttonTitle="'Voltar à pagina anterior'"
        :toRouterName="'home'"
      />
      <b-row align-h="center" class="align-cards">
        <b-card header="Novo Romaneio" class="login-card">
          <b-form @submit.prevent="submit">
            <b-form-group>
              <b-form-input size="sm" type="email" required placeholder="Digite seu email" />
            </b-form-group>

            <b-form-group>
              <b-form-input size="sm" type="password" placeholder="Digite sua senha" />
            </b-form-group>
            <b-button class="login-button" type="submit" variant="primary" size="sm"
              >Entrar</b-button
            >
          </b-form>
        </b-card>
      </b-row>-->
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NewCargoPacking',
  components: {
    RHeader,
  },
  data() {
    return {
      form: {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerCnpj: '',
        customerDiscount: '',
        customerRuralFund: '',
        customerIcms: '',
        food: null,
        checked: [],
      },
      customersList: [],
      selectedUserId: null,
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true,
    };
  },
  created() {
    this.handleCustomersList();
  },
  methods: {
    ...mapActions(['loadCustomers', 'loadSelectedCustomer']),
    async handleCustomersList() {
      await this.loadCustomers();
      const customersMap = [...this.getCustomers.map((c) => ({ value: c.id, text: c.name }))];

      this.customersList = customersMap;
    },
    async handleCustomerSelect() {
      await this.loadSelectedCustomer(this.selectedUserId);
      const customer = this.getSelectedCustomer;
      this.form.customerName = customer.name;
      this.form.customerEmail = customer.email;
      this.form.customerPhone = customer.phone;
      this.form.customerCnpj = customer.cnpj;
      this.form.customerDiscount = customer.discount;
      this.form.customerRuralFund = customer.rural_fund_tax;
      this.form.customerIcms = customer.icms_tax;
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.customerName = '';
      this.form.customerEmail = '';
      this.form.customerPhone = '';
      this.form.customerCnpj = '';
      this.form.customerDiscount = '';
      this.form.customerRuralFund = '';
      this.form.customerIcms = '';
      this.selectedUserId = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    ...mapGetters(['getCustomers', 'getSelectedCustomer']),
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

.flex {
  display: flex;
  padding: 0 15px;
  .same {
    flex-grow: 1;
  }
  .same + .same {
    margin-left: 15px;
  }
}
.teste {
  width: 250px;
  padding-left: 15px;
  margin-bottom: 15px;
}
.section-header {
  background: red;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;

  button + button {
    margin-left: 15px;
  }
}
</style>
