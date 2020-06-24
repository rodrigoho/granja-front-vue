<template>
  <div class="home">
    <b-container fluid>
      <r-header
        :title="'Romaneios'"
        :buttonTitle="'Novo Romaneio'"
        :toRouterName="'newCargoPacking'"
      />
      <b-row align-h="center" class="align-cards teste">
        <cargo-packing
          v-for="(cargoPacking, idx) in getCargoPackings"
          :key="idx"
          :cargoPacking="cargoPacking"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CargoPacking from '@/components/CargoPacking.vue';
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    CargoPacking,
    RHeader,
  },
  data() {
    return {
      cargoPackingsList: [],
    };
  },
  async created() {
    await this.loadCargoPackings();
    this.cargoPackingsList = this.getCargoPackings;
  },
  methods: {
    ...mapActions(['loadCargoPackings']),
  },
  computed: {
    ...mapGetters(['getCargoPackings']),
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  align-items: flex-end;
}

.teste {
  padding: 0 30px;
}
</style>
