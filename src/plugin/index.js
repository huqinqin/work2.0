export default {
  install (Vue) {
    // 批量导入实例方法
    const context = require.context('./prototype/', false, /\.js$/)
    context.keys().forEach(key => {
      if (key !== './index.js') {
        const name = key.match(/([a-zA-Z0-9-]*)\.js$/i)[1]

        Vue[`$${name}`] = Vue.prototype[`$${name}`] = context(key).default
        console.log('prototype', key, name)
      }
    })
  }
}
