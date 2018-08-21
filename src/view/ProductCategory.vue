<template>
  <div class="details">
    <Card>
      <div class="layout-column">
        <div class="layout-cell flex-item">
          <Tree :data="treeData" :render="renderContent"></Tree>
        </div>
        <div class="layout-cell flex-item">
          <div style="overflow: hidden;">
            <i-button type="primary" style="float: right" @click="showProp">新增属性</i-button>
          </div>
          <h3 v-if="skus.length > 0">SKU属性</h3>
          <LayoutPropItem v-for="prop in skus" :data="prop" :key="prop.id">
            <a href="#" @click="delProp(prop.id)">删除</a>
          </LayoutPropItem>
          <h3 v-if="spus.length > 0">非SKU属性</h3>
          <LayoutPropItem v-for="prop in spus" :data="prop" :key="prop.id">
            <a href="#" @click="delProp(prop.id)">删除</a>
          </LayoutPropItem>
        </div>
      </div>
    </Card>
    <modal v-model="showPropNew" @on-ok="saveProp" title="属性">
      <i-form :model="prop" :label-width="80">
        <form-item label="类型">
          <radio-group v-model="prop.type">
            <radio label="sku">sku属性</radio>
            <radio label="spu">非sku属性</radio>
          </radio-group>
        </form-item>
        <FormItem label="所属类目">
          <Input v-model="curCate.name" placeholder="所属类目" readonly="readonly" />
        </FormItem>
        <form-item label="属性名">
          <i-input v-model="prop.name" placeholder="属性名"></i-input>
        </form-item>
        <form-item label="排序值">
          <i-input v-model="prop.onum" placeholder="排序值"></i-input>
        </form-item>
      </i-form>
    </modal>
    <modal v-model="showCateModal" @on-ok="saveCategory" title="类目">
      <Form :model="form" :label-width="80">
        <FormItem label="上级类目">
          <Input v-model="form.parentName" placeholder="上级类目" readonly="readonly" />
        </FormItem>
        <FormItem label="类目名称">
          <Input v-model="form.name" placeholder="输入类目名称"/>
        </FormItem>
        <FormItem label="类目排序">
          <Input  v-model="form.onum" placeholder="输入1~99"/>
        </FormItem>
        <FormItem label="">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
          </Upload>
        </FormItem>
      </Form>
    </modal>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
const initForm = {
  id: '',
  name: '',
  parentId: '',
  parentName: '',
  imgUrl: '',
  onum: 99
}
const initProp = {
  onum: 99,
  type: 'sku',
  name: ''
}
export default {
  name: 'ProductCategory',
  components: {
    LayoutPropItem: () => import('@/view/components/PropItem.vue'),
    LayoutTags: () => import('@/view/components/LayoutTags.vue'),
    ProductAttribute: () => import('./ProductAttribute.vue')
  },
  data () {
    return {
      curCate: {id: '', name: ''},
      prop: cloneDeep(initProp),
      props: [],
      showCateModal: false,
      showPropNew: false,
      form: cloneDeep(initForm)
    }
  },
  computed: {
    skus () {
      return this.props.filter(item => item.type === 'sku')
    },
    spus () {
      return this.props.filter(item => item.type === 'spu')
    },
    ...mapState('category/', ['categories', 'curCategory']),
    ...mapGetters('category/', ['curCategoryId']),
    treeData () {
      return [
        {
          id: '0',
          title: '商品类目',
          expand: true,
          render: (h, { root, node, data }) => {
            return (
              <span style={{display: 'inline-block', width: '100%'}}>
                <span>
                  <icon type="ios-folder-outline" style={{marginRight: '8px'}}></icon><span>{data.title}</span>
                </span>
                <span style={{ display: 'inline-block', float: 'right', marginRight: '32px' }}>
                  <i-button icon="ios-plus-empty" size="small" type="primary" style={{width: '52px'}} onClick={() => { this.append(event, data) }}></i-button>
                </span>
              </span>
            )
          },
          children: this.categories
        }
      ]
    }
  },
  methods: {
    ...mapActions('category/', ['fetchCategory', 'getCategory', 'fetchProp']),
    ...mapMutations('category/', ['addCategory', 'setIsSku', 'setShowPropTable']),
    renderContent (h, { root, node, data }) {
      return (
        <span class={{'tree-item': true}} onClick={() => { this.check(root, node, data) }}>
          <span class={{active: this.curCate.id === data.value}}>{data.label}</span>
          <span class={{ 'operate-btns': true }}>
            <i-button class={{ 'operate-btn': true }} icon="ios-plus-empty" type="ghost" size="small" onClick={() => { this.append(event, data) }}></i-button>
            <i-button class={{ 'operate-btn': true }} icon="ios-minus-empty" type="ghost" size="small" onClick={() => { this.remove(root, node, data) } }></i-button>
          </span>
        </span>
      )
    },
    fetchProps () {
      this.$http.fetchProp({id: this.curCate.id, type: ''}).then(data => {
        this.props = data
      })
    },
    showProp () {
      this.showPropNew = true
    },
    check (root, node, data) {
      this.curCate = { id: data.id, name: data.title }
      this.fetchProps()
    },
    append (event, data) {
      event.stopPropagation()
      this.form.parentId = data.id
      this.form.parentName = data.title
      this.showCateModal = true
    },
    remove (root, node, data) {
      console.log('​delValue -> data', data)
      this.$Modal.confirm({
        title: '删除操作',
        content: `<p>确认删除类目${data}？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http.delCategory([data.id]).then(() => {
            this.fetchCategory()
            this.$Notice.success({title: '删除成功'})
          })
        }
      })
    },
    saveCategory () {
      this.$http.saveCategory(this.form).then(data => {
        this.fetchCategory()
        this.form = cloneDeep(initForm)
      })
    },
    showPropTable (isSku) {
      this.setIsSku(isSku)
      this.setShowPropTable(true)
      this.fetchProp()
    },
    saveProp () {
      const params = { cateId: this.curCate.id, ...this.prop }
      this.$http.saveProp(params).then(() => {
        this.fetchProps()
        this.prop = cloneDeep(initProp)
      })
    },
    delProp (id) {
      this.$http.delProp({ids: [id]}).then(() => {
        this.$Notice.success({title: '删除成功'})
        this.fetchProps()
      })
    }
  },
  beforeMount () {
    this.fetchCategory()
  }
}
</script>
<style lang="css">
.tree-item{
  display: inline-block;
  width: 100%;
  cursor: pointer;
}
.tree-item .active{
  border-radius: 4px;
  padding: 4px 8px;
  background-color: #d5e8fc;
}
.operate-btns{
  display: inline-block;
  float: right;
  margin-right: 24px;
}
.operate-btn{
  margin-right: 8px;
}
</style>
