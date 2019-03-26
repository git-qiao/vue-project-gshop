<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>详情</router-link>
      </div>
    </div>

    <!--keep-alive 缓存路由组件对象-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import {reqGoodsMock, reqRatingsMock, reqInfoMock} from '../../api'
  import ShopHeader from '../../components/ShopHeader/ShopHeader'

  export default {
    components: {
      ShopHeader
    },
    async mounted () {
      // 测试Ajax的请求是否会被mock拦截，但是还会返回数据
      /*const result1 = await reqGoodsMock()
      const result2 = await reqRatingsMock()
      const result3 = await reqInfoMock()
      console.log(result1, result2, result3)*/

      // 请求action里的getShopInfo得到商家的详细信息
      this.$store.dispatch('getShopInfo')
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774

</style>
