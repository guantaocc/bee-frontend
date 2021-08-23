import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

import { settings } from '@/config/settings'

import qs from 'qs'

const requestTimeout = 5000
const contentType = 'application/json;charset=UTF-8'

/**
 * 将要重构的request 方法
 */

const baseURL = settings.accessurl

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

function handleCode(code, msg) {
  switch (code) {
    case 401:
      Message.error(msg || `验证失败${code}`)
      break
    case 400:
      Message.error(msg)
    case 500:
      Message.error('系统级错误，请联系管理员' + msg)
      break
    default:
      Message.error(msg || `接口返回异常${code}`)
      break
  }
}

// request intercepters
instance.interceptors.request.use(
  (config) => {
    // 过滤登录相关token
    if (config.url.indexOf('login') == -1) {
      if (store.state.token) {
        config.headers['Authorization'] = 'Token ' + store.state.token
      }
    }
    // x-www-form-urlencoded
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    ) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    // 错误处理
    return Promise.reject(error)
  }
)

// 相应拦截器
instance.interceptors.response.use(
  (response) => {
    const { config, data } = response
    // 如果 code不是 0， 则显示msg错误
    // 正确返回相应的数据
    // { code: 0, data: [], msg: '操作成功' }
    return data
  },
  (error) => {
    // 如果返回错误
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      // 处理状态码 404 401 400 500 等
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      // error is not xhr error
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }

      // 处理message消息的异常
      return Promise.reject(error)
    }
  }
)

export default instance
