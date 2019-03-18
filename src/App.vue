<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import {reqLocation, reqShops, reqCategorys} from './api'
  // import ajax from './api/ajax'
  import Footer from './components/FooterNav/FooterNav'

  export default {
    components: {
      Footer
    },
    // 测试接口部分
    async mounted () {
      const re = await reqLocation('116.36867','40.10038')
      console.log(re)
      const re2 = await reqShops('116.36867','40.10038')
      console.log(re2)
      const re3 = await reqCategorys()
      console.log(re3)
      /*const re = await ajax('/api/position/40.10038,116.36867')
      console.log(re)*/
    }
  }
</script>

<style>

</style>
