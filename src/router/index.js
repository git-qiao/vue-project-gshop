import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history' // 设置路由导航不带#
})
