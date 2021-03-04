<template>
  <div>
    <b-col>
      <div class="eggs-list">
        <b-row align-h="center">
          <h3>
            {{ cardTitle }}
          </h3>
        </b-row>

        <div class="flex" @submit="onSubmit" @reset="onReset">
          <!-- {{ redEggsList }} -->
          <button class="align-button" variant="primary" @click="handleEditClick">Editar</button>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-row cols="2">
              <b-col sm="7">
                <span>Taxa Ovo Vermelho</span>
              </b-col>
              <b-col v-if="!isEditing" sm="5"> R$ {{ additionalFeePrice }} </b-col>
              <b-col v-if="isEditing" sm="5"
                ><b-input
                  v-model="additionalFeePrice"
                  type="number"
                  class="input-size align-single-input"
                  size="sm"
                  step=".01"
                  placeholder="10"
              /></b-col>
            </b-row>
            <b-row cols="2">
              <b-col sm="7">
                <span>Ovo Online</span>
              </b-col>
              <b-col v-if="!isEditing" sm="5">
                {{ onlineFee }}
              </b-col>
              <b-col v-if="isEditing" sm="4" class="flex-row">
                <b-input v-model="leftNumber" type="number" class="input-size" size="sm" step=".01" />
                <span class="align-inputs">a</span>
                <b-input v-model="rightNumber" type="number" class="input-size" size="sm" step=".01"
              /></b-col>
            </b-row>
            <b-row class="align-buttons" v-if="isEditing">
              <b-col class="buttons">
                <b-button type="button" variant="danger" @click="handleCancel" size="sm">Cancelar</b-button>
                <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { eggPriceMixin } from '@/mixins/eggPriceMixin.js';

export default {
  name: 'RCard',
  mixins: [eggPriceMixin],
  props: ['cardTitle'],
  data() {
    return {
      isEditing: false,
      additionalFeePrice: null,
      onlineFee: null,
      leftNumber: 0,
      rightNumber: 0,
    };
  },
  mounted() {
    this.handleAdditionalFeeLoading();
  },
  methods: {
    ...mapActions(['updateRedEgg', 'loadEggsList', 'loadAdditionalFee', 'updateAdditionalFee']),
    async handleAdditionalFeeLoading() {
      await this.loadAdditionalFee();
      if (this.getAdditionalFee) {
        const {
          current_fee_price: currentFeePrice,
          online_fee: onlineFee,
          min_fee: minFee,
          max_fee: maxFee,
        } = this.getAdditionalFee;
        this.additionalFeePrice = currentFeePrice;
        this.onlineFee = onlineFee;
        this.leftNumber = minFee;
        this.rightNumber = maxFee;
      }
    },
    handleEditClick() {
      this.isEditing = !this.isEditing;
    },
    handleCancel() {
      this.isEditing = false;
    },
    onSubmit(e) {
      e.preventDefault();
      const { id } = this.getAdditionalFee;
      const additionalFee = this.additionalFeePrice;
      const newOnlineFee = `R$ ${this.leftNumber} a R$ ${this.rightNumber}`;
      const updatedAdditionalFee = {
        id: id,
        current_fee_price: additionalFee,
        online_fee: newOnlineFee,
        min_fee: this.leftNumber,
        max_fee: this.rightNumber,
      };
      this.updateAdditionalFee(updatedAdditionalFee);
      this.onlineFee = newOnlineFee;
      this.updateRegEggs(additionalFee);
      this.isEditing = false;
    },
    onReset(evt) {
      evt.preventDefault();
    },
  },
  computed: {
    ...mapGetters(['getAdditionalFee', 'getEggsList']),
  },
};
</script>

<style scoped lang="scss">
.eggs-list {
  width: 390px;
  padding: 15px 30px 15px;
  border-radius: 4px;
  background: #fff;
  margin: 10px;
  align-items: stretch;
  /* min-height: 295px; */
}

.align-button {
  position: absolute;
  right: 50px;
  top: 22px;
  height: 20px;
  width: 50px;
  font-size: 11px;
  background: #007bff;
  color: #fff;
  border: 0;
  border-radius: 4px;
}

.align-single-input {
  position: relative;
  text-align: center;
  width: 45px;
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
  span {
    font-weight: bold;
  }
}

.input-size {
  position: relative;
  top: 2px;
  height: 21px;
  width: 35px;
  text-align: center;
  font-size: 12px;
}
.flex-row {
  display: flex;
  flex-direction: row;
  .align-inputs {
    margin: 0 5px;
    position: relative;
    font-weight: normal;
    top: 3px;
  }
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
</style>
