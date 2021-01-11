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

      <!-- raciocínio: criar um v-else com uma estrutura diferente, baseada
no novo objeto após filtrar pela data. -->

      <!-- <div class="flex">
        <b-row class="align-buttons" v-if="isEditing">
          <b-col class="buttons">
            <b-button type="button" variant="danger" @click="handleCancel" size="sm">Cancelar</b-button>
            <b-button type="submit" variant="primary" size="sm">Salvar</b-button>
          </b-col>
        </b-row>
      </div> -->

      <!-- <div class="card-height">
        <b-row v-for="egg in eggsLists[eggsColor]" :key="egg.id">
          <b-col class="bold">{{ egg.size }}</b-col>
          <b-col v-show="!isEditing" class="align-price">R$ {{ egg.price }}</b-col>
          <b-col v-show="isEditing"><b-input v-model="egg.price" type="number" class="input-size" step=".01" /></b-col>
        </b-row>
      </div> -->
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
      // console.log(this.getEggsList);
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
        console.log(updatedEgg.id, updatedEgg);
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
    ...mapGetters(['getAdditionalFee', 'getRedEggsList', 'getWhiteEggsList', 'getEggsList']),
    // eggs2: function () {
    //   let test = [];
    //   if (!this.isFromCargoPacking && this.eggsColor === 'white') {
    //     test = this.getWhiteEggsList;
    //   } else if (!this.isFromCargoPacking && this.eggsColor === 'red') {
    //     test = this.getRedEggsList;
    //   } else {
    //     test = this.eggList;
    //   }
    //   return test;
    // },
    eggs: function () {
      console.log(this.getEggsList);
      console.log(this.eggsColor);
      if (this.eggsColor === 'red') {
        const a = this.getEggsList.filter((egg) => egg.color === 'Vermelho');
        this.getEggsList.forEach((e) => console.log(e));
        console.log(a);
        return this.getEggsList.filter((egg) => egg.color === 'Vermelho');
      } else {
        return this.getEggsList.filter((egg) => egg.color === 'Branco');
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
