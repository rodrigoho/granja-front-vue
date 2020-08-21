<template>
  <div>
    <div class="eggs-list">
      <b-row align-h="center">
        <h3 class="titleColor">
          {{ cardTitle }}
        </h3>
      </b-row>
      <!-- {{ eggs }} -->
      <div class="flex">
        <b-form class="align-body" @submit="onSubmit" @reset="onReset">
          <div class="card-height">
            <b-row class="align-title">
              <b-col sm="2"></b-col>
              <b-col class="align-amount-label bold" sm="1">Qtd</b-col>
              <b-col class="align-price-label bold" sm="3">Preço</b-col>
              <b-col class="align-total-price-label bold" sm="4">Total</b-col>
            </b-row>
            <b-row class="flex-evenly" v-for="egg in eggs" :key="egg.id">
              <b-col class="bold" sm="2">{{ egg.size }}</b-col>
              <b-col v-show="!isEditing" class="align-amount" sm="1">{{ egg.amount }}</b-col>
              <b-col v-show="isEditing" sm="2">
                <b-input v-model="egg.amount" type="number" class="input-size" step=".01" />
              </b-col>
              <b-col v-show="!isEditing" class="align-price" sm="4">R$ {{ egg.price }}</b-col>
              <b-col v-show="isEditing"
                ><b-input v-model="egg.price" type="number" class="input-size" step=".01"
              /></b-col>
              <b-col class="align-total-price" sm="4">R$ {{ (egg.price * egg.amount).toFixed(2) }}</b-col>
            </b-row>
          </div>
          <b-row class="align-total-boxes"
            ><b-col sm="5"><span class="bold">Total de caixas</span></b-col> <b-col></b-col
            ><b-col class="box-amount bold">{{ boxesAmount }}</b-col></b-row
          >
        </b-form>
      </div>

      <!-- {{ eggsList }} -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CargoPackingEggsList',
  props: {
    eggsColor: String,
    cardTitle: String,
    eggsList: Array,
    isEditing: Boolean,
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
      this.eggs.map((e) => {
        const updatedEgg = {
          ...e,
          id: e.id,
          size: e.size,
          price: parseFloat(e.price),
        };
        this.updateEgg(updatedEgg);
      });
      await this.loadEggsList();
    },
    onSubmit(e) {
      e.preventDefault();
      this.handleSave();
      this.handleEggsListLoading();
      this.isEditing = false;
    },
    onReset(evt) {
      evt.preventDefault();
    },
    handleCancel() {
      this.isEditing = false;
    },
  },
  computed: {
    ...mapGetters(['getAdditionalFee', 'getRedEggsList', 'getWhiteEggsList']),
    eggs: function () {
      let test = [];
      test = this.eggsList;
      return test;
    },
    boxesAmount() {
      const totalBoxesAmount = this.eggsList && this.eggsList.reduce((acc, egg) => acc + egg.amount, 0);
      return totalBoxesAmount;
    },
  },
};
</script>

<style scoped lang="scss">
.eggs-list {
  position: relative;
  min-width: 350px;
  padding: 15px 30px 15px;
  margin: 10px;
  /* left: 45px; */
}

.align-total-boxes {
  position: relative;
  /* top: 14px; */
}

.align-amount-label {
  position: relative;
  left: 30px;
}

.align-amount {
  position: relative;
  left: 25px;
}

.align-price-label {
  position: relative;
  left: 65px;
}

.align-price {
  position: relative;
  left: 30px;
}

.align-total-price-label {
  position: relative;
  left: 70px;
}

.align-total-price {
  position: relative;
  right: 15px;
}

.flex-evenly {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.titleColor {
  color: red;
}

/* .align-total-price {
  left: 65px;
} */

.align-title {
  position: relative;
  /* left: 75px; */
}

.input-size {
  position: relative;
  top: 2px;
  height: 21px;
  width: 70px;
  font-size: 12px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

.card-height {
  min-height: 175px;
  line-height: 1.8;
}

.align-body {
  position: relative;
  margin-top: 10px;
  left: 30px;
}

.bold {
  font-weight: bold;
}

.egg-color {
  text-align: center;
}
</style>
