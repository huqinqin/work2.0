<template>
  <div class="privatePool">
    <Row>
      <Col span="5" style="padding-right:10px">
      <span>state:</span>
      <AutoComplete
        v-model="state"
        :data="stateList"
        :filter-method="filterMethod"
        @on-search="handleSearch1"
        placeholder="input here"></AutoComplete>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>city:</span>
      <Input v-model="city" placeholder="Enter city" />
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>company:</span>
      <Input v-model="company" placeholder="Enter company" />
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>联系状态:</span>
      <Select v-model="contactStatus">
        <Option v-for="item in contactStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <!--<Col span="6" style="padding-right:10px">
      <span>time:</span>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" @on-change="handleChange" :value="dateValue"></DatePicker>
      </Col>-->
    </Row>
    <Row>
      <Col span="5" style="padding-right:10px">
      <span>Associate store:</span>
      <Select v-model="noAssociateStore">
        <Option v-for="item in noAssociateStoreList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <!--<Col span="5" style="padding-right:10px">
      <span>type:</span>
      <Select v-model="type">
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>-->
      <Col span="5" style="padding-right:10px">
      <span>行业:</span>
      <Select v-model="trade">
        <Option v-for="item in tradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px" v-if="trade === '0'">
      <span style="color: #F0F0F0">111</span>
      <Select v-model="trade1">
        <Option v-for="item in tradeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>Email:</span>
      <Input v-model="email" placeholder="Enter email" />
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>cust id:</span>
      <Input v-model="custId" placeholder="Enter cust id" />
      </Col>
      <Col span="5" style="padding-right:10px">
      <span style="color: #F0F0F0">Search:</span>
      <div>
        <Button type="primary" @click="getPrivateInstallerList">Search</Button>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="18" style="padding-right:10px">
      <Button type="primary" @click="allocation">批量分配</Button>
      <Button type="error" @click="privatePoolInstallerExport">导出</Button>
      </Col>
    </Row>
    <Row>
      <Col>
      <Table :columns="installerList" :data="installerdata" @on-select="collection" @on-select-all="collectionAll" @on-selection-change="cancleCollection"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total1" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
      </Col>
    </Row>
    <Row>
      <Modal v-model="importInstallerModal" width="360" title="导入模板">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <span>如没有模板请先下载导入模板</span>
        <a href="#">下载模板</a>
      </Modal>
    </Row>
    <Row>
      <Modal
        v-model="isSaller"
        title="分配sales"
        @on-ok="selectSellOk"
        @on-cancel="cancel">
        <Select v-model="allocationSells" style="width:200px" >
          <Option v-for="item in sellsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Modal>
    </Row>
    <Row>
      <Modal
        v-model="newContactRecode"
        title="新增沟通纪录"
        @on-ok="newRecordOk"
        @on-cancel="cancel">
        <div>
          <span>时间:</span>
          <DatePicker  style="width: 200px" type="date" placeholder="Select date" :value="dateValue1" @on-change="handleChange1" :options="options3"></DatePicker>
        </div>
        <div>
          <span>类型:</span>
          <Select v-model="newType" style="width:200px">
            <Option v-for="item in newTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>
          <span>沟通状态:</span>
          <Select v-model="newContact" style="width:200px">
            <Option v-for="item in newContactList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>
          <span>备注:</span>
          <Input v-model="contactNote" type="textarea" placeholder="Enter something..." />
        </div>
      </Modal>
    </Row>
  </div>
</template>

<script>
import mixin from '@/mixins/list'
export default {
  name: 'crm-common-pool',
  mixins: [mixin],
  data () {
    return {
      newContactRecode: false,
      total1: 0,
      url: 'Shop',
      filter: {
        id: '', name: '', account: '', address: '', phone: '', status: ''
      },
      list: [],
      custId: '',
      state: '',
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      stateList: ['a', 'b', 'c'],
      city: '',
      company: '',
      type: '',
      typeList: [{
        value: 'New York',
        label: 'New York'
      }, {
        value: 'New York1',
        label: 'New York1'
      }],
      trade: '',
      trade1: '',
      tradeList1: [{
        value: '0',
        label: 'IP'
      }, {
        value: '1',
        label: 'HD-TVI'
      }, {
        value: '2',
        label: 'Both'
      }],
      tradeList: [{
        value: '0',
        label: '视频监控'
      }, {
        value: '1',
        label: '门禁'
      }, {
        value: '2',
        label: '报警'
      }, {
        value: '3',
        label: '音视频'
      }, {
        value: '4',
        label: '其他'
      }],
      email: '',
      installerList: [
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
          title: 'Base info',
          render: (h, params) => {
            if (params.row.address) {
              return (
                <div><span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.detail ? params.row.address.detail : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.city ? params.row.address.city : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.country ? params.row.address.country : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.state ? params.row.address.state : ''}</span>
                </div>)
            }
          }
        },
        {
          title: 'isCount',
          key: 'account'
        },
        {
          title: 'time',
          key: 'updateTime1'
        },
        {
          title: 'last time',
          key: 'updateTime222'
        },
        {
          title: 'expire time',
          key: 'expireTime1'
        },
        {
          title: '操作',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return (
              <div><i-button
                type = "primary"
                onClick = { () => { this.check(params) } }>
              查看 </i-button>
              <i-button
                type = "primary"
                onClick = { () => { this.receive(params) }
                }>
              新建沟通纪录 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [],
      importInstallerModal: false,
      invalidBussinessModal: false,
      allocationSells: '',
      sellsList: [],
      isSaller: false,
      dateValue: [],
      contactStatus: '',
      contactStatusList: [{
        value: '0',
        label: '未联系'
      }, {
        value: '1',
        label: '联系中未询价'
      }, {
        value: '2',
        label: '联系中询价中'
      }, {
        value: '3',
        label: '激活已下单'
      }, {
        value: '4',
        label: '拉新已下单'
      }, {
        value: '5',
        label: '无效客人'
      }],
      noAssociateStore: '',
      noAssociateStoreList: [],
      selection: [],
      ids: [],
      page: 1,
      options3: {
        disabledDate (date) {
          return date && date.valueOf() >= Date.now() - 86400000
        }
      },
      dateValue1: '',
      newType: '',
      newTypeList: [{
        value: '1',
        label: '电话沟通'
      }, {
        value: '2',
        label: '当面拜访'
      }, {
        value: '3',
        label: '邮件沟通'
      }, {
        value: '4',
        label: '其他'
      }],
      newContact: '',
      newContactList: [{
        value: '1',
        label: '未联系'
      }, {
        value: '2',
        label: '联系中未询价'
      }, {
        value: '3',
        label: '联系中询价中'
      }, {
        value: '4',
        label: '激活已下单'
      }, {
        value: '5',
        label: '拉新已下单'
      }, {
        value: '6',
        label: '无效客人'
      }],
      contactNote: '',
      id: 0,
      row: 10
    }
  },
  methods: {
    handleChange1 (date) {
      this.dateValue1 = date
    },
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
    check (params) {
      this.$router.push({name: 'Crm Check', params: {id: params.row.id}})
      /* location.href = '/#/crm/CrmPoolCheck' */
      // this.$router.push('/crm/CrmPoolCheck')
      // console.log('000000000')
    },
    receive (params) {
      this.newContactRecode = true
      this.id = params.row.id
    },
    newRecordOk () {
      this.$http.newContactList({
        companyId: this.id,
        type: this.newType,
        status: this.newContact,
        note: this.contactNote,
        cdate: this.dateValue1
      }).then((data) => {
        this.$Message.success('添加沟通纪录成功')
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
    },
    cancleCollection (selection) {
      this.selection = selection
    },
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.getPrivateInstallerList()
    },
    changeSize (row) {
      this.row = row
      this.getPrivateInstallerList()
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
    selectSellOk () {
      if (this.selection.length > 0) {
        this.ids = []
        this.selection.forEach((item) => { this.ids.push(item.id) })
        this.$http.privatePoolBatch({
          userId: this.allocationSells,
          companyIds: this.ids
        }).then((data) => {
          this.$Message.success('批量分配成功')
          setTimeout(() => {
            location.reload()
          }, 2000)
        }, (error) => {
          this.$Message.error(error.err)
        })
      } else {
        this.$Message.error('您未选择客户，请选择分配客户')
      }
    },
    collection (selection, row) {
      this.selection = selection
      // console.log(selection);
    },
    collectionAll (selection) {
      this.selection = selection
      // console.log(selection);
    },
    getSalesList () {
      this.$http.salesCheck({}).then((data) => {
        if (data && data.length > 0) {
          data.forEach((item) => {
            let obj = {}
            obj.label = item.account
            obj.value = item.id
            this.sellsList.push(obj)
          })
          console.log(this.sellsList)
        }
      })
    },
    cancel () {},
    add0 (m) { return m < 10 ? '0' + m : m },
    timeFormat (timestamp) {
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds)
    },
    getPrivateInstallerList () {
      this.$http.privatePoolInstallerList({
        storeId: this.noAssociateStore ? this.noAssociateStore : null,
        custCode: this.custId ? this.custId : null,
        email: this.email ? this.email : null,
        name: this.company ? this.company : null,
        industryJoin: this.trade ? this.trade : null,
        commStatus: this.contactStatus ? this.contactStatus : null,
        state: this.state ? this.state : null,
        city: this.city ? this.city : null,
        page: this.page ? this.page : null,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          if (item.createTime) {
            item.updateTime1 = this.timeFormat(item.createTime)
          }
          if (item.expireTime) {
            item.expireTime1 = this.timeFormat(item.expireTime)
          }
        })
        this.installerdata = data.list
        this.total1 = data.total
      })
    },
    handleChange (date) {
      this.dateValue = date
      console.log(new Date(this.dateValue[0]).getTime())
    },
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
    privatePoolInstallerExport () {
      /* this.$http.privatePoolListExport({
        storeId: this.noAssociateStore ? this.noAssociateStore : null,
        custCode: this.custId ? this.custId : null,
        email: this.email ? this.email : null,
        name: this.company ? this.company : null,
        industryJoin: this.trade ? this.trade : null,
        contactStatus: this.contact ? this.contact : null,
        state: this.state ? this.state : null,
        city: this.city ? this.city : null,
        ltsUser: null
      }).then((data) => {}) */
      let s = '/work/crm/export/priv/list?storeId=' + this.noAssociateStore + '&city=' + this.city + '&name=' + this.company + '&custCode=' + this.custId + '&industryJoin=' + this.trade + '&email=' + this.email +
        '&commStatus=' + this.contactStatus + '&state=' + this.state
      window.open(s)
    }
    /* salesCheck () {
      this.$http.salesCheck({}).then((data) => {})
    } */
  },
  mounted () {
    this.getStoreList()
    this.getPrivateInstallerList()
    this.getSalesList()
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
