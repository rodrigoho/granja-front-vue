<template>
  <div class="new-customer">
    <r-header
      :title="'Cliente'"
      :buttonTitle="'Voltar aos clientes'"
      :toRouteName="'customers'"
      :shouldShowButton="true"
    />
    <b-container fluid>
      <b-card align-h="center" class="align-cards">
        <!-- CargoPacking form -->
        <b-form @submit="onSubmit" @reset="onReset">
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

            <!-- Customer Fantasy name -->
            <b-col>
              <b-form-group id="input-group-fantasy-name" label="Nome fantasia:" label-for="input-fantasy-name">
                <b-form-input
                  id="input-fantasy-name"
                  v-model="form.customerFantasyName"
                  required
                  size="sm"
                  placeholder="Digite o nome fantasia"
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
                  v-mask="phoneMask"
                  v-model="form.customerPhone"
                  size="sm"
                  placeholder="Digite o telefone"
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
                  size="sm"
                  placeholder="Digite o email"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer CNPJ -->
            <b-col>
              <b-form-group id="input-group-cnpj" label="CNPJ:" label-for="input-cnpj" description="00.000.000/0001-01">
                <b-form-input
                  id="input-cnpj"
                  v-model="form.customerCnpj"
                  v-mask="'##.###.###/####-##'"
                  type="text"
                  size="sm"
                  placeholder="Digite o CNPJ"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Customer Data section -->

          <!-- Customer Fees -->
          <h3>Taxas</h3>

          <b-row class="flex" cols="4">
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
                  type="text"
                  v-model="form.customerDiscount"
                  required
                  placeholder="0"
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
                  type="text"
                  v-model="form.customerRuralFund"
                  required
                  size="sm"
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer ICMS -->
            <b-col>
              <b-form-group id="input-group-icms" label="ICMS:" label-for="input-icms" description="2.00 ou 3.50">
                <b-form-input
                  id="input-icms"
                  v-model="form.customerIcms"
                  type="text"
                  required
                  size="sm"
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Customer Address -->
          <h3>Endereço</h3>

          <!-- Customer Zipcode -->
          <b-row align-v="center" cols="4" class="flex">
            <b-col sm="3" class="address-align">
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
                  v-mask="'#####-###'"
                  placeholder="Digite o CEP"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Search Zipcode button -->
            <b-col sm="2">
              <b-button type="button" variant="primary" size="sm" class="align-button" @click="handleZipcode"
                >Pesquisar</b-button
              >
            </b-col>

            <!-- Customer State select -->
            <b-col sm="3" class="address-align">
              <b-form-group id="input-group-3" label="Estado:" label-for="input-3" class="align-input">
                <b-form-select id="input-3" v-model="form.customerState" size="sm">
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled>Selecione</b-form-select-option>
                  </template>
                  <b-form-select-option v-for="(state, idx) in states" :value="state.text" :key="idx" required>{{
                    state.text
                  }}</b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>

            <!-- Customer City -->
            <b-col sm="4" class="address-align">
              <b-form-group id="input-group-city" label="Cidade:" label-for="input-city" class="align-input">
                <b-form-input
                  id="input-city"
                  type="text"
                  v-model="form.customerAddrCity"
                  placeholder="Digite a cidade"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Customer Address line -->
          <b-row align-v="center" class="flex" cols="2">
            <b-col sm="7" class="address-align">
              <b-form-group id="input-group-line" label="Endereço:" label-for="input-line" class="same">
                <b-form-input
                  id="input-line"
                  type="text"
                  v-model="form.customerAddressLine"
                  placeholder="Digite o endereço"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Customer Neighborhood -->
            <b-col sm="5" class="address-align">
              <b-form-group id="input-group-neighborhood" label="Bairro:" label-for="input-neighborhood" class="same">
                <b-form-input
                  id="input-neighborhood"
                  type="text"
                  v-model="form.customerAddrNeighborhood"
                  placeholder="Nome do bairro"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-v="center" class="flex">
            <!-- Customer Address Complement -->
            <b-col class="address-align">
              <b-form-group id="input-group-complement" label="Complemento:" label-for="input-complement" class="same">
                <b-form-input
                  id="input-complement"
                  type="text"
                  v-model="form.customerAddressComplement"
                  placeholder="Digite o complemento"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="address-align" sm="3">
              <b-form-group id="input-group-number" label="Número:" label-for="input-number" class="same">
                <b-form-input
                  id="input-number"
                  type="text"
                  v-model="form.customerAddressNumber"
                  placeholder="Digite o Número"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="form-buttons">
            <b-button type="reset" variant="danger" size="sm">Limpar</b-button>
            <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
            <b-button v-if="customerEditing" @click="handleCancel" type="button" size="sm">Cancelar</b-button>
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
  name: 'NewCustomer',
  components: {
    RHeader,
  },
  data() {
    return {
      // phoneMask: this.phoneLength < 15 ? '(##) ####-####' : '(##) #####-####',
      form: {
        id: null,
        customerName: '',
        customerFantasyName: '',
        customerEmail: '',
        customerPhone: '',
        customerCnpj: '',
        customerDiscount: 0,
        customerRuralFund: 0.0,
        customerIcms: 0.0,
        customerZipcode: '',
        customerState: null,
        customerAddrCity: '',
        customerAddressLine: '',
        customerAddrNeighborhood: '',
        customerAddressComplement: '',
        checked: [],
      },
      customerEditing: false,
      customerId: null,
      states: STATES_LIST,
      selectedUserId: null,
    };
  },
  mounted() {
    if (this.$route.params.id) this.handleCustomerLoading(this.$route.params.id);
    // this.setCustomerToEdit(null);
  },
  methods: {
    ...mapActions(['loadCustomers', 'loadSelectedCustomer', 'createCustomer', 'setCustomerToEdit', 'updateCustomer']),
    handleCancel() {
      this.$router.push({ name: 'customerDetails' });
    },
    async handleCustomerLoading(customerId) {
      await this.loadSelectedCustomer(customerId);

      const {
        id,
        cnpj,
        discount,
        email,
        icms_tax,
        name,
        fantasy_name,
        phone,
        rural_fund_tax,
        zip_code,
        address,
      } = this.getSelectedCustomer;
      this.form.id = id;
      this.form.customerName = name;
      this.form.customerFantasyName = fantasy_name;
      this.form.customerEmail = email;
      this.form.customerPhone = phone;
      this.form.customerCnpj = cnpj;
      this.form.customerDiscount = parseFloat(discount).toFixed(2);
      this.form.customerRuralFund = parseFloat(rural_fund_tax).toFixed(2);
      this.form.customerIcms = parseFloat(icms_tax).toFixed(2);
      this.form.customerZipcode = zip_code;
      this.form.customerState = address.state;
      this.form.customerAddrCity = address.city;
      this.form.customerAddressLine = address.public_area;
      this.form.customerAddrNeighborhood = address.neighborhood;
      this.form.customerAddressComplement = address.complement;
      this.form.customerAddressNumber = address.number;
      this.customerEditing = true;
    },
    async handleZipcode() {
      const response = await axios.get(`https://viacep.com.br/ws/${this.form.customerZipcode}/json`);
      this.form.customerState = response.data.uf;
      this.form.customerAddrCity = response.data.localidade;
      this.form.customerAddressLine = response.data.logradouro;
      this.form.customerAddrNeighborhood = response.data.bairro;
    },
    formatNumber(numberToFormat) {
      return numberToFormat.length > 0 ? numberToFormat.replace(',', '.') : numberToFormat;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      const customer = this.form;
      const customerData = {
        id: customer.id,
        name: customer.customerName,
        fantasy_name: customer.customerFantasyName,
        cnpj: customer.customerCnpj,
        phone: customer.customerPhone,
        email: customer.customerEmail,
        discount: this.formatNumber(customer.customerDiscount),
        rural_fund_tax: this.formatNumber(customer.customerRuralFund),
        icms_tax: this.formatNumber(customer.customerIcms),
        zip_code: customer.customerZipcode,
        address: {
          public_area: customer.customerAddressLine,
          complement: customer.customerAddressComplement,
          number: customer.customerAddressNumber,
          city: customer.customerAddrCity,
          neighborhood: customer.customerAddrNeighborhood,
          state: customer.customerState,
        },
      };
      // try {
      if (this.$route.name === 'newCustomer') {
        const res = await this.createCustomer(customerData);
        this.$router.push({ path: `/customers/customer-details/${res.data.id}` });
      } else {
        this.handleUpdate(customerData);
        this.$router.push({ path: `/customers/customer-details/${this.$route.params.id}` });
      }
      // }
      // catch (err) {
      //   this.$bvToast.toast(`${err}`, {
      //     title: 'Verifique os dados',
      //     autoHideDelay: 5000,
      //     variant: 'danger',
      //   });
    },
    async handleUpdate(customerData) {
      await this.updateCustomer(customerData);
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
    },
  },
  computed: {
    ...mapGetters(['getCustomers', 'getSelectedCustomer', 'getCustomerToEdit']),
    phoneMask() {
      return this.form.customerPhone.length < 15 ? '(##) ####-####' : '(##) #####-####';
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
  width: 600px;
}

.flex {
  display: flex;
  padding: 0 1.375rem;
  .address-align {
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

.form-buttons {
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 0.9375rem;
  }
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
