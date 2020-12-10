<template>
  <v-container>
    <h3 class="title">
      登录
    </h3>
    <v-form>
      <v-text-field label="用户名"/>
      <v-text-field label="密码" type="password"/>
      <v-btn
        class="mr-2"
        color="primary"
        @click="onClick">
        登录
      </v-btn>
      <v-btn
        color="primary"
        @click="$router.replace('/')">
        暂不登录
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import api from '../../api'

  export default {
    methods: {
      async onClick () {
        // 模拟请求接口验证账号密码
        let data = await api.user.login()

        // 模拟账号密码正确，后端返回了 token
        this.$store.dispatch('user/setToken', {
          token: data.cityid,
          remember: false
        })

        // 给出用户提示
        this.$dialog.message.success('登录成功')

        /**
         *   这里先按照 redirect 参数的地址跳转
         *   若无 redirect 参数，则通常跳转到首页
         **/
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
</script>

<style scoped>

</style>