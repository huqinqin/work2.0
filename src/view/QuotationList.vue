<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="sName" label="公司名称">
        <i-input v-model="filter.sName" type="text" placeholder="输入公司名称" ></i-input>
      </form-item>
      <form-item prop="account" label="Cust ID">
        <i-input v-model="filter.custID" type="text" placeholder="输入Cust ID" ></i-input>
      </form-item>
      <form-item prop="account" label="账号">
        <i-input v-model="filter.account" type="text" placeholder="输入账号" ></i-input>
      </form-item>
      <form-item prop="id" label="询价单编号">
        <i-input v-model="filter.mid" type="text" placeholder="输入单号" ></i-input>
      </form-item>
      <form-item prop="status" label="状态">
        <Select v-model="filter.status">
          <Option v-for="item in statusOption" :key="item.status" :value="item.status">{{item.label}}</Option>
        </Select>
      </form-item>
      <form-item prop="cdate" label="所属sales">
        <Select v-model="filter.sales">
          <Option v-for="sales in salesOption" :value="sales.id" :key="sales.id">{{sales.name}}</Option>
        </Select>
      </form-item>
      <form-item prop="cdate" label="时间">
        <DatePicker v-model="filter.date" type="daterange" :options="dateOptions" placeholder="Select date" style="width: 200px"></DatePicker>
      </form-item>
      <form-item label=" ">
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
import formatDate from '../plugin/filter/formatDate'
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Quotation',
      filter: {
        mid: '', custID: '', account: '', sName: '', status: '', date: [], sales: ''
      },
      salesOption: [
        {
          id: 1,
          name: '销售1'
        }, {
          id: 2,
          name: '销售2'
        }, {
          id: 3,
          name: '销售3'
        }, {
          id: 4,
          name: '销售4'
        }
      ],
      statusOption: [
        {
          status: 'init',
          label: '待提交'
        }, {
          status: 'salesManager',
          label: '待销售主管审核'
        }, {
          status: 'financial',
          label: '待财务审核'
        }, {
          status: 'enabled',
          label: '已生成订单'
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
      columns: [
        {
          title: '询价单编号',
          key: 'mid'
        }, {
          title: '账号',
          key: 'account'
        }, {
          title: '公司名称',
          key: 'sName'
        }, {
          title: '状态',
          render: (h, params) => {
            let status = null
            this.statusOption.forEach(t => {
              if (t.status === params.row.status) status = t.label
            })
            return (
              <div>{status}</div>
            )
          }
        }, {
          title: '创建时间',
          render: (h, params) => {
            return (
              <div>{formatDate.formatDate(params.row.cdate)}</div>
            )
          }
        }, {
          title: 'sales',
          key: 'sales'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            let content = null
            if (params.row.status === 'enabled') {
              content = (
                <div>
                  <i-button type="primary" size="small" on-click={(e) => this.detail(params.row.id)}>查看</i-button>
                </div>
              )
            } else {
              content = (
                <div>
                  <i-button type="primary" size="small" on-click={(e) => this.detail(params.row.id)}>查看</i-button>
                  <i-button type="primary" size="small" on-click={(e) => this.recall(params.row)}>撤回</i-button>
                </div>
              )
            }
            return content
          }
        }
      ]
    }
  },
  methods: {
    recall (row) {
      this.$http.refuseQuotation({
        id: row.id,
        content: '销售撤回',
        status: row.status,
        reviewStatus: 'recall'
      }).then(() => {
        if (this.filter.status === '') delete this.filter.status
        this.query()
      })
    },
    detail (id) {
      this.$router.push(`quotation_edit/${id}`)
    }
  },
  beforeMount () {
    if (this.filter.status === '') delete this.filter.status
    this.query()
  }
}
</script>
