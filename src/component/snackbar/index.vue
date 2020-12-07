<template>
  <v-snackbar
    v-model="visible"
    v-bind="$attrs"
    v-on="$listeners">
    {{ content }}
  </v-snackbar>
</template>

<script>
  export default {
    name: 'comp-snackbar',
    props: {
      content: {
        type: String,
        required: true
      }
    },
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
    },
    watch: {
      visible: {
        immediate: true,
        handler (value) {
          console.log(value)
        }
      }
    }
  }
</script>

<style scoped>

</style>