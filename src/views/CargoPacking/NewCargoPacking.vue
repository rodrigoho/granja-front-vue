<template>
  <div class="new-cargo-packing">
    <r-header
      :title="'Romaneio'"
      :buttonTitle="'Voltar à pagina anterior'"
      :toRouteName="'home'"
      :shouldShowButton="true"
    />
    <b-container fluid>
      <b-row class="flex-cargo-packing">
        <div cols="5" offset="1">
          <b-card align-h="center" class="align-cards">
            <div class="align-customer-select">
              <b-row class="flex align-bottom">
                <b-col sm="6">
                  <b-form-select
                    id="input-3"
                    v-model="selectedIntermediaryId"
                    :options="intermediariesList"
                    @change="handleIntermediarySelect"
                    size="sm"
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
                  >
                    <template v-slot:first>
                      <b-form-select-option :value="null" disabled>Selecione o cliente</b-form-select-option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col>
                  <date-picker :selectedDate.sync="selectedDateCP" :key="uepa2" class="align-due-date-header" />
                </b-col>
              </b-row>
            </div>
            <!-- Eggs -->
            <div class="eggs">
              <b-row>
                <b-col offset="1">
                  <div class="white-eggs" :key="this.form.customerName">
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
                        <b-input type="number" v-model="eggsCargo[0].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[0].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Extra</b-col>
                      <b-col sm="3">
                        <b-input v-model="eggsCargo[1].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[1].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Grande</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[2].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[2].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Médio</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[3].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[3].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Pequeno</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[4].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[4].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Industrial</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[5].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[5].discount" class="input-size" />
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
                        <b-input type="number" v-model="eggsCargo[6].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[6].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Extra</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[7].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[7].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Grande</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[8].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[8].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Médio</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[9].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[9].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Pequeno</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[10].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[10].discount" class="input-size" />
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>Industrial</b-col>
                      <b-col sm="3">
                        <b-input type="number" v-model="eggsCargo[11].amount" class="input-size" />
                      </b-col>
                      <b-col>
                        <b-input v-model="eggsCargo[11].discount" class="input-size" />
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
                  <b-form-group
                    id="input-group-receipt-number"
                    label="Numero da nota:"
                    label-for="input-receipt-number"
                  >
                    <b-form-input
                      id="input-receipt-number"
                      type="number"
                      v-model="form.receiptNumber"
                      size="sm"
                      placeholder="Digite o numero"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                <!-- Receipt value -->
                <b-col>
                  <b-form-group id="input-group-receipt-value" label="Valor da nota:" label-for="input-receipt-value">
                    <b-form-input
                      id="input-receipt-value"
                      v-model="form.receiptValue"
                      type="text"
                      size="sm"
                      placeholder="Digite o valor"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group id="input-group-paid-amount" label="Valor pago:" label-for="input-paid-amount">
                    <b-form-input
                      id="input-paid-amount"
                      v-model="form.paidAmount"
                      type="text"
                      size="sm"
                      placeholder="Digite o valor"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="style-inputs">
                <b-col class="align-data" sm="2">
                  <b-form-group id="input-group-insurance" label-for="input-insurance">
                    <b-form-checkbox v-model="form.hasInsurance" :value="true" :unchecked-value="false"
                      >Seguro</b-form-checkbox
                    >
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group id="input-group-paid" label-for="input-paid">
                    <b-form-checkbox v-model="form.isPaid" :value="true" :unchecked-value="false">Pago</b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group id="input-group-icms" label-for="input-icms">
                    <b-form-checkbox
                      v-model="form.hasICMS"
                      @change="handleIcmsClick"
                      :value="true"
                      :unchecked-value="false"
                      >ICMS</b-form-checkbox
                    >
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group id="input-group-rural-fund" label-for="input-rural-fund">
                    <b-form-checkbox
                      v-model="form.hasRuralFund"
                      @change="handleRuralFundClick"
                      :value="true"
                      :unchecked-value="false"
                      >F. Rural</b-form-checkbox
                    >
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group id="input-is-billet" label-for="input-is-billet">
                    <b-form-checkbox v-model="form.isBillet" :value="true" :unchecked-value="false"
                      >Boleto</b-form-checkbox
                    >
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
                      <b-form-group
                        id="input-group-egg-tray-amount"
                        label="Quantidade:"
                        label-for="input-egg-tray-amount"
                      >
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
                      <b-form-group
                        id="input-group-egg-box-amount"
                        label="Quantidade:"
                        label-for="input-egg-box-amount"
                      >
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
        </div>
        <div>
          <b-card class="style-eggs-details">
            <b-row>
              <date-picker-eggs @uepa="handleEggPricesSelect" :selectedDateEggs.sync="selectedDateEggs" />
              <eggs-list :opa="'opa'" :eggsColor="'white'" :cardTitle="'Branco'" :isEditable="false" class="bg-white" />

              <div class="style-red-egg-tax">
                <b-form-group id="input-group-receipt-value" label="Taxa ovo vermelho:" label-for="input-receipt-value">
                  <b-form-input
                    id="input-receipt-value"
                    v-model="form.redEggsTax"
                    type="number"
                    size="sm"
                    placeholder="Digite o valor"
                  ></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="handleRedEggsTaxEdit" size="sm" class="style-save-red-egg-tax"
                  >Salvar</b-button
                >
              </div>
              <eggs-list :eggsColor="'red'" :cardTitle="'Vermelho'" class="bg-white" />
            </b-row>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import EggsList from '@/components/EggsList.vue';
import DatePicker from '@/components/DatePicker.vue';
import DatePickerEggs from '@/components/DatePickerEggs.vue';
import { format, parseISO } from 'date-fns';
import io from 'socket.io-client';
import { eggPriceMixin } from '@/mixins/eggPriceMixin.js';

export default {
  name: 'NewCargoPacking',
  mixins: [eggPriceMixin],
  components: {
    RHeader,
    DatePicker,
    DatePickerEggs,
    EggsList,
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
        hasICMS: false,
        paidAmount: null,
        hasRuralFund: false,
        eggTrayAmount: 0,
        eggTrayPrice: 0,
        eggBoxAmount: 0,
        eggBoxPrice: 0,
        receiptValue: null,
        receiptNumber: null,
        redEggsTax: 0,
        isBillet: false,
      },
      eggsCargo: [
        {
          eggId: 1,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 2,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 3,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 4,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 5,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 6,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 7,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 8,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 9,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 10,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 11,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
        {
          eggId: 12,
          amount: 0,
          eggPrice: 0,
          discount: 0,
        },
      ],
      newDate: localStorage.getItem('editingCargoPackingDate'),
      customDateTimestamp: null,
      customersList: [],
      intermediariesList: [],
      customer: null,
      selectedIntermediaryId: null,
      selectedCustomerId: null,
      selectedDateCP: new Date(),
      selectedDateEggs: null,
      customDate: null,
      show: true,
    };
  },
  mounted() {
    this.io = io('http://localhost:3333');
    this.handleAdditionalFeeLoading();
    this.$route.params.id ? this.handleCargoPackingLoading(this.$route.params.id) : this.handleListLoading();
    this.handleEggsLoading();
    this.newDate = localStorage.getItem('editingCargoPackingDate');
  },
  methods: {
    ...mapActions([
      'loadAdditionalFee',
      'loadAllCustomers',
      'loadSelectedCustomer',
      'loadSelectedIntermediary',
      'createCargoPacking',
      'loadCargoPackingToEdit',
      'updateCargoPacking',
      'loadIntermediaries',
      'loadSelectedEggsPrices',
      'loadEggsListComplete',
      'updateAdditionalFee',
    ]),
    async handleAdditionalFeeLoading() {
      await this.loadAdditionalFee();
    },
    formatNumber(numberToFormat) {
      return numberToFormat.length > 0 ? numberToFormat.replace(',', '.') : numberToFormat;
    },
    async handleEggsLoading() {
      await this.loadEggsListComplete();
      this.form.redEggsTax = this.getAdditionalFee.current_fee_price;
      this.handleEggPrices();
    },
    handleIcmsClick(payload) {
      if (payload) {
        this.form.icmsTax = this.customer.icms_tax;
        this.form.hasICMS = true;
      } else {
        this.form.icmsTax = 0;
      }
    },
    handleRuralFundClick(payload) {
      if (payload) {
        this.form.ruralFundTax = this.customer.rural_fund_tax;
        this.form.hasRuralFund = true;
      } else {
        this.form.ruralFundTax = 0;
      }
    },
    async handleRedEggsTaxEdit() {
      const newRedEggsTax = {
        ...this.getAdditionalFee,
        current_fee_price: this.form.redEggsTax,
      };

      await this.updateAdditionalFee(newRedEggsTax);
      this.updateRegEggs(this.form.redEggsTax);
      this.$bvToast.toast(`R$ ${this.form.redEggsTax}`, {
        title: 'Taxa dos ovos vermelhos atualizada',
        autoHideDelay: 5000,
        variant: 'success',
      });
    },
    async handleEggPricesSelect(selectedDates) {
      this.customDateTimestamp = selectedDates.formattedDateTimestamp;
      if (this.selectedDateEggs) {
        const objectToSend = {
          selected_date: selectedDates.formattedSelectedDate,
        };

        await this.loadSelectedEggsPrices(objectToSend);
        this.handleEggPrices();
        this.customDate = selectedDates.formattedSelectedDate;
      }
    },
    async handleListLoading() {
      await this.loadAllCustomers();
      await this.loadIntermediaries();
      const customersMap = [...this.getAllCustomers.map((c) => ({ value: c.id, text: `${c.name} - ${c.email}` }))];
      const intermediariesMap = [
        ...this.getIntermediaries.rows.map((c) => ({ value: c.id, text: `${c.name} - ${c.email}` })),
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
        rural_fund_tax: ruralFundTax,
        icms_tax: icmsTax,
        is_paid: isPaid,
        paid_amount: paidAmount,
        intermediary,
        egg_retail_box_amount: eggBoxAmount,
        egg_retail_box_price: eggBoxPrice,
        egg_tray_amount: eggTrayAmount,
        egg_tray_price: eggTrayPrice,
        is_billet: isBillet,
      } = this.getSelectedCargoPacking.cargoPacking;
      const form = this.form;
      const test = this.getAllCustomers.find((customer) => customer.id === customerId);
      this.customer = test;
      orderItems.forEach((oI) => {
        const indexToUpdate = this.eggsCargo.findIndex((egg) => egg.eggId === oI.egg_details.id);
        const amount = oI.amount;
        const discount = oI.discount;
        this.eggsCargo[indexToUpdate] = {
          ...this.eggsCargo[indexToUpdate],
          amount: amount,
          discount: discount,
        };
      });

      this.selectedCustomerId = test.id;
      this.selectedIntermediaryId = intermediary ? intermediary.id : null;
      this.selectedDateCP = dueTo;
      form.receiptNumber = receiptNumber;
      form.receiptValue = this.formatNumber(receiptValue);
      form.hasInsurance = hasInsuranceFee;
      form.hasRuralFund = ruralFundTax > 0 ? true : false;
      form.isBillet = isBillet;
      form.icmsTax = icmsTax;
      form.ruralFundTax = ruralFundTax;
      form.isPaid = isPaid;
      form.paidAmount = paidAmount;
      form.hasICMS = icmsTax > 0 ? true : false;
      form.eggTrayPrice = eggTrayPrice;
      form.eggTrayAmount = eggTrayAmount;
      form.eggBoxPrice = eggBoxPrice;
      form.eggBoxAmount = eggBoxAmount;
      localStorage.setItem('editingCargoPackingDate', dueTo);
    },
    sortArr(listToSort) {
      return listToSort.sort((a, b) => {
        return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
      });
    },
    async handleCustomerSelect() {
      await this.loadSelectedCustomer(this.selectedCustomerId);
      const customer = this.getSelectedCustomer;
      this.customer = customer;
      const discount = customer.discount;
      this.form.customerName = customer.name;
      this.form.customerEmail = customer.email;
      this.form.discount = customer.discount;
      this.eggsCargo[0].discount = discount;
      this.eggsCargo[1].discount = discount;
      this.eggsCargo[2].discount = discount;
      this.eggsCargo[3].discount = discount;
      this.eggsCargo[4].discount = discount;
      this.eggsCargo[5].discount = discount;
      this.handleEggPrices();
    },

    handleEggPrices() {
      const eggsList = this.getEggsList.length && this.getEggsList;
      this.eggsCargo.forEach((eggs, idx) => {
        const eggPrice = eggsList.length && eggsList.find((egg) => egg.id === this.eggsCargo[idx].eggId);
        this.eggsCargo[idx] = {
          ...this.eggsCargo[idx],
          eggPrice: eggPrice.price,
        };
      });
    },

    async handleIntermediarySelect(intermediaryId) {
      await this.loadSelectedIntermediary(intermediaryId);
    },
    async onSubmit(evt) {
      evt.preventDefault();

      const cargoPacking = {
        eggs_cargo: this.eggsCargo,
        is_paid: this.form.isPaid,
        custom_date: this.customDate || format(new Date(), 'dd/MM/yyyy'),
        custom_date_timestamp: this.customDateTimestamp || new Date(),
        due_to: this.selectedDateCP,
        has_insurance_fee: this.form.hasInsurance,
        customer_id: this.selectedCustomerId,
        intermediary_id: this.selectedIntermediaryId,
        icms_tax: this.form.icmsTax,
        created_by_user_id: parseInt(localStorage.getItem('userId')),
        updated_by_user_id: null,
        paid_amount: this.form.paidAmount ? this.formatNumber(this.form.paidAmount) : null,
        is_billet: this.form.isBillet,
        receipt_value: this.form.receiptValue ? this.formatNumber(this.form.receiptValue) : null,
        receipt_number: this.form.receiptNumber,
        rural_fund_tax: this.form.ruralFundTax,
        egg_tray_amount: this.form.eggTrayAmount,
        egg_tray_price: this.form.eggTrayPrice,
        egg_retail_box_amount: this.form.eggBoxAmount,
        egg_retail_box_price: this.form.eggBoxPrice,
      };

      if (this.$route.name === 'newCargoPacking') {
        let res = await this.createCargoPacking(cargoPacking);
        const cargoPackingId = res.data.id;
        this.$router.push({ path: `/cargo-packing-details/${cargoPackingId}` });
      } else {
        this.handleUpdate(cargoPacking);
        this.$router.push({ path: `/cargo-packing-details/${this.$route.params.id}` });
      }
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
      'getAllCustomers',
      'getSelectedCustomer',
      'getCargoPackings',
      'getRedEggsList',
      'getSelectedCargoPacking',
      'getIntermediaries',
      'getEggsList',
      'getAdditionalFee',
    ]),
    uepa2() {
      return this.newDate;
    },
    testeDate() {
      return parseISO(this.customDate);
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
  width: 800px;
}

.style-eggs-details {
  position: relative;
  top: 42px;
  display: flex;
  background: #fff;
  margin: 50px auto;
  width: 350px;
}

.style-red-egg-tax {
  margin: auto;
  display: flex;
  flex-direction: row;
  .style-save-red-egg-tax {
    left: 5px;
    position: relative;
    top: 32px;
    height: 30px;
  }
}

.flex-cargo-packing {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.bg-white {
  margin: auto;
  padding-left: 15px;
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

.align-due-date-header {
  position: relative;
  bottom: 32px;
}

.align-customer-select {
  position: relative;
  top: 32px;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
