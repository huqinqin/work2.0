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
      <a data-v-26f98978="">
        <div data-v-26f98978="" class="item-list-title">
          <div data-v-26f98978="" class="i">
            <span data-v-26f98978="" class="border"></span>
            <span data-v-26f98978="">
              <Input :value="name" placeholder="Enter name..." @on-change="changeName" style="width: 300px" @on-focus="setModuleIndex(index)"></Input>
            </span>
          </div>
        </div>
      </a>
      <ul data-v-26f98978="" class="item-list-box">
        <LayoutProduct v-for="(product, index) in products" :key="product.id" :product="product" :index="index"></LayoutProduct>
        <LayoutProduct v-if="products.length === 0"></LayoutProduct>
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
      modal: false
    }
  },
  props: {
    index: Number
  },
  computed: {
    products () {
      return this.$store.state.configActivity.config[this.index].data.products
    },
    name () {
      return this.$store.state.configActivity.config[this.index].data.name
    }
  },
  methods: {
    ...mapMutations(['setModuleIndex', 'toggleModal', 'editModule']),
    showEditDialog () {
      this.toggleModal()
    },
    changeName (event) {
      this.editModule(event.target.value)
    }
  },
  beforeMount () {
    this.$api.get('/store/item/get_manage_list', {
      params: {
        order_by: 'cdate desc',
        page: 1,
        page_size: 10,
        wholesale_item_query: {keywords: '', cdateMin: '', 'cdateMax': '', 'type': 0}
      }
    }).then(data => {
      this.list = data.map(({ full_url: image, id, item_name: name, brand, tag: label, order_num: total, cdate: createAt, status_cname: status, price_real: realPrice, price: oldPrice }) => ({
        image, id, name, brand, label, total, createAt, status, realPrice, oldPrice
      }))
      console.log(data)
    })
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
