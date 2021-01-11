<template>
  <v-app>
    <v-app-bar app v-if="$route.meta.header !== false">
      <!-- 登录之前的导航 -->
      <template v-if="!userToken">
        <v-tabs right>
          <v-tab link to="/">
            首页
          </v-tab>
        </v-tabs>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="error"
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/login')">
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
          </template>
          <span>登录</span>
        </v-tooltip>
      </template>
      <!-- 登录之后的导航 -->
      <template v-else>
        <v-tabs right>
          <v-tab link to="/">
            首页
          </v-tab>
          <v-tab link to="/person">
            用户中心
          </v-tab>
        </v-tabs>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="error"
              v-bind="attrs"
              v-on="on"
              @click="logout">
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </template>
          <span>退出登录</span>
        </v-tooltip>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'layout-default',
    computed: {
      ...mapState('user', {
        userToken: state => state.token,
        userInfo: state => state.info
      })
    },
    methods: {
      logout () {
        this.$store.dispatch('user/logoutAndGoLogin', {
          redirect: false
        })
        this.$dialog.message.success('已退出登录')
      }
    }
  }
</script>

<style scoped>
</style>