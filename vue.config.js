const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
const BASE_URL = '/'
const TRAGET_URL = 'http://192.168.1.101:8780/work/base'
module.exports = {
  baseUrl: BASE_URL,
  devServer: {
    proxy: {
      '/api': {
        target: TRAGET_URL,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  }
}
