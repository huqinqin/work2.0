<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
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
        <i-input v-model="filter.detail" type="text" placeholder="分销证地址" ></i-input>
      </form-item>
      <form-item prop="uploadAt">
        <i-input v-model="filter.uploadAt" type="text" placeholder="上传时间" ></i-input>
      </form-item>
      <form-item prop="validTime">
        <i-input v-model="filter.validTime" type="text" placeholder="有效期至" ></i-input>
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
      url: 'Cert',
      filter: {
        imgUrl: '', number: '', company: '', custId: '', detail: '', uploadAt: '', validTime: '', reviewAt: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '分销证',
          key: 'imgUrl',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <img src={ params.row.imgUrl } height="100"/>
            )
          }
        }, {
          title: '分销证号',
          key: 'number',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.number}</span>
            )
          }
        }, {
          title: '公司名',
          key: 'company',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.address.company}</span>
            )
          }
        }, {
          title: 'Cust ID',
          key: 'custId',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.store.code}</span>
            )
          }
        }, {
          title: '分销证地址',
          key: 'detail',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.address.detail}</span>
            )
          }
        }, {
          title: '上传时间',
          key: 'uploadAt',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.ext.submitDate}</span>
            )
          }
        }, {
          title: '有效期至',
          key: 'validTime',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.ext.expiryDate}</span>
            )
          }
        }, {
          title: '最近审核时间',
          key: 'reviewAt',
          align: 'center',
          render: (h, params) => {
            return (
              <span>{params.row.ext.reviewDate}</span>
            )
          }
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
            if (params.row.status === 'submitted') {
              return h('div', [
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
                      this.$router.push({ path: 'cert_review/' + params.row.id })
                    }
                  }
                }, '审核')
              ])
            } else {
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
                      this.$router.push({ path: 'cert_detail/' + params.row.id })
                    }
                  }
                }, '查看')
              ])
            }
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
