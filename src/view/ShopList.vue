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
      <form-item prop="phone">
        <i-input v-model="filter.phone" type="text" placeholder="联系方式" ></i-input>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
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
      url: 'Shop',
      filter: {
        id: '', name: '', account: '', address: '', phone: '', status: ''
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
          title: '地址',
          key: 'address'
        }, {
          title: '联系人',
          key: 'contact',
          render: (h, params) => {
            const more = []
            params.row.contact.forEach(item => {
              more.push(
                <div>
                  <icon type="person"></icon><strong>{item.firstName}{item.lastName}</strong><br/>
                  <icon type="ios-telephone"></icon><strong>{item.phone}</strong>
                </div>
              )
            })
            return (
              <poptip trigger="hover" placement="right" width="300">
                <icon type="person"></icon><strong>{params.row.contact[0].firstName}{params.row.contact[0].lastName}</strong><br/>
                <icon type="ios-telephone"></icon><strong>{params.row.contact[0].phone}</strong>
                <div slot="content">
                  {more}
                </div>
              </poptip>
            )
          }
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
                    this.$router.push({ name: 'shop_detail', params: {id: params.row.id} })
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
                    this.$router.push({ name: 'shop_edit', params: {id: params.row.id} })
                  }
                }
              }, '编辑')
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
