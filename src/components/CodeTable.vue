<template>
  <i-select v-model="option">
      <i-option v-for="item in options" :value="item.key" :key="item.key" :label="item.value"></i-option>
  </i-select>
</template>
<script>
export default {
  name: 'CodeTable',
  props: {
    value: String,
    type: String
  },
  data () {
    return {
      options: []
    }
  },
  computed: {
    option: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  beforeMount () {
    this.$axios
      .post('common/getCodeTable', {
        type: this.type,
        source: 'lts'
      })
      .then(list => {
        this.options = list
      })
  }
}
</script>
<style lang="css" scoped>
</style>
