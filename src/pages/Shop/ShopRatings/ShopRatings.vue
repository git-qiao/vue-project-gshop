<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :rating="info.serviceScore" :num="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :rating="info.foodScore" :num="36"/>
            <span class="score">{{info.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <RatingFilter :filterType="filterType" :isHandUp="isHandUp" @CFilterType="CFilterType" :tHandUp="tHandUp"/>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item"
              v-for="(rating, index) in filterRatings"
              :key="index"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :rating="rating.score" :num="24"/>
                <span class="delivery">{{rating.score}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont " :class="!rating.rateType ? 'icon-thumb_up':'icon-thumb_down'"></span>
                <span class="item " v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import BScroll from 'better-scroll'

  import RatingFilter from '../../../components/RatingFilter/RatingFilter'

  export default {
    data () {
      return {
        filterType: 0,   // 选择的类型: 0: 推荐, 1: 吐槽, 2: 全部
        isHandUp: true  // 是否只显示有内容的
      }
    },
    components: {
      RatingFilter
    },
    // info信息已经在进入商家时被获取到
    mounted () {
      this.$store.dispatch('getShopRatings', () => {
        this.$nextTick(() => {
          new BScroll('.ratings')
        })
      })
    },
    computed: {
      ...mapState({
        info: state => state.shop.info,
        ratings: state => state.shop.ratings
      }),
      filterRatings () {
        const {ratings, filterType, isHandUp} = this
        /*
            复杂的编码
            1. 流程长: 确定各个步骤
            2. 可能性/情况多: 对各个情况分好类
            条件1
              filterType: 0/1/2
              rateType: 0/1
              可能1: selectType===2
              可能2: selectType===rateType
              filterType===2 || filterType===rateType
            条件2
              isHandUp: true/false
              text: length>0 / =0
              可能1: onlyContent===false
              可能2: text.length>0
              isHandUp===false || text.length>0
              !isHandUp || text.length>0
         */
        return ratings.filter(rating => {
          return (filterType===2 || filterType===rating.rateType)&&(!isHandUp || rating.text.length>0)
        }) //
      }
    },
    methods: {
      // 自定义事件 --- 绑定监听
      CFilterType (v) {
        this.filterType = v
      },
      tHandUp () {
        this.isHandUp = !this.isHandUp
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          text-align: center
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
