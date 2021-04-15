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
        <b-table
          @sort-changed="sortingChanged"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          striped
          responsive="sm"
          class="table-style"
        >
          <template #cell(customer.name)="row">
            {{ row.value }}
          </template>
          <template #cell(intermediary.name)="row">
            {{ row.value ? row.value : '-' }}
          </template>
          <template #cell(custom_date_timestamp)="row"> {{ row.item.custom_date }} </template>
          <template #cell(due_to)="row">
            {{ formattedSingleDate(row.value) }}
          </template>
          <template #cell(total_price)="row"> {{ formattedMoneyValue(row.value) }}</template>
          <template #cell(paid_amount)="row">
            {{ formattedMoneyValue(amountDue(row.item.total_price, row.value)) }}</template
          >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="handleDetailsClick(row.item.id)" class="mr-2"> Detalhes </b-button>
          </template>
        </b-table>
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
import { format, parseISO } from 'date-fns';
import RHeader from '@/components/RHeader.vue';
import { priceFormatter } from '@/mixins/priceFormatter';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  title: 'Granja',
  mixins: [priceFormatter],
  components: {
    RHeader,
  },
  data() {
    return {
      fields: [
        {
          key: 'customer.name',
          label: 'Nome',
        },
        {
          key: 'intermediary.name',
          label: 'Intermediário',
        },
        {
          key: 'custom_date' || 'custom_date_timestamp',
          label: 'Data da Carga',
          sortable: true,
        },
        {
          key: 'due_to',
          label: 'Vencimento',
          sortable: true,
        },
        {
          key: 'total_price',
          label: 'Valor Total',
        },
        {
          key: 'paid_amount',
          label: 'Saldo Devedor',
        },
        {
          key: 'show_details',
          label: 'Detalhes',
        },
      ],
      currentPage: 1,
      sortDirection: 'DESC',
      columnToSort: 'due_to',
      perPage: 10,
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
    if (this.$route.params.toRoute) {
      this.$router.push(this.$route.params.toRoute);
    }
    this.handleCargoPackingsLoading();
  },
  methods: {
    ...mapActions(['loadCargoPackings']),
    async handleCargoPackingsLoading() {
      const curPage = this.currentPage;
      await this.loadCargoPackings({ curPage, sortDirection: 'DESC', columnToSort: 'due_to' });
    },
    async paginate(curPage) {
      await this.loadCargoPackings({ curPage, sortDirection: this.sortDirection, columnToSort: this.columnToSort });
    },
    async handleCargoPackingFilter() {
      // if (this.selectedCargoPackingFilter === 0) {
      //   await this.loadDueCargoPackings(this.currentPage);
      // } else if (this.selectedCargoPackingFilter === 1) {
      //   await this.loadPaidCargoPackings(this.currentPage);
      // } else if (this.selectedCargoPackingFilter === 2) {
      //   await this.loadAnalysisCargoPackings(this.currentPage);
      // } else {
      //   await this.loadCargoPackings(this.currentPage);
      // }
      // this.cargoPackingsList = this.getCargoPackings;
    },
    handleDetailsClick(cargoPackingId) {
      this.$router.push({
        path: `cargo-packing-details/${cargoPackingId}`,
      });
    },
    formattedDate(dateToFormat) {
      if (dateToFormat.custom_date_timestamp) {
        return format(parseISO(dateToFormat.custom_date_timestamp), 'dd/MM/yyyy');
      } else return format(parseISO(dateToFormat.created_at), 'dd/MM/yyyy');
    },
    formattedSingleDate(dateToFormat) {
      return dateToFormat && format(parseISO(dateToFormat), 'dd/MM/yyyy');
    },
    amountDue(totalValue, paidValue) {
      const floatTotalValue = parseFloat(totalValue);
      const paidVal = paidValue ? paidValue : 0;
      const floatPaidValue = parseFloat(paidVal);

      return (floatTotalValue - floatPaidValue).toFixed(2);
    },
    sortingChanged(ctx) {
      const { currentPage: curPage, sortDesc: isSortDesc, sortBy: columnToSort } = ctx;
      const sortDirection = isSortDesc ? 'DESC' : 'ASC';
      this.sortDirection = sortDirection;
      this.columnToSort = columnToSort;
      this.loadCargoPackings({ curPage, sortDirection, columnToSort });
    },
  },
  computed: {
    ...mapGetters(['getCargoPackings']),
    rows() {
      return this.getCargoPackings.count;
    },
    items() {
      return this.getCargoPackings.rows;
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

.table-style {
  background: white;
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
