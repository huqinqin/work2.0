import http from '~prototype/http.js'
export default {
  state: {
    brands: [],
    cates: []
  },
  mutations: {
    setBrands (state, list) {
      state.brands = list
    },
    setCates (state, list) {
      state.cates = list
    }
  },
  actions: {
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
