import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugin'
import './component'
import './layout'
import './filter'
import './directive'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
