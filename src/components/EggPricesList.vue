<template>
  <div>
    <div class="eggs-list">
      <b-row align-h="center">
        <h3>
          {{ eggsColor }}
        </h3>
      </b-row>
      <div>
        <button class="button-style" v-if="isEditable" variant="primary" @click="handleEditClick">Editar</button>
        <b-form v-if="eggs.length" class="flex" @submit="onSubmit" @reset="onReset">
          <b-row v-for="egg in eggs" :key="egg.id">
            <b-col class="bold">{{ egg.size }}</b-col>
            <b-col v-show="!isEditing" class="align-price">R$ {{ egg.price }}</b-col>
            <b-col v-show="isEditing"
              ><b-input v-model="egg.price" type="number" class="input-size" step=".01"
            /></b-col>
          </b-row>
          <b-row class="align-buttons" v-if="isEditing">
            <b-col class="buttons">
              <b-button type="reset" variant="danger" size="sm">Cancelar</b-button>

              <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
            </b-col>
          </b-row>
        </b-form>

        <b-form v-else class="flex" @submit="onSubmit" @reset="onReset">
          <b-row v-for="egg in eggsAlternate" :key="egg.id">
            <b-col class="bold">{{ egg.size }}</b-col>
            <b-col><b-input v-model="egg.price" type="number" class="input-size" step=".01" /></b-col>
          </b-row>
          <b-row class="align-buttons">
            <b-col class="buttons">
              <b-button type="reset" variant="danger" size="sm">Cancelar</b-button>
              <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format } from 'date-fns-tz';

export default {
  name: 'EggPricesList',
  props: {
    eggsColor: String,
    cardTitle: String,
    eggsList: Array,
    isEditable: Boolean,
    selectedDate: {
      type: String,
      required: true,
      default: format(new Date(), 'dd/MM/yyyy'),
    },
  },
  data() {
    return {
      isEditing: false,
      eggsCargoWhite: [
        {
          egg_id: 1,
          size: 'Jumbo',
          price: 0,
        },
        {
          egg_id: 2,
          size: 'Extra',
          price: 0,
        },
        {
          egg_id: 3,
          size: 'Grande',
          price: 0,
        },
        {
          egg_id: 4,
          size: 'Médio',
          price: 0,
        },
        {
          egg_id: 5,
          size: 'Pequeno',
          price: 0,
        },
        {
          egg_id: 6,
          size: 'Industrial',
          price: 0,
        },
      ],
      eggsCargoRed: [
        {
          egg_id: 7,
          size: 'Jumbo',
          price: 0,
        },
        {
          egg_id: 8,
          size: 'Extra',
          price: 0,
        },
        {
          egg_id: 9,
          size: 'Grande',
          price: 0,
        },
        {
          egg_id: 10,
          size: 'Médio',
          price: 0,
        },
        {
          egg_id: 11,
          size: 'Pequeno',
          price: 0,
        },
        {
          egg_id: 12,
          size: 'Industrial',
          price: 0,
        },
      ],
    };
  },
  created() {
    this.handleEggsListLoading();
  },
  methods: {
    ...mapActions(['loadEggPricesList', 'createEggPrice', 'updateEggPrice']),
    async handleEggsListLoading() {
      try {
        if (this.selectedDate) await this.loadEggPricesList({ selected_date: this.selectedDate });
      } catch (err) {
        console.log('oi', err);
      }
    },
    handleEditClick() {
      this.isEditing = !this.isEditing;
    },
    handleSave() {
      if (this.eggs.length) {
        this.eggs.map((e) => {
          const eggPrice = {
            ...e,
            egg_price_id: e.egg_price_id,
            egg_id: e.id,
            size: e.size,
            price_date: this.selectedDate,
            cur_egg_price: parseFloat(e.price),
          };
          if (this.isEditing) {
            this.updateEggPrice(eggPrice);
          } else {
            this.createEggPrice(eggPrice);
          }
        });
      } else {
        this.eggsAlternate.map((e) => {
          const eggPrice = {
            ...e,
            egg_price_id: e.egg_price_id,
            egg_id: e.id,
            size: e.size,
            price_date: this.selectedDate,
            cur_egg_price: parseFloat(e.price),
          };
          if (this.isEditing) {
            this.updateEggPrice(eggPrice);
          } else {
            this.createEggPrice(eggPrice);
          }
        });
      }
      this.isEditing = false;
    },
    onReset(evt) {
      evt.preventDefault();
    },
    onSubmit(e) {
      e.preventDefault();
      this.handleSave();
    },
    sortArr(listToSort) {
      return listToSort.sort((a, b) => {
        return b.id < a.id ? 1 : b.id > a.id ? -1 : 0;
      });
    },
  },
  computed: {
    ...mapGetters(['getEggPricesList']),
    eggs() {
      return this.sortArr(this.getEggPricesList.filter((egg) => egg.color === this.eggsColor));
    },

    eggsAlternate() {
      let eggsToReturn = [];

      if (this.eggsColor === 'Vermelho') {
        eggsToReturn = this.sortArr(this.eggsCargoRed);
      } else {
        eggsToReturn = this.sortArr(this.eggsCargoWhite);
      }
      return eggsToReturn;
    },
  },
};
</script>

<style scoped lang="scss">
.eggs-list {
  position: relative;
  min-width: 300px;
  padding: 15px 30px 15px;
  margin: 10px;
}

.button-style {
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

.align-total-price {
  left: 65px;
}

.align-title {
  position: relative;
  left: 85px;
}

.input-size {
  position: relative;
  top: 2px;
  left: 5px;
  height: 21px;
  width: 70px;
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
