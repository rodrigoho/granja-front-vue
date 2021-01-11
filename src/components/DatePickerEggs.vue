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
export default {
  name: 'DatePickerEggs',
  data() {
    return {
      value: this.teste || '',
      context: null,
    };
  },
  mounted() {
    this.handleSelectedDate();
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
      this.$emit('update:selectedDateEggs', ctx.selectedDate);
    },
    handleSelectedDate() {
      this.value = localStorage.getItem('editingCargoPackingDate');
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
