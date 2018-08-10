<template>
  <div>
    <card>
      <i-form :model="form" label-position="top">
        <div class="layout-column">
          <div class="layout-cell">
            <form-item label="优惠券类型" prop="couponType">
              <i-select v-model="form.couponRule.type">
                <i-option v-for="item in types" :value="item.value" :key="item.value">{{item.label}}</i-option>
              </i-select>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="优惠券名称" prop="name">
              <i-input v-model="form.couponRule.name"></i-input>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="优惠类型">
              <i-input>
                <i-select v-model="form.couponRule.amountType" style="width: 80px;" slot="prepend">
                  <i-option v-for="item in kinds" :value="item.value" :key="item.value">{{item.label}}</i-option>
                </i-select>
                <span slot="append">{{form.couponRule.amountType === 'off' ? '% off' : '元'}}</span>
              </i-input>
            </form-item>
          </div>
          <!-- <div class="layout-cell">
            <form-item label="类型" prop="amountType">
              <radio-group v-model="form.amountType">
                <radio v-for="item in kinds" :label="item.value" :key="item.value">{{item.label}}</radio>
              </radio-group>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="折扣" prop="amount" v-if="form.amountType === 'off'">
              <i-input v-model="form.amount">
                <span slot="append">% off</span>
              </i-input>
            </form-item>
            <form-item label="面额" prop="amount" v-if="form.amountType === 'reduce'">
              <i-input v-model="form.amount">
                <span slot="append">元</span>
              </i-input>
            </form-item>
          </div> -->
          <div class="layout-cell">
            <form-item label="使用门槛" prop="standard">
              <radio-group v-model="form.couponRule.standard">
                <radio :label="0">
                  无限制
                </radio>
                <radio :label="standard">
                  满<i-input style="width: 40px;" v-model="standard"></i-input>元可用
                </radio>
              </radio-group>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="有效期类型" prop="validType">
              <radio-group v-model="form.validType">
                <radio v-for="item in validTypes" :label="item.value" :key="item.value">{{item.label}}</radio>
              </radio-group>
            </form-item>
          </div>
          <div class="layout-cell">
            <form-item label="日期范围" prop="effectiveTime" v-if="form.validType === 'range'">
              <DatePicker type="daterange" :start-date="new Date()" placeholder="Select date" @on-change="setStartAndEndTime"></DatePicker>
            </form-item>
            <form-item label="固定天数" prop="effectiveTime" v-if="form.validType === 'day'">
              <i-input v-model="form.couponRule.effectiveTime">
                <span slot="append">天</span>
              </i-input>
            </form-item>
          </div>
        </div>
        <div class="layout-column">
          <div class="layout-cell flex-item">
            <form-item label="可使用商品">
              <radio-group v-model="form.offerCouponInclude.type">
                <radio v-for="item in includes" :key="item.key" :label="item.key">{{item.value}}</radio>
              </radio-group>
            </form-item>
          </div>
        </div>
        <div class="layout-column" v-if="includes.map(item => item.key).indexOf(form.offerCouponInclude.type) === 1">
          <div class="layout-cell flex-item">
            <i-button type="primary" style="margin-bottom: 16px;" @click="addProducts">选择商品</i-button>
            <i-table :columns="columns" :data="form.selProducts"></i-table>
          </div>
        </div>
        <div class="layout-column" v-if="includes.map(item => item.key).indexOf(form.offerCouponInclude.type) === 2">
          <div class="layout-cell flex-item">
            购买以下分类商品可使用优惠券抵扣金额  已选中{{cateIds.length}}个分类
            <Tree :data="$store.state.options.cates" show-checkbox :render="renderTree" @on-check-change="setSelCates"></Tree>
          </div>
        </div>
        <div class="layout-column" v-if="includes.map(item => item.key).indexOf(form.offerCouponInclude.type) === 3">
          <div class="layout-cell flex-item">
            <checkbox-group v-model="form.brandIds">
              <checkbox v-for="item in $store.state.options.brands" :label="item.key" :key="item.key">{{item.value}}</checkbox>
            </checkbox-group>
          </div>
        </div>
        <div class="layout-column">
          <div class="layout-cell flex-item">
            <form-item label="备注" prop="explain">
              <Input v-model="form.explain" type="textarea" :rows="4" placeholder="Enter something..." />
            </form-item>
          </div>
        </div>
        <div class="layout-column">
          <div class="layout-cell flex-item">
            <i-button type="primary" @click="sumbit">提交</i-button>
          </div>
        </div>
      </i-form>
    </card>
    <LayoutSelectProduct v-model="showSelProduct" @select="setSelProducts" :sel-ids="form.selProducts.map(item => item.id)"></LayoutSelectProduct>
  </div>
</template>
<script>
export default {
  name: 'CouponNew',
  data () {
    return {
      showSelProduct: false,
      standard: 10,
      form: {
        brandIds: [],
        selCates: [],
        selProducts: [],
        validType: 'range',
        explain: '',
        couponRule: {
          name: '',
          type: 'common',
          amountType: 'off',
          amount: 0,
          standard: 0,
          startTime: new Date(),
          endTime: new Date(),
          effectiveTime: 0
        },
        offerCouponInclude: {
          type: '',
          ids: []
        }
      },
      columns: [{
        title: '商品名称',
        key: 'title'
      }, {
        title: 'sku编码',
        render: (h, params) => {
          return (
            <span>{params.row.skus.join(',')}</span>
          )
        }
      }, {
        title: '操作',
        render: (h, params) => {
          return (
            <i-button type="error" size="small" onClick={() => this.delSelProducts(params.index)}>删除</i-button>
          )
        }
      }],
      includes: [{
        key: '', value: '全场通用'
      }, {
        key: 'item', value: '指定商品'
      }, {
        key: 'cate', value: '指定类目'
      }, {
        key: 'brand', value: '指定品牌'
      }],
      validTypes: [{
        value: 'range',
        label: '日期范围'
      }, {
        value: 'day',
        label: '固定天数'
      }],
      kinds: [{
        value: 'off',
        label: '折扣券'
      }, {
        value: 'reduce',
        label: '满减券'
      }],
      types: [{
        value: 'register',
        label: '注册券'
      }, {
        value: 'common',
        label: '普通券'
      }]
    }
  },
  computed: {
    cateIds () {
      return this.form.selCates.filter(item => !item.children).map(item => item.id)
    }
  },
  methods: {
    sumbit () {
      this.$http.saveCoupon(this.form).then(data => {
        this.$Notice.success({
          title: 'Save success',
          desc: ''
        })
      })
    },
    renderTree (h, {root, node, data}) {
      return (
        <span>{data.label}</span>
      )
    },
    setStartAndEndTime (daterange) {
      this.form.couponRule.startTime = daterange[0]
      this.form.couponRule.endTime = daterange[1]
    },
    addProducts () {
      this.showSelProduct = true
    },
    setSelProducts (list) {
      this.form.selProducts = this.form.selProducts.concat(list)
    },
    setSelCates (list) {
      this.form.selCates = list
    },
    delSelProducts (index) {
      this.form.selProducts.splice(index, 1)
    }
  }
}
</script>
<style lang="css" scoped>
</style>
