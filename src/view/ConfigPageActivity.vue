<template>
  <card>
    <p slot="title">活动名称：<Input placeholder="请输入活动名称" v-model="name"></Input> <span class="note">(活动链接： https://ltsmall.com/promo#/{{name}} )</span></p>
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
        <component v-for="(item, index) in config" :is="modules[moduletype.indexOf(item.type)]" :key="index" :data="item.data" :index="index" @handle="handleModule" @update="updateModule"></component>
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
      modal: false,
      moduletype: ['banner', 'desc', 'product', 'floor'],
      modules: [ 'LayoutModuleBanner', 'LayoutModuleIntro', 'LayoutModuleProduct', 'LayoutModuleFloor' ],
      moduleType: 1,
      curIndex: 0,
      config: []
    }
  },
  methods: {

    addModule (type) {
      let module = { type, data: '' }
      switch (type) {
        case 'banner':
          break
        case 'desc':
          break
        case 'product':
          module.data = []
          break
        case 'floor':
          module.data = { 'name': '未命名楼层', 'products': [] }
          break
        default:
          break
      }
      this.config.push(module)
    },
    handleModule (moduleIndex, operate) {
      console.log(moduleIndex, operate)
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
      this.$api.get(`${this.url}/detail`, {
        name: this.name,
        config: JSON.stringify(this.config)
      })
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
  height: 380px;
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
.module-content:hover .operate-list {
  display: inline;
}
.operate-list{
  display: none;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
}
</style>
