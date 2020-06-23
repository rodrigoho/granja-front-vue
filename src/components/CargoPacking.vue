<template>
  <div>
    <b-col>
      <div class="cargo-packing">
        <label-value :values="customerData" />
        <!-- <r-button :title="'Detalhes'" /> -->
        <button type="button" @click="handleClick">Detalhes</button>
      </div>
    </b-col>
  </div>
</template>

<script>
import LabelValue from '@/components/LabelValue.vue';
// import RButton from '@/components/RButton.vue';
// import EventBus from '@/utils/eventBus';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default {
  name: 'CargoPacking',
  props: ['customer'],
  components: {
    LabelValue,
    // RButton,
  },
  data() {
    return {
      customerData: [
        {
          label: 'Nome:',
          value: this.customer.customer.name,
        },
        {
          label: 'Número da  nota:',
          value: this.customer.receipt_number,
        },
        {
          label: 'Status:',
          value: this.customer.is_paid ? 'Pago' : 'Em aberto',
        },
        {
          label: 'Valor:',
          value: format(parseISO(this.customer.due_to), "d 'de' MMMM", { locale: pt }),
        },
      ],
    };
  },
  // mounted() {
  //   EventBus.$on('r-button-clicked', () => {
  //     console.log('fui clicado');
  //   });
  // },
  methods: {
    handleClick() {
      console.log('fui clicado');
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.cargo-packing {
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
