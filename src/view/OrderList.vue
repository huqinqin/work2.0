<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="shop">
        <Select v-model="filter.shop" type="text" placeholder="选择门店" >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="status">
        <Select v-model="filter.status" type="text" placeholder="选择状态" >
          <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="source">
        <Select v-model="filter.source" type="text" placeholder="选择来源" >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </form-item>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="输入订单编号" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
      </form-item>
    </i-form>
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
      columns: [
        {
          title: '订单编号',
          key: 'id'
        }, {
          title: '公司名称',
          align: 'center',
          key: 'sName'
        }, {
          title: '工程商ID',
          align: 'center',
          key: 'sCode'
        }, {
          title: '订单来源',
          align: 'center',
          key: 'source'
        }, {
          title: '收货人信息',
          key: '',
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <p>{params.row.address.receiver}</p>
                <p>{params.row.address.telnum}</p>
              </div>
            )
          }
        }, {
          title: '收货地址',
          key: '',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.address.detail}</span>
            )
          }
        }, {
          title: '金额',
          align: 'center',
          key: '',
          render: (h, params) => {
            return (
              <span>${params.row.payAmount}</span>
            )
          }
        }, {
          title: '销售',
          align: 'center',
          key: 'salesName'
        }, {
          title: '创建时间',
          align: 'center',
          key: 'cdate'
        }, {
          title: '状态',
          align: 'center',
          key: 'pStatus'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.$router.push({path: `order_detail/${params.row.id}`})
                  }
                }
              }, '详情')
            ])
          }
        }
      ]
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
