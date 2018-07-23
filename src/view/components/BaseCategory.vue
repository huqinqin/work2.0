<template>
  <Cascader :data="data" :value="checked" change-on-select @input="onInput" @on-change="onChange"></Cascader>
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
      let checked = []
      this.data.forEach(t1 => {
        if (t1.value === this.value) {
          checked = [t1.value]
          return true
        } else if (t1.children) {
          t1.children.forEach(t2 => {
            if (t2.value === this.value) {
              checked = [t1.value, t2.value]
              return true
            } else if (t2.children) {
              t2.children.forEach(t3 => {
                if (t3.value === this.value) {
                  checked = [t1.value, t2.value, t3.value]
                  return true
                }
              })
            }
          })
        }
      })
      return checked
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
    this.$http.fetchCategories().then(data => {
      this.data = data
    })
  }
}
</script>
<style lang="css" scoped>
</style>
