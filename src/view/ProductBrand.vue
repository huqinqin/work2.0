<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item>
        <i-button type="primary" @click="addBrand">添加品牌</i-button>
        <i-button type="error" @click="removeSelections" :disabled="selections.length === 0">删除所选</i-button>
      </form-item>
    </i-form>
    <Modal
      v-model="editModal"
      title="Common Modal dialog box title">
      <div slot="footer"></div>
      <product-brand-modal :id="curId" @update="updateBrand"></product-brand-modal>
    </Modal>
    <i-table :columns="columns" :data="list" size="small" ref="table" @on-selection-change="changeSelection"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" @on-page-size-change="changeSize" :total="total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  components: {
    'product-brand-modal': () => import('./ProductBrandModal')
  },
  data () {
    return {
      url: 'Brand',
      filter: {
        id: '', name: '', initial: '', manufacturer: '', show: ''
      },
      form: null,
      curId: '',
      editModal: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '品牌名称',
          key: 'name'
        }, {
          title: '品牌首字母',
          key: 'shortName'
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
                    this.curId = params.row.id
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
  methods: {
    updateBrand () {
      this.editModal = false
      this.query()
    },
    addBrand () {
      this.curId = ''
      this.editModal = true
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
