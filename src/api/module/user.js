import request from '../request'

export const login = function () {
  /**
   *  这个是百度的免费接口，仅供测试
   *  正式使用时请自行换成业务接口
   **/
  return request.get('http://ip-api.com/json')
}