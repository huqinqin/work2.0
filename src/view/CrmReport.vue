<template>
  <div class="privatePool">
    <Row>
      <Col span="6" style="padding-right:10px">
      <span>state:</span>
      <AutoComplete
        v-model="state"
        :data="stateList"
        :filter-method="filterMethod"
        @on-search="handleSearch1"
        placeholder="input here"></AutoComplete>
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>city:</span>
      <Input v-model="city" placeholder="Enter city" />
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>company:</span>
      <Input v-model="company" placeholder="Enter company" />
      </Col>
      <Col span="6" style="padding-right:10px">
      <span>time:</span>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
      </Col>
    </Row>
    <Row>
      <Col span="5" style="padding-right:10px">
      <span>type:</span>
      <Select v-model="type">
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>行业:</span>
      <Select v-model="trade">
        <Option v-for="item in tradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px" v-if="trade === 'New York1'">
      <span style="color: #F0F0F0">111</span>
      <Select v-model="trade">
        <Option v-for="item in tradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>Email:</span>
      <Input v-model="email" placeholder="Enter email" />
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
      <!--<Button type="primary" @click="importInstaller">导入</Button>
      <Button type="primary" @click="crmPoolAdd">新增</Button>-->
      <!--<Button type="primary" @click="allocation">批量分配</Button>-->
      <!-- <Button type="primary" @click="invalidBussiness">无效商机</Button>-->
      <Button type="error">导出</Button>
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
      tradeList: [{
        value: 'New York',
        label: 'New York'
      }, {
        value: 'New York1',
        label: 'New York1'
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
        }
      ],
      installerdata: [
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
      allocationSells: '',
      sellsList: [{
        value: '0',
        label: '张三'
      }],
      isSaller: false
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
    cancel () {}
  }
}
</script>

<style scoped>

</style>
