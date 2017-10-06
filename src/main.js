import Vue from 'vue'
import App from './App'
import router from './router'
import Storage from 'local-storage'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

window.Storage = Storage
