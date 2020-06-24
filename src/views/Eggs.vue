<template>
  <div class="eggs">
    <b-container fluid>
      <r-header :title="'Ovos'" :buttonTitle="'Novo Ovo'" />
      <b-row align-h="center" class="align-cards"></b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import RHeader from '@/components/RHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Eggs',
  components: {
    RHeader,
  },
  created() {
    this.loadCargoPackings();
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
</style>
