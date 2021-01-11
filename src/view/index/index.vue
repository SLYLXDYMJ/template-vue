<template>
  <v-container>
    <h1 class="headline mb-3">
      首页
    </h1>
    <h2 class="title">
      这个页面不需要登录即可访问
      <br>
      但是这个页面的部分操作必须要登录后才可进行
      <br>
      下面的按钮代表一个必须要登录后才能进行的操作，比如说支付，加入购物车等
    </h2>
    <v-btn
      class="mt-5"
      color="primary"
      @click="onClick">
      俺是按钮
    </v-btn>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('user', {
        userToken: state => state.token,
        userInfo: state => state.info
      })
    },
    methods: {
      onClick () {
        /**
         *  判断用户是否登录
         *  若未登录，则跳转到等登录页面
         **/
        if (!this.userToken) {
          this.$store.dispatch('user/goLogin')
        }
        else {
          this.$dialog.info({
            title: '友情提示',
            text: '用户已登录，可以进行后续操作'
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>