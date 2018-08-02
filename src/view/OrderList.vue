<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="shop">
        <Select v-model="filter.shop" type="text" placeholder="选择门店" >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="source">
        <Select v-model="filter.source" type="text" placeholder="选择来源" >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="status">
        <Select v-model="filter.status" type="text" placeholder="选择状态" >
          <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="输入订单编号" ></i-input>
      </form-item>
      <form-item prop="">
        <i-input v-model="filter.Customer" type="text" placeholder="Customer ID" ></i-input>
      </form-item>
      <form-item prop="">
        <i-input v-model="filter.date" type="text" placeholder="date" ></i-input>
      </form-item>
      <form-item prop="">
        <i-input v-model="filter.zipcode" type="text" placeholder="zipcode"></i-input>
      </form-item>
      <form-item prop="">
        <i-input v-model="filter.email" type="text" placeholder="email" ></i-input>
      </form-item>
      <form-item prop="">
        <i-input v-model="filter.attention" type="text" placeholder="attention" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
      </form-item>
    </i-form>
    <Modal v-model="noteModal" draggable scrollable title="Note" @on-cancel="cancelNote" @on-ok="submitNote">
      <Input v-model="note" />
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
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Order',
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
      filter: {
        buyerStoreId: '', status: '', id: '', source: ''
      },
      note: '',
      noteModal: false,
      columns: [
        {
          title: '订单编号',
          key: 'id'
        }, {
          title: '公司名称',
          align: 'center',
          key: 'sName'
        }, {
          title: 'customer ID',
          align: 'center',
          key: 'sCode'
        }, {
          title: '收货人信息',
          key: '',
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <p>{params.row.address.receiver} - {params.row.address.telnum}</p>
                <p>{params.row.address.detail}</p>
              </div>
            )
          }
        }, {
          title: '金额',
          align: 'center',
          key: '',
          render: (h, params) => {
            return (
              <span>{params.row.payAmount}</span>
            )
          }
        }, {
          title: '订单状态',
          align: 'center',
          key: 'pStatus'
        }, {
          title: '创建时间',
          align: 'center',
          key: 'cdate'
        }, {
          title: '销售',
          align: 'center',
          key: 'salesName'
        }, {
          title: '门店ID',
          align: 'center',
          key: 'buyerStoreId'
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
                    this.showNote()
                  }
                }
              }, '添加备注'),
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
                    this.$router.push({path: `order_detail/${params.row.id}`})
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.pStatus === 'unpaid' ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.payOrder()
                  }
                }
              }, '支付'),
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
                    this.cancelOrder()
                  }
                }
              }, '取消订单')
            ])
          }
        }
      ]
    }
  },
  methods: {
    showNote () {
      this.noteModal = true
    },
    cancelNote () {
      this.note = ''
    },
    submitNote () {
      this.$Notice.success({
        title: '提交成功'
      })
    },
    cancelOrder () {
      console.log('cancelOrder')
    },
    payOrder () {
      console.log('payOrder')
    }
  },
  beforeMount () {
    for (let key in this.filter) {
      if (!this.filter[key]) {
        delete this.filter[key]
      }
    }
    this.query()
  }
}
</script>
