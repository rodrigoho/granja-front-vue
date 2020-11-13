<template>
  <div>
    <r-header
      :title="'Romaneio'"
      :buttonTitle="'Voltar aos Romaneios'"
      :toRouteName="'home'"
      :shouldShowButton="true"
    />
    <b-container>
      <b-col>
        <div id="cargo-packing-id-out">
          <div class="eggs" :class="{ 'border-to-pdf': isPdf }" id="cargo-packing-id">
            <b-row class="flex-between">
              <div class="bold">
                {{ salesDate }}
              </div>

              <div class="style-header-title">
                <div class="flex-row">
                  <h3>{{ getSelectedCargoPacking && customerName }}</h3>
                  <h3 v-if="intermediaryName">{{ intermediaryName }}</h3>
                </div>
                <div class="style-status"><label-value v-if="!isPdf" class="mt-10" :values="cargoPackingStatus" /></div>
              </div>
              <h5>
                {{
                  getSelectedCargoPacking &&
                  `${getSelectedCargoPacking.cargoPacking.customer.address.city}, ${getSelectedCargoPacking.cargoPacking.customer.address.state}`
                }}
              </h5>
            </b-row>
            <div class="flex opac">
              <b-row>
                <img class="test" src="~@/assets/granja-romaneio.png" />
                <div class="eggs-list flex-row justify-between mb-">
                  <b-col>
                    <cargo-packing-eggs-list
                      :eggsColor="'white'"
                      :eggsList="whiteEggsList"
                      :isFromCargoPacking="true"
                      :cardTitle="'Branco'"
                      :isEditing="false"
                      class="bg-transparent"
                    />
                  </b-col>
                  <b-col>
                    <cargo-packing-eggs-list
                      :eggsColor="'red'"
                      :eggsList="redEggsList"
                      :isFromCargoPacking="true"
                      :cardTitle="'Vermelho'"
                      :isEditing="false"
                      class="bg-transparent"
                    />
                  </b-col>
                </div>
              </b-row>
              <b-row class="align-data">
                <b-col sm="4" class="data">
                  <h5>Dados</h5>
                  <div class="general-data">
                    <label-value :values="generalData" />
                  </div>
                  <div class="style-packages">
                    <h6 class="align-packages-title">Embalagens</h6>
                    <b-row class="align-packages">
                      <b-col offset="1">
                        <b-row>
                          <b-col sm="2"></b-col>
                          <b-col class="align-qty-package-title" sm="2" offset="1">
                            <span>Qtd</span>
                          </b-col>
                          <b-col class="align-price-package-title" sm="1">
                            <span>Preço</span>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col sm="2">
                            <span>Bandejas</span>
                          </b-col>
                          <b-col offset="1" sm="2">{{
                            eggPackages.eggTray.eggTrayAmount ? eggPackages.eggTray.eggTrayAmount : '-'
                          }}</b-col>
                          <b-col sm="4">
                            {{ eggPackages.eggTray.eggTrayPrice > 0 ? `R$ ${eggPackages.eggTray.eggTrayPrice}` : '-' }}
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col sm="2">
                            <span>Caixas</span>
                          </b-col>
                          <b-col offset="1" sm="2">{{
                            eggPackages.eggBox.eggBoxAmount ? eggPackages.eggBox.eggBoxAmount : '-'
                          }}</b-col>
                          <b-col sm="4">
                            {{ eggPackages.eggBox.eggBoxPrice > 0 ? `R$ ${eggPackages.eggBox.eggBoxPrice}` : '-' }}
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col sm="4" class="data">
                  <h5>Dados financeiros</h5>
                  <div class="money-data">
                    <label-value :values="moneyData" /> <label-value :values="dueDate" class="due-date" />
                  </div>
                </b-col>
                <b-col sm="4" class="data">
                  <b-row>
                    <b-col>
                      <h5>Bradesco</h5>

                      <div class="bank-data">
                        <label-value :values="bankData" />
                      </div>
                    </b-col>
                  </b-row>
                  <br />
                  <h4>Mario Hideki Ikeda</h4>
                </b-col>
              </b-row>
            </div>
            <b-row class="align-footer-buttons" v-if="isEditing">
              <b-col class="buttons">
                <b-button type="button" variant="danger" @click="handleCancel" size="sm">Cancelar</b-button>
                <b-button type="submit" variant="primary" @click="handleSubmit" size="sm">Salvar</b-button>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="toolbar">
          <div class="teste">
            <b-button @click="exportToPDF">Exportar para PDF</b-button>
            <b-button @click="handleEdit()">Editar</b-button>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import CargoPackingEggsList from '@/components/CargoPackingEggsList.vue';
import LabelValue from '@/components/LabelValue.vue';
import { mapActions, mapGetters } from 'vuex';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import BANK_DATA from '@/constants/BankData.js';
import html2pdf from 'html2pdf.js';
import io from 'socket.io-client';

export default {
  name: 'CargoPackingDetails',
  components: {
    RHeader,
    CargoPackingEggsList,
    LabelValue,
  },
  data() {
    return {
      isPdf: false,
      isEditing: false,
      additionalFeePrice: null,
      onlineFee: null,
      orderItems: null,
      redEggsList: null,
      whiteEggsList: null,
      generalData: [],
      cargoPackingStatus: [],
      dueDate: [],
      salesDate: [],
      moneyData: [],
      eggTraysData: [],
      bankData: BANK_DATA,
    };
  },
  created() {
    this.handleCargoPackingLoading();
    this.io = io('http://localhost:3333');
  },
  methods: {
    ...mapActions(['deleteCustomer', 'loadCustomers', 'setCustomerToEdit', 'loadSelectedCargoPacking']),
    handleSubmit() {
      console.log('salvar');
    },
    async exportToPDF() {
      this.isPdf = !this.isPdf;
      let element = document.getElementById('cargo-packing-id-out');
      let opt = {
        filename: 'document.pdf',
        image: { type: 'png', quality: 0.58 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
      };

      await html2pdf().set(opt).from(element).save();
      this.isPdf = !this.isPdf;
    },
    async handleCargoPackingLoading() {
      await this.loadSelectedCargoPacking(this.$route.params.id);
      this.orderItems = this.getSelectedCargoPacking.cargoPacking.order_items;
      this.redEggsList = this.orderItems
        .filter((oI) => oI.egg_details.color === 'Vermelho')
        .map((egg) => {
          return {
            id: egg.id,
            size: egg.egg_details.size,
            amount: egg.amount,
            color: egg.egg_details.color,
            discount: egg.discount,
            price: parseFloat(egg.cur_egg_price),
          };
        });
      this.redEggsList = this.sortArr(this.redEggsList);

      this.whiteEggsList = this.orderItems
        .filter((oI) => oI.egg_details.color === 'Branco')
        .map((egg) => {
          return {
            id: egg.id,
            size: egg.egg_details.size,
            amount: egg.amount,
            color: egg.egg_details.color,
            discount: egg.discount,
            price: parseFloat(egg.cur_egg_price),
          };
        });
      this.whiteEggsList = this.sortArr(this.whiteEggsList);
      const cargoPacking = this.getSelectedCargoPacking.cargoPacking;
      const cargoPackingVD = this.getSelectedCargoPacking.cargoVirtualData;
      this.generalData = [
        {
          label: 'Quantidade total: ',
          value: cargoPackingVD.totalBoxesAmount,
        },
        {
          label: 'Nota: ',
          value: cargoPacking.receipt_number,
        },
        {
          label: 'Valor: ',
          value: `R$ ${cargoPacking.receipt_value}`,
        },
      ];

      this.cargoPackingStatus = [
        {
          label: 'Status: ',
          value: cargoPacking.is_paid === false ? 'Em aberto' : 'Pago',
        },
      ];

      this.dueDate = [
        {
          label: 'Vencimento: ',
          value: format(parseISO(cargoPacking.due_to), "d 'de' MMMM", { locale: pt }),
        },
      ];
      (this.salesDate = format(parseISO(cargoPacking.created_at), 'dd/MM/yyyy')),
        (this.moneyData = [
          {
            label: 'Carga: ',
            value: `R$ ${cargoPackingVD.totalEggsCargoPrice}`,
          },
          {
            label: 'ICMS: ',
            value: cargoPackingVD.icmsFee !== 0 ? `R$ ${cargoPackingVD.icmsFee}` : '-',
          },
          {
            label: 'Seguro: ',
            value: cargoPackingVD.insurancePrice === false ? '-' : `R$ ${cargoPackingVD.insurancePrice}`,
          },
          {
            label: 'Embalagens: ',
            value: this.eggPackages.packagesValue > 0 ? `R$ ${this.eggPackages.packagesValue}` : '-',
          },
          {
            label: 'Fundo rural: ',
            value: cargoPackingVD.ruralFundFee !== 0 ? `R$ ${cargoPackingVD.ruralFundFee}` : '-',
          },
          {
            label: 'Saldo devedor: ',
            value: `R$ ${cargoPackingVD.balanceDue}`,
          },
        ]);
    },
    sendNotification() {
      this.io.emit('msg', {
        cargoPacking: this.getSelectedCargoPacking.cargoPacking.id,
      });
    },
    async handleEdit() {
      this.$router.push({ path: `/cargo-packing-edit/${this.$route.params.id}` });
    },
    // handleDelete() {
    //   this.$bvModal
    //     .msgBoxConfirm('Deseja mesmo excluir este cliente?', {
    //       centered: true,
    //       size: 'sm',
    //       buttonSize: 'sm',
    //       okTitle: 'Sim',
    //       cancelTitle: 'Cancelar',
    //     })
    //     .then(async (value) => {
    //       if (value) {
    //         this.deleteCustomer(this.customer.id);
    //         await this.loadCustomers();

    //         this.$router.push({ name: 'customers' });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // An error occurred
    //     });
    // },
    sortArr(listToSort) {
      return listToSort.sort((a, b) => {
        return a.price < b.price ? 1 : a.price > b.price ? -1 : 0;
      });
    },
  },
  computed: {
    ...mapGetters(['getSelectedCargoPacking']),
    eggPackages: function () {
      const eggTrayAmount = this.getSelectedCargoPacking && this.getSelectedCargoPacking.cargoPacking.egg_tray_amount;
      const eggTrayPrice = this.getSelectedCargoPacking && this.getSelectedCargoPacking.cargoPacking.egg_tray_price;
      const eggBoxAmount =
        this.getSelectedCargoPacking && this.getSelectedCargoPacking.cargoPacking.egg_retail_box_amount;
      const eggBoxPrice =
        this.getSelectedCargoPacking && this.getSelectedCargoPacking.cargoPacking.egg_retail_box_price;

      const packagesValue = (eggTrayAmount * eggTrayPrice + eggBoxAmount * eggBoxPrice).toFixed(2);
      return {
        eggTray: { eggTrayAmount, eggTrayPrice },
        eggBox: { eggBoxAmount, eggBoxPrice },
        packagesValue,
      };
    },
    customerName() {
      return this.getSelectedCargoPacking && `${this.getSelectedCargoPacking.cargoPacking.customer.name}`;
    },
    intermediaryName() {
      return (
        this.getSelectedCargoPacking &&
        this.getSelectedCargoPacking.cargoPacking.intermediary &&
        `/ ${this.getSelectedCargoPacking.cargoPacking.intermediary.name}`
      );
    },
  },
};
</script>

<style scoped lang="scss">
.eggs {
  position: relative;
  width: 1020px;
  padding: 15px 30px 15px;
  border-radius: 4px;
  background: #fff;
  top: 50px;
  margin: 20px auto;
  height: 620px;
  min-height: 295px;
}

.border-to-pdf {
  border: 1px solid;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.align-price-package-title {
  position: relative;
  left: 15px;
}

.align-qty-package-title {
  position: relative;
  right: 3px;
}

.flex-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#cargo-packing-id-out {
  height: 700px;
}

.eggs-list {
  position: relative;
  bottom: 30px;
}

.bank-data {
  position: relative;
  left: 55px;
  width: 170px;
}

.money-data {
  position: relative;
  left: 25px;
  width: 250px;
}

.general-data {
  position: relative;
  left: 50px;
  width: 200px;
}

.mt-10 {
  margin-top: 10px;
}
.data {
  text-align: center;
}

.align-data {
  position: relative;
  bottom: 25px;
}

.align-packages-title {
  position: relative;
  right: 30px;
  top: 15px;
}

.align-packages {
  position: relative;
  top: 15px;
}

.bg-transparent {
  min-height: 300px;
}

.test {
  position: absolute;
  opacity: 0.05;
  top: -53px;
  left: -2px;
}

.toolbar {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  width: 220px;
  height: 220px;
  position: relative;
  right: 220px;
  bottom: 650px;
  display: flex;
  justify-content: center;
}

.teste {
  position: relative;
  top: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  button {
    background: #007bff;
    &:hover {
      background: darken(#007bff, 5%);
    }
  }
  button + button {
    margin-top: 5px;
  }
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-weight: bold;
  }
}

.flex-row {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}

.justify-between {
  justify-content: space-between;
}

.style-sales-date {
  width: 230px;
}

.style-status {
  width: 150px;
}

.style-header-title {
  text-align: center;
}

.style-packages {
  position: relative;
  left: 30px;
  font-size: 12px;
}

.flex-center {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}

.align-address {
  display: flex;
  justify-content: flex-end;
}

.bold {
  font-weight: bold;
}

.due-date {
  color: red;
  font-weight: bold;
  position: relative;
  top: 10px;
}

.align-footer-buttons {
  margin-top: 15px;

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  button + button {
    margin-left: 5px;
  }
}

.row {
  padding: 0 5px;
}
</style>
