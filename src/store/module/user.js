import http from '~prototype/http.js'
import router from '@/router'

export default {
  state: {
    account: '',
    email: '',
    avatar: ''
  },
  mutations: {
    setUserInfo (state, data) {
      state = data
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, account) {
      return http.Login(account).then(data => {
        commit('setUserInfo', data)
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      http.post('user/logout').then(() => {
        router.push({name: 'login'})
      })
    }
  }
}
