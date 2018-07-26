import http from '~prototype/http.js'

export default {
  namespaced: true,
  state: {
    categories: [],
    curCategory: {
      'parentId': 0,
      'name': '',
      'parentName': '',
      'imgUrl': '',
      'onum': 99
    },
    showPropTable: false,
    props: [],
    propsTotal: 0,
    curPropIndex: 0,
    curProp: {},
    showPropModal: false,
    isSku: false
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload
    },
    checkCategory (state, payload) {
      state.curCategory = payload
    },
    addCategory (state, {id, name}) {
      state.curCategory = {
        'parentId': id,
        'name': '',
        'parentName': name,
        'imgUrl': '',
        'onum': 99
      }
    },
    setProps (state, payload) {
      state.props = payload.list
      state.propsTotal = payload.total
    },
    setCurPropIndex (state, payload) {
      state.curPropIndex = payload
    },
    setCurProp (state, payload) {
      state.curProp = payload
    },
    setShowPropTable (state, payload) {
      state.showPropTable = payload
    },
    setShowPropModal (state, payload) {
      state.showPropModal = payload
    },
    setIsSku (state, payload) {
      state.isSku = payload
    }
  },
  actions: {
    fetchProp ({commit, state, getters}) {
      return http[`fetch${getters.url}`](getters.curCategoryId).then(data => {
        commit('setProps', data)
      })
    },
    fetchCategory ({commit}) {
      return http.fetchCategory().then(data => {
        commit('setCategories', data)
      })
    },
    getCategory ({commit}, id) {
      return http.getCategory(id).then(data => {
        commit('checkCategory', data)
      })
    },
    delValue ({commit, getters}, id) {
      return http[`del${getters.url}Value`](getters.curCategoryId, getters.curPropId, id).then(() => {
        // commit()
      })
    },
    addValue ({ commit, getters }, name) {
      this.$http[`add${getters.url}Value`](this.curCategoryId, getters.curPropId, name).then(() => {
        // this.query()
      })
    }
  },
  getters: {
    curCategoryId (state) {
      return state.curCategory.id
    },
    url (state) {
      return state.isSku ? 'Sku' : 'Prop'
    },
    curPropId (state) {
      return state.curProp.id
    }
  }
}
