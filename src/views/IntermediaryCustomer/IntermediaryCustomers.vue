<template>
  <div class="customers">
    <r-header :title="'Clientes'" :buttonTitle="'Novo Cliente'" :toRouteName="'newCustomer'" :shouldShowButton="true" />
    <b-container>
      <b-row align-h="center" class="align-cards">
        <customer v-for="(customer, idx) in getCustomers" :key="idx" :customer="customer" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import RHeader from '@/components/RHeader.vue';
import Customer from '@/components/Customer.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Customers',
  components: {
    RHeader,
    Customer,
  },
  created() {
    this.loadCustomers();
  },
  methods: {
    ...mapActions(['loadCustomers']),
  },
  computed: {
    ...mapGetters(['getCustomers']),
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
</style>
