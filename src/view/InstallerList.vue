<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="custId" label="Cust ID">
        <i-input v-model="filter.custId" type="text" placeholder="Cust ID" ></i-input>
      </form-item>
      <form-item prop="storePhone" label="Contact Phone">
        <i-input v-model="filter.storePhone" type="text" placeholder="Contact Phone" ></i-input>
      </form-item>
      <form-item prop="companyName" label="公司名称">
        <i-input v-model="filter.companyName" type="text" placeholder="公司名称" ></i-input>
      </form-item>
      <form-item prop="channel" label="来源">
        <i-input v-model="filter.channel" type="text" placeholder="来源" ></i-input>
      </form-item>
      <form-item prop="ownerSalesId" label="Associated Sales">
        <i-input v-model="filter.ownerSalesId" type="text" placeholder="Associated Sales" ></i-input>
      </form-item>
      <form-item prop="zipCode" label="Zip Code">
        <i-input v-model="filter.zipCode" type="text" placeholder="Zip Code" ></i-input>
      </form-item>
      <form-item prop="storeEmail" label="Email">
        <i-input v-model="filter.storeEmail" type="text" placeholder="Email" ></i-input>
      </form-item>
      <form-item prop="storeStatus" label="状态">
        <i-select v-model="filter.storeStatus">
          <i-option value="enabled">enabled</i-option>
          <i-option value="freeze">freeze</i-option>
        </i-select>
      </form-item>
      <form-item prop="status" label="所属门店">
        <Select v-model="filter.ownerStoreId">
          <Option v-for="item in $store.state.options.stores" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </form-item>
      <form-item label=" ">
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
        custId: '', storePhone: '', account: '', channel: '', companyName: '', ownerSalesId: '', zipCode: '', storeEmail: '', storeStatus: '', ownerStoreId: ''
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
            for (const account of params.row.userList) {
              accounts.push(<tr>
                <td>账号：{account.userAccount}</td>
                <td>姓名：{account.userLastName}-{account.userFirstName}</td>
                <td>email：{account.userEmail}</td>
                <td>mobile：{account.userMobile}</td>
                <td>状态：{account.userStatus}</td>
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
          render: (h, params) => {
            const more = []
            const contact = params.row.storeContact
            if (contact && contact.length > 0) {
              contact.forEach(item => {
                more.push(
                  <div>
                    <icon type="person"></icon><strong>{item.firstName}{item.lastName}</strong><br/>
                    <icon type="ios-telephone"></icon><strong>{item.phone}</strong>
                    <icon type="ios-mail"></icon><strong>{item.email}</strong>
                  </div>
                )
              })
              return (
                <poptip trigger="hover" placement="right" width="300">
                  <icon type="person"></icon><strong>{contact[0].firstName}{contact[0].lastName}</strong><br/>
                  <icon type="ios-telephone"></icon><strong>{contact[0].phone}</strong>
                  <icon type="ios-mail"></icon><strong>{contact[0].email}</strong>
                  <div slot="content">
                    {more}
                  </div>
                </poptip>
              )
            }
            return <span></span>
          }
        }, {
          title: '地址',
          key: 'storeAddress'
        }, {
          title: '所属',
          render: (h, params) => {
            return (<span>{params.row.ownerSalesAccount}</span>)
          }
        }, {
          title: '分销资格',
          key: 'storeCert'
        }, {
          title: '创建时间',
          key: 'storeCdate'
        }, {
          title: '状态',
          key: 'storeStatus'
        }, {
          title: '来源',
          key: 'storeChannel'
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
