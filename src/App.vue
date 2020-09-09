<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
import io from 'socket.io-client';

export default {
  components: {
    Navbar,
  },
  created() {
    this.io = io('http://localhost:3333');
  },
  mounted() {
    this.io.on('msg', (msg) => {
      // this.notifications.push(msg);
      // console.log(msg);
      this.$toasted.show(`O romaneio ${msg.cargoPacking} foi atualizado`, {
        theme: 'outline',
        duration: 5000,
        action: [
          {
            text: 'Cancelar',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
          {
            text: 'Ir',
            onClick: () => {
              this.redirectToCargoPacking(msg.cargoPacking);
            },
          },
        ],
      });
      // this.$bvToast.toast(`${msg.cargoPacking}`, {
      //   title: `Romaneio ${msg.cargoPacking} foi atualizado`,
      //   autoHideDelay: 3000,
      // });
    });
  },
  methods: {
    redirectToCargoPacking(cargoPackingId) {
      this.$router.push({ path: `/cargo-packing-details/${cargoPackingId}` });
    },
  },
};
</script>
<style lang="scss" scoped></style>
