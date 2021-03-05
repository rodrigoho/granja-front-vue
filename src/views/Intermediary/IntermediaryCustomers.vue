<template>
  <div class="intermediary-customers">
    <r-header
      :title="'Intermediários'"
      :buttonTitle="'Novo Intermediário'"
      :toRouteName="'newIntermediaryCustomer'"
      :shouldShowButton="true"
    />
    <!-- <b-container>
      <b-row align-h="center" class="align-cards">
        <intermediary-customer
          v-for="(intermediaryCustomer, idx) in getIntermediaries"
          :key="idx"
          :intermediaryCustomer="intermediaryCustomer"
        />
      </b-row>
    </b-container> -->
    <b-container>
      <b-row align-h="center" class="align-cards">
        <b-table
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
          <template #cell(custom_date_timestamp)="row"> {{ row.item.custom_date }} </template>
          <template #cell(due_to)="row">
            {{ formattedSingleDate(row.value) }}
          </template>
          <template #cell(total_price)="row"> R$ {{ amountDue(row.value, row.item.paid_amount) }}</template>
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
// @ is an alias to /src

import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IntermediaryCustomers',
  components: {
    RHeader,
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Nome',
        },
        {
          key: 'city',
          label: 'Cidade',
        },
        {
          key: 'phone',
          label: 'Telefone',
        },
        {
          key: 'show_details',
          label: 'Detalhes',
        },
      ],
      currentPage: 1,
      perPage: 10,
    };
  },
  created() {
    this.loadIntermediaries(this.currentPage);
  },
  methods: {
    ...mapActions(['loadIntermediaries']),
    // sortingChanged(ctx) {
    //   const { currentPage: curPage } = ctx;
    //   this.loadIntermediaries({ curPage });
    //   console.log(ctx);
    // },
    async paginate(curPage) {
      await this.loadIntermediaries(curPage);
    },
    handleDetailsClick(intermediaryCustomerId) {
      this.$router.push({
        path: `/intermediary/intermediary-details/${intermediaryCustomerId}`,
      });
    },
  },
  computed: {
    ...mapGetters(['getIntermediaries']),
    rows() {
      return this.getIntermediaries.count;
    },
    items() {
      return this.getIntermediaries.rows;
    },
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

.align-pagination {
  margin-top: 90px;
  justify-content: center;
}

.table-style {
  background: white;
}
</style>
