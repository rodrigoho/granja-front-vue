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
        <div class="eggs">
          <div class="flex-center">
            <h3>{{ getSelectedCargoPacking && getSelectedCargoPacking.cargoPacking.customer.name }}</h3>
          </div>
          <div>
            <h5 class="align-address">{{ address }}</h5>
          </div>

          <div class="flex opac">
            <b-row>
              <!-- <b-row>{{ orderItems }}</b-row> -->
              <img class="test" src="~@/assets/granja-limpo.png" />
              <b-col>
                <eggs-list
                  :eggsColor="'white'"
                  :eggsList="whiteEggsList"
                  :isFromCargoPacking="true"
                  :cardTitle="'Branco'"
                  class="bg-transparent"
                ></eggs-list>
              </b-col>
              <b-col>
                <eggs-list
                  :eggsColor="'red'"
                  :eggsList="redEggsList"
                  :isFromCargoPacking="true"
                  :cardTitle="'Vermelho'"
                  class="bg-transparent"
                ></eggs-list>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4" class="data">
                <h5>Dados</h5>
                <label-value :values="generalData" />
              </b-col>
              <b-col sm="4" class="data">
                <h5>Dados financeiros</h5>
                <label-value :values="moneyData" />
                <label-value :values="dueDate" class="due-date" />
              </b-col>
              <b-col sm="4" class="data">
                <h5>Embalagens</h5>
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col></b-col>
                      <b-col>
                        <span>Quantidade</span>
                      </b-col>
                      <b-col>
                        <span>Preço</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <span>Bandejas</span>
                      </b-col>
                      <b-col>{{ eggPackages.eggTray.eggTrayAmount ? eggPackages.eggTray.eggTrayAmount : '-' }}</b-col>
                      <b-col>
                        {{ eggPackages.eggTray.eggTrayPrice > 0 ? `R$ ${eggPackages.eggTray.eggTrayPrice}` : '-' }}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <span>Caixas</span>
                      </b-col>
                      <b-col>{{ eggPackages.eggBox.eggBoxAmount ? eggPackages.eggBox.eggBoxAmount : '-' }}</b-col>
                      <b-col>
                        {{ eggPackages.eggBox.eggBoxPrice > 0 ? `R$ ${eggPackages.eggBox.eggBoxPrice}` : '-' }}
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col offset="2">
                    <b-row>
                      <b-col>
                        <span>Bradesco</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <label-value :values="bankData" />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
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
      </b-col>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import EggsList from '@/components/EggsList.vue';
import LabelValue from '@/components/LabelValue.vue';
import { mapActions, mapGetters } from 'vuex';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import BANK_DATA from '@/constants/BankData.js';

export default {
  name: 'CargoPackingDetails',
  components: {
    RHeader,
    EggsList,
    LabelValue,
  },
  // props: ['cargoPackingId'],
  data() {
    return {
      isEditing: false,
      additionalFeePrice: null,
      onlineFee: null,
      customer: JSON.parse(localStorage.getItem('selectedCustomer')),
      orderItems: null,
      redEggsList: null,
      whiteEggsList: null,
      generalData: [],
      dueDate: [],
      moneyData: [],
      eggTraysData: [],
      bankData: BANK_DATA,
    };
  },
  created() {
    this.handleCargoPackingLoading();
  },
  methods: {
    ...mapActions(['deleteCustomer', 'loadCustomers', 'setCustomerToEdit', 'loadSelectedCargoPacking']),
    handleSubmit() {
      console.log('salvar');
    },
    async handleCargoPackingLoading() {
      const cargoPackingId = localStorage.getItem('selectedCargoPackingId');
      await this.loadSelectedCargoPacking(cargoPackingId);
      this.orderItems = this.getSelectedCargoPacking.cargoPacking.order_items;
      this.redEggsList = this.orderItems
        .filter((oI) => oI.egg_details.color === 'Vermelho')
        .map((egg) => {
          return {
            id: egg.id,
            size: egg.egg_details.size,
            amount: egg.amount,
            color: egg.egg_details.color,
            price: egg.cur_egg_price,
          };
        });
      this.redEggsList.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      this.whiteEggsList = this.orderItems
        .filter((oI) => oI.egg_details.color === 'Branco')
        .map((egg) => {
          return {
            id: egg.id,
            size: egg.egg_details.size,
            amount: egg.amount,
            color: egg.egg_details.color,
            price: egg.cur_egg_price,
          };
        });
      this.whiteEggsList.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      const cargoPacking = this.getSelectedCargoPacking.cargoPacking;
      const cargoPackingVD = this.getSelectedCargoPacking.cargoVirtualData;
      this.generalData = [
        {
          label: 'Número da nota: ',
          value: cargoPacking.receipt_number,
        },
        {
          label: 'Valor da nota: ',
          value: `R$ ${cargoPacking.receipt_value}`,
        },
        {
          label: 'Status: ',
          value: cargoPacking.is_paid === false ? 'Em aberto' : 'Pago',
        },
        {
          label: 'Quantidade de caixas: ',
          value: cargoPackingVD.totalBoxesAmount,
        },
      ];

      this.dueDate = [
        {
          label: 'Vencimento: ',
          value: format(parseISO(cargoPacking.due_to), "d 'de' MMMM", { locale: pt }),
        },
      ];

      this.moneyData = [
        {
          label: 'Valor total das caixas: ',
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
          label: 'Valor Embalagens: ',
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
      ];
    },
    async handleEdit() {
      await this.setCustomerToEdit(this.customer);
      this.$router.push({ name: 'newCustomer' });
    },
    handleDelete() {
      this.$bvModal
        .msgBoxConfirm('Deseja mesmo excluir este cliente?', {
          centered: true,
          size: 'sm',
          buttonSize: 'sm',
          okTitle: 'Sim',
          cancelTitle: 'Cancelar',
        })
        .then(async (value) => {
          if (value) {
            this.deleteCustomer(this.customer.id);
            await this.loadCustomers();

            this.$router.push({ name: 'customers' });
          }
        })
        .catch((err) => {
          console.log(err);
          // An error occurred
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
      console.log(packagesValue);
      return {
        eggTray: { eggTrayAmount, eggTrayPrice },
        eggBox: { eggBoxAmount, eggBoxPrice },
        packagesValue,
      };
    },
    address: () => {
      const c = JSON.parse(localStorage.getItem('selectedCustomer')).address;
      const { city, state } = c;
      let address = `${city}, ${state}`;
      address = address.replace('undefined, ', '');
      address = address.replace(', ,', ',');
      return address;
    },
  },
};
</script>

<style scoped lang="scss">
.eggs {
  position: relative;
  min-width: 1080px;
  padding: 15px 30px 15px;
  border-radius: 4px;
  background: #fff;
  top: 50px;
  margin: 20px auto;
  align-items: stretch;
  min-height: 295px;
}

.data {
  text-align: center;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.bg-transparent {
  background: rgba(255, 255, 255, 0.1);
  min-height: 300px;
}

.test {
  position: absolute;
  opacity: 0.1;
  top: -53px;
  left: -5px;
}

.flex {
  /* background-image: url('../../assets/granja.png'); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-weight: bold;
  }
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.align-address {
  display: flex;
  justify-content: flex-end;
  position: relative;
  bottom: 35px;
}

.bold {
  font-weight: bold;
}

.due-date {
  color: red;
  font-weight: bold;
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

.align-name-address {
  display: flex;
  align-items: center;
}

.row {
  padding: 0 5px;
}
</style>
