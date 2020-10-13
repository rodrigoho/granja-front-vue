<template>
  <div class="intermediary-customers">
    <r-header
      :title="'Intermediários'"
      :buttonTitle="'Novo Intermediário'"
      :toRouteName="'newIntermediaryCustomer'"
      :shouldShowButton="true"
    />
    <b-container>
      <b-row align-h="center" class="align-cards">
        <intermediary-customer
          v-for="(intermediaryCustomer, idx) in getIntermediaryCustomers"
          :key="idx"
          :intermediaryCustomer="intermediaryCustomer"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import RHeader from '@/components/RHeader.vue';
import IntermediaryCustomer from '@/components/IntermediaryCustomer.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IntermediaryCustomers',
  components: {
    RHeader,
    IntermediaryCustomer,
  },
  created() {
    this.loadIntermediaryCustomers();
  },
  methods: {
    ...mapActions(['loadIntermediaryCustomers']),
  },
  computed: {
    ...mapGetters(['getIntermediaryCustomers']),
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
