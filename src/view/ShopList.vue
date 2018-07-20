<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
      </form-item>
      <form-item prop="name">
        <i-input v-model="filter.name" type="text" placeholder="门店" ></i-input>
      </form-item>
      <form-item prop="account">
        <i-input v-model="filter.account" type="text" placeholder="账号" ></i-input>
      </form-item>
      <form-item prop="address">
        <date-picker type="date" placeholder="地址"></date-picker>
      </form-item>
      <form-item prop="contact">
        <i-input v-model="filter.contact" type="text" placeholder="联系人" ></i-input>
      </form-item>
      <form-item prop="phone">
        <i-input v-model="filter.phone" type="text" placeholder="联系方式" ></i-input>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
      </form-item>

      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="error">删除所选</i-button>
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
  data () {
    return {
      url: '/store',
      filter: {
        id: '', name: '', account: '', address: '', contact: '', phone: '', status: ''
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
        }, {
          title: '门店',
          key: 'name'
        }, {
          title: '账号',
          key: 'account'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '联系人',
          key: 'contact'
        }, {
          title: '联系方式',
          key: 'phone'
        }, {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
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
                    this.$router.push({ path: `shop_detail/${params.row.id}` })
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
                    this.$router.push({ path: `shop_edit/${params.row.id}` })
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
                    console.log(`删除${params.row.id}`)
                  }
                }
              }, '删除'),
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
                    this.$Modal.warning({
                      title: '修改密码',
                      content: '是否修改' + params.row.id + '的密码'
                    })
                  }
                }
              }, '重置密码')
            ])
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
