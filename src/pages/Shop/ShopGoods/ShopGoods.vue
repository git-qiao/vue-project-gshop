<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="tabCont">
          <!-- current为选中的class类名 -->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{current: currentIndex===index}"
            @click="clickHandle(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!--有可能需要用到的类名food-list food-list-hook-->
        <ul ref="ulCont">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                      <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <CartFooter/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  // import CartControl from '../../../components/CartControl/CartControl'
  import CartFooter from '../../../components/CartFooter/CartFooter'

  export default {
    components: {
      CartFooter
    },
    data () {
      return{
        scrollY: 0,  // 右侧列表的滑动坐标
        tops: [],     //每一个分类的顶部距离ul盒子的距离
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => { // 界面更新后才会执行
          // 初始化滑动
          this._initScroll()
          /*new BScroll('.menu-wrapper', {})
          this.rightScroll = new BScroll('.foods-wrapper', {
            probeType: 3
          })*/
          // 初始化tops内部的值
          this._initTops()
        })
      })
      // 注册BScroll 新版本已经解决了，只有在界面显示后才会调用的的问题,可以直接在后面使用
      // new BScroll('.menu-wrapper', {})
      // new BScroll('.foods-wrapper', {})
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),
      // 当前分类项下标
      currentIndex () {
        const {tops, scrollY} = this
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
        // 每次currentIndex变化, 左侧滚动到最新分类项(可能达不到)
        if (index !== this._index && this.leftScroll) { // 当前标记变化了
          // 将最新的index保存想来
          this._index = index
          // 左侧滚动到最新分类项
          this.leftScroll.scrollToElement(this.$refs.tabCont.children[index], 300)
        }
        return index
      }
    },
    methods: {
      // 初始化滑动
      _initScroll () {
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true
        })
        this.goodsScroll = new BScroll('.foods-wrapper', {
          probeType: 1,   // 触摸   非实时  -- 不耗费性能，推荐使用。但是需要结合scrollEnd解决惯性结束的位置
          // probeType: 2  // 触摸   实时
          // probeType: 3  // 触摸/惯性/编码  实时
          click: true  // 需要右侧也需要点击 ，所以需要开启默认的点击事件
        })
        // 滑动是，实时更新scrollY的值
        this.goodsScroll.on('scroll', ({x,y}) => {
          console.log(x + '--scroll--' + y)
          this.scrollY = Math.abs(y)
        })
        // 结合上面（probeType: 1）使用实时更新scrollY的值
        this.goodsScroll.on('scrollEnd', ({x,y}) => {
          console.log(x + '--scrollEnd--' + y)
          this.scrollY = Math.abs(y)
        })
      },

      // 初始化tops内部的值
      _initTops () {
        // 统计tops
        const tops = []
        let top=0
        tops.push(top)
        const lis = this.$refs.ulCont.getElementsByClassName('food-list-hook')
        const lisTruth = Array.prototype.slice.call(lis);
        lisTruth.forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // 更新数据
        this.tops = tops
      },

      // 点击左侧右侧滑动
      clickHandle (index) {
        // 右侧对应位置的坐标
        const {tops} = this
        const y = tops[index];

        // 让点击当前项时立即变色
        this.scrollY = y

        // 右侧滑动到指定的位置
        this.goodsScroll.scrollTo(0, -y, 500)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 222px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
