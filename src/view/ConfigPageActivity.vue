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
      url: 'config/promo',
      modal: false,
      moduleType: 1,
      curIndex: 0,
      config: []
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
      console.log(JSON.stringify(this.config))
      this.$api.post(`${this.url}/save`, {
        name: this.name,
        config: JSON.stringify(this.config)
      })
    },
    query () {
      this.$api.post(`${this.url}/get`, {
        name: this.name
      }).then(data => {
        this.config = JSON.parse(data)
      })
    }
  },
  mounted () {
    if (this.$route.params.name) {
      this.name = this.$route.params.name
      this.query()
      this.config = JSON.parse('[{"type":"banner","data":{"img":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/16e7ed7a4748794db45a4e76184397c0.png","link":"1234567890-="}},{"type":"desc","data":"1234567890-"},{"type":"product","data":[{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/fa7e0edb13400a7fb8a13b1ffd7f9d4f.jpeg","id":10851,"name":"DHWD20PURZ","brand":"LTS","label":"","total":0,"createAt":1530005772000,"status":"已下架","realPrice":100,"oldPrice":8000,"saleRule":"{\\"startTime\\":\\"2018-06-27 16:04:00\\",\\"endTime\\":\\"2018-06-27 16:10:00\\",\\"price\\":100,\\"minimum\\":3,\\"total\\":2,\\"maxinum\\":4}","discountType":4,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/fa7e0edb13400a7fb8a13b1ffd7f9d4f.jpeg","id":10850,"name":"DHWD20PURZ","brand":"LTS","label":"","total":0,"createAt":1530001534000,"status":"已下架","realPrice":1200,"oldPrice":8000,"saleRule":"{\\"startTime\\":\\"2018-06-26 00:00:00\\",\\"endTime\\":\\"2018-06-26 00:00:00\\",\\"price\\":1200,\\"minimum\\":1,\\"total\\":12,\\"maxinum\\":9}","discountType":4,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/f301f2e707d5a0bfd7eb6b09f3993dc4.jpg","id":10848,"name":"测试222","brand":"LTS","label":"","total":0,"createAt":1529481048000,"status":"创建中","realPrice":100,"oldPrice":100,"saleRule":"","discountType":0,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/fa7e0edb13400a7fb8a13b1ffd7f9d4f.jpeg","id":10847,"name":"DHWD20PURZ","brand":"LTS","label":"","total":0,"createAt":1529031051000,"status":"已上架","realPrice":8000,"oldPrice":8000,"saleRule":"","discountType":0,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/0438d7154c65a96aed8c55741c0f3730.png","id":10846,"name":"LTA1007,  Connector - BNC Male Crimp-On","brand":"LTS","label":"Clearance","total":0,"createAt":1527840997000,"status":"已上架","realPrice":700,"oldPrice":1000,"saleRule":"","discountType":2,"discount":300},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/2bb0b517ca4be232631a59078aa432b9.jpg","id":10845,"name":"满减CMIP8042-28, Platinum Mini Bullet Network IP Camera 4MP - 2.8mm","brand":"LTS","label":"Clearance","total":0,"createAt":1527680390000,"status":"已上架","realPrice":100,"oldPrice":20000,"saleRule":"{\\"startTime\\":\\"2018-06-27 04:11:00\\",\\"endTime\\":\\"2018-06-27 04:11:29\\",\\"price\\":100,\\"minimum\\":1,\\"total\\":1,\\"maxinum\\":1}","discountType":4,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/f432f6810fb6d39adc2d71c549a92718.jpg","id":10844,"name":"满减测试0525","brand":"ltd","label":"JunePromotion","total":0,"createAt":1527238642000,"status":"已上架","realPrice":99900,"oldPrice":99900,"saleRule":"{\\"startTime\\":\\"2018-06-06 00:00:00\\",\\"endTime\\":\\"2018-06-30 00:00:00\\",\\"price\\":1400,\\"minimum\\":\\"1\\",\\"total\\":\\"11\\",\\"maxinum\\":\\"5\\"}","discountType":0,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/2bb0b517ca4be232631a59078aa432b9.jpg","id":10843,"name":"满减CMIP8042-28, Platinum Mini Bullet Network IP Camera 4MP - 2.8mm","brand":"LTS","label":"","total":10061,"createAt":1527233911000,"status":"已上架","realPrice":20000,"oldPrice":20000,"saleRule":"","discountType":0,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/bc2403ef7bff3a29b72b0b096fd4e410.jpg","id":10841,"name":"#test#001","brand":"LTS","label":"","total":0,"createAt":1527230130000,"status":"创建中","realPrice":100,"oldPrice":100,"saleRule":"","discountType":0,"discount":0},{"image":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/8cbd295c40f82598a9cc66d753291f00.png","id":10834,"name":"test prod two","brand":"test","label":"","total":0,"createAt":1526459304000,"status":"已上架","realPrice":2400,"oldPrice":2400,"saleRule":"","discountType":0,"discount":0}]}]')
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
