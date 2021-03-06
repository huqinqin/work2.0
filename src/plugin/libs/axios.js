import axios from 'axios'
import router from '@/router'
import { Message } from 'iview'
import cache from 'store2'
// 设置基础url
axios.defaults.baseURL = '/work'

const errorMap = {
  100000: '系统异常',
  200000: '基础模块错误',
  200001: '基础模块数据异常',
  300000: '商品模块错误',
  400000: '交易模块错误'
}

// request 拦截器
axios.interceptors.request.use(
  config => {
    // Tip: 1
    // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

    // Tip: 2
    // 带上 token , 可以结合 vuex 或者重 localStorage
    return config
  },
  error => {
    // 请求错误时做些事(接口错误、超时等)
    // Tip: 4
    // 关闭loadding
    console.log('request:', error)

    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error('time out')
      // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      // return service.request(originalRequest);//例如再重复请求一次
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    let res
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data === undefined) {
      res = response.request.responseText
    } else {
      res = response.data
    }
    // 根据返回的code值来做不同的处理（和后端约定）
    console.log(res.code)
    if (res.code === '000000') {
      return res.data
    } else if (res.code === '000001') {
      // 用户未登录处理
      cache.clearAll()
      router.replace({name: 'login'})
    } else {
      const message = res.msg ? res.msg : errorMap[res.code]
      Message.error(`ERROR: ${message}`)
      return Promise.reject(res) // 返回接口返回的错误信息
    }
  },
  err => {
    // 处理http状态码错误
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    console.error(err)
    // 此处我使用的是 element UI 的提示组件
    Message.error(`ERROR: ${err}`)
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)

export default axios
