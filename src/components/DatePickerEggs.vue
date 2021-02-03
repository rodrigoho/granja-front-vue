<template>
  <div class="flex">
    <label for="date-picker-eggs">Data</label>
    <b-form-datepicker
      id="date-picker-eggs"
      v-model="value"
      class="mb-2 teste"
      @context="onContext"
      size="sm"
    ></b-form-datepicker>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'DatePickerEggs',
  data() {
    return {
      value: null,
      context: null,
    };
  },
  mounted() {
    this.handleSelectedDate();
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
      // console.log(ctx, this.context);
      // console.log('value\n===\n', this.value, '\n===\n\n');
      // const b = ctx.selectedDate;
      // const u = parseISO(this.value);
      // const c = format(ctx.activeDate, 'dd/MM/yyyy');
      if (typeof this.value === 'string') {
        console.log('TAMO PROGREDINDO', ctx.selectedDate);
        const formattedSelectedDate = format(ctx.selectedDate, 'dd/MM/yyyy');
        const formattedDateTimestamp = ctx.selectedDate;
        this.$emit('uepa', { formattedSelectedDate, formattedDateTimestamp });
      }
      // console.log('', b, '\n', u, b === u);
      // console.log(this.value);
      this.$emit('update:selectedDateEggs', ctx.selectedDate);
    },
    handleSelectedDate() {
      this.value = new Date();
    },
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.teste {
  width: 310px;
}
</style>
