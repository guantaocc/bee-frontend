// 设置token 和 获取token
const LocalTokenName = "bee-front-token"

export function getAccessToken(){
  return sessionStorage.getItem(LocalTokenName)
}

export function setAccessToken(token){
  sessionStorage.setItem(LocalTokenName, token)
}

export function removeAccessToken(){
  sessionStorage.removeItem(LocalTokenName)
}