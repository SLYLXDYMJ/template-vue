<template>
  <v-overlay :value="visible">
    <v-progress-circular
      indeterminate
      size="64"/>
  </v-overlay>
</template>

<script>
  export default {
    name: 'comp-loading',
    data () {
      return {
        visible: false
      }
    },
    methods: {
      show () {
        this.visible = true
      },
      hide () {
        this.visible = false
      }
    }
  }
</script>

<style scoped>

</style>