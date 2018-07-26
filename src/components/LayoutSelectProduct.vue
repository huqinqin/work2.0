<template>
  <Modal
    v-model="show"
    title="Common Modal dialog box title" width="80%" class="no-footer">
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="image">
        <i-input v-model="filter.image" type="text" placeholder="商品图片" ></i-input>
      </form-item>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="商品ID" ></i-input>
      </form-item>
      <form-item prop="title">
        <i-input v-model="filter.title" type="text" placeholder="商品名称" ></i-input>
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
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="primary" @click="addSelection">添加所选</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table" @on-selection-change="changeSelection"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changeCurPage" :total="40" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'LayoutSelectProduct',
  data () {
    return {
      selection: [],
      show: false,
      curPage: 1,
      total: 500,
      list: [],
      filter: {id: ''},
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
          key: 'title'
        }, {
          title: '商品品牌',
          key: 'brandName'
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
            if (params.row._disabled) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {}
                  }
                }, '已添加')
              ])
            }
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
                    if (this.addProducts) {
                      this.addProducts([params.row])
                    }
                  }
                }
              }, '添加')
            ])
          }
        }
      ]
    }
  },
  props: {
    selectIds: {
      type: Array,
      default () {
        return []
      }
    },
    addProducts: Function,
    delProducts: Function
  },
  methods: {
    addSelection () {
      if (this.addProducts) {
        this.addProducts(this.selection)
      }
    },
    changeSelection (selection) {
      this.selection = selection
    },
    changeCurPage (page) {
      console.log(page)
      this.curPage = page
      this.query()
    },
    query () {
      this.$http.fetchProduct({
        order_by: 'cdate desc',
        page: this.curPage,
        page_size: 10,
        ...this.filter
      }).then(data => {
        this.list = data.list
      })
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
<style lang="css" scoped>
</style>
