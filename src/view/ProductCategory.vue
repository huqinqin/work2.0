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
            <FormItem>
              <Button type="primary" @click="saveCategory">保存</Button>
              <Button type="primary" @click="editProperties">编辑属性</Button>
              <Button type="primary" @click="editParameters">编辑参数</Button>
              <Button type="error">删除</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
      <i-col :span="24" v-show="isShowlist">
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
      curCategory: {
        name: '',
        parent: ''
      },
      activeItem: '',
      stagingDate: {
        parent: '',
        children: '',
        title: ''
      },
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
                    click: () => { this.append(data) }
                  }
                })
              ])
            ])
          },
          children: [
            {
              id: '1-1',
              title: '类目 1-1',
              expand: true,
              children: [
                {
                  id: '1-1-1',
                  title: '类目 1-1-1',
                  expand: true
                },
                {
                  id: '1-1-2',
                  title: '类目 1-1-2',
                  expand: true
                }
              ]
            },
            {
              id: '1-2',
              title: '类目 1-2',
              expand: true,
              children: [
                {
                  id: '1-2-1',
                  title: '类目 1-2-1',
                  expand: true
                },
                {
                  id: '1-2-2',
                  title: '类目 1-2-2',
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      }
    }
  },
  methods: {
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
      console.log(root, node, data)
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
      this.stagingDate.parent = data
      this.stagingDate.title = data.title
    },
    append (event, data) {
      console.log('添加', data)
      event.cancelBubble = true
      event.stopPropagation()
      const children = data.children || []
      this.curCategory.parent = data.title
      this.curCategory.name = data.title + '的子类目'
      this.stagingDate.parent = data
      this.stagingDate.children = children
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    saveCategory () {
      if (this.stagingDate.title === '') {
        let children = this.stagingDate.children
        children.push({
          title: this.curCategory.name,
          expand: true
        })
        this.$set(this.stagingDate.parent, 'children', children)
      } else {
        console.log('check', this.stagingDate.parent, this.stagingDate.title)
        this.$set(this.stagingDate.parent, 'title', this.curCategory.name)
      }
    },
    editProperties () {
      this.isShowlist = true
    },
    editParameters () {
      this.isShowlist = true
    }

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
