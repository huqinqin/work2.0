<template>
  <card class="config-page-wrapper">
    <p slot="title">配置</p>
    <span slot="extra">
      <a href="#" slot="extra" @click.prevent="showAddModule">
          <Icon type="ios-plus-empty"></Icon>
          新增模块
      </a>
    </span>
    <div>
      <component v-for="(item, index) in list" :is="modules[item.type - 1]" :key="index" @delete="delModule(index)" @up="upModule(index)" @down="downModule(index)"></component>
    </div>
    <Modal
      v-model="modal"
      @on-ok="addModule"
      title="新增模块">
      <span v-for="(item, index) in list" :key="index">
        {{index}}:{{item}}
      </span>
      <Select v-model="moduleType" style="width:200px">
        <Option :value="1">Banner模块</Option>
        <Option :value="2">楼层模块</Option>
        <Option :value="3">商品模块</Option>
        <Option :value="4">说明模块</Option>
      </Select>
    </Modal>
  </card>
</template>
<script>
export default {
  name: 'ConfigPageActivity',
  components: {
    LayoutModuleBanner: () => import('@/view/components/LayoutModuleBanner'),
    LayoutModuleFloor: () => import('@/view/components/LayoutModuleFloor'),
    LayoutModuleProduct: () => import('@/view/components/LayoutModuleProduct'),
    LayoutModuleIntro: () => import('@/view/components/LayoutModuleIntro')
  },
  data () {
    return {
      modal: false,
      modules: ['LayoutModuleBanner', 'LayoutModuleFloor', 'LayoutModuleProduct', 'LayoutModuleIntro'],
      moduleType: 1,
      list: []
    }
  },
  methods: {
    showAddModule () {
      this.modal = true
    },
    addModule () {
      let module = { type: this.moduleType, data: '' }
      switch (this.moduleType) {
        case 1:
          break
        case 2:
          break
        case 3:
          module.data = {'name': '未命名楼层', 'products': []}
          break
        case 4:
          module.data = []
          break
        default:
          break
      }
      this.list.push(module)
    },
    delModule (index) {
      this.list.splice(index, 1)
    },
    upModule (index) {
      if (index > 0) {
        const temp = this.list[index]
        this.list.splice(index, 1, this.list[index - 1])
        this.list.splice(index - 1, 1, temp)
      }
    },
    downModule (index) {
      if (index < this.list.length - 1) {
        const temp = this.list[index]
        this.list.splice(index, 1, this.list[index + 1])
        this.list.splice(index + 1, 1, temp)
      }
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
.empty-column {
  text-align: center;
  height: 380px;
  width: 100%;
  border: 1px dotted #ccc;
  position: relative;
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
