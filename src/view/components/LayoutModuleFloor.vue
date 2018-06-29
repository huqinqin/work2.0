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
    <div id="0" class="item-level">
      <a>
        <div class="item-list-title">
          <div class="i">
            <span class="border"></span>
            <span>
              <Input :value="data.name" placeholder="Enter name..." @on-change="changeName" style="width: 300px"></Input>
            </span>
          </div>
        </div>
      </a>
      <ul class="item-list-box">
        <LayoutProduct v-for="(product, index) in data.products" :key="product.id" :product="product" :index="index" @handle="handleProduct"></LayoutProduct>
        <LayoutProductEmpty v-if="data.products.length === 0"></LayoutProductEmpty>
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
      modal: false
    }
  },
  props: {
    index: Number,
    data: {
      type: Object,
      default () {
        return {
          name: '',
          products: []
        }
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
            self.$emit('update', self.index, {
              products: self.data.products.concat(products),
              name: self.data.name
            })
            self.$selectProducts.addSelectIds(products.map(product => product.id))
          }
        })
      } else {
        this.$emit('handle', this.index, operate)
      }
    },
    changeName (event) {
      this.$emit('update', this.index, {products: this.data.products, name: event.target.value})
    },
    handleProduct (productIndex, operate) {
      if (operate === '编辑') {
        // 弹出商品选择，但是不能多选
        const self = this
        this.$selectProducts.show({
          addProducts (products) {
            const product = products[0]
            const data = self.data.products
            const delProduct = data.splice(productIndex, 1, product)[0]
            self.$emit('update', self.index, {products: data, name: self.data.name})
            self.$selectProducts.addSelectIds([product.id])
            self.$selectProducts.delSelectIds([delProduct.id])
          }
        })
      } else if (operate === '删除') {
        const id = this.data.products[productIndex].id
        this.data.products.splice(productIndex, 1)
        this.$selectProducts.delSelectIds([id])
      } else if (operate === '左移') {
        const targetIndex = productIndex - 1
        const temp = this.data.products[productIndex]
        this.data.products.splice(productIndex, 1, this.data.products[targetIndex])
        this.data.products.splice(targetIndex, 1, temp)
      } else if (operate === '右移') {
        const targetIndex = productIndex + 1
        const temp = this.data.products[productIndex]
        this.data.products.splice(productIndex, 1, this.data.products[targetIndex])
        this.data.products.splice(targetIndex, 1, temp)
      }
      this.$emit('update', this.index, {products: this.data.products, name: this.data.name})
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
