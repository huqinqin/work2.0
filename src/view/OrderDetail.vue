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
        <td v-if="form.pStatus" :style="{color: statusOption[form.pStatus].color}">{{statusOption[form.pStatus].text}}</td>
        <td v-else></td>
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
      <p>
        <label>应付金额:</label>
        <span>{{form.itemFee | formatPrice}}</span>
      </p>
      <p>
        <label>税率:</label>
        <span v-if="form.pStatus === 'unpaid' && 0"><Input v-model="rate" /></span>
        <span v-else>{{rate}}</span>
      </p>
      <p>
        <label>税费:</label>
        <span>{{tax | formatPrice}}</span>
      </p>
      <p>
        <label>运费:</label>
        <span>{{form.shippingFee | formatPrice}}</span>
      </p>
      <p>
        <label>优惠:</label>
        <span>{{form.discountFee | formatPrice}}</span>
      </p>
      <p>
        <label>手动:</label>
        <span v-if="form.pStatus === 'unpaid' && 0"><Input v-model="handling" /></span>
        <span v-else>{{handling | formatPrice}}</span>
      </p>
      <p>
        <label>实付金额:</label>
        <span>{{total | formatPrice}}</span>
      </p>
    </div>
    <hr>
    <i-form class="more-info" label-position="left">
      <form-item label="备注">
        <p v-for="key in form.note" :key="key">{{key}}: {{form.note[key]}}</p>
      </form-item>
      <form-item label="收货人信息" v-if="form.address">
        <p>{{form.address.receiver}} - {{form.address.telnum}}</p>
        <p>{{form.address.detail}} {{form.address.zip}}</p>
      </form-item>
    </i-form>
    <Button style="margin-right: 24px;" @click="$router.push({name: 'order_list'})">返回</Button>
    <Button v-if="form.pStatus === 'unpaid'" type="primary" @click="submit">确认</Button>
  </card>
</template>
<script>

import formatPrice from '../plugin/filter/formatPrice'
export default {
  data () {
    return {
      url: 'Order',
      handling: 0,
      rate: '',
      form: {
        shop: '',
        status: '',
        id: '',
        source: ''
      },
      statusOption: {
        unpaid: {
          color: '#FF2572',
          text: 'Pending Payment'
        },
        paid: {
          color: '#2594FF',
          text: 'Paid'
        },
        ship: {
          color: '#255DFF',
          text: 'Shipped'
        },
        accept: {
          color: '#F39925',
          text: 'Order Receiving'
        },
        finish: {
          color: '#22E339',
          text: 'Finish'
        },
        close: {
          color: '#23E6DF',
          text: 'Close'
        }
      },
      columns: [
        {
          title: '商品信息',
          key: '',
          width: 720,
          render: (h, params) => {
            return (
              <div class="item-info">
                <img height="26" width="26" src={params.row.imgUrls && params.row.imgUrls[0]} alt="商品主图" />
                <p title={params.row.title} class="item-title single-ellipsis">{params.row.title}</p>
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
                <del>{formatPrice.formatPrice(params.row.price)}</del>
                <p>{formatPrice.formatPrice(params.row.realPrice)}</p>
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
              <span>{formatPrice.formatPrice(params.row.amount)}</span>
            )
          }
        }
      ]
    }
  },
  computed: {
    tax () {
      let total = (+this.form.itemFee) + (+this.form.shippingFee) + (+this.handling) + (+this.form.discountFee)
      return (+this.rate * total).toFixed()
    },
    total () {
      return (+this.form.itemFee) + (+this.form.shippingFee) + (+this.form.discountFee) + (+this.handling) + (+this.tax)
    }
  },
  methods: {
    getDetail () {
      this.$http.getOrder({
        id: this.$route.params.id
      }).then(data => {
        this.rate = data.taxFeeInfo.value.rate
        this.handling = data.otherFee
        this.form = data
      })
    },
    submit () {
      if ((+this.rate) !== (+this.form.taxFeeInfo.rate)) {
        this.$http.changeOrderPrice({
          id: this.form.id,
          taxFee: +this.tax,
          otherFee: +this.handling,
          taxFeeInfo: {
            'rate': +this.rate,
            'sign': 'handle'
          }
        }).then(() => {
          this.$Notice.open({
            title: '修改成功'
          })
        })
      }
    }
  },
  beforeMount () {
    if (this.$route.params.id) this.getDetail()
  }
}
</script>
<style scoped lang="less">
  /deep/ .ivu-table{
    margin-top: 18px;
    margin-bottom: 18px;
  }
  /deep/ .item-info{
    display: flex;
    align-items: center;
    div{
      display: inline-block;
    }
    img{
      height: 26px;
      width: 26px;
      vertical-align: top;
      margin-right: 12px;
    }
  }
  .pay-info{
    text-align: right;
    label{
      display: inline-block;
      width:120px;
    }
    span{
      display: inline-block;
      width:98px;
      color: #FF3B41;
      /deep/ .ivu-input{
        width:98px;
      }
    }
  }
  /deep/ .more-info{
    label{
      width:98px;
    }
  }
  p{
    line-height: 2;
  }
</style>
