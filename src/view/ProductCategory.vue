<template>
  <div class="details">
    <Row :gutter="16">
      <i-col span="12">
        <Card>
          <p slot="title">类目结构</p>
          <Tree :data="data" :render="renderContent"></Tree>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">类目预览</p>
          <Form :model="curCategory" :label-width="80">
            <FormItem label="上级类目">
              <Input v-model="curCategory.parent" placeholder="上级类目" readonly="readonly" />
            </FormItem>
            <FormItem label="类目名称">
              <Input v-model="curCategory.name" placeholder="输入类目名称"/>
            </FormItem>
            <FormItem label="类目排序">
              <Input  v-model="curCategory.level" placeholder="输入1~99"/>
            </FormItem>
            <FormItem label="">
              <Upload
                multiple
                type="drag"
                :before-upload="beforeLoad"
                :on-success="loadSuccess"
                :data="Object.assign(formUp, formData)"
                action="//chen0711.oss-cn-hangzhou.aliyuncs.com">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
              </Upload>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="saveCategory">保存</Button>
              <Button type="primary" @click="$store.dispatch('getProps', true)">SKU属性</Button>
              <Button type="primary" @click="$store.dispatch('getProps', false)">非SKU属性</Button>
              <Button type="error">删除</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
      <i-col :span="24">
        <ProductAttribute></ProductAttribute>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'ProductCategory',
  components: {
    ProductAttribute: () => import('./ProductAttribute.vue')
  },
  data () {
    return {
      formUp: {
        policy: '',
        OSSAccessKeyId: '',
        signature: '',
        preKey: '',
        dir: '',
        host: '',
        success_action_status: 200
      },
      formData: {
        name: '',
        key: '',
        Filename: ''
      },
      url: 'product/category',
      curCategory: {
        name: '',
        parent: '',
        level: ''
      },
      activeItem: '',
      stagingDate: {
        parent: '',
        children: '',
        title: '',
        id: ''
      },
      showAttrId: null,
      isSKU: true,
      isShowlist: false,
      data: [
        {
          id: '1',
          title: '商品目录 1',
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px'
                }
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  }),
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => { this.append(event, data) }
                  }
                })
              ])
            ])
          },
          children: []
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      },
      img: ''
    }
  },
  created () {
    this.getPolicy()
  },
  methods: {
    getPolicy () {
      this.$http.getPolicy().then(data => {
        this.formUp.policy = data.policy
        this.formUp.OSSAccessKeyId = data.accessid
        this.formUp.signature = data.signature
        this.formUp.preKey = data.dir
        this.formUp.dir = data.dir
        this.formUp.host = data.host
      })
    },
    beforeLoad (file) {
      this.formData.name = file.name
      this.formData.key = this.form.preKey + '/' + file.name
      this.formData.Filename = file.name
    },
    loadSuccess (response, file) {
      this.img = this.formData.host + '/' + this.formData.dir + '/' + file.name
      console.log(this.img)
      console.log(file)
    },
    renderContent (h, { root, node, data }) {
      return (
        <span class={{'tree-item': true}} onClick={() => { this.check(root, node, data) }}>
          <span class={{active: this.activeItem === data.id}}>{data.title}</span>
          <span class={{ 'operate-btns': true }}>
            <i-button class={{ 'operate-btn': true }} icon="ios-plus-empty" type="ghost" size="small" onClick={() => { this.append(event, data) }}></i-button>
            <i-button class={{ 'operate-btn': true }} icon="ios-minus-empty" type="ghost" size="small" onClick={() => { this.remove(root, node, data) } }></i-button>
          </span>
        </span>
      )
    },
    check (root, node, data) {
      this.activeItem = data.id
      console.log('check', data)
      let parentTil = ''
      for (let index = 0; index < root.length; index++) {
        const element = root[index].nodeKey
        const parent = root[index].parent
        console.log('root item', element)
        if (element === data.nodeKey) {
          for (let k = 0; k < root.length; k++) {
            const parentnode = root[k].nodeKey
            if (parent === parentnode) {
              parentTil = root[k].node.title
            }
          }
        }
      }
      this.curCategory.parent = parentTil
      this.curCategory.name = data.title
      this.curCategory.level = data.level
      this.stagingDate.parent = data
      this.stagingDate.title = data.title
      this.stagingDate.id = data.id
      this.$store.commit('setCurCateId', data.id)
    },
    append (event, data) {
      console.log('添加', data)
      event.cancelBubble = true
      event.stopPropagation()
      const children = data.children || []
      this.curCategory.parent = data.title
      this.curCategory.name = data.title + '的子类目'
      this.stagingDate.parent = data
      this.stagingDate.parentId = data.nodeKey
      this.stagingDate.children = children
      this.stagingDate.title = ''
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    saveCategory () {
      let dataSave = {}
      console.log('parentId')
      if (this.stagingDate.title === '') {
        let children = this.stagingDate.children
        children.push({
          title: this.curCategory.name,
          expand: true
        })
        this.$set(this.stagingDate.parent, 'children', children)
        dataSave = {
          parentId: this.stagingDate.parentId,
          name: this.curCategory.name,
          level: this.curCategory.level
        }
      } else {
        this.$set(this.stagingDate.parent, 'title', this.curCategory.name)
        dataSave = {
          id: this.stagingDate.id,
          parentId: this.stagingDate.parent.parentId,
          name: this.curCategory.name,
          level: this.curCategory.level
        }
      }
      this.$axios.post(`${this.url}/save`, dataSave).then(data => {
        // this.data[0].children = data
      })
    },
    LoadCurCategory () {
      this.$http.fetchCategories().then(data => {
        this.data[0].children = data
      })
    }
  },
  beforeMount () {
    this.LoadCurCategory()
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
