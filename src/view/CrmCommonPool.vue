<template>
 <div class="commonPool">
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
     <DatePicker @on-change="handleChange" :value="dateValue" type="datetimerange" format="yyyy-MM-dd HH:mm" placement="bottom-end" placeholder="Select date"></DatePicker>
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
       <Button type="primary" @click="getInstallerList">Search</Button>
     </div>
     </Col>
   </Row>
   <Row>
     <Col span="18" style="padding-right:10px">
       <Button type="primary" @click="importInstaller">导入</Button>
       <Button type="primary" @click="crmPoolAdd">新增</Button>
       <Button type="primary" @click="batchCollectionInstaller">批量领取</Button>
       <Button type="primary" @click="invalidBussiness">无效商机</Button>
       <Button type="error">导出</Button>
     </Col>
   </Row>
   <Row>
     <Col>
       <Table :columns="installerList" :data="installerdata" @on-select="collection" @on-select-all="collectionAll"></Table>
       <div style="margin: 10px;overflow: hidden">
         <div style="float: right;">
           <Page :total="100" :current="1" @on-change="changePage"></Page>
         </div>
       </div>
     </Col>
   </Row>
   <Row>
     <Modal v-model="importInstallerModal" width="360" title="导入模板">
       <Upload
         ref="upload"
         :show-upload-list="true"
         :on-success="handleSuccess"
         :format="['jpg','jpeg','png']"
         :max-size="2048"
         :on-format-error="handleFormatError"
         :on-exceeded-size="handleMaxSize"
         :before-upload="beforeLoad"
         :data="Object.assign(formUp, formData)"
         multiple
         type="drag"
         action="//chen0711.oss-cn-hangzhou.aliyuncs.com"
         style="display: inline-block;width:256px; height: 256px;">
         <div style="width: 256px;height:256px;line-height: 256px;">
           <Icon type="camera" size="48"></Icon>
         </div>
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
 </div>
</template>

<script>

export default {
  name: 'crm-common-pool',
  data () {
    return {
      state: '',
      dateValue: '',
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
        value: '0',
        label: 'Installer'
      }, {
        value: '1',
        label: 'Integrator'
      }, {
        value: '2',
        label: 'Wholesale'
      }, {
        value: '3',
        label: 'Distributor'
      }, {
        value: '4',
        label: 'Retailer'
      }, {
        value: '5',
        label: 'Onlinestore'
      }, {
        value: '6',
        label: 'Other'
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
      importInstallerModal: false,
      invalidBussinessModal: false,
      invalidBussinessList: [{
        value: '0',
        label: 'Installer'
      }, {
        value: '1',
        label: 'Integrator'
      }, {
        value: '2',
        label: 'Wholesale'
      }, {
        value: '3',
        label: 'Distributor'
      }, {
        value: '4',
        label: 'Retailer'
      }, {
        value: '5',
        label: 'Onlinestore'
      }, {
        value: '6',
        label: 'Other'
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
      ids: [],
      selection: [],
      formUp: {
        policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
        OSSAccessKeyId: 'LTAIdExaLJELmORj',
        signature: 'Xc8E45q5qzV+9gPLvepFqmS0oVk=',
        preKey: '',
        dir: '',
        host: 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/',
        expire: '',
        success_action_status: 200
      },
      formData: {
        name: '',
        key: '',
        Filename: ''
      }
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
    receive (params) {
      this.selection = []
      this.selection.push(params.row)
      this.batchCollectionInstaller()
      // console.log(this.selection)
      // console.log('11111')
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
      this.$router.push({name: 'New crease', params: {crmFlag: 3}})
    },
    getInstallerList () {
      this.$http.crmInstallerList({
        state: this.state,
        city: this.city,
        name: this.company,
        beginTime: new Date(this.dateValue[0]).getTime(),
        endTime: new Date(this.dateValue[1]).getTime(),
        type: this.type,
        industry: this.trade === '0' ? this.trade + '-' + this.trade1 : this.trade,
        email: this.email
      }).then((data) => {
        // this.installerdata = data.list;
        // data.list.forEach()
      })
    },
    handleChange (date) {
      this.dateValue = date
      console.log(new Date(this.dateValue[0]).getTime())
    },
    batchCollectionInstaller () {
      this.ids = []
      this.selection.forEach((item) => { this.ids.push(item.id) })
      this.$http.batchCollectionInstaller({
        ids: this.ids
      }).then((data) => { console.log(data) })
    },
    collection (selection, row) {
      this.selection = selection
      // console.log(selection);
    },
    collectionAll (selection) {
      this.selection = selection
      // console.log(selection);
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    beforeLoad (file) {
      this.formData.name = file.name
      this.formData.key = this.formUp.preKey + '/' + file.name
      this.formData.Filename = file.name
      this.$nextTick(() => {
        this.$refs.upload.post(file)
      })
      return false
    },
    loadSuccess (response, file) {
      this.img = this.formData.host + '/' + this.formData.dir + '/' + file.name
      console.log(this.img)
      console.log(file)
    },
    loadError (error) {
      console.log(error)
    },
    getPolicy () {
      this.$http.getPolicy().then(data => {
        this.formUp.policy = data.policy
        this.formUp.OSSAccessKeyId = data.accessid
        this.formUp.signature = data.signature
        this.formUp.dir = data.dir
        this.formUp.host = data.host
        this.formUp.preKey = data.dir
        this.formUp.expire = data.expire
      })
    },
    handleSuccess (res, file) {
      file.url = this.formUp.host + '/' + this.formUp.dir + '/' + file.name
      file.status = 'finished'
      this.imgList.push(file)
    }
  },
  mounted () {
    this.getInstallerList()
  },
  beforeMount () {
    this.getPolicy()
  }
}
</script>

<style scoped>

</style>
