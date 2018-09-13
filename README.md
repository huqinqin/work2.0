配置页面说明：  
1. 配置页面（暂时）包含首页配置、活动配置页面，配置页面数据根据组成模块的不同有所差异。
2. 配置页面信息保存在数组中，由数组的顺序决定模块的顺序
3. 配置模块信息有type、data属性组成，type表示模块的类型，data为模块的数据
4. 现有模块说明

PC端移动端商城需要与后台保持一致，按模块编写组件，根据后台数据组合成页面。


# 目录结构
## dist
项目打包文件目录，运行`npm run build`命令，在dist生成项目文件，使用命令`scp -r D:/Code/b2b-console/dist root@47.89.251.79:/www/b2b-console`将项目上传到服务器
## public
存放网站图标、index模板
## src
存放项目内容
### assets
资源目录，存放图片，样式文件
### components
存放项目中使用到的组件，在main.js中引入`import './components'`会自动导入components的组件。
> CodeTable

码表组件；根据不同的类型获取不同的数据(type传值，group部门;store门店;role角色;sale 销售;brand 品牌;)，组件显示为选项卡，// TODO 获取销售需要传门店id

> MapAutoComplete

地址自动完成组件；使用Google地址服务，使用scriptjs异步引入`https://maps.googleapis.com/maps/api/js?key=AIzaSyDabyPaD0P3qprjRU5K41iLIG0oiMUa0fg&libraries=places`;使用googleAddress传值，默认值（必填值）为：
```
        {
          detail: '', // 地址详情（完整地址：国家+洲+市+街道地址）
          street: '', // 详细地址（街道地址）
          street_number: null,
          street_name: null,
          city: null, // 市
          state: null, // 州
          zip: null, // 邮编
          country: null, // 城市
          url: null,
          lat: '', // 纬度
          lng: '' // 经度
        }
```
附加参数（在使用googleAddress传值时添加，会显示相应的输入框）：
1. company 收货公司
2. receiver 收货人
3. telnum （收货人）联系方式
4. isDefault 是否默认

### locale
存放国际化文件
### mixins
存放混入，页面中复用的公有逻辑
### mock
模拟数据，本地测试使用
### plugin
存放vue插件  
index.js设置批量导入相应的插件，在main中设置
```
import plugin from './plugin'
Vue.use(plugin)
```
将会自动导入prototype文件夹中的文件作为实例方法
#### libs
存放第三方库文件，该文件夹不使用自动导入，在文件中使用时可以使用`~libs`作为路径别名。
##### axios
请求方法，设置根路由，设置通用的错误处理方式。
#### prototype
存放vue实例方法，在vue中以$[filename]的形式调用
#### 
### store
存放vuex文件，全局变量
### router
存放路由文件
### view
存放vue页面
## tests
存放测试
## .env.*文件
运行`npm run dev`或`npm run debug`命令时，其实是以不同的mode运行`vue-cli-service serve --open`，根据mode值的不同使用不同.env文件（定义的值必须要使用VUE_APP_作为前缀），当前设置`VUE_APP_MOCK=false`，即运行`npm run debug`使用代理，运行`npm run dev`使用mock数据。
## vue.config.js
webpack配置文件，vue-cli3.0使用；现在使用
```
  devServer: {
    proxy: {
      '/work': { // 代理路径
        target: TRAGET_URL // 目标路径
      }
    }
  },
```
将/work路径代理到目标路径TRAGET_URL。
设置
```
  chainWebpack: config => {
    config.resolve.alias
      .set('~libs', resolve('src/plugin/libs'))
      .set('~prototype', resolve('src/plugin/prototype'))
      .set('_c', resolve('src/components'))
  }
```
设置路径别名，将src/plugin/libs映射为~libs。

# work2.0
