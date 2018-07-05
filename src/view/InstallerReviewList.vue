<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="email">
        <i-input v-model="filter.email" type="text" placeholder="邮箱" ></i-input>
      </form-item>
      <form-item prop="company">
        <i-input v-model="filter.company" type="text" placeholder="公司名" ></i-input>
      </form-item>
      <form-item prop="custId">
        <i-input v-model="filter.custId" type="text" placeholder="CUST ID" ></i-input>
      </form-item>
      <form-item prop="applyAt">
        <date-picker type="date" placeholder="申请时间"></date-picker>
      </form-item>
      <form-item prop="waitTime">
        <i-input v-model="filter.waitTime" type="text" placeholder="未处理时间" ></i-input>
      </form-item>
      <form-item prop="allotAt">
        <date-picker type="date" placeholder="分配时间"></date-picker>
      </form-item>
      <form-item prop="reviewAt">
        <date-picker type="date" placeholder="审核时间"></date-picker>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary">查询</i-button>
        <i-button type="error">删除所选</i-button>
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
  name: 'InstallerReviewList',
  data () {
    return {
      url: '/installer/review',
      filter: {
        email: '', company: '', custId: '', applyAt: '', waitTime: '', allotAt: '', reviewAt: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'email'
        }, {
          title: '公司名',
          key: 'company'
        }, {
          title: 'CUST ID',
          key: 'custId'
        }, {
          title: '申请时间',
          key: 'applyAt'
        }, {
          title: '未处理时间',
          key: 'waitTime'
        }, {
          title: '分配时间',
          key: 'allotAt'
        }, {
          title: '审核时间',
          key: 'reviewAt'
        }, {
          title: '状态',
          key: 'status'
        }, {
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
                    this.$router.push({name: 'installer_review_detail', params: {id: params.row.id}})
                  }
                }
              }, '审核')
            ])
          }
        }
      ]
    }
  }
}
</script>
