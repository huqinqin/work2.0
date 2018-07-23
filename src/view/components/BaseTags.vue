<template>
  <span>
    <Tag v-for="(item, index) in count"  fade color="blue" :key="item" :name="item" closable @on-close="handleClose(index)">{{ item  }}</Tag>
    <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAdd" v-model="tag">
  </span>
</template>
<script>
export default {
  name: 'BaseTags',
  props: ['value'],
  data () {
    return {
      tag: ''
    }
  },
  computed: {
    count () {
      return this.value
    }
  },
  methods: {
    handleAdd () {
      this.count.push(this.tag)
      this.tag = ''
    },
    handleClose (index) {
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
