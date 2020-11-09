import router from '@/router'

/** 记住密码时，存入 Storage 中的 key 值 **/
const KEY_TOKEN = 'token'

export default {
  namespaced: true,
  state: {
    /**
     *  用户身份标识
     **/
    token:
      sessionStorage[ KEY_TOKEN ] ||
      localStorage[ KEY_TOKEN ] ||
      null,
    
    /**
     *  用户信息
     **/
    info: null
  },
  actions: {
    /**
     *  登录，
     *  最终需要设置 token
     *  @param { String } token - 登录成功后获得的用户身份 token
     **/
    login ({ commit }, token) {
      /**
       *  建议在组件中实现账号密码验证逻辑
       *  在这里只设置 token
       **/
      
      commit('SET_TOKEN', token)
    },
    
    /**
     *  验证用户身份是否有效
     *  最终需要返回 true 或 false
     **/
    validate ({ state }) {
      return Boolean(state.token)
    },
    
    /**
     *  获取用户信息
     *  最终需要返回获取到的用户信息
     **/
    async getInfo () {
      return { name: 'jason' }
    },
    
    /**
     *  更新用户信息
     *  最终需要设置 info
     **/
    async updateInfo ({ commit, dispatch }) {
      commit('SET_INFO', await dispatch('getInfo'))
    },
    
    /**
     *  记录登录状态
     *  @param { Boolean } forever - 是否永久记住
     **/
    remember ({ state }, forever = false) {
      let { token } = state
      
      if (token) {
        let storage = forever ? localStorage : sessionStorage
        storage[ KEY_TOKEN ] = state.token
      }
    },
    
    /**
     *  登出
     *
     *  ! 登出后会重定向到 /login 页面
     *  ! 并拼接上 ?redirect 参数
     *  ! 方便登录成功后定位
     **/
    logout ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_INFO', null)
      
      delete sessionStorage[ KEY_TOKEN ]
      delete localStorage[ KEY_TOKEN ]
      
      /**
       *  ! 不推荐在这里弹出提示
       *  ! 建议在调用 logout 的组件中弹框提示用户
       *  ! 因为登出原因可能不相同，统一不起来
       **/
      
      return router.replace(
        `/login?redirect=${ router.history.current.fullPath }`
      )
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_INFO (state, info) {
      state.info = info
    }
  }
}