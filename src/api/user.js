import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/api/admin/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export const logout = () => {
  
}