import http from '~prototype/http.js'
import cache from 'store2'

export default {
  state: {
    policy: {}
  },
  mutations: {
    setPolicy (state, data) {
      if (data) {
        cache('policy', data)
      } else {
        data = cache('policy')
      }
      state.policy = data
    }
  },
  actions: {
    // 获取签名
    getPolicy ({ commit, state }) {
      state.policy = cache('policy')
      if (state.policy.expire && (state.policy.expire > (new Date().getTime()) / 1000)) {
        commit('setPolicy')
      } else {
        http.getPolicy().then(data => {
          data.OSSAccessKeyId = data.accessid
          commit('setPolicy', data)
        })
      }
    }
  }
}
