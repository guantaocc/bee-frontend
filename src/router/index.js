import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/Layouts/index'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    // 布局的子组件
  },
  {
    path: '*',
    redirect: '/404',
  },
]

export const asyncRoutes = [
  // 一定要最终添加404捕获
  
]

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const resetRouter = () => {
  const newRouter = createRouter()
  router && (router.matcher = newRouter.matcher)
}

// catch console中的错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export { resetRouter }

export default router
