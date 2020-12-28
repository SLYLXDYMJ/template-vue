import axios from 'axios'

let request = axios.create()

/** 解决 IE 缓存问题 **/
request.defaults.headers.get[ 'Cache-Control' ] = 'no-cache'
request.defaults.headers.get[ 'Pragma' ] = 'no-cache'

/**
 *  开发环境基础路径
 *  通常为反向代理在开头拼接特定前缀
 *  这里默认使用了 /dev-api 作为前缀
 **/
if (process.env.NODE_ENV === 'development') {
  request.defaults.baseURL = '/dev-api'
}

/**
 *  生产环境接口基础路径
 *  通常为相对路径，否则会有跨域问题需要注意
 **/
else if (process.env.NODE_ENV === 'production') {
  // request.defaults.baseURL = '/api'
}

/**
 *  请求拦截器
 *  通常在这里统一设置 请求头 等操作
 **/
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

/**
 *  响应拦截器
 **/
request.interceptors.response.use(
  function (response) {
    /**
     *  有时（大部分时候...）判断请求是否成功
     *  并不是根据 http 状态码，而根据接口 "响应消息的状态码" 判断
     *  比如：Http Status Code 200 { code: 501, msg: "服务器错误" }
     *
     *  因为 http 状态码是 200，所以走的是成功的逻辑
     *  这时其实我们大多数想要走的是失败逻辑
     *  通常会动态的在成功响应拦截器中判断 "响应消息的状态码"
     *  若不是成功的状态码，则抛出异常
     **/
    // if (response.data.code !== 200) {
    //   // 这里通常给出全局的错误提示框
    //   window.alert(response.data.msg)
    //
    //   return Promise.reject(response.data.msg)
    // }
    
    /**
     *  axios 默认会给响应包上一层请求响应数据外衣
     *  通常在实际逻辑中并不需要
     *  这里给 "脱衣服"
     *  只返回接口响应的数据
     **/
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/**
 *  模拟登陆
 **/
export const login = function () {
  return Promise.resolve({ token: 'template-vue' })
}