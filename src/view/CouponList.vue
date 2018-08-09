<template>
  <card>
    <i-form :model="filter" inline>
      <form-item>
        <i-input v-model="filter.name" type="text" placeholder="优惠券名称" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="primary">新增优惠券</i-button>
        <i-button type="primary">批量赠券</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  name: 'CouponList',
  mixins: [mixin],
  data () {
    return {
      url: 'Coupon',
      filter: {
        name: '',
        couponType: 'common',
        status: ''
      },
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '编号',
        key: 'id'
      }, {
        title: '优惠券名称',
        key: 'name'
      }, {
        title: '优惠券类型',
        key: 'couponType'
      }, {
        title: '可使用商品',
        key: 'includeType'
      }, {
        title: '使用门槛',
        key: 'standard'
      }, {
        title: '优惠',
        key: 'amount'
      }, {
        title: '有效期',
        render (h, params) {
          return (
            <span>null</span>
          )
        }
      }, {
        title: '状态',
        key: status
      }, {
        title: '操作',
        render (h, params) {
          return (
            <div>
              <i-button type="primary" size="small">查看</i-button>
              <i-button type="success" size="small">赠券</i-button>
              <i-button type="error" size="small">删除</i-button>
            </div>
          )
        }
      }]
    }
  }
}
</script>
<style lang="css" scoped>
</style>
