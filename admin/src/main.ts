import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'
import axios from 'axios'
import EleForm from 'vue-ele-form'
Vue.config.productionTip = false
Vue.use(EleForm)
const http=axios.create({baseURL:""})
Vue.prototype.$httpajax=http
Vue.prototype.$http=http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
