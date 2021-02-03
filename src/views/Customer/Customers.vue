<template>
  <div class="customers">
    <r-header :title="'Clientes'" :buttonTitle="'Novo Cliente'" :toRouteName="'newCustomer'" :shouldShowButton="true" />

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
import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Customers',
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
          key: 'address.city',
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
    this.loadCustomers();
  },
  methods: {
    ...mapActions(['loadCustomers']),
    sortingChanged(ctx) {
      const { currentPage: curPage } = ctx;
      this.loadCustomers({ curPage });
      console.log(ctx);
    },
    async paginate(curPage) {
      await this.loadCustomers(curPage);
    },
    handleDetailsClick(customerId) {
      this.$router.push({
        path: `/customers/customer-details/${customerId}`,
      });
    },
  },
  computed: {
    ...mapGetters(['getCustomers']),
    rows() {
      return this.getCustomers.count;
    },
    items() {
      return this.getCustomers.rows;
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
