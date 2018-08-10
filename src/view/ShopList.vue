<template>
  <card>
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
