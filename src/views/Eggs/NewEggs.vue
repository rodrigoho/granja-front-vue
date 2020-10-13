<template>
  <div>
    <r-header :title="'Novos Ovos'" :shouldShowButton="false" />
    <b-container>
      <b-card align-h="center" class="align-cards">
        <!-- New Egg form -->
        <b-form @submit="onSubmit" @reset="onReset">
          <!-- Egg data -->
          <h3>Ovos Brancos</h3>

          <b-row class="flex" cols="2" v-for="(egg, idx) in eggsArray" :key="idx">
            <!-- Customer name -->
            <b-col sm="9">
              <span>{{ egg.size }}</span>
            </b-col>
            <b-col sm="3" class="align-inputs">
              <b-input v-model="egg.price" type="number" class="align-single-input" size="sm" step=".01" />
            </b-col>
          </b-row>
          <b-row class="flex red-fee-row" cols="2"
            ><b-col sm="9"><span>Taxa Ovo Vermelho: </span></b-col
            ><b-col sm="3"
              ><b-input v-model="additionalFee" type="number" class="align-single-input" size="sm" step=".01" /></b-col
          ></b-row>
          <b-row class="flex" cols="2"
            ><b-col sm="7"><span>Ovo Online: </span></b-col
            ><b-col sm="5" class="flex-row"
              ><b-input v-model="leftNumber" type="number" class="input-size" size="sm" step=".01" />
              <span class="align-inputs">a</span>
              <b-input v-model="rightNumber" type="number" class="input-size" size="sm" step=".01" /></b-col
          ></b-row>
          <!-- End of Customer Data section -->

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
import RHeader from '@/components/RHeader.vue';
import { mapActions } from 'vuex';
export default {
  name: 'NewEggs',
  components: {
    RHeader,
  },
  data() {
    return {
      eggsArray: [
        { size: 'Jumbo', price: 0 },
        { size: 'Extra', price: 0 },
        { size: 'Grande', price: 0 },
        { size: 'Médio', price: 0 },
        { size: 'Pequeno', price: 0 },
        { size: 'Industrial', price: 0 },
      ],
      customerEditing: false,
      customerId: null,
      selectedUserId: null,
      test: '',
      additionalFee: 0,
      leftNumber: 0,
      rightNumber: 0,
    };
  },
  created() {
    this.selectedUserId = localStorage.getItem('userId');
  },
  methods: {
    ...mapActions(['createEgg', 'loadEggsList', 'createAdditionalFee']),
    async handleEggsList(eggsList) {
      const newAdditionalFee = {
        current_fee_price: parseFloat(this.additionalFee),
        online_fee: `R$ ${this.leftNumber} a R$ ${this.rightNumber}`,
        last_edited_by_user_id: this.selectedUserId,
      };
      await this.createAdditionalFee(newAdditionalFee);
      eggsList.map(async (e) => {
        const eggPrice = parseFloat(e.price);
        const eggSize = e.size;

        const redPrice = eggPrice + parseFloat(this.additionalFee);

        const redEgg = { color: 'Vermelho', price: parseFloat(redPrice), size: eggSize };
        const whiteEgg = { color: 'Branco', price: parseFloat(eggPrice), size: eggSize };

        await this.createEgg(redEgg);
        await this.createEgg(whiteEgg);
      });
    },
    async onSubmit(evt) {
      evt.preventDefault();

      this.handleEggsList(this.eggsArray);
      // await this.loadEggsList();

      this.$router.push({ name: 'eggs' });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
    },
  },
  computed: {
    // ...mapGetters(['getAdditionalFee']),
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  width: 390px;
  position: relative;
  top: 50px;
  display: flex;
  background: #fff;
  margin: auto;
  /* width: 600px; */
}

.flex {
  padding: 0 1.375rem;
  .flex-row {
    display: flex;
    flex-direction: row;
    .input-size {
      text-align: center;
    }
    .align-inputs {
      margin: 0 5px;
      position: relative;
      font-weight: normal;
      top: 9px;
    }
  }
}

span {
  font-weight: bold;
}

.align-single-input {
  position: relative;
  text-align: center;
  left: 8px;
  width: 45px;
}

.row {
  margin-bottom: 5px;
}

.red-fee-row {
  margin-top: 15px;
}

.col {
  padding: 0 0.375rem;
}

.form-buttons {
  margin-top: 25px;
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
