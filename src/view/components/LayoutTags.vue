<template>
<div>
  <Tag v-for="item in list" :key="item.id" :name="item.name" closable @on-close="handleClose2">{{ item.name }}</Tag>
  <Input v-model="tagName" v-show="isShowInput" placeholder="标签名" @on-blur="TagOnblur" @keyup.enter.native="addTag"  />
  <Button v-show="!isShowInput" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
</div>
</template>
<script>
export default {
  data () {
    return {
      isShowInput: false,
      tagName: '',
      url: '/addtag'
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    id: {
      type: Number
    },
    type: {
      type: String
    },
    categoryId: {
      type: String
    }
  },
  methods: {
    handleAdd (event) {
      console.log('点击', this.isShowInput)
      this.isShowInput = true
    },
    handleClose2 (event, item) {
      console.log(item)
      // const index = this.list.indexOf(name)
      // this.list.splice(index, 1)
      this.$axios.post(`product/category/${this.$store.state.category.isSku ? 'sku' : 'props'}/values/delete`, {
        id: this.id,
        categoryId: this.$store.state.category.curCateId,
        catePropId: this.$store.state.category.curProp.id
      })
    },
    addTag () {
      this.isShowInput = false
      this.list.push(this.tagName)
      this.$axios.post(`product/category/${this.$store.state.category.isSku ? 'sku' : 'props'}/values/save`, {
        name: this.tagName,
        categoryId: this.$store.state.category.curCateId,
        catePropId: this.$store.state.category.curProp.id
      }).then(data => {
        // this.data[0].children = data
      })
    },
    TagOnblur () {
      console.log('失去焦点了')
      this.isShowInput = false
    }
  }
}
</script>
