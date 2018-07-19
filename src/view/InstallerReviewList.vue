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
    <Modal
      v-model="showAllot"
      @on-ok="allot"
      title="分配">
      <i-form>
        <form-item label="门店">
          <CodeTable v-model="masterStoreId" type="store"></CodeTable>
        </form-item>
      </i-form>
    </Modal>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  name: 'InstallerReviewList',
  components: {
    CodeTable: () => import('@/components/CodeTable')
  },
  data () {
    return {
      url: '/store',
      showAllot: false,
      curId: '',
      masterStoreId: '',
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
          width: 200,
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <i-button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => {
                  // this.$router.push({name: 'installer_review_list'})
                }}>查看</i-button>
                <i-button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => {
                  this.$router.push({name: 'installer_review_detail', params: {id: params.row.id}})
                }} >审核</i-button>
                <i-button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => { this.showAllot = true; this.curId = params.row.id }}>分配</i-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    allot () {
      this.$axios.post('store/assignStore', {id: this.curId, content: this.masterStoreId}).then(data => {
        this.$Message.success('已分配')
      })
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
