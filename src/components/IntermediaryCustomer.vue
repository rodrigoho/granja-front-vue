<template>
  <div>
    <b-col>
      <div class="intermediary-customer">
        <label-value :values="intermediaryCustomerData" />
        <button type="button" @click="handleClick">Detalhes</button>
      </div>
    </b-col>
  </div>
</template>

<script>
import LabelValue from '@/components/LabelValue.vue';

export default {
  name: 'IntermediaryCustomer',
  props: ['intermediaryCustomer'],
  components: {
    LabelValue,
  },
  data() {
    return {
      intermediaryCustomerData: [
        {
          label: 'Nome:',
          value: this.intermediaryCustomer.name,
        },
        {
          label: 'Telefone:',
          value: this.intermediaryCustomer.phone,
        },
      ],
    };
  },
  methods: {
    handleClick() {
      localStorage.setItem('selectedIntermediaryCustomer', JSON.stringify(this.intermediaryCustomer));
      // this.$router.push({ name: 'intermediaryDetails' });
      this.$router.push({ path: `/intermediary/intermediary-details/${this.intermediaryCustomer.id}` });
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.intermediary-customer {
  width: 300px;
  padding: 15px 20px 15px;
  border-radius: 4px;
  background: #fff;
  margin: 10px;

  button {
    position: relative;
    left: 195px;
    margin-top: 10px;
    align-self: center;
    height: 30px;
    background: #007bff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 12px;
    transition: background 0.2s;
    &:hover {
      background: darken(#007bff, 5%);
    }
  }
}
</style>
