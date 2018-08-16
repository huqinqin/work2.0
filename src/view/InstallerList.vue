<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="custId">
        <i-input v-model="filter.custId" type="text" placeholder="Cust ID" ></i-input>
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
      url: 'Installer',
      filter: {
        custId: '', id: '', account: '', companyName: '', grade: '', historyMoney: '', orderNum: '', availableIntegral: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          type: 'expand',
          width: 50,
          render (h, params) {
            const accounts = []
            for (const account of params.row.account) {
              accounts.push(<tr>
                <td>账号：{account.account}</td>
                <td>姓名：{account.lastName}-{account.firstName}</td>
                <td>email：{account.email}</td>
                <td>mobile：{account.mobile}</td>
                <td>状态：{account.status}</td>
              </tr>)
            }
            return <table width="100%" class="account-table">{accounts}</table>
          }
        }, {
          title: 'Cust ID',
          key: 'custId'
        }, {
          title: '公司名称',
          key: 'companyName'
        }, {
          title: '等级',
          key: 'grade'
        }, {
          title: '联系信息',
          key: 'historyMoney'
        }, {
          title: '地址',
          key: 'orderNum'
        }, {
          title: '所属',
          key: 'availableIntegral'
        }, {
          title: '分销资格',
          key: 'status'
        }, {
          title: '创建时间',
          key: 'status'
        }, {
          title: '状态',
          key: 'status'
        }, {
          title: '来源',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            console.log(params)
            return (
              <div>
                <i-button type="primary" size="small" style="margin-right: 5px;" onClick={() => {
                  this.$router.push({name: 'installer_details', params: {id: params.row.id}})
                }}>查看</i-button>
                <i-button type="primary" size="small" style="margin-right: 5px;" onClick={() => {}}>编辑</i-button>
                <i-button type="error" size="small" style="margin-right: 5px;" onClick={() => {}}>删除</i-button>
              </div>
            )
          }
        }
      ]
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
<style lang="less">
.account-table {
  &, tr, td{
    padding: 0 16px;
    line-height: 40px;
    border: none;
    background-color: #F6F6F6;
  }
}
</style>
