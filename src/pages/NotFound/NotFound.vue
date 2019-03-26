<template>
  <div class="not-found">
    <img src="./imgs/timg.jpg" alt="">
    <button @click="$router.replace('/msite')">返回首页</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
  .not-found
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    img
      width 100%
      margin-top -50px
    button
      width 60%
      border 0
      height 36px
      line-height 36px
      color #fff
      background-color #2b333b
</style>
