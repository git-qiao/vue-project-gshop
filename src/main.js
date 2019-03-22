import Vue from 'vue'
import {Button} from 'mint-ui'

// 执行mock模块进行Ajax请求的拦截
import './mock/mockServer'

import App from './App'
import router from './router'
import store from './store'

import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'

Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*components: { App },
  template: '<App/>',*/
  render: c => c(App),
  router,
  store
})
