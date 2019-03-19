import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import Star from './components/Star/Star'

Vue.component('Star', Star)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
