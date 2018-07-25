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
    curProp: {},
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
      state.props = payload
    },
    setCurProps (state, payload) {
      state.curProp = payload
    },
    setShowPropTable (state, payload) {
      state.showPropTable = payload
    },
    setIsSku (state, payload) {
      state.isSku = payload
    }
  },
  actions: {
    fetchCategory ({commit}) {
      return http.fetchCategory().then(data => {
        commit('setCategories', data)
      })
    },
    getCategory ({commit}, id) {
      return http.getCategory(id).then(data => {
        commit('checkCategory', data)
      })
    }
  },
  getters: {
    curCategoryId (state) {
      return state.curCategory.id
    }
  }
}
