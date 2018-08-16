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
          <LayoutPropItem v-for="sku in skus" :data="sku" :key="sku.id">
            <a href="#" @click="delSkuProp(sku.id)">删除SKU</a>
          </LayoutPropItem>
          <LayoutPropItem v-for="spu in spus" :data="spu" :key="spu.id">
            <a href="#" @click="delSpuProp(spu.id)">删除SPU</a>
          </LayoutPropItem>
        </div>
      </div>
    </Card>
    <modal v-model="showPropNew" @on-ok="saveProp" title="属性">
      <i-form :model="prop" :label-width="80">
        <form-item label="类型">
          <radio-group v-model="prop.type">
            <radio label="sku">sku属性</radio>
            <radio label="spu">spu属性</radio>
          </radio-group>
        </form-item>
        <FormItem label="所属类目">
          <Input v-model="curCate.name" placeholder="所属类目" readonly="readonly" />
        </FormItem>
        <form-item label="属性名">
          <i-input v-model="prop.name" placeholder="属性名"></i-input>
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
      prop: {
        type: 'sku',
        name: ''
      },
      skus: [],
      spus: [],
      showCateModal: false,
      showPropNew: false,
      form: cloneDeep(initForm)
    }
  },
  computed: {
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
      this.$http.fetchSkuProps({id: this.curCate.id}).then(data => {
        this.skus = data.list
      })
      this.$http.fetchSpuProps({id: this.curCate.id}).then(data => {
        this.spus = data.list
      })
    },
    showProp () {
      this.showPropNew = true
    },
    check (root, node, data) {
      this.curCate = { id: data.id, name: data.title }
      this.fetchProps()
      // this.getCategory(data.value)
    },
    append (event, data) {
      event.stopPropagation()
      this.form.parentId = data.id
      this.form.parentName = data.title
      this.showCateModal = true
    },
    remove (root, node, data) {
      this.$http.delCategory([data.id]).then(() => {
        this.fetchCategory()
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
      const params = {categoryId: this.curCate.id, name: this.prop.name}
      if (this.prop.type === 'sku') {
        this.$http.saveSku(params).then(() => {
          this.fetchProps()
        })
      } else {
        this.$http.saveProp(params).then(() => {
          this.fetchProps()
        })
      }
    },
    delSkuProp (id) {
      this.$http.delSku({categoryId: this.curCate.id, cateSkuPropIds: [id]}).then(() => {
        this.$Notice.success({title: '删除成功'})
        this.fetchProps()
      })
    },
    delSpuProp (id) {
      this.$http.delProp({categoryId: this.curCate.id, cateSkuPropIds: [id]}).then(() => {
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
