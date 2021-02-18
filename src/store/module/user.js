import router from '@/router'

/** 记住密码时，存入 Storage 中的 key 值 **/
const KEY_TOKEN = 'token'

/** 登录页面路由地址 **/
const LOGIN_PATH = '/login'

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
  getters: {
    /**
     *  当前用户是否已登录
     **/
    loggedIn (state) {
      return !!state.token
    }
  },
  actions: {
    /**
     *  设置 user token
     *  @param { String }  token             - token
     *  @param { Boolean } [remember=false]  - 是否永久记录 token
     **/
    setToken ({ commit }, { token, remember }) {
      commit('SET_TOKEN', token);
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
     *  清空用户相关的所有信息
     *  清空 Storage 中的 token
     **/
    logout ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_INFO', null)
      
      delete sessionStorage[ KEY_TOKEN ]
      delete localStorage[ KEY_TOKEN ]
    },
    
    /**
     *  重定向到登录页面
     *  用于登出，用户身份验证失败等场景
     *  这里统一加上重定向参数 redirect
     *  方便在登录成功后页面重定向
     *
     *  @param { Boolean } [redirect=true] - 是否包含重定向参数
     **/
    goLogin ({ commit }, payload = { redirect: true }) {
      // 第一个页面的路由信息放在 pending 属性中
      // 其余正常跳转时路由信息放在 current 属性中
      let redirectPath = router.history.pending ?
        router.history.pending.fullPath :
        router.history.current.fullPath
      
      router.replace(
        payload.redirect === false ?
          LOGIN_PATH :
          `${ LOGIN_PATH }?redirect=${ redirectPath }`
      )
    },
    
    /**
     *  退出登录并且重定向到登录页面
     **/
    logoutAndGoLogin ({ dispatch }, payload = {}) {
      dispatch('logout', payload)
      dispatch('goLogin', payload)
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