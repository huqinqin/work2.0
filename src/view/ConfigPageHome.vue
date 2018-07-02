<template>
  <card>
    <p slot="title">配置</p>
    <span slot="extra" class="new-config">
      <a href="#" slot="extra" @click.prevent="addFloor">
          <Icon type="ios-plus-empty"></Icon>
          新增楼层
      </a>
    </span>
    <span slot="extra">
      <Button type="primary" href="#" slot="extra" @click.prevent="saveConfig">
          保存
      </Button>
    </span>
    <div class="config-page-wrapper">
      <div class="config-page">
        <component v-for="(item, index) in config" :is="item.name" :key="index" :data="item.data" :index="index" @handle="handleModule" @update="updateModule"></component>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  name: 'ConfigPageHome',
  components: {
    LayoutModuleCarousel: () => import('@/view/components/LayoutModuleCarousel'),
    LayoutModuleFixImg: () => import('@/view/components/LayoutModuleFixImg'),
    LayoutModuleFloor: () => import('@/view/components/LayoutModuleFloor')
  },
  data () {
    return {
      url: 'config/home',
      carousel: [],
      fixImg: [],
      floor: [],
      config: [
        {
          type: 'carousel',
          name: 'LayoutModuleCarousel',
          data: []
        },
        {
          type: 'fix',
          name: 'LayoutModuleFixImg',
          data: {
            left: {link: '', url: '', name: ''},
            rightTop: {link: '', url: '', name: ''},
            rightBottom: {link: '', url: '', name: ''}
          }
        }
      ]
    }
  },
  methods: {
    addFloor () {
      this.config.push({
        type: 'floor',
        name: 'LayoutModuleFloor',
        data: {
          name: '',
          link: '',
          products: []
        }
      })
    },
    updateModule (moduleIndex, data) {
      this.config[moduleIndex].data = data
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
    saveConfig () {
      console.log(JSON.stringify(this.config))
      this.$api.post(`${this.url}/save`, {
        name: this.name,
        config: JSON.stringify(this.config)
      })
    },
    query () {
      let resp = '[{"type":"carousel","name":"LayoutModuleCarousel","data":[{"name":"1bd9720c9bc0f3f06e8d1247f4bf03b2.png","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/1bd9720c9bc0f3f06e8d1247f4bf03b2.png"},{"name":"f346bd592fa62d3c8430697f01529178.png","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/f346bd592fa62d3c8430697f01529178.png"},{"name":"5c6e539e229e99e0fcb1845ec82b4428.png","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/5c6e539e229e99e0fcb1845ec82b4428.png"},{"name":"b849a8f1be9d8e14a82f923f056cd19e.png","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/b849a8f1be9d8e14a82f923f056cd19e.png"}]},{"type":"fix","name":"LayoutModuleFixImg","data":{"left":{"link":"","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/05f784ccb606312e7affd43294108320.png","name":"05f784ccb606312e7affd43294108320.png"},"rightTop":{"link":"","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/0a8c152166ec8b1894c50c29d43b447e.jpg","name":"0a8c152166ec8b1894c50c29d43b447e.jpg"},"rightBottom":{"link":"","url":"http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/e8109c3aa4cc6f726ee5c29a3fdd9395.jpg","name":"e8109c3aa4cc6f726ee5c29a3fdd9395.jpg"}}}]'
      if (resp) this.config = JSON.parse(resp)
    }
  },
  created () {
    this.query()
  }
}
</script>
<style lang="less" scoped>
.image-column{
  height: 350px;
  width: 100%;
  display: flex;
  img{
    width: 100%;
    height: 100%;
  }
  .image-column-left{
    width: 715px;
    margin-right: 12px;
  }
  .image-column-right{
    flex: 1;
    div {
      height: 170px;
    }
  }
  .image-column-right-top{
    margin-bottom: 12px;
  }
}
.module-content{
  margin-bottom: 12px;
}
</style>
