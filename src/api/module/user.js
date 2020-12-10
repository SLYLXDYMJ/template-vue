import request from '../request'

export const login = function () {
  /**
   *  这个是百度的免费接口，仅供测试
   *  正式使用时请自行换成业务接口
   **/
  return request.get('https://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz')
}