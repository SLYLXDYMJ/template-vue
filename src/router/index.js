import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  /**
   *  {
   *    path: '/home',
   *    component: () => import('...'),
   *    meta: { auth: true // 表示该页面是否需要登录才可以进入 }
   *  }
   **/
  {
    path: '/',
    component: () => import('../layouts/default/index'),
    children: [
      {
        path: '',
        component: () => import('../pages/index/index')
      },
      {
        path: 'login',
        component: () => import('../pages/login/index'),
        meta: { header: false }
      },
      {
        path: 'person',
        component: () => import('../pages/person/index'),
        meta: { auth: true }
      }
    ]
  }
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
    await store.dispatch('user/check') === false
  ) {
    return store.dispatch('user/logoutAndGoLogin', {
      redirect: true
    })
  }
  return next()
})

export default router
