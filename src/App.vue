<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './components/FooterNav'

  export default {
    components: {
      Footer
    }
  }
</script>

<style>

</style>
