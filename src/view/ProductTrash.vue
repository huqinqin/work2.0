<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
  <form-item prop="id">
    <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
  </form-item>
  <form-item prop="name">
    <i-input v-model="filter.name" type="text" placeholder="商品名称" ></i-input>
  </form-item>
  <form-item prop="image">
    <i-input v-model="filter.image" type="text" placeholder="商品图片" ></i-input>
  </form-item>
  <form-item prop="brand">
    <i-input v-model="filter.brand" type="text" placeholder="商品品牌" ></i-input>
  </form-item>
  <form-item prop="price">
    <i-input v-model="filter.price" type="text" placeholder="单价" ></i-input>
  </form-item>
  <form-item prop="num">
    <i-input v-model="filter.num" type="text" placeholder="编码" ></i-input>
  </form-item>
  <form-item prop="category">
    <i-input v-model="filter.category" type="text" placeholder="类目" ></i-input>
  </form-item>

  <form-item>
    <i-button type="primary">查询</i-button>
    <i-button type="error">删除所选</i-button>
  </form-item>
</i-form>
<i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
<div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
  <div style="float:right;">
    <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
  </div>
</div>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'product/trash',
      filter: {
        id: '', name: '', image: '', brand: '', price: '', num: '', category: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id'
        }, {
          title: '商品名称',
          key: 'name'
        }, {
          title: '商品图片',
          key: 'image'
        }, {
          title: '商品品牌',
          key: 'brand'
        }, {
          title: '单价',
          key: 'price'
        }, {
          title: '编码',
          key: 'num'
        }, {
          title: '类目',
          key: 'category'
        },
        {
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
                    this.productRevert(params.row.id)
                  }
                }
              }, '还原')
            ])
          }
        }
      ]
    }
  },
  methods: {
    productRevert (id) {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>Revert confirm?</p>',
        loading: true,
        onCancel: () => {
          this.$Notice.info({
            title: 'Revert cancel',
            desc: ''
          })
        },
        onOk: () => {
          this.$api.get(`${this.url}/revert`, {
            params: {
              id: id
            }
          }).then(() => {
            this.$Modal.remove()
            this.$Notice.success({
              title: 'Revert success',
              desc: ''
            })
          })
        }
      })
    }
  }
}
</script>
