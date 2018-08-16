<template>
  <Cascader :data="data" :value="checked" change-on-select @on-change="onInput"></Cascader>
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
  computed: {
    checked () {
      const id = this.value
      const data = this.data
      const list = []
      const fn = (list, data) => {
        for (const item of data) {
          if (item.id.toString() === id.toString()) {
            list.push(item.id)
            return list
          }
          list.push(item.id)
          if (item.children) return fn(list, item.children)
        }
      }
      return fn(list, data)
    }
  },
  methods: {
    onInput (list) {
      this.$emit('input', list[list.length - 1])
    }
  },
  mounted () {
    this.$http.fetchCategory().then(data => {
      data.forEach(t1 => {
        if (!t1.children) {
          delete t1.children
        } else {
          t1.children.forEach(t2 => {
            if (!t2.children) {
              delete t2.children
            } else {
              t2.children.forEach(t3 => {
                if (!t3.children) {
                  delete t3.children
                }
              })
            }
          })
        }
      })
      this.data = data
    })
  }
}
</script>
<style lang="css" scoped>
</style>
