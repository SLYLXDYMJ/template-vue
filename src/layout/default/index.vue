<template>
  <el-container>
    <el-header>
      <header class="header">
        <el-menu
          mode="horizontal"
          router
          :default-active="$route.path">
          <el-menu-item index="/">
            首页
          </el-menu-item>
          <el-menu-item index="/person">
            个人
          </el-menu-item>
          <el-menu-item index="/login" v-if="!loggedIn">
            登录
          </el-menu-item>
          <el-menu-item v-else @click="logout">
            登出
          </el-menu-item>
        </el-menu>
      </header>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'layout-default',
    computed: {
      ...mapGetters('user', [ 'loggedIn' ])
    },
    methods: {
      logout () {
        this.$store.dispatch('user/logoutAndGoLogin', {
          redirect: false
        })
        this.$message.success('已退出登录')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
  }
</style>