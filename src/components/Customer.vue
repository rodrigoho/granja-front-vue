<template>
  <div>
    <b-col>
      <div class="customer">
        <label-value :values="customerData" />
        <button type="button" @click="handleClick">Detalhes</button>
      </div>
    </b-col>
  </div>
</template>

<script>
import LabelValue from '@/components/LabelValue.vue';

export default {
  name: 'CargoPacking',
  props: ['customer'],
  components: {
    LabelValue,
  },
  data() {
    return {
      customerData: [
        {
          label: 'Nome:',
          value: this.customer.name,
        },
        {
          label: 'Telefone:',
          value: this.customer.phone,
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'customerDetails' });
      localStorage.setItem('selectedCustomer', JSON.stringify(this.customer));
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.customer {
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
