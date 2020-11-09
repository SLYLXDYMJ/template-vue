import axios from 'axios'

let request = axios.create()

/** 解决 IE 缓存问题 **/
request.defaults.headers.get[ 'Cache-Control' ] = 'no-cache'
request.defaults.headers.get[ 'Pragma' ] = 'no-cache'

/**
 *  开发环境基础路径
 *  ! 通常为反向代理在开头拼接特定前缀
 *  ! 这里默认使用了 /dev-api 作为前缀
 **/
if (process.env.NODE_ENV === 'development') {
  request.defaults.baseURL = '/dev-api'
}

/**
 *  生产环境接口基础路径
 *  ! 通常为相对路径，否则会有跨域问题需要注意
 **/
else if (process.env.NODE_ENV === 'production') {
  // request.defaults.baseURL = '/api'
}

/**
 *  请求拦截器
 *  ! 通常在这里统一设置 请求头 等操作
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
 *  ! 通常在这里拦截错误请求并统一给出用户提示或进行其他操作
 *  ! 保证 .then 时都是成功的消息
 **/
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request