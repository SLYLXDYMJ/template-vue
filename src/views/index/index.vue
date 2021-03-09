<template>
  <div class="root">
    <h2>
      首页
    </h2>
    <br>
    <p>
      这个页面不需要登录即可访问
      <br>
      但是这个页面的部分操作必须要登录后才可进行
      <br>
      下面的按钮代表一个
      <b>必须要登录后</b>
      才能进行的操作，比如说支付，加入购物车等
    </p>
    <br>
    <el-button
      type="primary"
      size="small"
      @click="$router.push('/person')">
      跳转到登录后才能进入的 "个人中心" 页面
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="alert">
      若已登录，则直接弹出弹框，
      若未登录，则先去登录，登录后触发弹框。
    </el-button>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState('user', {
        userToken: state => state.token,
        userInfo: state => state.info
      }),
      ...mapGetters('user', [ 'loggedIn' ])
    },
    methods: {
      alert () {
        if (!this.loggedIn) {
          return this.$store.dispatch('user/goLogin')
        }

        window.alert('123')
      }
    }
  }
</script>

<style scoped>
</style>