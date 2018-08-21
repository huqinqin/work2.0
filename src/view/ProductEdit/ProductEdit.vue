<template>
  <i-form :model="form" label-position="top" :rules="rules" ref="form">
    <card style="marginBottom: 16px;">
      <p slot="title">基础信息</p>
      <div class="layout-column">
        <div class="layout-cell">
          <form-item label="商品品牌" prop="brandId">
            <i-select v-model="form.brandId" style="width: 100%">
              <i-option v-for="item in brand" :value="item.key" :key="item.key">{{item.value}}</i-option>
            </i-select>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="类目" prop="cateId" class="ivu-form-item-required">
            <BaseCategory v-model="form.cateId"></BaseCategory>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="商品类型" prop="kind">
            <i-select v-model="form.kind">
              <i-option v-for="item in kind" :key="item" :value="item">{{ item }}</i-option>
            </i-select>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="商品排序" prop="onum" class="ivu-form-item-required">
            <i-input v-model="form.onum" type="text" placeholder="商品排序"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="商品名称" prop="title">
            <i-input v-model="form.title" type="text" placeholder="商品名称"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="是否上架" prop="status">
            <i-switch v-model="form.status" true-value="onsale" false-value="enabled" />
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="商品关键词" prop="keyword">
            <Tag v-for="(item, index) in form.keyword" fade color="blue" :key="index" :name="item" closable
                  @on-close="handleCloseTag(index)">{{ item }}
            </Tag>
            <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAddTag" @blur="handleAddTag"
                    v-model="tag">
          </form-item>
        </div>
      </div>
    </card>
    <card style="marginBottom: 16px;">
      <p slot="title">SKU</p>
      <div class="layout-column">
        <ProductSku :cate-id="form.cateId" :sku="form.skus[0]" @getSku="getSku"></ProductSku>
      </div>
    </card>
    <card style="marginBottom: 16px;">
      <p slot="title">其他属性</p>
      <div class="layout-column">
        <div class="layout-cell flex-item">
          <ProductSpu :cate-id="form.cateId" @getSpu="getSpu" :spu="form.itemProps"></ProductSpu>
        </div>
      </div>
    </card>
    <card style="marginBottom: 16px;">
      <p slot="title">商品图片</p>
      <div class="layout-column">
        <div class="layout-cell flex-item">
          <form-item label="" prop="imgUrls" class="ivu-form-item-required">
            <BaseUploadProductImgs v-model="form.imgUrls"></BaseUploadProductImgs>
          </form-item>
        </div>
      </div>
    </card>
    <card style="marginBottom: 16px;">
      <p slot="title">商品详情</p>
      <div class="layout-column">
        <div class="layout-cell flex-item">
          <form-item label="" prop="detail">
            <ProductDetail v-model="form.detail"></ProductDetail>
          </form-item>
        </div>
      </div>
    </card>
    <div class="layout-column">
      <div class="layout-cell flex-item">
        <form-item>
          <i-button type="primary" @click="submit">Submit</i-button>
          <i-button type="ghost" style="margin-left: 8px">Cancel</i-button>
        </form-item>
      </div>
    </div>
  </i-form>
</template>
<script>
export default {
  components: {
    ProductSku: () => import('./components/ProductSku.vue'),
    ProductSpu: () => import('./components/ProductSpu.vue'),
    ProductAttribute: () => import('./components/ProductAttribute.vue'),
    BaseUploadProductImgs: () => import('@/view/components/BaseUploadProductImgs.vue'),
    BaseCategory: () => import('@/view/components/BaseCategory.vue'),
    PropItem: () => import('@/view/components/PropItem.vue'),
    BaseTags: () => import('@/view/components/BaseTags.vue'),
    ProductDetail: () => import('./components/ProductDetail.vue')
  },
  data () {
    const validateSku = (rule, value, callback) => {
      value.forEach(t => {
        if ((t.sin === '') || (t.onum === '') || (t.price === '') || (t.weight === '') || ((t.skuProps.length === 0))) {
          callback(new Error('Something is empty'))
          return false
        }
      })
      callback()
    }
    const validateArr = (rule, value, callback) => {
      if (value.length) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    const validateVal = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    const validateOnum = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    return {
      visible: false,
      tag: '',
      spu: '',
      content: '',
      brand: [],
      kind: ['kind'],
      skuProps: [],
      spuProps: [],
      form: {
        cateId: '',
        title: '',
        detail: '',
        brandId: '',
        kind: '',
        onum: '',
        status: 'onsale',
        keyword: [],
        imgUrls: [],
        itemProps: [],
        skus: [{
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
        }]
      },
      rules: {
        title: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur, change'
        }],
        kind: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        imgUrls: [{ validator: validateArr, trigger: '' }],
        onum: [{ validator: validateOnum, trigger: 'change' }],
        skus: [{ validator: validateSku, trigger: 'blur' }],
        itemProps: [{ validator: validateArr, trigger: 'change' }],
        cateId: [{ validator: validateVal, trigger: 'change' }],
        brandId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        detail: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        price: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 选择sku属性
    getSku (sku) {
      this.form.skus = [sku]
    },
    getSpu (spu) {
      this.form.itemProps = spu
    },
    // descartes (skuArr) {
    //   if (skuArr.length === 0) {
    //     return []
    //   } else if (skuArr.length === 1) {
    //     return skuArr[0].map(v => {
    //       return [v]
    //     })
    //   } else {
    //     return [].reduce.call(skuArr, (col, set) => {
    //       let res = []
    //       col.forEach(c => {
    //         set.forEach(s => {
    //           let t = [].concat(Array.isArray(c) ? c : [c])
    //           t.push(s)
    //           res.push(t)
    //         })
    //       })
    //       return res
    //     })
    //   }
    // },
    // 保存商品信息
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.saveProduct({
            ...this.form
          }).then(data => {
            this.$Modal.remove()
            this.$Notice.success({
              title: '保存成功',
              desc: ''
            })
            this.$router.push({name: 'product_list'})
          })
        }
      })
    },
    checkSpu () {
      this.form.itemProps[0].props = []
      this.spuProps.forEach(t => {
        if (t.valueId) {
          let value = ''
          t.values.forEach(v => {
            if (v.valueId === t.valueId) {
              value = v.value
            }
          })
          this.form.itemProps[0].props.push({
            name: t.name,
            nameId: t.nameId,
            valueId: t.valueId,
            value: value,
            canSee: t.canSee,
            canSearch: t.canSearch
          })
        }
      })
    },
    delProp (index) {
      this.spuProps[index].valueId = ''
      this.spuProps[index].canSee = false
      this.spuProps[index].canSearch = false
      this.checkSpu()
    },
    handleAddTag () {
      if (this.tag === '') return false
      this.form.keyword.push(this.tag)
      this.tag = ''
    },
    handleCloseTag (index) {
      this.form.keyword.splice(index, 1)
    },
    getBrand () {
      this.$http.fetchCodeTable({
        type: 'brand',
        source: 'lts'
      }).then(data => {
        this.brand = data
      })
    },
    getDetail () {
      this.$http.getProduct({
        id: this.$route.params.id
      }).then(data => {
        this.getBrand()
        this.form = data
      })
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.getDetail()
    } else {
      this.getBrand()
    }
  }
}
</script>
<style lang="less" scoped>
  .btn-add {
    width: 80px;
    height: 24px;
    line-height: 24px;
    padding: 2px 7px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px dashed #dddee1;
  }

  .btn-add:focus {
    border: 1px dashed #57a3f3;
    outline: none;
  }
</style>
