<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: cartFoodsCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: cartFoodsPrice}"></i>
            </div>
            <div class="num" v-show="cartFoodsCount">{{cartFoodsCount}}</div>
          </div>
          <div class="price" :class="{highlight: cartFoodsPrice}">￥{{cartFoodsPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="isEnough">
            {{isEnoughText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <!--使用v-if会出错 if在隐藏时-->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    computed: {
      ...mapGetters(['cartFoodsCount', 'cartFoodsPrice']),
      ...mapState({
        'info': state => state.shop.info,
        'cartFoods': state => state.shop.cartFoods
      }),
      // 底部最右侧的文字
      isEnoughText () {
        const {cartFoodsPrice, info} = this
        const price = info.minPrice
        if (cartFoodsPrice===0) {
          return `￥${price || 0}元起送`
        } else if (cartFoodsPrice<20) {
          return `还差￥${price-cartFoodsPrice}元起送`
        } else {
          return '去结算'
        }
      },
      // 底部最右侧的样式
      isEnough () {
        const {cartFoodsPrice, info} = this
        /*if (cartFoodsPrice<info.minPrice) {
          return 'not-enough'
        } else{
          return 'enough'
        }*/
        return cartFoodsPrice>=info.minPrice ? 'enough' : 'not-enough'
      },

      // 购物车列表的显示隐藏  根据 isShow和cartFoodsCount
      listShow () {
        const {isShow, cartFoodsCount} = this
        // 总数为0直接返回false
        if (cartFoodsCount === 0) {
          this.isShow = false
          return false
        }

        // 如果列表将要显示了，创建scroll对象
        // 点击事件的响应是由 BScroll对象控制的
        if (isShow) {
          console.log('-----')
          /*
          * scroll对象只能有一个（单例对象）
          * 1.创建前判断不存在
          * 2.创建后保存
          * */
          this.$nextTick(() => {
            if (!this.bscroll) { // 不存在时才会保存
              this.bscroll = new BScroll('.list-content', {  // new时会添加style样式
                click: true
              })
            } else { // 每次显示的时候，都需要scroll重新统计一下
              this.bscroll.refresh()   //refresh不会添加style样式
            }
          })
        }

        return isShow
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      toggleShow () {
        // 只有总数大于0才切换
        if (this.cartFoodsCount>0) {
          this.isShow = !this.isShow
        }
      },
      // 清空购物车的操作
      emptyCart () {
        this.$store.dispatch('emptyCart')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin-left 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 5px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 5px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s
      &.move-enter, &.move-leave-to
        transform: translateY(0%)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

