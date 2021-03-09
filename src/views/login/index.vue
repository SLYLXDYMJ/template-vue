<template>
  <div>
    <h2>
      登录
    </h2>
    <br>
    <el-row>
      <el-col :span="6">
        <el-form>
          <el-form-item label="用户名">
            <el-input/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">
              一定能登录成功的按钮
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      async login () {
        // 模拟请求接口验证账号密码
        let data = { token: new Date().getTime() }

        // 模拟账号密码正确，后端返回了 token
        this.$store.dispatch('user/setToken', {
          token: data.token,
          remember: false
        })

        // 给出用户提示
        this.$message.success('登录成功')
        
        /**
         *   根据 redirect 进行跳转
         **/
        if (this.$route.query.redirect) {
          this.$router.replace(this.$route.query.redirect)
        }
        else {
          this.$router.back()
        }
      }
    }
  }
</script>

<style scoped>

</style>