import Vue from 'vue'
import moment from 'moment'

// 注册一个全局过滤器
Vue.filter('date-format', function (val, arg='MM-DD  HH:mm:ss') {
  return moment(val).format(arg)
})
