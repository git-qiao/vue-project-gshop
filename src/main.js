import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload' // mint-ui自带会下载vue-lazyload

// 执行mock模块进行Ajax请求的拦截
import './mock/mockServer'

import App from './App'
import router from './router'
import store from './store'

import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'

import './filters'  //引入过滤器模块，只需要执行一次即可注册到全局Vue函数对象上

import loading from './common/imgs/loading.gif'

// 注册全局组件
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button)

Vue.config.productionTip = false

Vue.use(VueLazyload,{ // 全局定义了一个全局指令 lazy
  loading
})

// 将store对象保存到Vue函数对象上
// 测试导航守卫的用法
Vue.store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*components: { App },
  template: '<App/>',*/
  render: c => c(App),
  router,
  store
})
