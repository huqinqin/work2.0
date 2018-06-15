<template>
  <div class="module-content">
    <div class="operate-list">
      <ButtonGroup vertical @click="setModuleIndex(index)">
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
            <span data-v-26f98978="">{{data.name}}</span>
          </div>
        </div>
      </a>
      <ul data-v-26f98978="" class="item-list-box">
        <LayoutProduct v-for="product in data.products" :key="product.id" :product="product"></LayoutProduct>
        <LayoutProduct v-if="products.length === 0"></LayoutProduct>
      </ul>
    </div>
    <Modal
      v-model="modal" width="80%" class="no-footer">
      <div slot="header">
        <Input :value="data.name" @on-change="$emit('change', $event.target.value)" placeholder="Enter name..."></Input>
      </div>
      <i-form ref="filter" :model="filter" inline>
        <form-item prop="image">
          <i-input v-model="filter.image" type="text" placeholder="商品图片" ></i-input>
        </form-item>
        <form-item prop="id">
          <i-input v-model="filter.id" type="text" placeholder="商品ID" ></i-input>
        </form-item>
        <form-item prop="name">
          <i-input v-model="filter.name" type="text" placeholder="商品名称" ></i-input>
        </form-item>
        <form-item prop="brand">
          <i-input v-model="filter.brand" type="text" placeholder="商品品牌" ></i-input>
        </form-item>
        <form-item prop="label">
          <i-input v-model="filter.label" type="text" placeholder="商品标签" ></i-input>
        </form-item>
        <form-item prop="total">
          <i-input v-model="filter.total" type="text" placeholder="商品出售总数" ></i-input>
        </form-item>
        <form-item prop="createAt">
          <date-picker type="datetimerange" placeholder="商品创建时间"></date-picker>
        </form-item>
        <form-item prop="status">
          <i-input v-model="filter.status" type="text" placeholder="商品状态" ></i-input>
        </form-item>
        <form-item>
          <i-button type="primary">查询</i-button>
          <i-button type="primary">添加所选</i-button>
        </form-item>
      </i-form>
      <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
      <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
        <div style="float:right;">
          <Page :total="40" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
    </Modal>
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
      name: '',
      products: [],
      filter: {
        image: '', id: '', name: '', brand: '', label: '', total: '', createAt: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品图片',
          key: 'image',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.image
                },
                style: {
                  width: '40px',
                  height: '40px'
                },
                on: {
                  click: () => {
                    console.log(params)
                  }
                }
              })
            ])
          }
        }, {
          title: '商品ID',
          key: 'id'
        }, {
          title: '商品名称',
          key: 'name'
        }, {
          title: '商品品牌',
          key: 'brand'
        }, {
          title: '商品标签',
          key: 'label'
        }, {
          title: '商品出售总数',
          key: 'total'
        }, {
          title: '商品创建时间',
          key: 'createAt'
        }, {
          title: '商品状态',
          key: 'status'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emit('change', [params.row])
                  }
                }
              }, '添加')
            ])
          }
        }
      ],
      list: [
        {}
      ]
    }
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
          name: '未命名楼层',
          products: []
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setModuleIndex']),
    showEditDialog () {
      this.toggleModal()
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
