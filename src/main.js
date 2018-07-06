// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import '@/assets/coverage.less'
import api from '@/libs/axios.js'
import selectProducts from '@/prototype/selectProducts.js'
if (process.env.VUE_APP_MOCK === 'true') require('@/mock')

Vue.use(iView)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$api = api
Vue.prototype.$selectProducts = selectProducts

iView.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
