<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="custId">
        <i-input v-model="filter.customerId" type="text" placeholder="Cust ID" ></i-input>
      </form-item>
      <form-item prop="account">
        <i-input v-model="filter.account" type="text" placeholder="账号" ></i-input>
      </form-item>
      <form-item prop="companyName">
        <i-input v-model="filter.companyName" type="text" placeholder="公司名" ></i-input>
      </form-item>
      <form-item prop="grade">
        <i-input v-model="filter.grade" type="text" placeholder="会员等级" ></i-input>
      </form-item>
      <form-item prop="historyMoney">
        <i-input v-model="filter.historyMoney" type="text" placeholder="消费金额" ></i-input>
      </form-item>
      <form-item prop="orderNum">
        <i-input v-model="filter.orderNum" type="text" placeholder="订单数量" ></i-input>
      </form-item>
      <form-item prop="availableIntegral">
        <i-input v-model="filter.availableIntegral" type="text" placeholder="可用积分" ></i-input>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="账户启用状态" ></i-input>
      </form-item>

      <form-item>
        <i-button type="primary">查询</i-button>
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
  mixins: [mixin],
  name: 'InstallerList',
  data () {
    return {
      url: 'installer/getInstallerList',
      filter: {
        customerId: '', id: '', account: '', companyName: '', grade: '', historyMoney: '', orderNum: '', availableIntegral: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: 'Cust ID',
          key: 'custId'
        }, {
          title: '账号',
          key: 'account'
        }, {
          title: '公司名',
          key: 'companyName'
        }, {
          title: '会员等级',
          key: 'grade'
        }, {
          title: '消费金额',
          key: 'historyMoney'
        }, {
          title: '订单数量',
          key: 'orderNum'
        }, {
          title: '可用积分',
          key: 'availableIntegral'
        }, {
          title: '账户启用状态',
          key: 'status'
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
                    this.$router.push({
                      name: 'installer_details',
                      params: {}
                    })
                  }
                }
              }, '查看'),
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
                    this.$router.push({
                      name: 'installer_edit',
                      params: {}
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {}
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  }
}
</script>
