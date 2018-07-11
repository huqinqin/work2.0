<template>
  <Select v-model="model1" style="width:200px">
      <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
export default {
  name: 'CodeTable',
  props: {
    type: String
  },
  data () {
    return {
      options: []
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
