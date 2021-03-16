<template>
  <div class="eggs">
    <r-header :title="'Ovos'" :buttonTitle="'Criar Ovos'" :toRouteName="'newEggs'" />
    <b-container fluid>
      <b-row align-h="center" class="align-cards">
        <r-card :cardTitle="'Taxa Adicional'" />
      </b-row>
      <b-row align-h="center" class="align-cards">
        <eggs-list :eggsColor="'white'" :cardTitle="'Branco'" :isEditable="true" class="bg-white" />
        <eggs-list :eggsColor="'red'" :cardTitle="'Vermelho'" class="bg-white" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RHeader from '@/components/RHeader.vue';
import EggsList from '@/components/EggsList.vue';
import RCard from '@/components/RCard.vue';
import { mapActions, mapGetters } from 'vuex';
import { eggPriceMixin } from '@/mixins/eggPriceMixin.js';

export default {
  name: 'Eggs',
  mixins: [eggPriceMixin],
  components: {
    RHeader,
    EggsList,
    RCard,
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
</style>
