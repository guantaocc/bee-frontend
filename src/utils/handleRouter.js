/**
 * 判断是否由路由权限
 */

function hasPermission(roles, route) {
  // 如果roles包含 admin, 则获取全部权限
  if (roles && Array.isArray(roles) && roles.includes('admin')) {
    return true
  } else {
    if (route.meta && route.meta.permissions) {
      return roles.some((role) => route.meta.permissions.includes(role))
    } else {
      return true
    }
  }
}

/**
 * 过滤具有权限的路由
 */

export function filterAsyncRoutes(routes, roles) {
  const finallyRoutes = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(roles, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, roles)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}

/**
 * 从当前路由中过滤sidebar:false的菜单路由
 */

export function filterMenuRoutes(routes) {
  const menuItems = []
  routes.forEach((route) => {
    const item = { ...route }
    if (item.meta.sidebar !== false) {
      if (item.children) {
        item.children = filterMenuRoutes(item.children)
      }
      menuItems.push(item)
    }
  })
  return menuItems
}
