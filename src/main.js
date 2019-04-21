import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
window.moment = require('moment');

Vue.use(ElementUI, { locale });
Vue.prototype.$eventHub = new Vue();

import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
