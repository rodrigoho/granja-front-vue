<template>
  <div class="eggs">
    <r-header :title="'Ovos'" :buttonTitle="'Criar Ovos'" :toRouteName="'newEggs'" />
    <div class="toolbar">
      <div class="teste">
        <b-button @click="handleEggsToView('today')">Hoje</b-button>
        <b-button @click="handleEggsToView('previous')">Anteriores</b-button>
      </div>
    </div>

    <b-container fluid>
      <div v-if="whichEggsToView === 'today'">
        <b-row align-h="center" class="align-cards">
          <r-card :cardTitle="'Taxa Adicional'" />
        </b-row>
        <b-row align-h="center" class="align-cards">
          <eggs-list :eggsColor="'white'" :cardTitle="'Branco'" :isEditable="true" class="bg-white" />
          <eggs-list :eggsColor="'red'" :cardTitle="'Vermelho'" class="bg-white" />
        </b-row>
      </div>
      <div v-else>
        <egg-prices />
      </div>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import EggsList from '@/components/EggsList.vue';
import RCard from '@/components/RCard.vue';
import EggPrices from '@/views/Eggs/EggPrices.vue';
import { mapActions, mapGetters } from 'vuex';
import { eggPriceMixin } from '@/mixins/eggPriceMixin.js';

export default {
  name: 'Eggs',
  mixins: [eggPriceMixin],
  components: {
    RHeader,
    EggsList,
    RCard,
    EggPrices,
  },
  data() {
    return {
      whichEggsToView: 'today',
    };
  },
  mounted() {
    this.handleLoadEggList();
  },
  methods: {
    ...mapActions(['loadEggsList', 'loadAdditionalFee', 'loadRedEggsList']),
    async handleLoadEggList() {
      await this.loadAdditionalFee();
      await this.loadEggsList();

      this.updateRedEggs(this.getAdditionalFee.current_fee_price);
    },
    handleEggsToView(whichEggs) {
      this.whichEggsToView = whichEggs;
    },
  },
  computed: {
    ...mapGetters(['getRedEggsList', 'getWhiteEggsList', 'getAdditionalFee']),
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  align-items: flex-start;
}

.bg-white {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
}

.toolbar {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  width: 220px;
  height: 100px;
  left: 50px;
  top: 200px;
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 2;
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
</style>
