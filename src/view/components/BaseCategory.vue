<template>
  <Cascader :data="data" :value="value" change-on-select @input="onInput" @on-change="onChange"></Cascader>
</template>
<script>
export default {
  name: 'BaseCategory',
  props: ['value'],
  data () {
    return {
      data: []
    }
  },
  methods: {
    onInput (list) {
      this.$emit('input', list[list.length - 1])
    },
    onChange (value, selectedData) {
      this.$emit('on-change', value, selectedData)
    }
  },
  beforeMount () {
    this.$axios.post('product/category/cascader').then(data => {
      this.data = data
    })
  }
}
</script>
<style lang="css" scoped>
</style>
