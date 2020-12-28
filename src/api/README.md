> 基于 axios

统一管理项目中的接口。

并以插件的形式集成到 Vue 原型链中。

```javascript
// 组件中调用方法
this.$api.login()

// 非组件中调用
// 两种方法都可以调用
import Vue from 'vue'
import { login } from '../api'

Vue.prototype.$api.login();
login();
```