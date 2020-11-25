在需要身份验证的页面组件 meta 中配置 auth

```javascript
const routes = [
  /**
   *  {
   *    path: '/home',
   *    component: () => import('...'),
   *    meta: { auth: true }
   *  }
   **/
]
```

加入跳转页面时的身份验证代码
```javascript
router.beforeEach(async (to, from, next) => {
  if (
    // 目标页面需要登录后才能进入
    to.meta.auth &&
    // 用户身份验证失败
    await store.dispatch('user/check') === false
  ) {
    return store.dispatch('user/logout')
  }
  return next()
})
```