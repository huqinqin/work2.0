<template>
  <div class="layout-column">
    <div class="layout-cell flex-item">
      <i-form label-position="top">
        <div class="layout-column">
          <div class="layout-cell">
            <form-item label="编码">
              <i-input v-model="sku.sin" @on-change="checkSku"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="排序">
              <i-input v-model="sku.onum" @on-change="checkSku"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="重量">
              <i-input v-model="sku.weight" @on-change="checkSku"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="成本价">
              <i-input v-model="sku.price.basePrice" @on-change="checkSku"></i-input>
            </form-item>
          </div>
        </div>
      </i-form>
    </div>
    <div class="layout-cell flex-item">
      <p v-if="!skuProps.length">此类目下没有sku属性，或者你没有选择类目</p>
      <PropItem
        v-for="(item, index) in skuProps"
        :data="item"
        :key="item.id"
        mode="single"
        :single="item.checked"
        @change="selSkuProps(index, $event)">
      </PropItem>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
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
          weight: '',
          sin: '',
          onum: 99,
          skuProps: [],
          price: {
            basePrice: '',
            status: 'enabled'
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
            this.sku.skuProps.forEach(v => {
              this.skuProps.forEach(t => {
                if (v.catePropId === t.id) {
                  t.checked = v.value
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
    selSkuProps (index, value) {
      this.skuProps[index].checked = value
      this.checkSku()
    },
    checkSku: debounce(function () {
      let sku = Object.assign({}, this.sku, {
        skuProps: this.skuProps.map(t => {
          if (t.checked) {
            return {
              catePropId: t.id,
              value: t.checked
              // status: ''
            }
          }
        }).filter(v => v)
      })
      this.$emit('getSku', sku)
    }, 400)
  }
}
</script>
<style lang="css" scoped>
</style>
