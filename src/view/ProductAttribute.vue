<template>
  <card>
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
  <form-item prop="options">
    <date-picker type="date" placeholder="可选值列表"></date-picker>
  </form-item>
  <form-item>
    <i-button type="primary">查询</i-button>
    <i-button type="error">删除所选</i-button>
  </form-item>
</i-form>
<Modal
  v-model="editModal"
  title="Common Modal dialog box title">
  <div slot="footer"></div>
  <product-attribute-modal :form="form" @closeModal="editModal = false"></product-attribute-modal>
</Modal>
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
import LayoutTags from '@/view/components/LayoutTags.vue'
export default {
  mixins: [mixin],
  components: {
    LayoutTags,
    'product-attribute-modal': () => import('./ProductAttributeModal')
  },
  data () {
    return {
      editModal: false,
      form: null,
      url: '/product/attribute',
      filter: {
        id: '', name: '', category: '', options: ''
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
          title: '属性名称',
          key: 'name'
        }, {
          title: '商品类型',
          key: 'category'
        }, {
          title: '可选值列表',
          key: 'options',
          render: (h, params) => {
            return h(LayoutTags, {
              props: {
                list: params.row.options
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
                    this.form = params.row
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
  }
}
</script>
