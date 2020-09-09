import Vue from 'vue';
import './plugins/bootstrap-vue';
import './plugins/vueToasted';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/global-style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
