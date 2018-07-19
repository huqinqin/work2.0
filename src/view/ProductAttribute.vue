<template>
  <card v-show="$store.state.category.showProps">
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
      </form-item>
      <form-item prop="name">
        <i-input v-model="filter.name" type="text" placeholder="属性名称" ></i-input>
      </form-item>
      <form-item prop="category">
        <i-input v-model="filter.category" type="text" placeholder="商品类型" ></i-input>
      </form-item>
      <form-item prop="values">
        <date-picker type="date" placeholder="可选值列表"></date-picker>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="error">删除所选</i-button>
      </form-item>
    </i-form>
    <Modal
      v-model="editModal"
      title="Common Modal dialog box title">
      <div slot="footer"></div>
      <product-attribute-modal></product-attribute-modal>
    </Modal>
    <i-table :columns="columns" :data="$store.state.category.props" size="small" ref="table"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="$store.state.category.total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>
<script>
import mixin from '@/mixins/list.js'
import LayoutTags from '@/view/components/LayoutTags.vue'
export default {
  data () {
    return {
      editModal: false,
      curId: null,
      filter: {
        categoryId: ''
      },
      url: 'product/category/props',
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
          title: '属性名称',
          key: 'name'
        }, {
          title: '可选值列表',
          key: 'values',
          render: (h, params) => {
            return h(LayoutTags, {
              props: {
                list: params.row.values,
                id: params.row.id,
                categoryId: params.row.categoryId,
                type: 'product/category/sku/save'
              },
              on: {
                click: () => {
                  this.$store.commit('setCurProp', params.row)
                }
              }
            })
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
                    this.editModal = true
                    this.curId = params.row
                    this.$store.commit('setCurProp', params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.deleteItem(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  components: {
    LayoutTags,
    'product-attribute-modal': () => import('./ProductAttributeModal')
  },
  mixins: [mixin],
  methods: {
    query () {
      this.$store.dispatch('getProps', this.$store.state.category.isSku)
    }
  }
}
</script>
