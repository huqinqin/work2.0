<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
  <form-item prop="id">
    <i-input v-model="filter.id" type="text" placeholder="ID" ></i-input>
  </form-item>
  <form-item prop="account">
    <i-input v-model="filter.account" type="text" placeholder="账号名" ></i-input>
  </form-item>
  <form-item prop="email">
    <i-input v-model="filter.email" type="text" placeholder="邮件" ></i-input>
  </form-item>
  <form-item prop="firstName">
    <i-input v-model="filter.firstName" type="text" placeholder="名" ></i-input>
  </form-item>
  <form-item prop="lastName">
    <i-input v-model="filter.lastName" type="text" placeholder="姓" ></i-input>
  </form-item>
  <form-item prop="mobile">
    <i-input v-model="filter.mobile" type="text" placeholder="手机" ></i-input>
  </form-item>
  <form-item prop="installer">
    <i-input v-model="filter.installer" type="text" placeholder="所属工程商" ></i-input>
  </form-item>
  <form-item prop="shop">
    <i-input v-model="filter.shop" type="text" placeholder="所属门店" ></i-input>
  </form-item>
  <form-item prop="status">
    <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
  </form-item>
  <form-item>
    <i-button type="primary" @click="query">查询</i-button>
    <i-button type="error" @click="removeSelections">删除所选</i-button>
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
      url: 'installer/account/list',
      filter: {
        id: '', account: '', email: '', firstName: '', lastName: '', mobile: '', installer: '', shop: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'ID',
          key: 'id'
        }, {
          title: '账号名',
          key: 'account'
        }, {
          title: '邮件',
          key: 'email'
        }, {
          title: '名',
          key: 'firstName'
        }, {
          title: '姓',
          key: 'lastName'
        }, {
          title: '手机',
          key: 'mobile'
        }, {
          title: '所属工程商',
          key: 'installer'
        }, {
          title: '所属门店',
          key: 'shop'
        }, {
          title: '状态',
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
                  click: () => {}
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
                  click: () => {}
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
                  click: () => {
                    this.deleteItem(params.row.id)
                  }
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
