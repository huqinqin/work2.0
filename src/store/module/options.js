import http from '~prototype/http.js'
export default {
  state: {
    brands: [],
    cates: [],
    stores: [],
    groups: []
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
    },
    setGroups (state, list) {
      state.groups = list
    }
  },
  actions: {
    fetchGroups ({commit}, storeId) {
      http.fetchCodeTable({
        type: 'group',
        source: 'lts',
        storeId
      }).then(data => {
        commit('setGroups', data)
      })
    },
    fetchStores ({ commit, rootState }) {
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
