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
      if (typeof this.value === 'string') {
        const formattedSelectedDate = format(ctx.selectedDate, 'dd/MM/yyyy');
        const formattedDateTimestamp = ctx.selectedDate;
        this.$emit('uepa', { formattedSelectedDate, formattedDateTimestamp });
      }
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
