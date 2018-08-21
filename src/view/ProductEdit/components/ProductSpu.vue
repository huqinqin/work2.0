<template>
  <div class="content">
    <PropItem v-for="(item, index) in spuProps" :data="item" :key="item.id" mode="single" :single="item.checked" @change="selSpuProps(index, $event)">
      <Checkbox style="marginLeft: 8px;" v-model="item.canSearch" @on-change="checkSpu">可搜索</Checkbox>
      <Checkbox v-model="item.canSee" @on-change="checkSpu">可视</Checkbox>
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
    spu: Array,
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
            console.log(data)
            this.spuProps = data.map(t => Object.assign({}, t, {checked: '', canSearch: false, canSee: false}))
            this.spu.forEach(v => {
              this.spuProps.forEach(t => {
                if (v.catePropId === t.id) {
                  t.checked = v.value
                  t.canSearch = v.canSearch
                  t.canSee = v.canSee
                }
              })
            })
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    selSpuProps (index, value) {
      this.spuProps[index].checked = value
      this.checkSpu()
    },
    checkSpu () {
      let spu = []
      this.spuProps.forEach(t => {
        if (t.checked) {
          spu.push({
            catePropId: t.id,
            value: t.checked,
            canSearch: t.canSearch,
            canSee: t.canSee
          })
        }
      })
      this.$emit('getSpu', spu)
    }
  }
}
</script>
<style lang="css" scoped>
</style>
