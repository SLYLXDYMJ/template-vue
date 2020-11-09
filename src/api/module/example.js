import request from '../request'

export let example = function (params) {
  return request.get('/example', {
    params
  })
}