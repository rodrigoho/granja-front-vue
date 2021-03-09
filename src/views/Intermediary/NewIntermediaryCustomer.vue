<template>
  <div class="new-intermediary-customer">
    <r-header
      :title="'Intermediário'"
      :buttonTitle="'Voltar aos intermediários'"
      :toRouteName="'intermediaries'"
      :shouldShowButton="true"
    />
    <b-container fluid>
      <b-row>
        <b-col
          ><b-card align-h="center" class="align-cards">
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
                      v-model="form.intermediaryName"
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
                      v-model="form.intermediaryEmail"
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
                      v-mask="'(##) #####-####'"
                      v-model="form.intermediaryPhone"
                      size="sm"
                      placeholder="Digite o telefone"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row cols="2" class="flex">
                <!-- Intermediary State select -->
                <b-col sm="3" class="align-state-select">
                  <b-form-group id="input-group-3" label="Estado:" label-for="input-3" class="align-input">
                    <b-form-select id="input-3" v-model="form.intermediaryState" size="sm">
                      <template v-slot:first>
                        <b-form-select-option :value="null" disabled>Selecione</b-form-select-option>
                      </template>
                      <b-form-select-option v-for="(state, idx) in states" :value="state.text" :key="idx" required>{{
                        state.text
                      }}</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <!-- Intermediary Customer City -->
                <b-col>
                  <b-form-group id="input-group-city" label="Cidade:" label-for="input-city">
                    <b-form-input
                      id="input-city"
                      v-model="form.intermediaryCity"
                      type="text"
                      size="sm"
                      required
                      placeholder="Digite a Cidade"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- End of Customer Data section -->

              <div class="form-buttons">
                <b-button type="reset" variant="danger" size="sm">Limpar</b-button>
                <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
                <b-button v-if="intermediaryEditing" @click="handleCancel" type="button" size="sm">Cancelar</b-button>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import STATES_LIST from '@/constants/NewCustomer';

export default {
  name: 'NewIntermediaryCustomer',
  components: {
    RHeader,
  },
  data() {
    return {
      form: {
        id: null,
        intermediaryState: null,
        intermediaryName: '',
        intermediaryEmail: '',
        intermediaryPhone: '',
        intermediaryCity: '',
      },
      nonRelatedCustomersList: [],
      intermediaryEditing: false,
      customerId: null,
      states: STATES_LIST,
      selectedUserId: null,
      selectedCustomer: null,
      customersToAdd: [],
      addedCustomers: [],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      console.log();
      this.handleIntermediaryLoading();
    }
  },
  methods: {
    ...mapActions([
      'loadNonRelatedCustomers',
      'loadSelectedCustomer',
      'loadSelectedIntermediary',
      'createIntermediaryCustomer',
      'setCustomerToEdit',
      'editCustomer',
      'loadIntermediaries',
      'updateIntermediary',
    ]),
    async handleIntermediaryLoading() {
      await this.loadSelectedIntermediary(this.$route.params.id);

      const { id, email, name, phone, state, city } = this.getSelectedIntermediary;
      this.form.id = id;
      this.form.intermediaryName = name;
      this.form.intermediaryEmail = email;
      this.form.intermediaryPhone = phone;
      this.form.intermediaryState = state;
      this.form.intermediaryCity = city;
      this.intermediaryEditing = true;
    },
    handleCustomerClick(customer) {
      const removeIndex = this.addedCustomers.findIndex((c) => c.text === customer.text);
      const customerToRemove = this.addedCustomers.splice(removeIndex, 1);
      this.nonRelatedCustomersList.push(customerToRemove[0]);
    },
    async handleCustomerSelect(selectedCustomerName) {
      // await this.loadSelectedCustomer(this.selectedCustomerId);
      const removeIndex = this.nonRelatedCustomersList.findIndex((c) => c.text === selectedCustomerName);
      const customerToRelate = this.nonRelatedCustomersList.splice(removeIndex, 1);
      this.addedCustomers.push(customerToRelate[0]);
      this.customersToAdd.push(customerToRelate[0].value);
      this.selectedCustomer = null;
    },
    async handleNonRelatedCustomersLoading() {
      await this.loadNonRelatedCustomers();

      const nonRelatedCustomersMap = [
        ...this.getNonRelatedCustomersList.rows.map((c) => ({ value: c.id, text: c.name })),
      ];

      this.nonRelatedCustomersList = nonRelatedCustomersMap;
    },
    handleCancel() {
      this.$router.push({ name: 'intermediaryDetails' });
    },
    async onSubmit(evt) {
      evt.preventDefault();
      const intermediaryCustomer = this.form;
      const intermediaryCustomerData = {
        id: intermediaryCustomer.id,
        name: intermediaryCustomer.intermediaryName,
        phone: intermediaryCustomer.intermediaryPhone,
        email: intermediaryCustomer.intermediaryEmail,
        state: intermediaryCustomer.intermediaryState,
        city: intermediaryCustomer.intermediaryCity,
        customers: this.customersToAdd,
      };

      // try {
      if (this.$route.name === 'newIntermediaryCustomer') {
        const res = await this.createIntermediaryCustomer(intermediaryCustomerData);
        this.$router.push({ path: `/intermediary/intermediary-details/${res.data.id}` });
      } else {
        await this.updateIntermediary(intermediaryCustomerData);
        this.$router.push({ path: `/intermediary/intermediary-details/${this.$route.params.id}` });
        // }
        // } catch (err) {
        //   this.$bvToast.toast(`${err}`, {
        //     title: 'Verifique os dados',
        //     autoHideDelay: 5000,
        //     variant: 'danger',
        //   });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.intermediaryName = '';
      this.form.intermediaryEmail = '';
      this.form.intermediaryPhone = '';
      this.form.customerCnpj = '';
      this.form.customerDiscount = '';
      this.form.customerRuralFund = '';
      this.form.customerIcms = '';
      this.selectedUserId = null;
      this.form.customerZipcode = '';
      this.form.intermediaryState = null;
      this.form.customerCity = '';
      this.form.customerAddressLine = '';
      this.form.customerAddrNeighborhood = '';
      this.form.customerAddressComplement = '';
      this.form.customerAddressNumber = '';
    },
  },
  computed: {
    ...mapGetters([
      'getSelectedIntermediary',
      'getIntermediaries',
      'getCustomers',
      'getSelectedCustomer',
      'getNonRelatedCustomersList',
    ]),
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

.hover-icon {
  &:hover {
    cursor: pointer;
  }
}

.align-state-select {
  position: relative;
  top: 11px;
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
