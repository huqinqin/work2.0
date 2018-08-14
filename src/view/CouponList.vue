<template>
  <card>
    <i-form :model="filter" inline>
      <form-item>
        <i-input v-model="filter.name" type="text" placeholder="优惠券名称" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="primary">新增优惠券</i-button>
        <i-button type="primary">批量赠券</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
    <Modal
        v-model="modal"
        title="赠券">
        <i-form>
          <form-item>
            <i-select v-model="sendForm.source" style="width: 100%;">
              <i-option value="lts">门店</i-option>
              <i-option value="installer">工程商</i-option>
            </i-select>
          </form-item>
          <form-item>
            <CodeTable type="group" style="width: 100%;"></CodeTable>
          </form-item>
          <form-item>
            <Row>
              <i-col span="4">
                <Select v-model="installerType" style="width: 100%;">
                  <Option value="storeCode">Cust ID</Option>
                  <Option value="storeName">公司名称</Option>
                  <Option value="account">账号</Option>
                  <Option value="mobile">电话</Option>
                  <Option value="contactEmail">邮箱</Option>
                </Select>
              </i-col>
              <i-col span="20">
                <QueryInput :remote="queryInstaller" @change="checkInstaller" :value="installerValue">
                  <template slot-scope="props">
                    {{props.item.storeName}} - {{props.item.storeCode}}
                  </template>
                </QueryInput>
              </i-col>
            </Row>
          </form-item>
        </i-form>
    </Modal>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  name: 'CouponList',
  mixins: [mixin],
  data () {
    return {
      url: 'Coupon',
      modal: false,
      installerType: '',
      installerValue: '',
      sendForm: {
        offerId: '',
        source: 'installer',
        ids: []
      },
      filter: {
        name: '',
        couponType: 'common',
        status: ''
      },
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '编号',
        key: 'id'
      }, {
        title: '优惠券名称',
        key: 'name'
      }, {
        title: '优惠券类型',
        key: 'couponType'
      }, {
        title: '可使用商品',
        key: 'includeType'
      }, {
        title: '使用门槛',
        key: 'standard'
      }, {
        title: '优惠',
        key: 'amount'
      }, {
        title: '有效期',
        render: (h, params) => {
          return (
            <span>null</span>
          )
        }
      }, {
        title: '状态',
        key: status
      }, {
        title: '操作',
        render: (h, params) => {
          return (
            <div>
              <i-button type="primary" size="small" onClick={() => { this.toCouponDetail(params.row.id) }}>查看</i-button>
              <i-button type="success" size="small" onClick={() => { this.showSendModal() }}>赠券</i-button>
              <i-button type="error" size="small" onClick={() => { this.deleteItem(params.row.id) }}>删除</i-button>
            </div>
          )
        }
      }]
    }
  },
  methods: {
    checkInstaller () {},
    queryInstaller (query) {
      return this.$http.queryQuotationInstaller({
        [this.installerType]: query
      }).then(data => {
        return data.reduce((list, item) => {
          const array = item.userResponses.map(({id, account, email, mobile, firstName, lastName}) => ({
            storeCode: item.code,
            storeName: item.address.company,
            address: item.address.detail,
            storeId: item.id,
            account: account,
            userId: id,
            userEmail: email,
            userMobile: mobile,
            name: firstName + ' ' + lastName,
            accountNotes: '',
            custNotes: ''
          }))
          return list.concat(array)
        }, [])
      })
    },
    toCouponDetail (id) {
      this.$router.push({name: 'coupon_detail', params: {id}})
    },
    showSendModal () {
      this.modal = true
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
<style lang="css" scoped>
</style>
