<template>
  <Modal
    :value="value"
    @input="onInput"
    title="选择商品" width="80%" class="no-footer">
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
    <i-table :columns="columns" :data="products" size="small" ref="table" @on-selection-change="changeSelection"></i-table>
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
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 已经选择的商品id，这些商品id无法再次选择
    selIds: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selection: [],
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
              return (
                <i-button type="success" size="small">已添加</i-button>
              )
            }
            return (
              <i-button type="primary" size="small" onClick={() => this.selProduct([params.row])}>添加</i-button>
            )
          }
        }
      ]
    }
  },
  computed: {
    products () {
      let list = []
      for (const item of this.list) {
        if (this.selIds.indexOf(item.id) > -1) {
          list.push({...item, _disabled: true})
        } else {
          list.push(item)
        }
      }
      return list
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
    selProduct (item) {
      this.$emit('select', item)
    },
    addSelection () {
      this.$emit('select', this.selection)
    },
    changeSelection (selection) {
      this.selection = selection
    },
    changeCurPage (page) {
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
