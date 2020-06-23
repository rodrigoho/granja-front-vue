<template>
  <div class="home">
    <b-container fluid>
      <r-header :title="'Romaneios'" :buttonTitle="'Novo Romaneio'" />
      <b-row align-h="center" class="align-cards">
        <cargo-packing v-for="(customer, idx) in getCustomers" :key="idx" :customer="customer" />
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
