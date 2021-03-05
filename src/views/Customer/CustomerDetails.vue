<template>
  <div class="customer-details">
    <r-header
      :title="'Cliente'"
      :buttonTitle="'Voltar aos clientes'"
      :toRouteName="'customers'"
      :shouldShowButton="true"
    />
    <b-container>
      <b-row class="flex-cargo-packing" align-h="start">
        <div class="align-toolbar">
          <b-col cols="3">
            <div class="toolbar">
              <div class="teste">
                <b-button @click="handleEdit">Editar</b-button>
                <b-button @click="handleDelete">Deletar</b-button>
              </div>
            </div>
          </b-col>
        </div>

        <div>
          <b-col cols="5">
            <div>
              <b-card class="style-eggs-details">
                <b-row v-for="(cD, idx) in customerData" :key="idx" class="align-data">
                  <b-col cols="5" class="bold">{{ cD.label }}</b-col
                  ><b-col cols="7">{{ cD.value }}</b-col>
                </b-row>
                <b-row class="align-footer-buttons" v-if="isEditing">
                  <b-col class="buttons">
                    <b-button type="button" variant="danger" size="sm">Cancelar</b-button>
                    <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
// import LabelValue from '@/components/LabelValue.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'CustomerDetails',
  components: {
    RHeader,
    // LabelValue,
  },
  data() {
    return {
      isEditing: false,
      currentPage: 1,
      // customer: JSON.parse(localStorage.getItem('selectedCustomer')),
    };
  },
  created() {
    this.handleCustomerLoading();
  },
  methods: {
    ...mapActions(['deleteCustomer', 'loadCustomers', 'setCustomerToEdit', 'loadSelectedCustomer']),
    async handleEdit() {
      // await this.setCustomerToEdit(this.customer);
      this.$router.push({ path: `/customers/edit/${this.$route.params.id}` });
    },
    async handleCustomerLoading() {
      await this.loadSelectedCustomer(this.$route.params.id);
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
            this.deleteCustomer(this.$route.params.id);
            await this.loadCustomers(this.currentPage);

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
    ...mapGetters(['getSelectedCustomer']),
    customerData: function () {
      const c = this.getSelectedCustomer;
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
          value: c.phone ? c.phone : '-',
        },
        {
          label: 'Email',
          value: c.email ? c.email : '-',
        },
        {
          label: 'Desconto',
          value: `R$ ${parseFloat(c.discount).toFixed(2)}`,
        },
        {
          label: 'Fundo Rural',
          value: `R$ ${parseFloat(c.rural_fund_tax).toFixed(2)}`,
        },
        {
          label: 'ICMS',
          value: `R$ ${parseFloat(c.icms_tax).toFixed(2)}`,
        },
        {
          label: 'Endereço',
          value: this.address,
        },
      ];
    },
    address() {
      // const addressObj = this.getSelectedCustomer.address;
      // const { public_area, complement, neighborhood, city, state, number } = addressObj;
      let address = '';
      if (this.getSelectedCustomer.address) {
        address = `${this.getSelectedCustomer.address.public_area}, ${this.getSelectedCustomer.address.complement}, ${this.getSelectedCustomer.address.number}, ${this.getSelectedCustomer.address.neighborhood}, ${this.getSelectedCustomer.address.city}, ${this.getSelectedCustomer.address.state}`;
      }
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

.style-eggs-details {
  position: relative;
  display: flex;
  background: #fff;
  margin: 50px auto;
  width: 500px;
}

.align-toolbar {
  position: relative;
  top: 50px;
  margin-bottom: 20px;
}

.align-data {
  min-width: 450px;
}

.toolbar {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

  width: 190px;
  height: 100px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
}

.flex-cargo-packing {
  position: relative;
  left: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.teste {
  position: relative;
  top: 10px;
  display: flex;
  flex-direction: column;
  width: 160px;
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

.eggs {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  border-radius: 4px;
  background: rgba(255, 255, 255, 0.95);

  padding: 15px;
  /* height: 295px; */
  min-height: 295px;
  min-width: 500px;
}

.bold {
  font-weight: bold;
}

.row {
  padding: 0 5px;
}
</style>
