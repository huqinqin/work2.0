<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
      </form-item>
      <form-item prop="firstName">
        <i-input v-model="filter.firstName" type="text" placeholder="名" ></i-input>
      </form-item>
      <form-item prop="lastName">
        <i-input v-model="filter.lastName" type="text" placeholder="姓" ></i-input>
      </form-item>
      <form-item prop="account">
        <i-input v-model="filter.account" type="text" placeholder="账号" ></i-input>
      </form-item>
      <form-item prop="email">
        <i-input v-model="filter.email" type="text" placeholder="邮箱" ></i-input>
      </form-item>
      <form-item prop="phone">
        <i-input v-model="filter.phone" type="text" placeholder="公司电话" ></i-input>
      </form-item>
      <form-item prop="store">
        <i-input v-model="filter.store" type="text" placeholder="门店" ></i-input>
      </form-item>
      <form-item prop="role">
        <i-input v-model="filter.role" type="text" placeholder="角色" ></i-input>
      </form-item>
      <form-item prop="group">
        <i-input v-model="filter.group" type="text" placeholder="部门" ></i-input>
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
      url: 'personnel',
      filter: {
        id: '', firstName: '', lastName: '', account: '', email: '', phone: '', store: '', role: '', group: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '名',
          key: 'firstName'
        },
        {
          title: '姓',
          key: 'lastName'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '公司电话',
          key: 'phone'
        },
        {
          title: '门店',
          key: 'store'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '部门',
          key: 'group'
        },
        {
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
                  click: () => {
                    this.$router.push({ path: `personnel_detail/${params.row.id}` })
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
                    this.$router.push({ path: `personnel_edit/${params.row.id}` })
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
                  click: () => {
                    this.deleteItem(params.row.id)
                  }
                }
              }, '重置密码')
            ])
          }
        }
      ]
    }
  }
}
</script>
