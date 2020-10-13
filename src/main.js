import Vue from 'vue';
import './plugins/bootstrap-vue';
import './plugins/vueToasted';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/global-style.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
