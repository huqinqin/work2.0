import Vue from 'vue'
const context = require.context('./', false, /\.vue$/)

/* 批量的把组件进行注册 */
context.keys().forEach(key => {
  const name = key.match(/([a-zA-Z0-9]*)\.vue$/i)[1]
  Vue.component(name, context(key).default)
})
