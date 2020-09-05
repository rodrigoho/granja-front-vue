<template>
  <div>
    <b-col>
      <div class="cargo-packing">
        <label-value :values="cargoPackingData" />
        <button type="button" @click="handleClick">Detalhes</button>
      </div>
    </b-col>
  </div>
</template>

<script>
import LabelValue from '@/components/LabelValue.vue';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default {
  name: 'CargoPacking',
  props: ['cargoPacking'],
  components: {
    LabelValue,
  },
  data() {
    return {
      cargoPackingData: [
        {
          label: 'Nome:',
          value: this.cargoPacking.customer.name,
        },
        {
          label: 'Número da nota:',
          value: this.cargoPacking.receipt_number,
        },
        {
          label: 'Status:',
          value: this.cargoPacking.is_paid ? 'Pago' : 'Em aberto',
        },
        {
          label: 'Vencimento:',
          value: format(parseISO(this.cargoPacking.due_to), "d 'de' MMMM", { locale: pt }),
        },
      ],
    };
  },
  methods: {
    handleClick() {
      localStorage.setItem('selectedCargoPackingId', this.cargoPacking.id);
      this.$router.push({
        path: `cargo-packing-details/${this.cargoPacking.id}`,
        // params: { cargoPackingId: this.cargoPacking.id },
      });
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
