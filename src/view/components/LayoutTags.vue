<template>
<div>
  <Tag v-for="item in list" :key="item" :name="item" closable @on-close="handleClose2">{{ item}}</Tag>
  <Input v-model="tagName" v-show="isShowInput" placeholder="标签名" @keyup.enter.native="addTag"/>
  <Button v-show="!isShowInput" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
</div>
</template>
<script>
export default {
  data () {
    return {
      isShowInput: false,
      tagName: ''
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleAdd (event) {
      console.log('点击', this.isShowInput)
      this.isShowInput = true
    },
    handleClose2 (event, name) {
      const index = this.list.indexOf(name)
      this.list.splice(index, 1)
    },
    addTag () {
      this.isShowInput = false
      this.list.push(this.tagName)
    }
  }
}
</script>
