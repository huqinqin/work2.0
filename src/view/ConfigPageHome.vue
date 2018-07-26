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
      url: 'Home',
      id: '',
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
      this.$http.saveHome({
        content: JSON.stringify(this.config)
      })
    },
    query () {
      this.$http.getHome().then(data => {
        this.config = data.content
        this.id = data.id
      })
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
