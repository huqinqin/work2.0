<template>
  <div class="details">
    <Row :gutter="16">
      <i-col span="12">
        <Card>
          <p slot="title">菜单树</p>
          <Tree :data="treeData" :render="renderContent"></Tree>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">权限</p>
          <Form :model="curCategory" :label-width="80">
            <FormItem label="上级类目">
              <CheckboxGroup>
                  <Checkbox label="twitter">
                      <span>Twitter</span>
                  </Checkbox>
                  <Checkbox label="facebook">
                      <span>Facebook</span>
                  </Checkbox>
                  <Checkbox label="github">
                      <span>Github</span>
                  </Checkbox>
                  <Checkbox label="snapchat">
                      <span>Snapchat</span>
                  </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="saveCategory">保存</Button>
              <template v-if="curCategoryId">
                <Button type="primary" @click="showPropTable(true)">SKU属性</Button>
                <Button type="primary" @click="showPropTable(false)">非SKU属性</Button>
              </template>
              <Button type="error">删除</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ProductCategory',
  components: {
    ProductAttribute: () => import('./ProductAttribute.vue')
  },
  data () {
    return {
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
                  <i-button icon="ios-plus-empty" size="small" type="primary" style={{width: '52px'}}></i-button>
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
          <span class={{active: this.curCategoryId === data.value}}>{data.label}</span>
          <span class={{ 'operate-btns': true }}>
            <i-button class={{ 'operate-btn': true }} icon="ios-plus-empty" type="ghost" size="small" onClick={() => { this.append(event, data) }}></i-button>
            <i-button class={{ 'operate-btn': true }} icon="ios-minus-empty" type="ghost" size="small" onClick={() => { this.remove(root, node, data) } }></i-button>
          </span>
        </span>
      )
    },
    check (root, node, data) {
      this.getCategory(data.value)
    },
    append (event, data) {
      console.log(data)
      event.stopPropagation()
      this.addCategory({id: data.id, name: data.title})
    },
    remove (root, node, data) {
      // const parentKey = root.find(el => el === node).parent
      // const parent = root.find(el => el.nodeKey === parentKey).node
      // const index = parent.children.indexOf(data)
      // parent.children.splice(index, 1)
    },
    saveCategory () {
      // let dataSave = {}
      // console.log('parentId')
      // if (this.stagingDate.title === '') {
      //   let children = this.stagingDate.children
      //   children.push({
      //     title: this.curCategory.name,
      //     expand: true
      //   })
      //   this.$set(this.stagingDate.parent, 'children', children)
      //   dataSave = {
      //     parentId: this.stagingDate.parentId,
      //     name: this.curCategory.name,
      //     level: this.curCategory.level
      //   }
      // } else {
      //   this.$set(this.stagingDate.parent, 'title', this.curCategory.name)
      //   dataSave = {
      //     id: this.stagingDate.id,
      //     parentId: this.stagingDate.parent.parentId,
      //     name: this.curCategory.name,
      //     level: this.curCategory.level
      //   }
      // }
      // this.$axios.post(`${this.url}/save`, dataSave).then(data => {
      //   // this.data[0].children = data
      // })
    },
    showPropTable (isSku) {
      this.setIsSku(isSku)
      this.setShowPropTable(true)
      this.fetchProp()
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
