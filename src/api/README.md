> 基于 axios

该目录管理项目中的所有异步请求，封装成一个 api 对象供调用

在 api/index.js 中有两种模式可供选择，区别是调用时是否有模块名，相应的打开和取消注释即可

```javascript
import api from '@/api'

api.example.example(params)
   .then(/* ... */)
   .catch(/* ... */)
```