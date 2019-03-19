<template>
  <div :class="'star star-'+num">
    <span class="star-item" v-for="(s,index) in starArr" :key="index" :class="s"></span>
  </div>
</template>

<script>
  export default {
    props: {
      rating: Number,
      num: Number
    },
    computed: {
      starArr () { // 根据rating得到一个存储类名的数组-->遍历到界面上
        let arr = []
        const {rating} = this
        const onNum = Math.floor(rating)
        const offNum = Math.round(rating)
        // 插入n个on
        for (let i=0; i<onNum; i++){
          arr.push('on')
        }
        // 插入1/0个half
        if (offNum-onNum) {
          arr.push('half')
        }
        //插入n个off
        while (arr.length<5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./imgs/stars/star48_on')
        &.half
          bg-image('./imgs/stars/star48_half')
        &.off
          bg-image('./imgs/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./imgs/stars/star36_on')
        &.half
          bg-image('./imgs/stars/star36_half')
        &.off
          bg-image('./imgs/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./imgs/stars/star24_on')
        &.half
          bg-image('./imgs/stars/star24_half')
        &.off
          bg-image('./imgs/stars/star24_off')
</style>
