import http from '~prototype/http.js'
export default {
  state: {
    brands: [],
    cates: [],
    stores: []
  },
  mutations: {
    setBrands (state, list) {
      state.brands = list
    },
    setCates (state, list) {
      state.cates = list
    },
    setStores (state, list) {
      state.stores = list
    }
  },
  actions: {
    fetchStores ({ commit, rootState }) {
      console.log(rootState)
      http.fetchCodeTable({
        type: 'store',
        source: 'lts'
      }).then(data => {
        if (rootState.user.storeId === 1) {
          commit('setStores', data)
        }
      })
    },
    fetchBrands ({commit}) {
      http.fetchCodeTable({
        type: 'brand',
        source: 'lts'
      }).then(data => {
        commit('setBrands', data)
      })
    },
    fetchCates ({commit}) {
      http.fetchCategory().then(data => {
        commit('setCates', data)
      })
    }
  }
}
