<template>
  <div class="flex">
    <label for="example-datepicker">Vencimento</label>
    <b-form-datepicker
      id="example-datepicker"
      v-model="value"
      class="mb-2 teste"
      @context="onContext"
      size="sm"
    ></b-form-datepicker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
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
      console.log(this.context);
      this.$emit('update:selectedDate', ctx.selectedDate);
    },
    handleSelectedDate() {
      this.value = localStorage.getItem('editingCargoPackingDate');
      console.log(this.value);
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
  width: 250px;
}
</style>
