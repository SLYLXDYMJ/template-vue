管理项目中的公共状态（vuex）

其中 user 是用户模块，需要根据实际情况自行完善其中预定义的方法

## state
 attr  | desc
 ----- | -----
 token | 用户唯一标识
 info  | 用户信息
 
## actions

### login
> 介绍：<br/>
> 登录接口（设置 token 接口）<br/>
> 建议在组件中实现登录逻辑（验证神马的）<br/>
> 在 action 中只单纯设置 token

```javascript
/**
 *  @param { String } token - 登录成功后获得的用户身份 token
 **/
store.dispatch('user/login', token)
// => 返回值无意义
```
 
### validate
> 介绍：<br/>
> 验证用户身份是否有效 <br/>
> 该方法是实现路由验证的基础 (router.beforeEach)

```javascript
store.dispatch('user/validate')
// await store.dispatch('user/validate')

// => true / false
// => resolve(true / false)
```

### getInfo
> 介绍：<br/>
> 获取用户信息 <br/>
> 该方法应该调用接口，获取用户信息并返回

```javascript
store.dispatch('user/getInfo')
// => 返回用户信息数据
```

### updateInfo
> 介绍：<br/>
> 更新用户信息 <br/>
> 该方法基于 action getInfo 获取信息后 commit 赋值 state

```javascript
store.dispatch('user/updateInfo')
// => 返回值无意义
```

### remember
> 介绍：<br/>
> 记住用户登录状态

```javascript
/**
 *  @param { Boolean } forever - 是否永久记住
 **/
store.dispatch('user/remember', false)
// => 返回值无意义
```

### logout
> 介绍：<br/>
> 退出登录

```javascript
/**
 *  登出
 *
 *  ! 登出后会重定向到 /login 页面
 *  ! 并拼接上 ?redirect 参数
 *  ! 方便登录成功后定位
 **/
store.dispatch('user/logout')
// => 返回值无意义
```

> 注意：<br/>
> 不推荐在 action logout 中进行弹出提示逻辑 <br/>
> 建议在调用 logout 的组件中弹框提示用户 <br/>
> 因为登出原因可能不相同，统一不起来

## mutations
> 通常只需要调用 actions，不需要自己 commit

 type      | desc
 --------- | ----------------------------------------------------
 SET_TOKEN | 设置用户标识，此方法应该由 action login commit，尽量避免手动提交
 SET_INFO  | 设置用户信息，此方法应该由 action updateInfo commit，尽量避免手动提交