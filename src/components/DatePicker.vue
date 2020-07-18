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
  data() {
    return {
      value: '',
      context: null,
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
      this.$emit('update:selectedDate', ctx.selectedDate);
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
  width: 220px;
}
</style>
