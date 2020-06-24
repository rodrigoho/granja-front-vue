<template>
  <div class="new-cargo-packing">
    <b-container fluid>
      <r-header
        :title="'Cliente'"
        :buttonTitle="'Voltar aos clientes'"
        :toRouterName="'customers'"
      />
      <b-card align-h="center" class="align-cards">
        <!-- CargoPacking form -->
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <!-- Customer Data section -->
          <h3>Dados</h3>

          <b-row cols="2" class="flex">
            <!-- Customer name -->
            <b-col>
              <b-form-group id="input-group-name" label="Nome completo:" label-for="input-name">
                <b-form-input
                  id="input-name"
                  v-model="form.customerName"
                  required
                  size="sm"
                  placeholder="Digite o nome completo"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer email -->
            <b-col>
              <b-form-group id="input-group-email" label="Email:" label-for="input-email">
                <b-form-input
                  id="input-email"
                  v-model="form.customerEmail"
                  type="email"
                  required
                  size="sm"
                  placeholder="Digite o email"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer phone number -->
            <b-col>
              <b-form-group
                id="input-group-phone"
                label="Telefone:"
                label-for="input-phone"
                description="(61) 99999-9999"
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
            </b-col>

            <!-- Customer CNPJ -->
            <b-col>
              <b-form-group
                id="input-group-cnpj"
                label="CNPJ:"
                label-for="input-cnpj"
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
            </b-col>
          </b-row>
          <!-- End of Customer Data section -->

          <!-- Customer Fees -->
          <h3>Taxas</h3>

          <b-row class="flex" cols="3">
            <!-- Customer Discount -->
            <b-col>
              <b-form-group
                id="input-group-discount"
                label="Desconto:"
                label-for="input-discount"
                description="1.0 ou 2.0"
              >
                <b-form-input
                  id="input-discount"
                  type="number"
                  v-model="form.customerDiscount"
                  step="0.1"
                  placeholder="Valor do desconto"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer Rural fund discount -->
            <b-col>
              <b-form-group
                id="input-group-rural-fund"
                label="Fundo Rural:"
                label-for="input-rural-fund"
                description="1.4% ou 1.5%"
              >
                <b-form-input
                  id="input-rural-fund"
                  type="decimal"
                  v-model="form.customerRuralFund"
                  step="0.1"
                  required
                  size="sm"
                  placeholder="Valor do fundo rural"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer ICMS -->
            <b-col>
              <b-form-group
                id="input-group-icms"
                label="ICMS:"
                label-for="input-icms"
                description="2.00 ou 3.50"
              >
                <b-form-input
                  id="input-icms"
                  v-model="form.customerIcms"
                  type="number"
                  step="0.1"
                  required
                  size="sm"
                  placeholder="Valor do ICMS"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Customer Address -->
          <h3>Endereço</h3>

          <!-- Customer Zipcode -->
          <b-row align-v="center" cols="4" class="flex">
            <b-col sm="3" class="test">
              <b-form-group
                id="input-group-zipcode"
                label="CEP:"
                label-for="input-zipcode"
                description="00000-001"
                class="same"
              >
                <b-form-input
                  id="input-zipcode"
                  type="text"
                  v-model="form.customerZipcode"
                  placeholder="Digite o CEP"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Search Zipcode button -->
            <b-col sm="2">
              <b-button
                type="button"
                variant="primary"
                size="sm"
                class="align-button"
                @click="handleZipcode"
                >Pesquisar</b-button
              >
            </b-col>

            <!-- Customer State select -->
            <b-col sm="3" class="test">
              <b-form-group
                id="input-group-3"
                label="Estado:"
                label-for="input-3"
                class="align-input"
              >
                <b-form-select id="input-3" v-model="form.customerState" size="sm">
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled>Selecione</b-form-select-option>
                  </template>
                  <b-form-select-option
                    v-for="(state, idx) in states"
                    :value="state.text"
                    :key="idx"
                    >{{ state.text }}</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </b-col>

            <!-- Customer City -->
            <b-col sm="4" class="test">
              <b-form-group
                id="input-group-city"
                label="Cidade:"
                label-for="input-city"
                class="align-input"
              >
                <b-form-input
                  id="input-city"
                  type="text"
                  v-model="form.customerAddressCity"
                  placeholder="Digite a cidade"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Customer Address line -->
          <b-row align-v="center" class="flex" cols="2">
            <b-col sm="6" class="test">
              <b-form-group
                id="input-group-line"
                label="Endereço:"
                label-for="input-line"
                class="same"
              >
                <b-form-input
                  id="input-line"
                  type="text"
                  v-model="form.customerAddressLine"
                  placeholder="Digite o endereço"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer Neighborhood -->
            <b-col sm="6" class="test">
              <b-form-group
                id="input-group-neighborhood"
                label="Bairro:"
                label-for="input-neighborhood"
                class="same"
              >
                <b-form-input
                  id="input-neighborhood"
                  type="text"
                  v-model="form.customerAddrNeighborhood"
                  placeholder="Nome do bairro"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-v="center" class="flex" cols="2">
            <!-- Customer Address Complement -->
            <b-col sm="8" class="test">
              <b-form-group
                id="input-group-complement"
                label="Complemento:"
                label-for="input-complement"
                class="same"
              >
                <b-form-input
                  id="input-complement"
                  type="text"
                  v-model="form.customerAddressComplement"
                  placeholder="Digite o complemento"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer Address Number -->
            <b-col sm="4" class="test">
              <b-form-group
                id="input-group-number"
                label="Número:"
                label-for="input-number"
                class="same"
              >
                <b-form-input
                  id="input-number"
                  type="text"
                  v-model="form.customerAddressNumber"
                  placeholder="Digite o número"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="form-buttons">
            <b-button type="reset" variant="danger" size="sm">Limpar</b-button>
            <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
          </div>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import STATES_LIST from '@/constants/NewCustomer';

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
        customerZipcode: '',
        customerState: null,
        customerCity: '',
        customerAddressLine: '',
        customerAddrNeighborhood: '',
        customerAddressComplement: '',
        customerAddressNumber: '',
        food: null,
        checked: [],
      },
      states: STATES_LIST,
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
    ...mapActions(['loadCustomers', 'loadSelectedCustomer', 'createCustomer']),
    async handleCustomersList() {
      await this.loadCustomers();
      const customersMap = [...this.getCustomers.map((c) => ({ value: c.id, text: c.name }))];

      this.customersList = customersMap;
    },
    async handleZipcode() {
      const response = await axios.get(
        `https://viacep.com.br/ws/${this.form.customerZipcode}/json`
      );
      this.form.customerState = response.data.uf;
      this.form.customerAddressCity = response.data.localidade;
      this.form.customerAddressLine = response.data.logradouro;
      this.form.customerAddrNeighborhood = response.data.bairro;
      console.log(response.data);
    },
    onSubmit(evt) {
      evt.preventDefault();
      const customer = this.form;
      const newCustomer = {
        name: customer.customerName,
        cnpj: customer.customerCnpj,
        phone: customer.customerPhone,
        email: customer.customerEmail,
        discount: customer.customerDiscount,
        rural_fund_tax: customer.customerRuralFund,
        icms_tax: customer.customerIcms,
        zip_code: customer.customerZipcode,
        address: {
          public_area: customer.customerAddressLine,
          complement: customer.customerAddressComplement,
          city: customer.customerAddressCity,
          neighborhood: customer.customerAddrNeighborhood,
          state: customer.customerState,
        },
      };

      this.createCustomer(newCustomer);
      this.$router.push({ name: 'customers' });
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
      this.form.customerZipcode = '';
      this.form.customerState = null;
      this.form.customerCity = '';
      this.form.customerAddressLine = '';
      this.form.customerAddrNeighborhood = '';
      this.form.customerAddressComplement = '';
      this.form.customerAddressNumber = '';
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
  width: 600px;
}

.flex {
  display: flex;
  padding: 0 1.375rem;
  .test {
    padding: 0 0.375rem;
  }
}

.align-button {
  position: relative;
  bottom: 0.195rem;
  right: 0.675rem;
}

.align-input {
  position: relative;
  bottom: 0.695rem;
}

.col {
  padding: 0 0.375rem;
}

.teste {
  width: 250px;
  padding-left: 0.9375rem;
  margin-bottom: 0.9375rem;
}
.section-header {
  background: red;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  /* padding-right: 0.9375rem; */

  button + button {
    margin-left: 0.9375rem;
  }
}
</style>
