<template>
  <div id="app">
    <comp-example/>
    <layout-example/>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    created () {
      this.$example()
      api.example.example({ test: 10086 })
    }
  }
</script>

<style lang="scss">

</style>
