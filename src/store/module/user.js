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
     *  设置 user token
     *  @param { String }  token     - token
     *  @param { Boolean } remember  - 是否永久记录 token
     **/
    setToken ({ commit }, { token, remember }) {
      commit('SET_TOKEN', token)
      (remember ? localStorage : sessionStorage)[ KEY_TOKEN ] = token
    },
    
    /**
     *  验证用户身份是否有效
     *  @return Boolean
     **/
    check ({ state }) {
      return Boolean(state.token)
    },
    
    /**
     *  更新用户信息并返回用户信息
     *  @return Object
     **/
    async updateInfo ({ commit, dispatch }) {
      let user = { name: 'jason' }
      
      commit('SET_INFO', user)
      return user
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