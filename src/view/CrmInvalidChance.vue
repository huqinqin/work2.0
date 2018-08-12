<template>
  <div class="privatePool">
    <Row>
      <Col span="6" style="padding-right:10px">
      <span>company:</span>
      <Input v-model="company" placeholder="Enter company" />
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>time:</span>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date"  @on-change="handleChange" :value="dateValue"></DatePicker>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>Email:</span>
      <Input v-model="email" placeholder="Enter email" />
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>类型:</span>
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
      <Col span="4" style="padding-right:10px">
      <span style="color: #F0F0F0">Search:</span>
      <div>
        <Button type="primary">Search</Button>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="18" style="padding-right:10px">
      <Button type="error" @click="invalidBussinessExport">导出</Button>
      </Col>
    </Row>
    <Row>
      <Col>
      <Table :columns="installerList" :data="installerdata"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total1" :current="1" @on-change="changePage"></Page>
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
  </div>
</template>

<script>

export default {
  name: 'crm-common-pool',
  data () {
    return {
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
      tradeList: [{
        value: '0',
        label: '黑名单'
      }, {
        value: '1',
        label: '终端用户'
      }, {
        value: '2',
        label: '非安防行业'
      }],
      tradeList1: [{
        value: '0',
        label: '竞争对手'
      }, {
        value: '1',
        label: '坏账'
      }, {
        value: '2',
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
          title: 'company',
          key: 'name'
        },
        {
          title: 'firstName',
          key: 'firstName'
        },
        {
          title: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Base info',
          key: 'address',
          render: (h, params) => {
            return (
              <div><span class= "ivu-icon ivu-icon-ios-checkmark">123</span>
                <span class= "ivu-icon ivu-icon-ios-checkmark">123</span>
                <span class= "ivu-icon ivu-icon-ios-checkmark">1234</span>
              </div>)
          }
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '备注',
          key: 'note'
        },
        {
          title: '操作人',
          key: 'operator'
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
                onClick = {() => { this.check(params) }
                }>
              查看 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [
        {
          id: 1,
          name: '11111',
          firstName: '2222',
          lastName: 'qincai',
          type: 'No',
          note: '2016-10-03',
          operator: 'zhangsan'
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
      allocationSells: '',
      sellsList: [{
        value: '0',
        label: '张三'
      }],
      isSaller: false,
      dateValue: [],
      total1: 0
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
    check (params) {
      this.$http.installerCheck({
        id: params.row.id
      }).then((data) => {
        this.$router.push({name: 'Crm Check', params: data.data})
        console.log(data)
      })
    },
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
      this.$router.push('/crm/CrmPoolAdd')
    },
    allocation () {
      this.isSaller = true
    },
    selectSellOk () {},
    cancel () {},
    invalidBussinessExport () {
      this.$http.invalidBussinessListExport({
        email: this.email ? this.email : '',
        name: this.company ? this.company : '',
        industryJoin: this.trade ? this.trade : '',
        beginTime: new Date(this.dateValue[0]).getTime(),
        endTime: new Date(this.dateValue[1]).getTime()
      }).then((data) => {
        // this.installerdata = data.list;
      })
    },
    handleChange (date) {
      this.dateValue = date
    },
    invalidInstallerList () {
      this.$http.crmInstallerList({
        state: this.state ? this.state : null,
        city: this.city ? this.city : null,
        name: this.company ? this.company : null,
        beginTime: new Date(this.dateValue[0]).getTime() ? new Date(this.dateValue[0]).getTime() : null,
        endTime: new Date(this.dateValue[1]).getTime() ? new Date(this.dateValue[1]).getTime() : null,
        type: this.type ? this.type : null,
        industry: this.trade ? this.trade : null,
        email: this.email ? this.email : null,
        typeJoin: this.trade === '0' ? this.trade + this.trade1 : this.trade
      }).then((data) => {
        this.installerdata = data.list
        this.total = data.total
        // data.list.forEach()
      })
    }
  }
}
</script>

<style scoped>

</style>
