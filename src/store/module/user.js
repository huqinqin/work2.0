import api from '@/libs/axios.js'
import router from '@/router'
import md5 from 'md5'

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
    handleLogin ({ commit }, {userName, password}) {
      return api.post('/user/login', {
        username: userName,
        password: md5(password)
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      api.post('user/logout').then(() => {
        router.push({name: 'login'})
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      api.post('user/infos').then(data => {
        console.log(data)
        commit('setUserInfo', data)
      })
    }
  }
}
