<template>
  <div>
    <div class="eggs-list">
      <b-row align-h="center">
        <h3>
          {{ cardTitle }}
        </h3>
      </b-row>
      <!-- {{ eggs }} -->
      <div class="flex">
        <button class="button-style" v-if="isEditable" variant="primary" @click="handleEditClick">Editar</button>
        <b-form class="align-body" @submit="onSubmit" @reset="onReset">
          <div class="card-height">
            <b-row v-for="egg in eggs" :key="egg.id">
              <b-col class="bold">{{ egg.size }}</b-col>
              <b-col v-show="!isEditing" class="align-price">R$ {{ egg.price }}</b-col>
              <b-col v-show="isEditing"
                ><b-input v-model="egg.price" type="number" class="input-size" step=".01"
              /></b-col>
            </b-row>
          </div>
          <b-row class="align-buttons" v-if="isEditing">
            <b-col class="buttons">
              <b-button type="button" variant="danger" @click="handleCancel" size="sm">Cancelar</b-button>
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

export default {
  name: 'EggsList',
  props: {
    eggsColor: String,
    cardTitle: String,
    eggsList: Array,
    isEditable: Boolean,
    opa: {
      type: String,
      default: 'teste',
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  created() {
    this.handleAdditionalFeeLoading();
    this.handleEggsListLoading();
  },
  methods: {
    ...mapActions(['updateEgg', 'loadEggsList', 'loadAdditionalFee', 'loadEggsListComplete']),
    async handleAdditionalFeeLoading() {
      await this.loadAdditionalFee();
    },
    async handleEggsListLoading() {
      await this.loadEggsList();
      await this.loadEggsListComplete();
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
    sortArr(listToSort) {
      return listToSort.sort((a, b) => {
        return b.id < a.id ? 1 : b.id > a.id ? -1 : 0;
      });
    },
  },
  computed: {
    ...mapGetters(['getAdditionalFee', 'getRedEggsList', 'getWhiteEggsList', 'getEggsList']),
    eggs() {
      if (this.eggsColor === 'red') {
        return this.sortArr(this.getEggsList.filter((egg) => egg.color === 'Vermelho'));
      } else {
        return this.sortArr(this.getEggsList.filter((egg) => egg.color === 'Branco'));
      }
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
