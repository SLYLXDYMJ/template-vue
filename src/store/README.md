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
 *
 *  ! 登出后会重定向到 /login 页面
 *  ! 并拼接上 ?redirect 参数
 *  ! 方便登录成功后定位
 **/
store.dispatch('user/logout')
```

## mutations
> 通常只需要调用 actions，不需要自己 commit

 type      | desc
 --------- | ----------------------------------------------------
 SET_TOKEN | 设置用户标识，此方法应该由 action setToken commit，尽量避免手动提交
 SET_INFO  | 设置用户信息，此方法应该由 action updateInfo commit，尽量避免手动提交