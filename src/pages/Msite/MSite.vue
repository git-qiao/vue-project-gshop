<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '定位...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <!--<span class="header_title">
        <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
      </span>-->
      <span class="header_login" slot="right">
        <span class="header_login_text" @click="$router.push('/login')" v-if="!user._id">登录</span>
        <span class="header_login_text" @click="logout" v-else>退出</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="c in cs" :key="c.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com/'+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else><img src="./imgs/msite_back.svg" alt=""></div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ShopItems/>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {MessageBox} from 'mint-ui'

  import Header from '../../components/Header/Header'
  import ShopItems from '../../components/ShopItems/ShopItems'

  export default {
    components: {
      Header,
      ShopItems
    },
    computed: {
      ...mapState(['address', 'categorys', 'user']),
      // 处理categorys，成二维数组，满足我们遍历到界面
      categorysArr () {
        const {categorys} = this
        // 空的二维数组
        let arr = []
        let smallArr = []
        categorys.forEach( c => {
          // 将小数组保存到大数组(只能保存1次)
          if (smallArr.length === 0) {
            arr.push(smallArr)
          }
          // 将c保存小数组 (最大长度是8)
          smallArr.push(c)
          // 如果当前小数组满了, 准备一个新的小数组
          if (smallArr.length ===8) {
            smallArr = []
          }
        })
        return arr
      }
    },
    mounted () {
      // console.log(this)
      // 2.触发商家列表
      this.$store.dispatch('getShops')
      // 3.触发快捷入口列表
      this.$store.dispatch('getCategorys')

      // 创建swiper对象的时机? 必须在列表页面显示之后
      /*new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })*/
    },
    watch: {
      categorys () {
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    },
    methods: {
      logout () {
        MessageBox.confirm('确定要退出登录?').then(action => {
          this.$store.dispatch('resetUser')
        }).catch(action => {})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          display block
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
      .shop_container
        margin-bottom 50px
</style>
