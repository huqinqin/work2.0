import axios from '~prototype/axios.js'

export default {
  state: {
    curCateId: '',
    curPropId: '',
    showProps: false,
    isSku: true,
    props: [],
    total: 40
  },
  mutations: {
    setCurCateId (state, payload) {
      state.curCateId = payload
    },
    setCurPropId (state, payload) {
      state.curPropId = payload
    },
    setShowProps (state, payload) {
      state.showProps = payload
    },
    showPropsTable (state, payload) {
      state.isSku = payload
      state.showProps = true
    },
    setProps (state, data) {
      state.props = data.list
      state.total = data.total
    }
  },
  actions: {
    getPropsByCurCateId ({commit, state}, payload) {
      commit('showPropsTable', payload)
      const url = payload ? 'sku' : 'props'
      return axios.post(`product/category/${url}/list`, {id: state.curCateId}).then(data => {
        commit('setProps', data)
      })
    }
  }
}
