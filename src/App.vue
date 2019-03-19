<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  // import {reqLocation, reqShops, reqCategorys} from './api'
  // import ajax from './api/ajax' // 直接测试ajax.js的封装函数
  import Footer from './components/FooterNav/FooterNav'

  export default {
    components: {
      Footer
    },
    // 测试接口部分
    /*async mounted () {
      // const re = await reqLocation('116.36867','40.10038')
      // console.log(re)
      // const re2 = await reqShops('116.36867','40.10038')
      // console.log(re2)
      // const re3 = await reqCategorys()
      // console.log(re3)
      //
      // const re = await ajax('/api/position/40.10038,116.36867')
      // console.log(re) // 测试Ajax文件
    }*/
    // 触发actions部分
    mounted () {
      // 1.触发标题部分
      this.$store.dispatch('getAddress')
      // 2.触发商家列表
      this.$store.dispatch('getShops')
      // 3.触发快捷入口列表
      this.$store.dispatch('getCategorys')
    }
  }
</script>

<style>

</style>
