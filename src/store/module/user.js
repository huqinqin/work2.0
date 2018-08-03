import http from '~prototype/http.js'
import router from '@/router'
import cache from 'store2'

export default {
  state: {
    account: '',
    email: '',
    avatar: ''
  },
  mutations: {
    setUserInfo (state, data) {
      if (data) {
        cache('user', data)
      } else {
        data = cache('user')
      }
      state.account = data.account
      state.email = data.email
      state.avatar = data.avatar
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
      http.Logout().then(() => {
        cache.clearAll()
        router.push({name: 'login'})
      })
    }
  }
}
