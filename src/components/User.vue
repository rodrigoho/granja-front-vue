<template>
  <div>
    <b-col>
      <div class="user">
        <label-value :values="userData" />
        <button type="button" @click="handleClick">Editar</button>
      </div>
    </b-col>
  </div>
</template>

<script>
import LabelValue from '@/components/LabelValue.vue';

export default {
  name: 'User',
  props: ['user'],
  components: {
    LabelValue,
  },
  data() {
    return {
      userData: [
        {
          label: 'Nome:',
          value: this.user.name,
        },
        {
          label: 'Email:',
          value: this.user.email,
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ path: `/user-edit/${this.user.id}` });
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.user {
  width: 300px;
  padding: 15px 20px 15px;
  border-radius: 4px;
  background: #fff;
  margin: 10px;

  button {
    position: relative;
    left: 215px;
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
