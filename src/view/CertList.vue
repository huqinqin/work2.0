<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="url">
        <i-input v-model="filter.url" type="text" placeholder="分销证" ></i-input>
      </form-item>
      <form-item prop="number">
        <i-input v-model="filter.number" type="text" placeholder="分销证号" ></i-input>
      </form-item>
      <form-item prop="company">
        <i-input v-model="filter.company" type="text" placeholder="公司名" ></i-input>
      </form-item>
      <form-item prop="custId">
        <i-input v-model="filter.custId" type="text" placeholder="Cust ID" ></i-input>
      </form-item>
      <form-item prop="address">
        <i-input v-model="filter.address" type="text" placeholder="分销证地址" ></i-input>
      </form-item>
      <form-item prop="uploadAt">
        <i-input v-model="filter.uploadAt" type="text" placeholder="上传时间" ></i-input>
      </form-item>
      <form-item prop="validate">
        <i-input v-model="filter.validate" type="text" placeholder="有效期至" ></i-input>
      </form-item>
      <form-item prop="reviewAt">
        <i-input v-model="filter.reviewAt" type="text" placeholder="最近审核时间" ></i-input>
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
      url: 'cert',
      filter: {
        url: '', number: '', company: '', custId: '', address: '', uploadAt: '', validate: '', reviewAt: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '分销证',
          key: 'url'
        }, {
          title: '分销证号',
          key: 'number'
        }, {
          title: '公司名',
          key: 'company'
        }, {
          title: 'Cust ID',
          key: 'custId'
        }, {
          title: '分销证地址',
          key: 'address'
        }, {
          title: '上传时间',
          key: 'uploadAt'
        }, {
          title: '有效期至',
          key: 'validate'
        }, {
          title: '最近审核时间',
          key: 'reviewAt'
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
                  click: () => {
                    this.$router.push({path: 'cert_review/' + params.row.id})
                  }
                }
              }, '审核'),
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
                    this.$router.push({path: 'cert_detail/' + params.row.id})
                  }
                }
              }, '查看')
            ])
          }
        }
      ]
    }
  }
}
</script>
