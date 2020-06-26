<template>
  <div>
    <div v-for="(value, idx) in values" :key="idx" class="flex">
      <span class="label">
        {{ value.label }}
      </span>
      <span>
        {{ value.value }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelValue',
  props: ['values'],
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 auto;

  .label {
    font-weight: bold;
  }
}
</style>
