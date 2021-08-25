import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'normalize.css'
  
// element
import '@/plugins/element'

router.beforeEach((to, from, next) => {
  const hasToken = sessionStorage.getItem("bee-front-token")
  console.log(hasToken);
  if(hasToken){
    next()
  }else {
    to.path == '/login' ? next() : next(`/login`)
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
