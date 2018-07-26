<template>
  <card v-show="showPropTable">
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
    <product-attribute-modal></product-attribute-modal>
    <i-table :columns="columns" :data="props" size="small" ref="table"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="propsTotal" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import mixin from '@/mixins/list.js'
import LayoutTags from '@/view/components/LayoutTags.vue'
const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('category')
export default {
  data () {
    return {
      selections: [],
      rows: 10,
      page: 1,
      editModal: false,
      curId: null,
      filter: {
        categoryId: ''
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
          title: '可选值列表',
          key: 'values',
          render: (h, params) => {
            const tags = params.row.values.map(value => {
              return <tag key={value.id} name={value.name} closable on-on-close={() => { this.delValueTag(value.id, params.row) }}>{value.name }</tag>
            })
            return (
              <div on-click={() => {}}>
                {tags}
                <input type="text" class="btn-add" placeholder="添加" on-keydown={(e) => this.addValueTag(event.keyCode, e.target.value, params.row)}/>
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <i-button type="primary" size="small" style={{marginRight: '5px'}} on-click={() => { this.showModal(params.row) }}>编辑</i-button>
                <i-button type="error" size="small" style={{marginRight: '5px'}} on-click={() => { this.deleteItem(params.row.id) }}>删除</i-button>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {
    ...mapState(['isSku', 'showPropTable', 'props', 'propsTotal']),
    ...mapGetters(['curCategoryId', 'url'])
  },
  components: {
    LayoutTags,
    'product-attribute-modal': () => import('./ProductAttributeModal')
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['setCurProp', 'setShowPropModal']),
    ...mapActions(['fetchProp', 'delValue', 'addValue']),
    showModal (prop) {
      this.setCurProp(prop)
      this.setShowPropModal(true)
    },
    delValueTag (id, prop) {
      this.setCurProp(prop)
      this.delValue(id)
    },
    addValueTag (keyCode, name, prop) {
      if (keyCode === 13) {
        this.setCurProp(prop)
        this.addValue(name)
      }
    },
    query () {
      this.fetchProp()
    },
    changeSelection (val) {
      this.selections = val
    },
    changePage (page) {
      this.page = page
      this.query()
    },
    changeSize (rows) {
      this.rows = rows
      this.query()
    },
    deleteItem (id) {
      this.$Modal.confirm({
        title: '删除操作',
        content: `<p>确认删除id为${id}的数据？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http['del' + this.url]([id], this.curCategoryId).then(() => {
            this.query()
            this.$Modal.remove()
            this.$Notice.success({
              title: '删除成功',
              desc: ''
            })
          })
        }
      })
    },
    removeSelections () {
      this.$Modal.confirm({
        title: 'Title',
        content: `<p>确认删除选中的${this.selections.length}条数据？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http['del' + this.url](
            this.selections.map(selection => selection.id),
            this.curCategoryId
          ).then(() => {
            this.query()
            this.$Modal.remove()
            this.$Notice.success({
              title: '删除成功',
              desc: ''
            })
          })
        }
      })
    }
  }
}
</script>
