<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <Row>
        <form-item prop="" label="Cust ID">
          <i-input v-model="filter.Customer" type="text" placeholder="Customer ID" ></i-input>
        </form-item>
        <form-item prop="" label="公司名">
          <i-input v-model="filter.sName" type="text" placeholder="公司名" ></i-input>
        </form-item>
        <form-item prop="id" label="订单号">
          <i-input v-model="filter.id" type="text" placeholder="输入订单编号" ></i-input>
        </form-item>
        <form-item label=" ">
          <i-button type="primary" @click="query">查询</i-button>
        </form-item>
        <form-item label=" ">
          <i-button type="primary">展开</i-button>
        </form-item>
      </Row>
      <Row>
        <form-item prop="status" label="订单状态">
          <Select v-model="filter.status" type="text" placeholder="选择状态" >
            <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form-item>
        <form-item prop="" label="邮编">
          <i-input v-model="filter.zipcode" type="text" placeholder="zipcode"></i-input>
        </form-item>
        <form-item prop="" label="邮箱">
          <i-input v-model="filter.email" type="text" placeholder="email" ></i-input>
        </form-item>
        <form-item prop="" label="收货人">
          <i-input v-model="filter.attention" type="text" placeholder="attention" ></i-input>
        </form-item>
      </Row>
      <Row>
        <form-item prop="source" label="订单来源">
          <Select v-model="filter.source" type="text" placeholder="选择来源" >
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form-item>
        <form-item prop="shop" label="所属门店">
          <Select v-model="filter.shop" type="text" placeholder="选择门店" >
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form-item>
        <form-item prop="" label="时间">
          <DatePicker v-model="filter.date" type="daterange" :options="dateOptions" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </form-item>
      </Row>
    </i-form>
    <Modal v-model="noteModal" draggable scrollable title="修改备注" @on-cancel="cancelNote" @on-ok="submitNote" class="note-modal">
      <p>订单号: {{activeRow.id}}</p>
      <p>公司名称: {{activeRow.sName}}</p>
      <p>备注:</p>
      <Input v-model="note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
    </Modal>
    <Modal v-model="changeFeeModal" draggable scrollable title="修改订单金额" @on-ok="submitChangeFee" class="change-fee-modal">
      <p>
        <label>订单号:</label>
        {{activeRow.id}}
      </p>
      <p>
        <label>公司名称:</label>
        {{activeRow.sName}}
      </p>
      <p>
        <label>应付金额:</label>
        <span>{{activeRow.itemFee}}</span>
      </p>
      <p>
        <label>税率:</label>
        <Input v-model="rate" />
      </p>
      <p>
        <label>税费:</label>
        <span>{{tax}}</span>
      </p>
      <p>
        <label>运费:</label>
        <span>{{activeRow.shippingFee}}</span>
      </p>
      <p>
        <label>优惠:</label>
        <span>{{activeRow.discountFee}}</span>
      </p>
      <p>
        <label>手动:</label>
        <Input v-model="handling" />
      </p>
      <p>
        <label>实付金额:</label>
        <span>{{totalFee}}</span>
      </p>
    </Modal>
    <Modal v-model="confirmPayModal" draggable scrollable title="确认支付" @on-ok="confirmPay" class="confirm-pay-modal">
      <p>订单号: {{activeRow.id}}</p>
      <p>公司名称: {{activeRow.sName}}</p>
      <p class="confirm-text">请确认该笔订单的金额 <span>{{activeRow.payAmount}}</span> 已经支付</p>
    </Modal>
    <Modal v-model="confirmCancelModal" draggable scrollable title="确认支付" @on-ok="cancelOrder" class="confirm-pay-modal">
      <p>订单号: {{activeRow.id}}</p>
      <p>公司名称: {{activeRow.sName}}</p>
      <p class="confirm-text">确认取消该笔订单?</p>
    </Modal>
    <i-table :columns="columns" :data="list" size="small" ref="table" @on-selection-change="changeSelection"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>

<script>
import mixin from '@/mixins/list'
import expandRow from './OrderListExpand.vue'

export default {
  mixins: [mixin],
  components: {expandRow},
  data () {
    return {
      url: 'Order',
      filter: {
        buyerStoreId: '', status: '', id: '', source: '', date: ''
      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      orderStatus: [
        {
          value: 'unpaid',
          label: 'unpaid'
        }, {
          value: 'paid',
          label: 'paid'
        }, {
          value: 'accept',
          label: 'accept'
        }, {
          value: 'ship',
          label: 'ship'
        }, {
          value: 'finish',
          label: 'finish'
        }, {
          value: 'close',
          label: 'close'
        }, {
          value: 'delete',
          label: 'delete'
        }
      ],
      dateOptions: {
        shortcuts: [
          {
            text: 'today',
            value () {
              const end = new Date()
              const start = new Date()
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              start.setMilliseconds(0)
              return [start, end]
            }
          },
          {
            text: '1 week',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '1 month',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '3 months',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 91)
              return [start, end]
            }
          }
        ]
      },
      note: '',
      activeRow: {},
      rate: '',
      handling: '',
      noteModal: false,
      changeFeeModal: false,
      confirmPayModal: false,
      confirmCancelModal: false,
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                itemList: params.row.itemList
              }
            })
          }
        }, {
          title: '订单编号',
          key: 'id'
        }, {
          title: '公司名称',
          key: 'sName'
        }, {
          title: 'customer ID',
          key: 'sCode'
        }, {
          title: '收货信息',
          minWidth: 280,
          render: (h, params) => {
            // <p class="multi-ellipsis-2">{params.row.address.detail}</p>
            return (
              <div>
                <p>{params.row.address.receiver} - {params.row.address.telnum}</p>
                <tooltip content={params.row.address.detail}><p class="multi-ellipsis-2">{params.row.address.detail}</p></tooltip>
              </div>
            )
          }
        }, {
          title: '金额',
          render: (h, params) => {
            return (
              <span>{params.row.payAmount}</span>
            )
          }
        }, {
          title: '订单状态',
          render: (h, params) => {
            let payStatus = null
            switch (params.row.pStatus) {
              case 'unpaid':
                payStatus = <div>
                  <p style="color: #FF2572">Pendding</p>
                  <p style="color: #FF2572">Payment</p>
                </div>
                break
              case 'paid':
                payStatus = <div>
                  <p style="color: #2594FF">Paid</p>
                </div>
                break
              case 'ship':
                payStatus = <div>
                  <p style="color: #255DFF">Shipped</p>
                </div>
                break
              case 'accept':
                payStatus = <div>
                  <p style="color: #F39925">Order</p>
                  <p style="color: #F39925">Receiving</p>
                </div>
                break
              case 'finish':
                payStatus = <div>
                  <p style="color: #22E339">Finish</p>
                </div>
                break
              case 'close':
                payStatus = <div>
                  <p style="color: #23E6DF">Close</p>
                </div>
                break
            }
            return (
              <div>{payStatus}</div>
            )
          }
        }, {
          title: '销售/门店',
          key: '',
          render: (h, params) => {
            return (
              <div>
                <p>{params.row.salesName}</p>
                <p>{params.row.buyerStoreId}</p>
              </div>
            )
          }
        }, {
          title: '时间',
          key: 'cdate'
        }, {
          title: '来源',
          key: 'source'
        }, {
          title: '操作',
          key: 'action',
          width: 320,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showNote(params.row)
                  }
                }
              }, '备注'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({path: `order_detail/${params.row.id}`})
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.pStatus === 'unpaid' ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showChangeFee(params.row)
                  }
                }
              }, '修改金额'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.pStatus === 'unpaid' ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showConfirmPay(params.row)
                  }
                }
              }, '支付'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.pStatus !== 'finish' ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showCancelOrder(params.row)
                  }
                }
              }, '取消订单')
            ])
          }
        }
      ]
    }
  },
  computed: {
    tax () {
      let total = (+this.activeRow.itemFee) + (+this.activeRow.shippingFee) + (+this.handling) + (+this.activeRow.discountFee)
      return (+this.rate * total).toFixed()
    },
    totalFee () {
      if (this.handling === '-') {
        return (+this.activeRow.itemFee) + (+this.activeRow.shippingFee) + (+this.activeRow.discountFee) + (+this.tax)
      } else {
        return (+this.activeRow.itemFee) + (+this.activeRow.shippingFee) + (+this.activeRow.discountFee) + (+this.handling) + (+this.tax)
      }
    }
  },
  methods: {
    showNote (row) {
      this.activeRow = row
      this.noteModal = true
    },
    showChangeFee (row) {
      this.activeRow = row
      this.changeFeeModal = true
      this.rate = row.taxFeeInfo.value.rate
    },
    showConfirmPay (row) {
      this.activeRow = row
      this.confirmPayModal = true
    },
    showCancelOrder (row) {
      this.activeRow = row
      this.confirmCancelModal = true
    },
    cancelNote () {
      this.note = ''
    },
    submitNote () {
      if (this.note === '') {
        this.$Modal.error({
          content: '请输入备注',
          onOk: () => {
            this.noteModal = true
          }
        })
      } else {
        this.$Notice.success({
          title: '提交成功'
        })
        this.note = ''
        console.log('submitNote', this.activeRow.id)
      }
    },
    submitChangeFee () {
      if (((+this.rate) !== (+this.activeRow.taxFeeInfo.rate) || (this.handling && (this.handling !== '-')))) {
        this.$http.changeOrderPrice({
          id: this.activeRow.id,
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
    },
    confirmPay () {
      console.log('confirmPay', this.activeRow.id)
    },
    cancelOrder () {
      console.log('cancelOrder', this.activeRow.id)
    }
  },
  beforeMount () {
    for (let key in this.filter) {
      if (!this.filter[key]) {
        delete this.filter[key]
      }
    }
    this.filter.status = 'unpaid'
    this.query()
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ivu-table-expanded-cell{
    padding: 0;
  }
  /deep/ .ivu-select{
    width: 162px;
  }
  /deep/ .ivu-table-small td {
    padding: 6px 0;
    vertical-align: top;
  }
</style>
