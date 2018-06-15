import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import configActivity from './module/configActivityPage'
import tableProducts from './module/tableProducts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    configActivity,
    tableProducts
  }
})
