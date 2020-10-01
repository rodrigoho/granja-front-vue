<template>
  <div class="new-intermediary-customer">
    <r-header
      :title="'Intermediário'"
      :buttonTitle="'Voltar aos intermediários'"
      :toRouteName="'intemediaryCustomers'"
      :shouldShowButton="true"
    />
    <b-container fluid>
      <b-card align-h="center" class="align-cards">
        <!-- Intermediary Customer form -->
        <b-form @submit="onSubmit" @reset="onReset">
          <!-- Intermediary Customer Data section -->
          <h3>Dados</h3>

          <b-row cols="2" class="flex">
            <!-- Intermediary Customer name -->
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
                  size="sm"
                  placeholder="Digite o email"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Intermediary Customer phone number -->
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

            <!-- Intermediary Customer City -->
            <b-col>
              <b-form-group id="input-group-cnpj" label="CNPJ:" label-for="input-cnpj" description="00.000.000/0001-01">
                <b-form-input
                  id="input-cnpj"
                  v-model="form.customerCnpj"
                  type="text"
                  size="sm"
                  placeholder="Digite o CNPJ"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Customer Data section -->

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
  name: 'NewCargoPacking',
  components: {
    RHeader,
  },
  data() {
    return {
      form: {
        id: null,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerCnpj: '',
        customerDiscount: 0,
        customerAdditionalFee: 0.0,
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
  created() {
    if (this.getCustomerToEdit) {
      const {
        id,
        cnpj,
        discount,
        email,
        icms_tax,
        name,
        phone,
        rural_fund_tax,
        zip_code,
        address,
      } = this.getCustomerToEdit;
      this.form.id = id;
      this.form.customerName = name;
      this.form.customerEmail = email;
      this.form.customerPhone = phone;
      this.form.customerCnpj = cnpj;
      this.form.customerDiscount = discount;
      this.form.customerRuralFund = rural_fund_tax;
      this.form.customerIcms = icms_tax;
      this.form.customerZipcode = zip_code;
      this.form.customerState = address.state;
      this.form.customerAddrCity = address.city;
      this.form.customerAddressLine = address.public_area;
      this.form.customerAddrNeighborhood = address.neighborhood;
      this.form.customerAddressComplement = address.complement;
      this.form.customerAddressNumber = address.number;
      this.customerEditing = true;
    }
    this.setCustomerToEdit(null);
  },
  methods: {
    ...mapActions(['loadCustomers', 'loadSelectedCustomer', 'createCustomer', 'setCustomerToEdit', 'editCustomer']),
    handleCancel() {
      this.$router.push({ name: 'customerDetails' });
    },
    async handleZipcode() {
      const response = await axios.get(`https://viacep.com.br/ws/${this.form.customerZipcode}/json`);
      this.form.customerState = response.data.uf;
      this.form.customerAddrCity = response.data.localidade;
      this.form.customerAddressLine = response.data.logradouro;
      this.form.customerAddrNeighborhood = response.data.bairro;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      const customer = this.form;
      const customerData = {
        id: customer.id,
        name: customer.customerName,
        cnpj: customer.customerCnpj,
        phone: customer.customerPhone,
        email: customer.customerEmail,
        discount: customer.customerDiscount,
        rural_fund_tax: customer.customerRuralFund,
        red_egg_tax: customer.customerAdditionalFee,
        icms_tax: customer.customerIcms,
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
      try {
        if (this.customerEditing) {
          await this.editCustomer(customerData);
        } else {
          await this.createCustomer(customerData);
        }
        await this.loadCustomers();
        this.$router.push({ name: 'customers' });
      } catch (err) {
        this.$bvToast.toast(`${err}`, {
          title: 'Verifique os dados',
          autoHideDelay: 5000,
          variant: 'danger',
        });
      }
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
