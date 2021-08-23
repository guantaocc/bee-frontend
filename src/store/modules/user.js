import { Message } from 'element-ui'

import { asyncRoutes, constantRoutes } from '@/router'
import { filterAsyncRoutes } from '@/utils/handleRoute'
import { login } from '@/api/user'
import { getRoles } from '@/api/roles'

const state = () => ({
  token: null, // access-token
  roles: [],
  routes: [],
})

const getters = {
  userToken: (state) => state.token,
  roles: (state) => state.roles,
  routes: (state) => state.routes,
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  resetToken(state) {
    state.token = null
  },
  setRoles(state, roles) {
    state.roles = roles
  },
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  resetRoles(state) {
    // 退出登录重新获取路由表
    state.roles = []
  },
}

const actions = {
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    const accessToken = data.token
    if (accessToken) {
      commit('setToken', accessToken)
    } else {
      Message.error('登录异常,未正确返回token')
    }
  },
  async getRoles({ commit, state }) {
    let roles = []
    const res = await getRoles(state.token)
    if (res.code == 0) {
      const { name: role } = res.data
      roles.push(role)
    } else {
      Message.error('获取用户权限错误')
    }
    commit('setRoles', roles)
    return roles
  },
  setRoutes({ commit }, roles) {
    const finallyAsyncRoutes = filterAsyncRoutes([...asyncRoutes], roles)
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
}

export default { state, mutations, actions, getters, namespace: true }
