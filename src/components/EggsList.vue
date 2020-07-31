<template>
  <div>
    <!-- <b-col> -->
    <div class="eggs-list" v-bind:class="{ teste2: isFromCargoPacking }">
      <b-row align-h="center">
        <h3 v-bind:class="{ titleColor: isFromCargoPacking }">
          {{ cardTitle }}
        </h3>
      </b-row>
      <!-- {{ eggs }} -->
      <div class="flex">
        <button
          class="teste"
          v-if="cardTitle === 'Branco' && !isFromCargoPacking"
          variant="primary"
          @click="handleEditClick"
        >
          Editar
        </button>
        <b-form class="align-body" @submit="onSubmit" @reset="onReset">
          <div class="card-height">
            <b-row v-if="isFromCargoPacking">
              <b-col></b-col>
              <b-col class="bold">Quantidade</b-col>
              <b-col sm="3" class="bold">Preço</b-col>
            </b-row>
            <b-row v-for="egg in eggs" :key="egg.id" class="flex2">
              <b-col class="bold">{{ egg.size }}</b-col>
              <b-col v-show="isFromCargoPacking" class="box-amount">{{ egg.amount }}</b-col>
              <b-col v-show="!isEditing" class="align-price">R$ {{ egg.price }}</b-col>
              <b-col v-show="isEditing"
                ><b-input v-model="egg.price" type="number" class="input-size" step=".01"
              /></b-col>
            </b-row>
          </div>
          <b-row v-show="isFromCargoPacking" class="align-total-boxes"
            ><b-col><span class="bold">Total de caixas</span></b-col> <b-col></b-col
            ><b-col class="box-amount bold">{{ boxesAmount }}</b-col></b-row
          >
          <b-row class="align-buttons" v-if="isEditing">
            <b-col class="buttons">
              <b-button type="button" variant="danger" @click="handleCancel" size="sm">Cancelar</b-button>
              <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>

      <!-- {{ eggsList }} -->
    </div>
    <!-- </b-col> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EggsList',
  props: {
    eggsColor: String,
    cardTitle: String,
    eggsList: Array,
    isFromCargoPacking: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      isEditing: false,
      // shouldIncrease: true,
      // shouldShowTitle: false,
    };
  },
  created() {
    this.handleAdditionalFeeLoading();
    this.handleEggsListLoading();
  },
  methods: {
    ...mapActions(['updateEgg', 'loadEggsList', 'loadAdditionalFee']),
    async handleAdditionalFeeLoading() {
      await this.loadAdditionalFee();
    },
    async handleEggsListLoading() {
      await this.loadEggsList();
    },
    handleEditClick() {
      this.isEditing = !this.isEditing;
    },
    async handleSave() {
      // const { current_fee_price: additionalFee } = this.getAdditionalFee;
      this.eggs.map((e) => {
        const updatedEgg = {
          ...e,
          id: e.id,
          size: e.size,
          price: parseFloat(e.price),
          // additionalFee: parseInt(additionalFee),
        };
        // console.log(updatedEgg);
        this.updateEgg(updatedEgg);
      });
      await this.loadEggsList();
    },
    onSubmit(e) {
      e.preventDefault();
      // const { current_fee_price: additionalFee } = this.getAdditionalFee;
      // this.eggsList.map((e) => {
      //   const updatedEgg = {
      //     id: e.id,
      //     size: e.size,
      //     price: parseFloat(e.price),
      //     additionalFee: parseInt(additionalFee),
      //   };
      //   // console.log(updatedEgg);
      //   this.updateEgg(updatedEgg);
      // });
      this.handleSave();
      this.handleEggsListLoading();
      this.isEditing = false;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
    },
    handleCancel() {
      this.isEditing = false;
    },
  },
  computed: {
    ...mapGetters(['getAdditionalFee', 'getRedEggsList', 'getWhiteEggsList']),
    eggs: function () {
      let test = [];
      if (!this.isFromCargoPacking && this.eggsColor === 'white') {
        test = this.getWhiteEggsList;
      } else if (this.eggsList) {
        test = this.eggsList;
      } else {
        test = this.getRedEggsList;
      }
      // return this.eggsColor === 'white' ? this.getWhiteEggsList : this.getRedEggsList;
      return test;
    },
    boxesAmount: function () {
      let test = 0;
      this.eggsList && this.eggsList.map((egg) => (test += egg.amount));
      return test;
    },
  },
};
</script>

<style scoped lang="scss">
.eggs-list {
  position: relative;
  min-width: 300px;
  padding: 15px 30px 15px;
  /* border-radius: 4px; */
  /* background: rgba(255, 255, 255, 1); */
  margin: 10px;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
}

.teste {
  position: absolute;
  right: 30px;
  top: 24px;
  height: 20px;
  width: 50px;
  font-size: 11px;
  background: #007bff;
  color: #fff;
  border: 0;
  border-radius: 4px;
}

.titleColor {
  color: red;
}

.teste2 {
  min-width: 345px;
  top: -10px;
  margin-bottom: -10px;
}

.box-amount {
  left: 55px;
}
.align-price {
  left: 20px;
}

/* .align-total-boxes {

} */

.input-size {
  position: relative;
  top: 2px;
  height: 21px;
  width: 60px;
  font-size: 12px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lg-input-size {
  height: 21px;
  width: 95px;
  font-size: 12px;
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.align-buttons {
  margin-top: 15px;

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  button + button {
    margin-left: 5px;
  }
}

.flex2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-height {
  min-height: 175px;
}

.align-body {
  margin-top: 10px;
}

.bold {
  font-weight: bold;
}

.egg-color {
  text-align: center;
}
</style>
