<template>
  <div class="layout-column">
    <div class="layout-cell flex-item">
      <i-form label-position="top">
        <div class="layout-column">
          <div class="layout-cell">
            <form-item label="编码">
              <i-input :value="sku.sin"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="排序">
              <i-input :value="sku.onum"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="重量">
              <i-input :value="sku.weight"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="成本价">
              <i-input :value="sku.price.basePrice"></i-input>
            </form-item>
          </div>
        </div>
      </i-form>
    </div>
    <div class="layout-cell flex-item">
      <PropItem v-for="(item, index) in skuProps" :data="item" :key="item.id" mode="single" :single="item.checked" @change="selSkuProps(index, $event)"></PropItem>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductSku',
  components: {
    PropItem: () => import('@/view/components/PropItem.vue')
  },
  props: {
    sku: {
      type: Object,
      default () {
        return {
          unit: 'pc',
          size: null,
          spec: 1,
          weight: 0,
          sin: '',
          onum: 99,
          skuProps: [],
          price: {
            basePrice: 0
          }
        }
      }
    },
    cateId: [String, Number]
  },
  data () {
    return {
      skuProps: []
    }
  },
  watch: {
    cateId: {
      handler (val) {
        if (val !== '') {
          this.$http.fetchProp({
            id: val,
            type: 'sku'
          }).then(data => {
            this.skuProps = data.map(t => Object.assign({}, t, {checked: ''}))
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    selSkuProps (index, value) {
      this.skuProps[index].checked = value
    },
    checkProps () {
      this.form.itemProps[0].skuProps = []
      this.skuProps.forEach(sku => {
        if (sku.checked) {
          let values = []
          sku.values.forEach(t => {
            if (sku.checked) values.push({id: t.id, name: t.name})
          })
          this.form.itemProps[0].skuProps.push({name: sku.name, id: sku.id, values: values})
        }
      })
      let skuArr = this.form.itemProps[0].skuProps.map(t => {
        return t.values.map(v => {
          return {valueId: v.id, value: v.name, name: t.name, nameId: t.id}
        })
      })
      if (skuArr.length === 0) {
        this.$Modal.info({
          title: 'Info',
          content: '<p>请先选择类目</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
          }
        })
      }
      this.form.skus = this.descartes(skuArr).map(t => {
        return {spec: 1, basePrice: '', unit: 'pc', size: null, weight: '', sin: '', props: t, onum: '', priceStatus: 'enabled'}
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
