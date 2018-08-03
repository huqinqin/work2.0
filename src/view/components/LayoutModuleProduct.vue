<template>
  <div class="module-content">
    <div class="operate-list" @click.capture="handleButton">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit">编辑</Button>
        <Button type="primary" icon="trash-a">删除</Button>
        <Button type="primary" icon="arrow-up-a">上移</Button>
        <Button type="primary" icon="arrow-down-a">下移</Button>
      </ButtonGroup>
    </div>
    <div data-v-26f98978="" id="0" class="item-level">
      <ul data-v-26f98978="" class="item-list-box">
        <LayoutProduct v-for="(product, index) in data" :key="product.id" :product="product" :index="index" @handle="handleProduct"></LayoutProduct>
        <LayoutProductEmpty v-if="data.length === 0"></LayoutProductEmpty>
      </ul>
    </div>
  </div>
</template>
<script>
import trim from 'lodash.trim'
export default {
  name: 'LayoutFloorModule',
  components: {
    LayoutProduct: () => import('@/view/components/LayoutProduct'),
    LayoutProductEmpty: () => import('@/view/components/LayoutProductEmpty')
  },
  data () {
    return {
      modal: false,
      products: []
    }
  },
  props: {
    index: Number,
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleButton () {
      const operate = trim(event.target.innerText)
      if (operate === '编辑') {
        const self = this
        this.$selectProducts.show({
          addProducts (products) {
            self.$emit('update', self.index, self.data.concat(products))
            self.$selectProducts.addSelectIds(products.map(product => product.id))
          }
        })
      } else {
        this.$emit('handle', this.index, operate)
      }
    },
    handleProduct (productIndex, operate) {
      if (operate === '编辑') {
        // 弹出商品选择，但是不能多选
        const self = this
        this.$selectProducts.show({
          addProducts (products) {
            const product = products[0]
            const data = self.data
            const delProduct = data.splice(productIndex, 1, product)[0]
            self.$emit('update', self.index, data)
            self.$selectProducts.addSelectIds([product.id])
            self.$selectProducts.delSelectIds([delProduct.id])
          }
        })
      } else if (operate === '删除') {
        const id = this.data[productIndex].id
        this.data.splice(productIndex, 1)
        this.$selectProducts.delSelectIds([id])
      } else if (operate === '左移') {
        const targetIndex = productIndex - 1
        const temp = this.data[productIndex]
        this.data.splice(productIndex, 1, this.data[targetIndex])
        this.data.splice(targetIndex, 1, temp)
      } else if (operate === '右移') {
        const targetIndex = productIndex + 1
        const temp = this.data[productIndex]
        this.data.splice(productIndex, 1, this.data[targetIndex])
        this.data.splice(targetIndex, 1, temp)
      }
      this.$emit('update', this.index, this.data)
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
