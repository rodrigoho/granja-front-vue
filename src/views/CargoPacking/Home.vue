<template>
  <div class="home">
    <r-header
      :title="'Romaneios'"
      :buttonTitle="'Novo Romaneio'"
      :toRouteName="'newCargoPacking'"
      :shouldShowButton="true"
    />
    <!-- {{ cargoPackingsList.length }} -->
    <b-container>
      <!-- {{ displayCargoPackings.length }} <br />
      {{ currentPage }} <br /> -->
      <b-row align-h="center" class="align-cards">
        <!-- {{ getCargoPackings }} <br /> -->
        <!-- <div class="cargo-packings-section"> -->
        <cargo-packing
          v-for="cargoPacking in getCargoPackings.rows"
          :key="cargoPacking.id"
          :cargoPacking="cargoPacking"
        />
        <!-- </div> -->
      </b-row>
      <b-row class="align-pagination">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="Primeira"
          prev-text="Ant"
          next-text="Prox"
          last-text="Ultima"
          @input="paginate(currentPage)"
        >
        </b-pagination>
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
      currentPage: 1,
      rows: 13,
      perPage: 9,
    };
  },
  created() {
    this.handleCargoPackingsLoading();
  },
  methods: {
    ...mapActions(['loadCargoPackings']),
    async handleCargoPackingsLoading() {
      await this.loadCargoPackings(this.currentPage);
      this.cargoPackingsList = this.getCargoPackings;
    },
    async paginate(currentPage) {
      console.log(currentPage);
      await this.loadCargoPackings(currentPage);
      console.log(JSON.stringify(this.getCargoPackings));
    },
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
  padding: 0 30px;
}

.align-pagination {
  /* position: absolute; */
  margin-top: 90px;
  justify-content: center;
}
</style>
