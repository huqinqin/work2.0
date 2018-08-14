<template>
  <div>
    <card style="margin-bottom: 16px;">
      <p slot="title">
        优惠券信息
      </p>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">名称</td>
          <td></td>
          <td class="speTd">优惠券类型</td>
          <td></td>
        </tr>
        <tr>
          <td class="speTd">可使用商品</td>
          <td></td>
          <td class="speTd">使用门槛</td>
          <td></td>
        </tr>
        <tr>
          <td class="speTd">优惠</td>
          <td></td>
          <td class="speTd">状态</td>
          <td></td>
        </tr>
        <tr>
          <td class="speTd">有效期</td>
          <td></td>
          <td class="speTd">备注</td>
          <td></td>
        </tr>
        <tr>
          <td class="speTd">已使用</td>
          <td></td>
          <td class="speTd">未使用</td>
          <td></td>
        </tr>
      </table>
    </card>
    <card>
      <p slot="title">
        优惠券使用详情
      </p>
      <i-form>
        <form-item><i-input placeholder="订单编号"></i-input></form-item>
        <form-item><i-button type="primary">搜索</i-button></form-item>
      </i-form>
      <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
      <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
        <div style="float:right;">
          <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  name: 'CouponDetail',
  mixins: [mixin],
  data () {
    return {
      columns: [{
        title: '工程商',
        key: 'installer'
      }, {
        title: '获取时间'
      }, {
        title: '当前状态'
      }, {
        title: '使用时间'
      }, {
        title: '订单编号'
      }]
    }
  }
}
</script>
<style lang="css" scoped>
</style>
