/*
* 自定义过滤器模块
* */

import Vue from 'vue'
// import moment from 'moment' // moment功能太多
import format from 'date-fns/format'

// 注册一个全局过滤器
Vue.filter('date-format', function (val, arg='MM-DD  HH:mm:ss') {
  // return moment(val).format(arg)
  return format(val, arg)
})
