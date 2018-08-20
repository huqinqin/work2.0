<template>
  <div class="content">
    <PropItem v-for="(item, index) in spuProps" :data="item" :key="item.id" mode="single" :single="item.checked" @change="selSpuProps(index, $event)">
      <Checkbox style="marginLeft: 8px;" v-model="item.canSearch">可搜索</Checkbox>
      <Checkbox v-model="item.canSee">可视</Checkbox>
    </PropItem>
  </div>
</template>
<script>
export default {
  name: 'ProductSpu',
  components: {
    PropItem: () => import('@/view/components/PropItem.vue')
  },
  props: {
    spu: Object,
    cateId: [String, Number]
  },
  data () {
    return {
      spuProps: []
    }
  },
  watch: {
    cateId: {
      handler (val) {
        if (val !== '') {
          this.$http.fetchProp({
            id: val,
            type: 'spu'
          }).then(data => {
            this.spuProps = data.map(t => Object.assign({}, t, {checked: ''}))
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    selSpuProps (index, value) {
      this.spuProps[index].checked = value
    }
  }
}
</script>
<style lang="css" scoped>
</style>
