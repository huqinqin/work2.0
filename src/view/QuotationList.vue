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
        <i-input v-model="filter.id" type="text" placeholder="输入单号" ></i-input>
      </form-item>
      <form-item prop="status" label="状态">
        <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
      </form-item>
      <form-item prop="cdate" label="时间">
        <i-input v-model="filter.cdate" type="text" placeholder="创建时间" ></i-input>
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
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Quotation',
      filter: {
        id: '', custID: '', account: '', sName: '', status: '', cdate: '', sales: ''
      },
      columns: [
        {
          title: '询价单编号',
          key: 'id'
        }, {
          title: '账号',
          key: 'account'
        }, {
          title: '公司名称',
          key: 'sName'
        }, {
          title: '状态',
          key: 'status'
        }, {
          title: '创建时间',
          key: 'cdate'
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
            return (
              <div>
                <i-button type="primary" size="small" on-click={this.showDetail}>详情</i-button>
                <i-button type="primary" size="small" on-click={this.showEdit}>编辑</i-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    showEdit () {
      console.log('edit')
    },
    showDetail () {
      console.log('detail')
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
