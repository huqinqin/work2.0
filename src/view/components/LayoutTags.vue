<template>
<div>
  <Tag v-for="item in list" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
  <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
</div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleAdd () {
      if (this.list.length) {
        this.list.push(this.list[this.list.length - 1] + 1)
      } else {
        this.list.push(0)
      }
    },
    handleClose2 (event, name) {
      const index = this.list.indexOf(name)
      this.list.splice(index, 1)
    }
  }
}
</script>
