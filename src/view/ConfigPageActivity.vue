<template>
  <card>
    <p slot="title">活动名称：<Input placeholder="请输入活动名称" v-model="name"></Input> <span class="note" v-show="name">(活动链接： https://ltsmall.com/promo#/{{name}} )</span></p>
    <span slot="extra" class="new-config">
      <a href="#" slot="extra" @click.prevent="showAddModule">
          <Icon type="ios-plus-empty"></Icon>
          新增模块
      </a>
    </span>
    <span slot="extra">
      <Button type="primary" href="#" slot="extra" @click.prevent="saveConfig">
          保存
      </Button>
    </span>
    <div class="config-page-wrapper">
      <div class="config-page">
        <component v-for="(item, index) in config" :is="getComponentName(item.type)" :key="index" :data="item.data" :index="index" @handle="handleModule" @update="updateModule"></component>
      </div>
    </div>
    <Modal
      v-model="modal"
      @on-ok="addModule(moduleType)"
      title="新增模块">
      <Select v-model="moduleType" style="width:200px">
        <Option value="banner">Banner模块</Option>
        <Option value="desc">说明模块</Option>
        <Option value="product">商品模块</Option>
        <Option value="floor">楼层模块</Option>
      </Select>
    </Modal>
  </card>
</template>
<script>
const modules = {
  modules: [{
    type: 'banner',
    name: 'LayoutModuleBanner',
    default () {
      return { 'img': '', 'link': '' }
    }
  }, {
    type: 'desc',
    name: 'LayoutModuleIntro',
    default () {
      return ''
    }
  }, {
    type: 'product',
    name: 'LayoutModuleProduct',
    default () {
      return []
    }
  }, {
    type: 'floor',
    name: 'LayoutModuleFloor',
    default () {
      return { 'name': '未命名楼层', 'link': '', 'products': [] }
    }
  }],
  addModule (module) {
    this.modules.push(module)
  },
  getModuleData (type) {
    for (const module of this.modules) {
      if (module.type === type) {
        return module.default()
      }
    }
  },
  getModuleName (type) {
    for (const module of this.modules) {
      if (module.type === type) {
        return module.name
      }
    }
  }
}
export default {
  name: 'ConfigPageActivity',
  components: {
    LayoutProduct: () => import('@/view/components/LayoutProduct'),
    LayoutModuleBanner: () => import('@/view/components/LayoutModuleBanner'),
    LayoutModuleFloor: () => import('@/view/components/LayoutModuleFloor'),
    LayoutModuleProduct: () => import('@/view/components/LayoutModuleProduct'),
    LayoutModuleIntro: () => import('@/view/components/LayoutModuleIntro')
  },
  data () {
    return {
      name: '',
      url: 'base/resource/promo',
      modal: false,
      moduleType: 1,
      curIndex: 0,
      config: [],
      id: ''
    }
  },
  methods: {
    addModule (type) {
      this.config.push({type, data: modules.getModuleData(type)})
    },
    getComponentName (type) {
      return modules.getModuleName(type)
    },
    handleModule (moduleIndex, operate) {
      if (operate === '删除') {
        this.config.splice(moduleIndex, 1)
      } else if (operate === '上移') {
        const index = moduleIndex
        if (index > 0) {
          const temp = this.config[index]
          this.config.splice(index, 1, this.config[index - 1])
          this.config.splice(index - 1, 1, temp)
        }
      } else if (operate === '下移') {
        const index = moduleIndex
        if (index < this.config.length - 1) {
          const temp = this.config[index]
          this.config.splice(index, 1, this.config[index + 1])
          this.config.splice(index + 1, 1, temp)
        }
      }
    },
    updateModule (moduleIndex, data) {
      this.config[moduleIndex].data = data
    },
    showAddModule () {
      this.modal = true
    },
    saveConfig () {
      let content = JSON.parse(JSON.stringify(this.config))
      content.forEach(t => {
        if (t.type === 'product') {
          t.data = t.data.map(v => {
            return v.id
          })
        } else if (t.type === 'fllor') {
          t.data.products = t.data.products.map(v => {
            return v.id
          })
        }
      })
      if (this.id) {
        this.$http.savePromo({
          id: this.id,
          name: this.name,
          content: content
        })
      } else {
        this.$http.savePromo({
          name: this.name,
          content: this.config
        })
      }
    },
    query () {
      let getListPromiseArr = []
      this.$http.getPromo({
        name: this.name
      }).then(data => {
        data.content.forEach(t => {
          if (t.type === 'product') {
            getListPromiseArr.push(
              this.$http.fetchProduct({ids: t.data}).then(data => {
                t.data = data.list
              })
            )
          } else if (t.type === 'floor') {
            getListPromiseArr.push(
              this.$http.fetchProduct({ids: t.data.products}).then(data => {
                t.data.products = data.list
              })
            )
          }
        })
        Promise.all(getListPromiseArr).then(() => {
          this.config = data.content
        })
        this.id = data.id
      })
    },
    getProductsByIds (ids) {
      this.$http.fetchProduct({
        ids: ids
      }).then(data => {
        console.log(data)
      })
    }
  },
  mounted () {
    if (this.$route.params.name) {
      this.name = this.$route.params.name
      this.query()
    }
  }
}
</script>
<style lang="less" scoped>
.search-result {
  position: relative;
  min-width: 1500px;
  ul.result {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  ul li:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
<style lang="less">
  .ivu-card-head p{
     width: auto;
     height: auto;
    .ivu-input-wrapper{
      width:auto;
    }
    .note{
      color:#585858;
    }
  }
.empty-column {
  text-align: center;
  height: 400px;
  width: 100%;
  border: 1px dotted #ccc;
  position: relative;
}
.new-config{
  margin-right: 24px;
}
.module-content{
  position: relative;
}

</style>
