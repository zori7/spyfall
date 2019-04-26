import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
window.moment = require('moment');
window.axios = require('axios');

Vue.use(ElementUI, { locale });
Vue.prototype.$eventHub = new Vue();
Vue.mixin({
	data () {
		return {
			kv_token: 'X9yWSvj5D6MvJNu2C6JmuU'
		}
	},
	methods: {
		kvGet (key) {
			return new Promise (resolve => {
				axios.get('https://kvdb.io/' + this.kv_token + '/' + key).then(res => {
					resolve(res.data);
				});
			});
		},
		kvSet (key, value) {
			return new Promise (resolve => {
				axios.post('https://kvdb.io/' + this.kv_token + '/' + key, value).then(() => {
					resolve();
				});
			});
		},
		kvRemove (key) {
			return new Promise (resolve => {
				axios.delete('https://kvdb.io/' + this.kv_token + '/' + key).then(() => {
					resolve();
				});
			})
		}
	}
});

import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
