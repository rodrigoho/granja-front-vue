<template>
  <div class="home">
    <r-header
      :title="'Romaneios'"
      :buttonTitle="'Novo Romaneio'"
      :toRouteName="'newCargoPacking'"
      :shouldShowButton="true"
    />
    <b-col>
      <b-row class="align-filter-counter">
        <b-form-select
          id="input-3"
          class="teste"
          v-model="selectedCargoPackingFilter"
          :options="cargoPackingFilters"
          @change="handleCargoPackingFilter"
          size="sm"
        >
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>Selecione o Filtro</b-form-select-option>
          </template>
        </b-form-select>
        <span class="style-count">Total de romaneios: {{ getCargoPackings.count }}</span>
      </b-row>
    </b-col>
    <b-container>
      <b-row align-h="center" class="align-cards">
        <cargo-packing
          v-for="cargoPacking in getCargoPackings.rows"
          :key="cargoPacking.id"
          :cargoPacking="cargoPacking"
        />
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
      perPage: 9,
      selectedCargoPackingFilter: 0,
      cargoPackingFilters: [
        {
          value: 0,
          text: 'Em aberto',
        },
        {
          value: 1,
          text: 'Pagos',
        },
        {
          value: 2,
          text: 'Análise',
        },
        {
          value: 3,
          text: 'Todos',
        },
      ],
    };
  },
  created() {
    this.handleCargoPackingsLoading();
  },
  methods: {
    ...mapActions(['loadCargoPackings', 'loadDueCargoPackings', 'loadPaidCargoPackings', 'loadAnalysisCargoPackings']),
    async handleCargoPackingsLoading() {
      await this.loadDueCargoPackings(this.currentPage);
      this.cargoPackingsList = this.getCargoPackings;
    },
    async paginate(currentPage) {
      await this.loadCargoPackings(currentPage);
    },
    async handleCargoPackingFilter() {
      if (this.selectedCargoPackingFilter === 0) {
        await this.loadDueCargoPackings(this.currentPage);
      } else if (this.selectedCargoPackingFilter === 1) {
        await this.loadPaidCargoPackings(this.currentPage);
      } else if (this.selectedCargoPackingFilter === 2) {
        await this.loadAnalysisCargoPackings(this.currentPage);
      } else {
        await this.loadCargoPackings(this.currentPage);
      }
      this.cargoPackingsList = this.getCargoPackings;
    },
  },
  computed: {
    ...mapGetters(['getCargoPackings']),
    rows() {
      return this.cargoPackingsList.count;
    },
  },
};
</script>

<style scoped lang="scss">
.align-cards {
  position: relative;
  top: 50px;
  display: flex;
  padding: 0 30px;
}

.align-filter-counter {
  padding-left: 85px;
  padding-right: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  top: 40px;
  align-items: center;
}

.style-count {
  font-weight: bold;
  position: relative;
  right: 50px;
  padding: 2px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  height: 30px;
  width: 210px;
}

.align-pagination {
  margin-top: 90px;
  justify-content: center;
}

.teste {
  width: 200px;
}
</style>
