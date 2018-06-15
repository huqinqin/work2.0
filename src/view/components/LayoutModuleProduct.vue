<template>
  <div class="module-content">
    <div class="operate-list" @click="setModuleIndex(index)">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit" @click="showEditDialog">编辑</Button>
        <Button type="primary" icon="trash-a" @click="delModule()">删除</Button>
        <Button type="primary" icon="arrow-up-a" @click="upModule()">上移</Button>
        <Button type="primary" icon="arrow-down-a" @click="downModule()">下移</Button>
      </ButtonGroup>
    </div>
    <div data-v-26f98978="" id="0" class="item-level">
      <ul data-v-26f98978="" class="item-list-box">
        <LayoutProduct v-for="(product, index) in data" :key="product.id" :product="product" :index="index"></LayoutProduct>
        <LayoutProduct v-if="data.length === 0"></LayoutProduct>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LayoutFloorModule',
  components: {
    LayoutProduct: () => import('@/view/components/LayoutProduct')
  },
  data () {
    return {
      modal: false,
      products: [],
      list: [
        {}
      ]
    }
  },
  props: {
    index: Number
  },
  computed: {
    data () {
      return this.$store.state.configActivity.config[this.index].data
    }
  },
  methods: {
    ...mapMutations(['delModule', 'upModule', 'downModule', 'toggleModal', 'setModuleIndex']),
    showEditDialog () {
      this.toggleModal()
    }
  }
}
</script>
<style>
.no-footer .ivu-modal-footer{
  display: none;
}
</style>

<style lang="less" scoped>
.item-list-title {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  color: #707070;
  .i {
    padding-left: 11px;
    display: flex;
    align-items: center;
    .border{
      display: block;
      width: 3px;
      height: 14px;
      background: #3b85ff;
    }
    span:last-child{
      display: block;
      margin-left: 12px;
    }
  }
}
.item-list-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
