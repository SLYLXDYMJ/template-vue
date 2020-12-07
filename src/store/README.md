用户相关的功能封装在 store/module/user.js 模块中

具体封装如下：

## state
 attr  | desc
 ----- | -----
 token | 用户唯一标识
 info  | 用户信息
 
## actions

### setToken
> 设置 user token

```javascript
/**
 *  设置 user token
 *  @param { String }  token     - token
 *  @param { Boolean } remember  - 是否永久记录 token
 **/
store.dispatch('user/setToken', { token, remember })
// => 返回值无意义
```
 
### check
> 验证当前用户身份是否有效 <br/>
> 该方法是实现路由验证的核心 (router.beforeEach)

```javascript
await store.dispatch('user/check')
// => true / false
```

### updateInfo
> 更新用户信息并返回用户信息

```javascript
store.dispatch('user/updateInfo', userInfo)
// => 返回用户信息
```

### logout
> 登出操作

```javascript
/**
 *  登出
 *  清空用户相关的所有信息
 *  清空 Storage 中的 token
 **/
store.dispatch('user/logout')
```

### toLogin
> 去登陆页面

```javascript
/**
 *  重定向到登录页面
 *  用于登出，用户身份验证失败等场景
 *  这里统一加上重定向参数 redirect
 *  方便在登录成功后页面重定向
 *
 *  @param { Boolean } [redirect=true] - 是否包含重定向参数
 **/
store.dispatch('user/toLogin', { redirect: true })
```

## mutations
> 通常只需要调用 actions，不需要自己 commit

 type      | desc
 --------- | ----------------------------------------------------
 SET_TOKEN | 设置用户标识，此方法应该由 action setToken commit，尽量避免手动提交
 SET_INFO  | 设置用户信息，此方法应该由 action updateInfo commit，尽量避免手动提交