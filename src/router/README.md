管理项目路由的目录

在需要身份验证的页面组件 meta 中配置
```javascript
{ auth: true }
```

其中 "跳转页面时进行身份验证" 在这里完成
```javascript
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
```