import api from '@/libs/axios.js'
import { setToken, getToken } from '@/libs/util'
import md5 from 'md5'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      console.log(userName, password)
      return new Promise((resolve, reject) => {
        api.get('/user/login', {
          params: {
            account: userName,
            password: md5(password),
            source: 'PC'
          }
        }).then(data => {
          commit('setToken', data.session)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      api.post('user/logout').then(() => {})
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        api.get(`user_infos/${state.token}`).then(data => {
          console.log(data)
          commit('setAvator', data.avator)
          commit('setUserName', data.user_name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
