export default {
  install (Vue) {
    debugger
    // 批量导入实例方法
    /* 可以使用 require.context() 方法来创建自己的（模块）上下文，这个方法有 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。 */
    // require.context（创建了）一个包含了 prototype 文件夹（不包含子目录）下面的、所有文件名以 `.js` 结尾的、能被 require 请求到的文件的上下文。
    /* require.context模块导出（返回）一个（require）函数，这个函数可以接收一个参数：request 函数–这里的 request 应该是指在 require() 语句中的表达式
           require.context 第一个参数不能是变量，webpack在编译阶段无法定位目录
           导出的方法有 3 个属性： resolve, keys, id。
           resolve 是一个函数，它返回请求被解析后得到的模块 id。
           keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成,即：["./http.js","./selectProducts.js"]。
           id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到 */
    // 就是获取prototype文件夹下面的两个js文件，即上下文环境,context是一个函数webpackContext。
    // webpackContext.keys(),返回的是键名
    /* var map = {
      "./http.js": "./src/plugin/prototype/http.js",
      "./selectProducts.js": "./src/plugin/prototype/selectProducts.js"
    }; */
    const context = require.context('./prototype/', false, /\.js$/)
    // context.keys()得到一个数组["./http.js","./selectProducts.js"]
    context.keys().forEach(key => {
      if (key !== './index.js') {
        const name = key.match(/([a-zA-Z0-9-]*)\.js$/i)[1]
        // `$${name}`就是$http,下面这句话也就是Vue[$http]=Vue.prototype[$http]=http.js中的所有方法，所以在调用方法的时候可以用this.$http.crmList({}).then()
        /*
        这就是context的函数，context(key)其中key是'./http.js'或者'./selectProducts.js',返回一个default，default中包含http.js的所有的方法。
        function webpackContext(req) {
            var id = webpackContextResolve(req);
            var module = __webpack_require__(id);
            return module;
        }
        function webpackContextResolve(req) {
          var id = map[req];
          if(!(id + 1)) { // check for number or string
            var e = new Error('Cannot find module "' + req + '".');
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          }
          return id;
        }
        */
        Vue[`$${name}`] = Vue.prototype[`$${name}`] = context(key).default
        console.log('prototype', key, name)
      }
    })
    const filters = require.context('./filter/', false, /\.js$/)
    // filters(key)就是filter文件夹的所有上下文，传入key值，表示的是获取formatDate的上下文和formatPrice的上下文
    filters.keys().forEach(key => {
      if (key !== './index.js') {
        const name = key.match(/([a-zA-Z0-9-]*)\.js$/i)[1]
        Vue.filter(`${name}`, filters(key).default[name])
        console.log('filters', key, name)
      }
    })
  }
}
