import router from '@/router'

/**
 *  记住密码时，存入 Storage 中的 key 值
 *  ! 需要根据情况自行修改
 **/
const KEY_TOKEN = 'token'

/**
 *  登录页面路由地址
 *  ! 需要根据情况自行修改
 **/
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
      return Boolean(state.token)
    }
  },
  actions: {
    /**
     *  设置 user token
     *  @param { String }  token             token
     *  @param { Boolean } [remember=false] 是否永久记录登录状态
     **/
    setToken ({ commit }, { token, remember = false } = {}) {
      commit('SET_TOKEN', token);
      (remember ? localStorage : sessionStorage)[ KEY_TOKEN ] = token
    },
    
    /**
     *  验证用户身份是否有效
     *  ! 该方法应该通过服务器验证用户状态是否有效
     *  ! 该方法需要自行实现
     *
     *  @returns { Boolean } 状态是否有效
     **/
    async check ({ state }) {
      return Boolean(state.token)
    },
    
    /**
     *  更新用户信息并返回用户信息
     *  ! 该方法需要自行实现
     *
     *  @returns { Object } 用户信息
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
     *  方便在登录成功后页面重定向或返回上一层
     *
     *  @param { Boolean | String } [redirect]
     *    若为 true 则代表登录成功后，重定向当前页面。
     *    若为 string 则代表登录成功后，重定向到手动指定的页面。
     *    若不存在，则代表登录成功后，返回上一层。
     **/
    goLogin ({ commit }, { redirect } = {}) {
      // 指向当前页面
      if (redirect === true) {
        // 第一个页面的路由信息放在 pending 属性中
        // 其余正常跳转时路由信息放在 current 属性中
        redirect = router.history.pending ?
          router.history.pending.fullPath :
          router.history.current.fullPath
      }
      
      router.push({
        path: redirect ?
          `${ LOGIN_PATH }?redirect=${ redirect }` :
          LOGIN_PATH
      })
    },
    
    /**
     *  退出登录并且重定向到登录页面
     *
     *  @param { Boolean | String } [redirect=true] 若为 true 则指向当前页面，若为 string 则代表手动指定页面。
     **/
    logoutAndGoLogin ({ dispatch }, payload = {}) {
      dispatch('logout')
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