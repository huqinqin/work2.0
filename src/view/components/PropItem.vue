<template>
  <Card :bordered="false">
    <p slot="title">{{data.name}}</p>
    <span slot="extra"><slot></slot></span>
    <div v-for="(value, index) in data.values" :key="value.id" class="tag border" :class="isChecked(value.id)" @click="select(value)">
      <span>{{value.name}}</span>
      <Icon type="ios-close-empty" @click.stop="delValue(value, index)"></Icon>
    </div>
    <input type="text" class="btn-add" placeholder="添加" v-model="newValue" @keydown.enter="addValue"/>
  </Card>
</template>
<script>
export default {
  name: 'LayoutPropItem',
  props: {
    data: {
      type: Object,
      default () {
        return {
          id: '',
          name: '',
          values: []
        }
      }
    },
    mode: {
      type: String,
      default: 'none'
    },
    single: [String, Number],
    multiple: Array
  },
  data () {
    return {
      newValue: ''
    }
  },
  methods: {
    delValue (data, index) {
      console.log('​delValue -> data', data)
      this.$Modal.confirm({
        title: '删除操作',
        content: `<p>确认删除属性值${data.name}？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http.delPropValue(this.data.id, data.id).then(data => {
            this.data.values.splice(index, 1)
            this.$Modal.remove()
            this.$Notice.success({title: '删除成功'})
          })
        }
      })
    },
    addValue () {
      if (this.newValue !== '') {
        this.$http.addPropValue(this.data.id, this.newValue).then(data => {
          this.$Notice.success({title: '新增成功'})
          this.data.values.push(data)
          this.newValue = ''
        })
      }
    },
    isChecked (id) {
      if (this.mode === 'multiple') {
        return this.multiple.indexOf(id) > -1 ? 'checked' : ''
      } else {
        return this.single === id ? 'checked' : ''
      }
    },
    select (data) {
      if (this.mode === 'multiple') {
        const list = this.multiple.filter(item => item !== data.id)
        if (list.length < this.multiple.length) {
          this.$emit('change', list)
        } else {
          this.$emit('change', [...this.multiple, data.id])
        }
      } else if (this.mode === 'single') {
        this.$emit('change', data.id)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tag {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e9eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
  &.border{
    color: #1890ff;
    line-height: 20px;
    background: #e6f7ff;
    border-color: #91d5ff;
    /deep/ .ivu-icon {
      color: #1890ff;
    }
  }
  &.checked{
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    /deep/ .ivu-icon {
      color: #fff;
    }
  }
  /deep/ .ivu-icon-ios-close-empty{
    margin-left: 8px;
    transform: scale(1.42857143) rotate(0deg);
    color: #495060;
    font-size: 14px;
  }
}
</style>
