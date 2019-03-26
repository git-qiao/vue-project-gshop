import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*export default new VueRouter({
  routes,
  mode: 'history' // 设置路由导航不带#
})*/
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 定义全局前置守卫
const paths = ['/a', '/b'] //所有需要定义权限的路由数组
/*router.beforeEach((to, from, next) => {
  // console.log('beforeEach()', to, from)

  // 如果请求的路由为数组中的，没有登录直接跳转到登录界面
  const path = to.path
  if (paths.indexOf(path) !== -1) {
    if (!Vue.store.state.user.user._id) { //用户没登陆
      return next('/login')
    }
  }

  // 放行
  next()
})*/
router.beforeEach((to, from, next) => {

  const path = to.path  // 取到将要进入的路径
  if (paths.indexOf(path) !== -1) { //判断将要加权限的路径
    if (!Vue.store.state.user.user._id) { //mei登录
      return next('/login')  // 去登陆
    }
  }
  next()

})

export default router
