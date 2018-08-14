<template>
  <div class="privatePool">
    <Row>
      <Col span="6" style="padding-right:10px">
      <div>Associate store:</div>
      <Select v-model="noAssociateStore" style="width:200px" @on-change="associationSelect">
        <Option v-for="item in noAssociateStoreList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>sales:</span>
      <Input v-model="sales" placeholder="Enter city" />
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>time:</span>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" :value="dateValue" @on-change="handleChange"></DatePicker>
      </Col>
    </Row>
    <Row>
      <Col span="18" style="padding-right:10px">
      <a @click="reportExportData"><Button type="error">导出</Button></a>
      </Col>
    </Row>
    <Row>
      <Col>
      <Table :columns="installerList" :data="installerdata"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
      </Col>
    </Row>
    <Modal
      v-model="contactInstallerNum"
      title="客户明细"
      width="1200"
      @on-ok="contactOk"
      @on-cancel="cancel">
      <Row>
        <Col>
          <Table :columns="installerList1" :data="installerdata1"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total1" :current="1" @on-change="changePage"></Page>
            </div>
          </div>
        </Col>
    </Row>
    </Modal>
  </div>
</template>

<script>
import mixin from '@/mixins/list'
export default {
  name: 'crm-common-pool',
  mixins: [mixin],
  data () {
    return {
      state: '',
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      stateList: ['a', 'b', 'c'],
      sales: '',
      company: '',
      email: '',
      dateValue: '',
      installerList: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '时间',
          key: 'createTimeStr'
        },
        {
          title: '门店',
          key: 'storeName'
        },
        {
          title: 'sales',
          key: 'salesName'
        },
        {
          title: '拉新数量',
          key: 'newsNum'
        },
        {
          title: '促活数量',
          key: 'activeNum'
        },
        {
          title: '联系客户数',
          key: 'exchangeNum',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return (
              <div
                onMouseover={ () => { this.overShow(params) }}
                onMouseout={ () => { this.outHide(params) }}>
                30
                {params.row.exchangeNum}
              </div>
            )
          }
        }
      ],
      installerdata: [
        {
          store: '11111',
          sales: '2222',
          newNum: 'xiao',
          reliveNum: 'qincai',
          time: '2016-10-03'
        }
      ],
      installerList1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'cust id',
          key: 'custCode'
        },
        {
          title: 'company',
          key: 'name'
        },
        {
          title: 'First name',
          key: 'firstName'
        },
        {
          title: 'Last name',
          key: 'lastName'
        },
        {
          title: '联系电话',
          key: 'telephone'
        },
        {
          title: 'email',
          key: 'email'
        }
      ],
      installerdata1: [],
      importInstallerModal: false,
      invalidBussinessModal: false,
      allocationSells: '',
      sellsList: [],
      isSaller: false,
      noAssociateStore: '',
      noAssociateStoreList: [],
      url: 'Shop',
      filter: {
        id: '', name: '', account: '', address: '', phone: '', status: ''
      },
      list: [],
      total: 0,
      total1: 0,
      contactInstallerNum: false,
      storeId: 0,
      salesId: 0,
      page: 1,
      dateTimeData: ''
    }
  },
  methods: {
    remoteMethod1 (query) {
      if (query !== '') {
        this.loading1 = true
        setTimeout(() => {
          this.loading1 = false
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            }
          })
          this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.options1 = []
      }
    },
    handleSearch1 (value) {
      console.log(value)
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    check () {
      location.href = '/#/crm/CrmPoolCheck'
      // this.$router.push('/crm/CrmPoolCheck')
      // console.log('000000000')
    },
    receive () {
      console.log('11111')
    },
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.reportList()
    },
    mockTableData1 () {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Business' + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
          people: [
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        })
      }
      return data
    },
    importInstaller () {
      this.importInstallerModal = true
    },
    invalidBussiness () {
      this.$refs.formValidate.resetFields()
      this.invalidBussinessModal = true
    },
    handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$refs.formValidate.resetFields()
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset () {
      console.log('77777')
      this.$refs.formValidate.resetFields()
    },
    crmPoolAdd () {
      this.$router.push('/crm/CrmPoolAdd')
    },
    allocation () {
      this.isSaller = true
    },
    selectSellOk () {},
    cancel () {},
    getStoreList () {
      this.query()
      if (this.list.length > 0) {
        this.list.forEach((item) => {
          let obj = {}
          obj.label = item.name
          obj.value = item.id
          this.noAssociateStoreList.push(obj)
          console.log(obj)
        })
        console.log(this.list)
      }
    },
    overShow (params) {
      this.contactInstallerNum = true
      this.salesId = params.row.baseUserId
      this.dateTimeData = params.row.createTimeStr
      console.log(this.salesId, this.dateTimeData)
      this.installerDetailList()
    },
    outHide () {
      // this.contactInstallerNum = false;
    },
    contactOk () {},
    reportExportData () {
      let s = '/work/crm/export/storesales?storeId=' + this.storeId + '&salesKeyword=' + this.sales + '&beginTime=' + new Date(this.dateValue[0]).getTime() + '&endTime=' + new Date(this.dateValue[1]).getTime()
      window.open(s)
    },
    reportList () {
      this.$http.reportList({
        storeId: this.storeId ? this.storeId : null,
        salesKeyword: this.sales ? this.sales : null,
        beginTime: new Date(this.dateValue[0]).getTime() ? new Date(this.dateValue[0]).getTime() : null,
        endTime: new Date(this.dateValue[1]).getTime() ? new Date(this.dateValue[1]).getTime() : null,
        page: this.page,
        rows: 10
      }).then((data) => {
        this.installerdata = data.list
        this.total = data.total
      })
    },
    associationSelect (val) {
      this.storeId = val
    },
    handleChange (date) {
      this.dateValue = date
    },
    installerDetail () {
      this.$http.crmInstallerListData({
        baseUserId: this.salesId,
        storeId: this.storeId,
        page: this.page,
        rows: 10
      }).then((data) => {
      })
    },
    installerDetailList () {
      this.$http.detailList({
        salesId: this.salesId ? this.salesId : 0,
        date: this.dateTimeData ? this.dateTimeData : 1,
        page: this.page,
        rows: 10
      }).then((data) => {
        this.installerdata1 = data.list
        this.total1 = data.total
      })
    }
  },
  mounted () {
    this.getStoreList()
    this.reportList()
  },
  watch: {
    list (newVal) {
      newVal.forEach((item) => {
        let obj = {}
        obj.label = item.name
        obj.value = item.id
        this.noAssociateStoreList.push(obj)
      })
    }
  }
}
</script>

<style scoped>

</style>
