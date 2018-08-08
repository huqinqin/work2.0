<template>
  <Tabs type="card">
    <TabPane label="未分配">
      <div class="temporaryPool">
        <Row>
          <Col span="6" style="padding-right:10px">
          <span>Associate store:</span>
          <Select v-model="noAssociateStore" style="width:200px">
            <Option v-for="item in noAssociateStoreList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>cust id:</span>
          <Input v-model="custId" placeholder="Enter company" />
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>state:</span>
          <AutoComplete
            v-model="state"
            :data="stateList"
            :filter-method="filterMethod"
            @on-search="handleSearch1"
            placeholder="input here"></AutoComplete>
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>city:</span>
          <Input v-model="city" placeholder="Enter city" />
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>company:</span>
          <Input v-model="company" placeholder="Enter company" />
          </Col>
        </Row>
        <Row>
          <Col span="5" style="padding-right:10px">
          <span>联系状态:</span>
          <Select v-model="contact">
            <Option v-for="item in contactList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
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
          <Col span="4" style="padding-right:10px">
          <span style="color: #F0F0F0">Search:</span>
          <div>
            <Button type="primary" @click="getTemplatePoolInstallerList('0')">Search</Button>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="18" style="padding-right:10px">
          <Button type="primary" @click="importInstaller">导入</Button>
          <Button type="primary" @click="crmPoolAdd">新增</Button>
          <Button type="primary" @click="allocation">批量分配</Button>
          <Button type="primary" @click="invalidBussiness">无效商机</Button>
          <Button type="error" @click="exportInstallerList('0')">导出</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table :columns="installerList" :data="installerdata"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="100" :current="1" @on-change="changePage"></Page>
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
          <Modal v-model="invalidBussinessModal" width="600" title="无效商机" @on-ok="handleSubmit" @on-cancel="handleReset">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="类型" prop="invalidBussinessSelect">
                <Select v-model="formValidate.invalidBussinessSelect" style="width:200px">
                  <Option v-for="item in invalidBussinessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem  prop="subInvalidBussinessSelect">
                <Select v-model="formValidate.subInvalidBussinessSelect" v-if="formValidate.invalidBussinessSelect === 'New York1'" style="width:200px">
                  <Option v-for="item in subInvalidBussinessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注" prop="note">
                <Row>
                  <Col span="18">
                  <Input v-model="formValidate.note" type="textarea" placeholder="Enter something..." />
                  </Col>
                </Row>
              </FormItem>
              <div style="margin-left: 80px">注：如果已开通商城账号，加入无效商机名单后将冻结该工程商的账号</div>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Modal
            v-model="isSaller"
            title="Common Modal dialog box title"
            @on-ok="selectSellOk"
            @on-cancel="cancel">
            <Select v-model="allocationSells" style="width:200px">
              <Option v-for="item in sellsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Modal>
        </Row>
      </div>
    </TabPane>
    <TabPane label="已分配">
      <div class="hasTemporaryPool">
        <Row>
          <Col span="6" style="padding-right:10px">
          <span>Associate store:</span>
          <Select v-model="associateStore" style="width:200px">
            <Option v-for="item in noAssociateStoreList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>cust id:</span>
          <Input v-model="allocationCustId" placeholder="Enter city" />
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>state:</span>
          <AutoComplete
            v-model="state1"
            :data="stateList1"
            :filter-method="filterMethod"
            @on-search="handleSearch1"
            placeholder="input here"></AutoComplete>
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>city:</span>
          <Input v-model="city" placeholder="Enter city" />
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>company:</span>
          <Input v-model="company" placeholder="Enter company" />
          </Col>
        </Row>
        <Row>
          <Col span="5" style="padding-right:10px">
          <span>联系状态:</span>
          <Select v-model="type">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="5" style="padding-right:10px">
          <span>行业:</span>
          <Select v-model="noAllocation">
            <Option v-for="item in noAllocationTradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="5" style="padding-right:10px" v-if="noAllocation === '0'">
          <span style="color: #F0F0F0">111</span>
          <Select v-model="noAllocation1">
            <Option v-for="item in noAllocationTradeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="5" style="padding-right:10px">
          <span>Email:</span>
          <Input v-model="email" placeholder="Enter email" />
          </Col>
          <Col span="4" style="padding-right:10px">
          <span style="color: #F0F0F0">Search:</span>
          <div>
            <Button type="primary" @click="getTemplatePoolInstallerList('1')">Search</Button>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="18" style="padding-right:10px">
          <!--<Button type="primary" @click="importInstaller">导入</Button>-->
         <!-- <Button type="primary" @click="crmPoolAdd">新增</Button>-->
          <Button type="primary" @click="allocation">批量分配</Button>
          <Button type="primary" @click="invalidBussiness">无效商机</Button>
          <Button type="error" @click="exportInstallerList('1')">导出</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table :columns="installerList1" :data="installerdata1"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="100" :current="1" @on-change="changePage"></Page>
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
          <Modal v-model="invalidBussinessModal" width="600" title="导入模板" @on-ok="handleSubmit" @on-cancel="handleReset">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="类型" prop="invalidBussinessSelect">
                <Select v-model="formValidate.invalidBussinessSelect" style="width:200px">
                  <Option v-for="item in invalidBussinessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem  prop="subInvalidBussinessSelect">
                <Select v-model="formValidate.subInvalidBussinessSelect" v-if="formValidate.invalidBussinessSelect === 'New York1'" style="width:200px">
                  <Option v-for="item in subInvalidBussinessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注" prop="note">
                <Row>
                  <Col span="18">
                  <span>备注:</span><Input v-model="formValidate.note" type="textarea" placeholder="Enter something..." />
                  </Col>
                </Row>
              </FormItem>
              <div style="margin-left: 80px">注：如果已开通商城账号，加入无效商机名单后将冻结该工程商的账号</div>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Modal
            v-model="isSaller"
            title="Common Modal dialog box title"
            @on-ok="selectSellOk"
            @on-cancel="cancel">
            <Select v-model="allocationSells" style="width:200px">
              <Option v-for="item in sellsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Modal>
        </Row>
        <Row>
          <Modal
            v-model="newContactRecode"
            title="新增沟通纪录"
            @on-ok="selectSellOk"
            @on-cancel="cancel">
            <i-col span="24">
              <DatePicker style="width: 200px" type="date" placeholder="Select date" :value="dateValue" @on-change="handleChange" ></DatePicker>
            </i-col>
            <i-col span="24">
              <Select v-model="newType" style="width:200px">
                <Option v-for="item in newTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </i-col>
            <i-col span="24">
              <Select v-model="newContact" style="width:200px">
                <Option v-for="item in newContactList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </i-col>
          </Modal>
        </Row>
      </div>
    </TabPane>
  </Tabs>
</template>

<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  name: 'crm-common-pool',
  data () {
    return {
      url: 'Shop',
      filter: {
        id: '', name: '', account: '', address: '', phone: '', status: ''
      },
      list: [],
      total: 0,
      state: '',
      state1: '',
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      stateList: ['a', 'b', 'c'],
      stateList1: ['a', 'b', 'c'],
      city: '',
      company: '',
      type: '',
      contact: '',
      contactList: [{
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
      typeList: [{
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
      trade: '',
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
      noAllocation: '',
      noAllocationTradeList: [{
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
      noAllocation1: '',
      noAllocationTradeList1: [{
        value: '0',
        label: 'IP'
      }, {
        value: '1',
        label: 'HD-TVI'
      }, {
        value: '2',
        label: 'Both'
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
          key: 'address',
          render: (h, params) => {
            return (
              < div > < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < /div>)
          }
        },
        {
          title: 'isCount',
          key: 'open'
        },
        {
          title: 'time',
          key: 'cdate'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return (
              <div><i-button
                type = "primary"
                onClick = { () => { this.check(params) }
                }>
            查看 </i-button>
              <i-button
                type = "primary"
                onClick = {() => { this.receive(params) }}>
            领取 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [
        {
          custCode: '11111',
          name: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          open: 'No',
          cdate: '2016-10-03',
          id: 1
        }, {
          custCode: '22222',
          name: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          open: 'No',
          cdate: '2016-10-03',
          id: 2
        }, {
          custCode: '3333',
          name: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          open: 'No',
          cdate: '2016-10-03',
          id: 3
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
          key: 'custId'
        },
        {
          title: 'company',
          key: 'company'
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
          key: 'baseInfo',
          render: (h, params) => {
            return (
              < div > < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < span
                class
                  = "ivu-icon ivu-icon-ios-checkmark" > 1234 < /span>
              < /div>)
          }
        },
        {
          title: 'isCount',
          key: 'isCount'
        },
        {
          title: 'time',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return (
              <div><i-button
                type = "primary"
                onClick = { () => { this.check(params) }
                }>
            查看 </i-button>
              <i-button
                type = "primary"
                onClick = { () => { this.newContactMethod(params) }
                }>
            新建沟通纪录 </i-button>
              </div>)
          }
        }
      ],
      installerdata1: [
        {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }
      ],
      importInstallerModal: false,
      invalidBussinessModal: false,
      invalidBussinessList: [{
        value: 'New York',
        label: 'New York'
      }, {
        value: 'New York1',
        label: 'New York1'
      }],
      subInvalidBussinessList: [{
        value: 'New York',
        label: 'New York'
      }, {
        value: 'New York1',
        label: 'New York1'
      }],
      formValidate: {
        subInvalidBussinessSelect: '',
        invalidBussinessSelect: '',
        note: ''
      },
      ruleValidate: {
        subInvalidBussinessSelect: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],
        invalidBussinessSelect: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],
        note: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ]
      },
      isSaller: false,
      allocationSells: '',
      sellsList: [{
        value: '0',
        label: '张三'
      }],
      associateStore: '',
      associateStoreList: [],
      noAssociateStore: '',
      noAssociateStoreList: [],
      custId: '',
      allocationCustId: '',
      newContactRecode: false,
      newContact: '',
      newContactList: [{
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
      newType: '',
      newTypeList: [{
        value: '0',
        label: '电话沟通'
      }, {
        value: '1',
        label: '当面拜访'
      }, {
        value: '2',
        label: '邮件沟通'
      }, {
        value: '3',
        label: '其他'
      }],
      dateValue: ''
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
    /* check (params) {
      // location.href = '/#/crm/CrmPoolCheck' + params
      this.$router.push({name: 'Crm Check', params: {row: params.row}})
      // console.log('000000000')
    }, */
    receive () {
      console.log('11111')
    },
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
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
      this.$router.push({name: 'New crease', params: {crmFlag: 1}})
    },
    allocation () {
      this.isSaller = true
    },
    selectSellOk () {
    },
    cancel () {
    },
    newContactMethod () {
      this.newContactRecode = true
      console.log('00000')
    },
    handleChange (date) {
      this.dateValue = date
    },
    storeDataHandle () {
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
    getTemplatePoolInstallerList (val) {
      this.$http.templatePoolInstallerList({
        storeId: val === '0' ? (this.noAssociateStore ? this.noAssociateStore : '') : (this.associateStore ? this.associateStore : 0),
        custCode: this.custId ? this.custId : '',
        email: this.email ? this.email : '',
        name: this.company ? this.company : '',
        industryJoin: this.trade ? this.trade : '',
        contactStatus: this.contact ? this.contact : '',
        state: this.state ? this.state : '',
        city: this.city ? this.city : '',
        ltsUser: '',
        allotStatus: val
      }).then((data) => {
        // this.installerdata = data.list;
      })
    },
    check (params) {
      this.$http.installerCheck({
        id: params.row.id
      }).then((data) => {
        this.$router.push({name: 'Crm Check', params: data.data})
        console.log(data)
      })
    },
    exportInstallerList (val) {
      this.$http.templatePoolListExport({
        storeId: val === '0' ? (this.noAssociateStore ? this.noAssociateStore : '') : (this.associateStore ? this.associateStore : 0),
        custCode: this.custId ? this.custId : '',
        email: this.email ? this.email : '',
        name: this.company ? this.company : '',
        industryJoin: this.trade ? this.trade : '',
        contactStatus: this.contact ? this.contact : '',
        state: this.state ? this.state : '',
        city: this.city ? this.city : '',
        ltsUser: '',
        allotStatus: val
      }).then((data) => {})
    }
  },
  mounted () {
    this.getStoreList()
    this.getTemplatePoolInstallerList()
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
