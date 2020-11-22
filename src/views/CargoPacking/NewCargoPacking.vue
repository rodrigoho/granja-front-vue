<template>
  <div class="new-cargo-packing">
    <r-header
      :title="'Romaneio'"
      :buttonTitle="'Voltar à pagina anterior'"
      :toRouteName="'home'"
      :shouldShowButton="true"
    />
    <b-container fluid>
      <b-card align-h="center" class="align-cards">
        <b-row class="flex align-bottom">
          <b-col sm="6">
            <b-form-select
              id="input-3"
              v-model="selectedIntermediaryId"
              :options="intermediariesList"
              @change="handleIntermediarySelect"
              size="sm"
              class="align-customer-select"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>Selecione o intermediário</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="flex align-bottom">
          <b-col sm="6">
            <b-form-select
              id="input-3"
              v-model="selectedCustomerId"
              :options="customersList"
              @change="handleCustomerSelect"
              size="sm"
              class="align-customer-select"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>Selecione o cliente</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
          <b-col>
            <date-picker :selectedDate.sync="selectedDate" class="align-due-date" />
          </b-col>
        </b-row>
        <!-- Eggs -->
        <div class="eggs">
          <b-row>
            <b-col offset="1">
              <div class="white-eggs">
                <b-col offset="3">
                  <h5>Branco</h5>
                </b-col>
                <b-row>
                  <b-col>Tipo</b-col>
                  <b-col offset="1" sm="3">Qtd</b-col>
                  <b-col class="align-disc">Desc</b-col>
                </b-row>
                <b-row>
                  <b-col>Jumbo</b-col>
                  <b-col sm="3">
                    <b-input v-model="wJumbo.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wJumbo.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Extra</b-col>
                  <b-col sm="3">
                    <b-input v-model="wExtra.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wExtra.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Grande</b-col>
                  <b-col sm="3">
                    <b-input v-model="wGrande.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wGrande.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Médio</b-col>
                  <b-col sm="3">
                    <b-input v-model="wMedio.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wMedio.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Pequeno</b-col>
                  <b-col sm="3">
                    <b-input v-model="wPequeno.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wPequeno.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Industrial</b-col>
                  <b-col sm="3">
                    <b-input v-model="wIndustrial.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="wIndustrial.discount" class="input-size" />
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col>
              <div class="red-eggs">
                <b-col offset="3">
                  <h5>Vermelho</h5>
                </b-col>
                <b-row>
                  <b-col>Tipo</b-col>
                  <b-col offset="1" sm="3">Qtd</b-col>
                  <b-col class="align-disc">Desc</b-col>
                </b-row>
                <b-row>
                  <b-col>Jumbo</b-col>
                  <b-col sm="3">
                    <b-input v-model="rJumbo.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rJumbo.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Extra</b-col>
                  <b-col sm="3">
                    <b-input v-model="rExtra.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rExtra.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Grande</b-col>
                  <b-col sm="3">
                    <b-input v-model="rGrande.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rGrande.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Médio</b-col>
                  <b-col sm="3">
                    <b-input v-model="rMedio.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rMedio.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Pequeno</b-col>
                  <b-col sm="3">
                    <b-input v-model="rPequeno.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rPequeno.discount" class="input-size" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>Industrial</b-col>
                  <b-col sm="3">
                    <b-input v-model="rIndustrial.amount" class="input-size" />
                  </b-col>
                  <b-col>
                    <b-input v-model="rIndustrial.discount" class="input-size" />
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
        <!-- CargoPacking form -->
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row class="style-inputs">
            <!-- Receipt number -->
            <b-col>
              <b-form-group id="input-group-receipt-number" label="Numero da nota:" label-for="input-receipt-number">
                <b-form-input
                  id="input-receipt-number"
                  type="number"
                  v-model="form.receiptNumber"
                  required
                  size="sm"
                  placeholder="Digite o numero da nota"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Receipt value -->
            <b-col>
              <b-form-group id="input-group-receipt-value" label="Valor da nota:" label-for="input-receipt-value">
                <b-form-input
                  id="input-receipt-value"
                  v-model="form.receiptValue"
                  type="number"
                  required
                  size="sm"
                  placeholder="Digite o valor da nota"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="align-data" sm="2">
              <b-form-group id="input-group-insurance" label="Seguro:" label-for="input-insurance" class="same">
                <b-form-checkbox v-model="form.hasInsurance" :value="true" :unchecked-value="false"
                  >Sim</b-form-checkbox
                >
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group id="input-group-paid" label="Pago:" label-for="input-paid" class="same">
                <b-form-checkbox v-model="form.isPaid" :value="true" :unchecked-value="false">Sim</b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="style-inputs">
            <!-- EggTray -->
            <b-col>
              <b-row>
                <b-col offset="4">
                  <h5>Bandejas</h5>
                </b-col>
              </b-row>
              <b-row class="flex-row">
                <!-- Egg tray price -->
                <b-col>
                  <b-form-group id="input-group-egg-tray-price" label="Preço:" label-for="input-egg-tray-price">
                    <b-form-input
                      id="input-egg-tray-price"
                      type="number"
                      step="0.01"
                      v-model="form.eggTrayPrice"
                      size="sm"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                <!-- Egg tray amount -->
                <b-col>
                  <b-form-group id="input-group-egg-tray-amount" label="Quantidade:" label-for="input-egg-tray-amount">
                    <b-form-input
                      id="input-egg-tray-amount"
                      v-model="form.eggTrayAmount"
                      type="number"
                      size="sm"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <!-- Egg box price -->
            <b-col>
              <b-row>
                <b-col offset="4">
                  <h5>Caixas</h5>
                </b-col>
              </b-row>
              <b-row class="flex-row">
                <b-col>
                  <b-form-group id="input-group-egg-box-price" label="Preço:" label-for="input-egg-box-price">
                    <b-form-input
                      id="input-egg-box-price"
                      type="number"
                      v-model="form.eggBoxPrice"
                      step="0.01"
                      size="sm"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                <!-- Customer CNPJ -->
                <b-col>
                  <b-form-group id="input-group-egg-box-amount" label="Quantidade:" label-for="input-egg-box-amount">
                    <b-form-input
                      id="input-egg-box-amount"
                      v-model="form.eggBoxAmount"
                      type="text"
                      size="sm"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
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
import DatePicker from '@/components/DatePicker.vue';
import io from 'socket.io-client';
// import { parse } from 'date-fns';

export default {
  name: 'NewCargoPacking',
  components: {
    RHeader,
    DatePicker,
  },
  data() {
    return {
      form: {
        isPaid: false,
        hasInsurance: false,
        discount: 0,
        ruralFundTax: 0,
        customerName: '',
        icmsTax: 0,
        eggTrayAmount: 0,
        eggTrayPrice: 0,
        eggBoxAmount: 0,
        eggBoxPrice: 0,
        receiptValue: 0,
        receiptNumber: 0,
      },
      eggsCargo: [],
      rJumbo: {
        color: 'Vermelho',
        size: 'Jumbo',
        amount: 0,
        discount: 0,
      },
      rExtra: {
        color: 'Vermelho',
        size: 'Extra',
        amount: 0,
        discount: 0,
      },
      rGrande: {
        color: 'Vermelho',
        size: 'Grande',
        amount: 0,
        discount: 0,
      },
      rMedio: {
        color: 'Vermelho',
        size: 'Médio',
        amount: 0,
        discount: 0,
      },
      rPequeno: {
        color: 'Vermelho',
        size: 'Pequeno',
        amount: 0,
        discount: 0,
      },
      rIndustrial: {
        color: 'Vermelho',
        size: 'Industrial',
        amount: 0,
        discount: 0,
      },
      wJumbo: {
        color: 'Branco',
        size: 'Jumbo',
        amount: 0,
        discount: 0,
      },
      wExtra: {
        color: 'Branco',
        size: 'Extra',
        amount: 0,
        discount: 0,
      },
      wGrande: {
        color: 'Branco',
        size: 'Grande',
        amount: 0,
        discount: 0,
      },
      wMedio: {
        color: 'Branco',
        size: 'Médio',
        amount: 0,
        discount: 0,
      },
      wPequeno: {
        color: 'Branco',
        size: 'Pequeno',
        amount: 0,
        discount: 0,
      },
      wIndustrial: {
        color: 'Branco',
        size: 'Industrial',
        amount: 0,
        discount: 0,
      },
      customersList: [],
      intermediariesList: [],
      customer: null,
      selectedIntermediaryId: null,
      selectedCustomerId: null,
      selectedDate: null,
      show: true,
    };
  },
  mounted() {
    // const cargoPackingId = this.$route.params.id;
    this.io = io('http://localhost:3333');
    this.$route.params.id ? this.handleCargoPackingLoading(this.$route.params.id) : this.handleListLoading();
  },
  methods: {
    ...mapActions([
      'loadCustomers',
      'loadSelectedCustomer',
      'loadSelectedIntermediary',
      'createCargoPacking',
      'loadCargoPackingToEdit',
      'updateCargoPacking',
      'loadIntermediaries',
    ]),
    async handleListLoading() {
      await this.loadCustomers();
      await this.loadIntermediaries();
      const customersMap = [...this.getCustomers.map((c) => ({ value: c.id, text: `${c.name} - ${c.email}` }))];
      const intermediariesMap = [
        ...this.getIntermediaries.map((c) => ({ value: c.id, text: `${c.name} - ${c.email}` })),
      ];

      this.customersList = customersMap;
      this.intermediariesList = intermediariesMap;
    },
    async handleCargoPackingLoading(cargoPackingId) {
      await this.handleListLoading();
      await this.loadCargoPackingToEdit(cargoPackingId);
      const {
        customer_id: customerId,
        due_to: dueTo,
        order_items: orderItems,
        receipt_number: receiptNumber,
        receipt_value: receiptValue,
        has_insurance_fee: hasInsuranceFee,
        is_paid: isPaid,
        egg_retail_box_amount: eggBoxAmount,
        egg_retail_box_price: eggBoxPrice,
        egg_tray_amount: eggTrayAmount,
        egg_tray_price: eggTrayPrice,
      } = this.getSelectedCargoPacking.cargoPacking;
      const form = this.form;
      const test = this.customersList.find((customer) => customer.value === customerId);
      orderItems.forEach((oI) => {
        const eggColor = oI.egg_details.color;
        const eggSize = oI.egg_details.size;
        const amount = oI.amount;
        const discount = oI.discount;
        if (eggColor === 'Branco') {
          if (eggSize === 'Jumbo') {
            this.wJumbo.amount = amount;
            this.wJumbo.discount = discount;
          } else if (eggSize === 'Extra') {
            this.wExtra.amount = amount;
            this.wExtra.discount = discount;
          } else if (eggSize === 'Grande') {
            this.wGrande.amount = amount;
            this.wGrande.discount = discount;
          } else if (eggSize === 'Médio') {
            this.wMedio.amount = amount;
            this.wMedio.discount = discount;
          } else if (eggSize === 'Pequeno') {
            this.wPequeno.amount = amount;
            this.wPequeno.discount = discount;
          } else if (eggSize === 'Industrial') {
            this.wIndustrial.amount = amount;
            this.wIndustrial.discount = discount;
          }
        } else {
          if (eggSize === 'Jumbo') {
            this.rJumbo.amount = amount;
            this.rJumbo.discount = discount;
          } else if (eggSize === 'Extra') {
            this.rExtra.amount = amount;
            this.rExtra.discount = discount;
          } else if (eggSize === 'Grande') {
            this.rGrande.amount = amount;
            this.rGrande.discount = discount;
          } else if (eggSize === 'Médio') {
            this.rMedio.amount = amount;
            this.rMedio.discount = discount;
          } else if (eggSize === 'Pequeno') {
            this.rPequeno.amount = amount;
            this.rPequeno.discount = discount;
          } else if (eggSize === 'Industrial') {
            this.rIndustrial.amount = amount;
            this.rIndustrial.discount = discount;
          }
        }
      });

      this.selectedCustomerId = test.value;
      this.selectedDate = dueTo;
      form.receiptNumber = receiptNumber;
      form.receiptValue = receiptValue;
      form.hasInsurance = hasInsuranceFee;
      form.isPaid = isPaid;
      form.eggTrayPrice = eggTrayPrice;
      form.eggTrayAmount = eggTrayAmount;
      form.eggBoxPrice = eggBoxPrice;
      form.eggBoxAmount = eggBoxAmount;
      localStorage.setItem('editingCargoPackingDate', dueTo);
    },

    async handleCustomerSelect() {
      await this.loadSelectedCustomer(this.selectedCustomerId);
      const customer = this.getSelectedCustomer;
      this.customer = customer;
      const discount = customer.discount;
      this.form.customerName = customer.name;
      this.form.customerEmail = customer.email;
      this.form.discount = customer.discount;
      this.form.ruralFundTax = customer.rural_fund_tax;
      this.form.icmsTax = customer.icms_tax;
      this.wJumbo.discount = discount;
      this.wExtra.discount = discount;
      this.wGrande.discount = discount;
      this.wMedio.discount = discount;
      this.wPequeno.discount = discount;
      this.wIndustrial.discount = discount;
      // this.rJumbo.discount = discount;
      // this.rExtra.discount = discount;
      // this.rGrande.discount = discount;
      // this.rMedio.discount = discount;
      // this.rPequeno.discount = discount;
      // this.rIndustrial.discount = discount;
    },
    async handleIntermediarySelect(intermediaryId) {
      console.log(intermediaryId);
      await this.loadSelectedIntermediary(intermediaryId);
    },
    async onSubmit(evt) {
      evt.preventDefault();
      const eggsCargo = [
        this.wJumbo,
        this.wExtra,
        this.wGrande,
        this.wMedio,
        this.wPequeno,
        this.wIndustrial,
        this.rJumbo,
        this.rExtra,
        this.rGrande,
        this.rMedio,
        this.rPequeno,
        this.rIndustrial,
      ];

      const cargoPacking = {
        eggs_cargo: eggsCargo,
        is_paid: this.form.isPaid,
        due_to: this.selectedDate,
        has_insurance_fee: this.form.hasInsurance,
        customer_id: this.selectedCustomerId,
        intermediary_id: this.selectedIntermediaryId,
        icms_tax: this.form.icmsTax,
        created_by_user_id: parseInt(localStorage.getItem('userId')),
        updated_by_user_id: null,
        receipt_value: this.form.receiptValue,
        receipt_number: this.form.receiptNumber,
        rural_fund_tax: this.form.ruralFundTax,
        egg_tray_amount: this.form.eggTrayAmount,
        egg_tray_price: this.form.eggTrayPrice,
        egg_retail_box_amount: this.form.eggBoxAmount,
        egg_retail_box_price: this.form.eggBoxPrice,
      };

      this.$route.name === 'newCargoPacking'
        ? await this.createCargoPacking(cargoPacking)
        : this.handleUpdate(cargoPacking);
      this.$router.push({ name: 'home' });
    },
    async handleUpdate(cargoPacking) {
      await this.updateCargoPacking({
        cargoPacking: cargoPacking,
        cargoPackingId: parseInt(this.$route.params.id),
      });
      this.io.emit('msg', {
        cargoPacking: this.getSelectedCargoPacking.cargoPacking.id,
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.customerName = '';
      this.form.customerEmail = '';
      this.form.discount = '';
      this.form.ruralFundTax = '';
      this.form.icmsTax = '';
      this.selectedCustomerId = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    ...mapGetters([
      'getCustomers',
      'getSelectedCustomer',
      'getCargoPackings',
      'getRedEggsList',
      'getSelectedCargoPacking',
      'getIntermediaries',
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
  width: 800px;
}
.align-bottom {
  margin-bottom: 15px;
}
.eggs {
  margin-bottom: 15px;
}

.input-size {
  position: relative;
  top: 2px;
  height: 21px;
  width: 50px;
  font-size: 12px;
  text-align: center;
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
.align-data {
  position: relative;
  left: 15px;
}

.align-disc {
  position: relative;
  right: 8px;
}

h5 {
  color: red;
}
/* .teste {
  width: 250px;
  padding-left: 15px;
  margin-bottom: 15px;
} */
.section-header {
  background: red;
}

.style-inputs {
  padding: 0 15px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;

  button + button {
    margin-left: 15px;
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.align-packages-title {
  display: flex;
  justify-content: flex-end;
}

.align-customer-select {
  position: relative;
  top: 32px;
}
</style>
