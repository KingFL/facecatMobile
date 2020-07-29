import Vue from 'vue'
import App from './App'
import pageHead from './components/page-head.vue'

Vue.config.productionTip = false

Vue.prototype.globle_javaurl='127.0.0.1:8080'
Vue.prototype.globle_pyurl='192.168.1.233:9080'
Vue.prototype.loginedusername=''

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
