<template>
  <div class="r-header">
    <span>{{ title }}</span>
    <button type="button" v-if="buttonTitle && shouldShowButton" @click="handleClick">
      {{ buttonTitle }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'RHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Título',
    },
    buttonTitle: {
      type: String,
      required: false,
    },
    toRouteName: {
      type: String,
      required: false,
    },
    shouldShowButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (this.toRouteName) this.$router.push({ name: this.toRouteName });
    },
  },
};
</script>

<style scoped lang="scss">
.r-header {
  position: relative;
  top: 70px;
  margin: 30px 30px 50px;
  background: #fff;
  padding: 10px 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 32px;
    font-weight: bold;
  }

  button {
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
