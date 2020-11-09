import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  /**
   *  {
   *    path: '/home',
   *    component: () => import('...'),
   *    meta: { auth: true }
   *  }
   **/
]

const router = new VueRouter({
  routes
})

/**
 *  跳转页面时进行身份验证
 **/
router.beforeEach(async (to, from, next) => {
  if (
    // 目标页面需要登录后才能进入
    to.meta.auth &&
    // 用户身份验证失败
    await store.dispatch('user/validate') === false
  ) {
    return store.dispatch('user/logout')
  }
  return next()
})

export default router
