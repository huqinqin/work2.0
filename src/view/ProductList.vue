<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
  <form-item prop="id">
    <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
  </form-item>
  <form-item prop="name">
    <i-input v-model="filter.title" type="text" placeholder="商品名称" ></i-input>
  </form-item>
  <form-item prop="brand">
    <i-select v-model="filter.brandId" placeholder="商品品牌">
      <i-option v-for="item in brand" :value="item.key" :key="item.key">{{item.value}}</i-option>
    </i-select>
  </form-item>
  <form-item prop="num">
    <i-input v-model="filter.sin" type="text" placeholder="编码" ></i-input>
  </form-item>
  <form-item prop="label">
    <i-input v-model="filter.keyword" type="text" placeholder="标签" ></i-input>
  </form-item>
  <form-item prop="status">
    <i-select v-model="filter.status" placeholder="是否上架">
      <Option value="onsale">上架</Option>
      <Option value="enabled">下架</Option>
    </i-select>
  </form-item>
  <form-item>
    <i-button type="primary" @click="query">查询</i-button>
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
import formatPrice from '../plugin/filter/formatPrice'
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Product',
      filter: {
        id: '', name: '', image: '', brandId: '', sin: '', keyword: '', status: 'onsale'
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
          key: 'title'
        }, {
          title: '商品图片',
          key: 'image',
          render: (h, params) => {
            return (
              <img src={params.row.imgUrls[0]} alt="商品主图" height="48"/>
            )
          }
        }, {
          title: '商品品牌',
          key: 'brandName'
        }, {
          title: '单价',
          render: (h, params) => {
            return (
              <div>{formatPrice.formatPrice(params.row.skus[0].basePrice)}</div>
            )
          }
        }, {
          title: '编码',
          render: (h, params) => {
            return (
              <div>{params.row.skus[0].sin}</div>
            )
          }
        }, {
          title: '标签',
          key: 'keyword',
          render: (h, params) => {
            return (
              <div>
                {
                  params.row.keyword && params.row.keyword.map(t => {
                    return (
                      <span class="ivu-tag ivu-tag-blue ivu-tag-checked" color="blue">{t}</span>
                    )
                  })
                }
              </div>
            )
          }
        }, {
          title: '销量',
          key: 'sale'
        }, {
          title: '是否上架',
          key: 'status',
          render: (h, params) => {
            return (
              <i-switch value={params.row.status} true-value="onsale" false-value="enabled" on-on-change={(e) => this.changeStatus(params.row.id, e)} />
            )
          }
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
                    this.$router.push(`product_edit/${params.row.id}`)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      brand: []
    }
  },
  methods: {
    changeStatus (id, status) {
      this.$http.updateProduct({
        id: id,
        status: status
      }).then(() => {
        this.$Notice.success({
          title: '操作成功',
          desc: ''
        })
      })
    },
    disableItem (id) {
      this.$http.diabledProduct({id: id}).then(() => {
        this.$Notice.success({
          title: '删除成功',
          desc: ''
        })
      })
    },
    getBrand () {
      this.$http.fetchCodeTable({
        type: 'brand',
        source: 'lts'
      }).then(data => {
        this.brand = data
      })
    }
  },
  beforeMount () {
    this.getBrand()
    this.query()
  }
}
</script>
