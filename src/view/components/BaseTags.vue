<template>
  <span>
    <Tag v-for="item in count" checkable color="blue" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
    <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAdd">
  </span>
</template>
<script>
export default {
  name: 'BaseTags',
  data () {
    return {
      count: [0, 1, 2]
    }
  },
  methods: {
    handleAdd () {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1)
      } else {
        this.count.push(0)
      }
    },
    handleClose2 (event, name) {
      const index = this.count.indexOf(name)
      this.count.splice(index, 1)
    }
  }
}
</script>
<style lang="css" scoped>
.btn-add{
  width: 80px;
  height: 24px;
  line-height: 24px;
  padding: 2px 7px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px dashed #dddee1;
}
.btn-add:focus{
  border: 1px dashed #57a3f3;
  outline: none;
}
</style>
