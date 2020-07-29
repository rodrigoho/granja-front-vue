<template>
  <div class="eggs">
    <r-header
      :title="'Ovos'"
      :buttonTitle="'Criar Ovos'"
      :toRouteName="'newEggs'"
      :shouldShowButton="!whiteEggsList.length"
    />
    <b-container fluid>
      <b-row align-h="center" class="align-cards">
        <r-card :cardTitle="'Taxa Adicional'" />
      </b-row>
      <b-row align-h="center" class="align-cards">
        <eggs-list :eggsColor="'white'" :cardTitle="'Branco'" class="bg-white" />
        <eggs-list :eggsColor="'red'" :cardTitle="'Vermelho'" class="bg-white" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import RHeader from '@/components/RHeader.vue';
import EggsList from '@/components/EggsList.vue';
import RCard from '@/components/RCard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Eggs',
  components: {
    RHeader,
    EggsList,
    RCard,
  },
  data() {
    return {
      whiteEggsList: [],
      redEggsList: [],
    };
  },
  mounted() {
    this.handleLoadEggList();
  },
  methods: {
    ...mapActions(['loadEggsList']),
    async handleLoadEggList() {
      await this.loadEggsList();
      this.whiteEggsList = this.getWhiteEggsList;
      this.redEggsList = this.getRedEggsList;
    },
  },
  computed: {
    ...mapGetters(['getRedEggsList', 'getWhiteEggsList']),
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
