import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    data,
  })
}

export const getRoles = (data) => {
  return request({
    url: '/api/admin/roles',
    method: 'get',
    data,
  })
}

export const logout = () => {
  return request({
    url: '/api/logout',
    method: 'post',
  })
}
