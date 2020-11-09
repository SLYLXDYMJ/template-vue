let api = {}

/** 动态引入 module 下封装的接口 **/
require
  .context('./module', false, /\.js$/)
  .keys()
  .forEach(path => {
    let module = require('./module' + path.replace('./', '/'))
    let moduleName = path.replace('./', '').replace('.js', '')
    
    /** 预知未来：防止 export default 的情况 **/
    module = module.default || module
    
    /**
     *  拼合规则 1
     *  将所有请求函数都放在 api 直接属性下
     *  可能会有重名的情况
     *  这时控制台会发出警告提示开发者
     *  使用时 api.function 方式调用
     **/
    // for (let key in module) {
    //   if (api[ key ]) {
    //     console.warn(`api 发出警告，模块中有重复的方法名：${ key }，无法保证结果`)
    //   }
    //
    //   api[ key ] = module[ key ]
    // }
    
    /**
     *  拼合规则 2
     *  将模块挂在到 api 对象下
     *  使用时 api.module.function 方式调用
     **/
    api[ moduleName ] = module
  })

export default api