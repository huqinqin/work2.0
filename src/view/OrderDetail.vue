<template>
  <card>
    <p slot="title">订单信息</p>
    <table border="1" class="baseDataTable">
      <tr>
        <td class="speTd">订单编号</td>
        <td>{{form.id}}</td>
        <td class="speTd">订单来源</td>
        <td>{{form.source}}</td>
      </tr>
      <tr>
        <td class="speTd">所属门店</td>
        <td>{{form.buyerStoreId}}</td>
        <td class="speTd">公司名称</td>
        <td>{{form.sName}}</td>
      </tr>
      <tr>
        <td class="speTd">状态</td>
        <td>{{form.pStatus}}</td>
        <td class="speTd">创建时间</td>
        <td>{{form.cdate}}</td>
      </tr>
      <tr>
        <td class="speTd">销售</td>
        <td>{{form.salesName}}</td>
        <td class="speTd">支付时间</td>
        <td>{{form.pTime}}</td>
      </tr>
    </table>
    <i-table :columns="columns" :data="form.itemList" size="small" ref="table"></i-table>
    <div class="pay-info">
      <p>应付金额: <span>{{form.itemFee}}</span></p>
      <p>税费: <span>{{form.taxFee}}</span></p>
      <p>运费: <span>{{form.shippingFee}}</span></p>
      <p>优惠: <span>{{form.discountFee}}</span></p>
      <p>实付金额: <span>{{form.payAmount}}</span></p>
    </div>
    <hr>
    <i-form class="more-info" label-position="left">
      <form-item label="备注">{{form.note}}</form-item>
      <form-item label="收货人信息">
        <p>{{form.address.receiver}} {{form.address.telnum}}</p>
        <p>{{form.address.detail}} {{form.address.zip}}</p>
      </form-item>
    </i-form>
  </card>
</template>
<script>
export default {
  data () {
    return {
      url: '订单列表',
      form: {
        shop: '',
        status: '',
        id: '',
        source: ''
      },
      columns: [
        {
          title: '商品信息',
          key: '',
          width: 720,
          render: (h, params) => {
            return (
              <div style="display: flex;">
                <div><img style="height:48px;width:48px;vertical-align: top;" src={params.row.imgUrls[0]} alt="商品主图" height="100"/></div>
                <div style="line-height: 2;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{params.row.title}</div>
              </div>
            )
          }
        }, {
          title: 'sin',
          align: 'center',
          key: 'sin'
        }, {
          title: '数量',
          align: 'center',
          key: 'num',
          render: (h, params) => {
            return (
              <span>{params.row.num}{params.row.unit}</span>
            )
          }
        }, {
          title: '单价',
          align: 'center',
          key: '',
          render: (h, params) => {
            return (
              <div>
                <del>${params.row.price}</del>
                <p>${params.row.realPrice}</p>
              </div>
            )
          }
        }, {
          title: '重量',
          align: 'center',
          key: 'weight'
        }, {
          title: '小计',
          key: '',
          align: 'center',
          render: (h, params) => {
            return (
              <span>${params.row.amount}</span>
            )
          }
        }
      ]
    }
  },
  methods: {
    getDetail () {
      this.$http.getOrder({
        id: this.$route.params.id
      }).then(data => {
        this.form = data
      })
    }
  },
  created () {
    if (this.$route.params.id) this.getDetail()
  }
}
</script>
<style scoped lang="less">
  /deep/ .ivu-table{
    margin-top: 18px;
    margin-bottom: 18px;
  }
  .pay-info{
    text-align: right;
    span{
      display: inline-block;
      width:128px;
      color:red;
    }
  }
  /deep/ .more-info{
    label{
      width:120px;
    }
  }
  p{
    line-height: 2;
  }
</style>
