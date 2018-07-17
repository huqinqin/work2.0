import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const modules = {}
const context = require.context('./module/', false, /\.js$/)
context.keys().forEach(key => {
  if (key !== './index.js') {
    const name = key.match(/([a-zA-Z0-9-]*)\.js$/i)[1]
    modules[name] = context(key).default
    console.log('modules', key, name)
  }
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules
})
