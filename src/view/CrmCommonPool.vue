<template>
  <div class="commonPool">
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
      <span>time:</span>
      <DatePicker @on-change="handleChange" :value="dateValue" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placement="bottom-end" placeholder="Select date"></DatePicker>
      </Col>
    </Row>
    <Row>
      <Col span="5" style="padding-right:10px">
      <span>type:</span>
      <Select v-model="type" clearable>
        <Option v-for="item in typeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px">
      <span>行业:</span>
      <Select v-model="trade" clearable>
        <Option v-for="item in tradeList"   :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="5" style="padding-right:10px" v-if="trade === '视频监控'">
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
      <a @click="reportExportData"><Button type="error">导出</Button></a>
      </Col>
    </Row>
    <Row>
      <Col>
      <Table :columns="installerList" :data="installerdata" @on-select="collection" @on-select-all="collectionAll" @on-selection-change="cancleCollection"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
      </Col>
    </Row>
    <Row>
      <Modal v-model="importInstallerModal" width="360" title="导入模板" @on-ok="importInsatterData">
        <Upload
          ref="upload"
          :show-upload-list="true"
          :on-success="handleSuccess"
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
        <a href="https://ltsb2b2.oss-us-west-1.aliyuncs.com/crm/123.xlsx">下载模板</a>
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
          <FormItem label="" prop="invalidBussinessSelect" v-if="formValidate.invalidBussinessSelect === '黑名单'">
            <Select v-model="formValidate.invalidBussinessSelect1" style="width:200px">
              <Option v-for="item in invalidBussinessList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
      row: 0,
      total: 0,
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
        value: 'Installer',
        label: 'Installer'
      }, {
        value: 'Integrator',
        label: 'Integrator'
      }, {
        value: 'Wholesale',
        label: 'Wholesale'
      }, {
        value: 'Distributor',
        label: 'Distributor'
      }, {
        value: 'Retailer',
        label: 'Retailer'
      }, {
        value: 'Onlinestore',
        label: 'Onlinestore'
      }, {
        value: 'Other',
        label: 'Other'
      }],
      trade: '',
      tradeList: [{
        value: '视频监控',
        label: '视频监控'
      }, {
        value: '门禁',
        label: '门禁'
      }, {
        value: '报警',
        label: '报警'
      }, {
        value: '音视频',
        label: '音视频'
      }, {
        value: '其他',
        label: '其他'
      }],
      trade1: '',
      tradeList1: [{
        value: 'IP',
        label: 'IP'
      }, {
        value: 'HD-TVI',
        label: 'HD-TVI'
      }, {
        value: 'Both',
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
          key: 'firstName1'
        },
        {
          title: 'Last name',
          key: 'lastName1'
        },
        {
          title: 'Base info',
          render: (h, params) => {
            if (params.row.address) {
              return (
                <div>
                  <span class="ivu-icon ivu-icon-ios-checkmark">{params.row.address.detail}</span>
                  <span class="ivu-icon ivu-icon-ios-checkmark">{params.row.address.city}</span>
                  <span class="ivu-icon ivu-icon-ios-checkmark">{params.row.address.state}</span>
                  <span class="ivu-icon ivu-icon-ios-checkmark">{params.row.address.country}</span>
                </div>
              )
            }
          }
        },
        {
          title: 'isCount',
          key: 'hasAccount'
        },
        {
          title: 'Create time',
          key: 'updateTime1'
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
      installerdata: [],
      importInstallerModal: false,
      invalidBussinessModal: false,
      invalidBussinessList: [{
        value: '黑名单',
        label: '黑名单'
      }, {
        value: '终端用户',
        label: '终端用户'
      }, {
        value: '非安防行业',
        label: '非安防行业'
      }],
      invalidBussinessList1: [{
        value: '竞争对手',
        label: '竞争对手'
      }, {
        value: '坏账',
        label: '坏账'
      }, {
        value: '其它',
        label: '其它'
      }],
      formValidate: {
        invalidBussinessSelect: '',
        note: '',
        invalidBussinessSelect1: ''
      },
      ruleValidate: {
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
      },
      searchOptionJoin: {},
      page: 1
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
      // console.log(params);
      this.$router.push({name: 'Crm Check', params: {id: params.row.id}})
      /* this.$http.installerCheck({
            id: params.row.id
          }).then((data) => {
            this.$router.push({name: 'Crm Check', params: data.data})
            console.log(data)
          }) */
    },
    receive (params) {
      this.selection = []
      this.selection.push(params.row)
      this.batchCollectionInstaller()
    },
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.getInstallerList()
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
          if (this.selection.length > 0) {
            let ids = []
            this.selection.forEach((item) => {
              ids.push(item.id)
            })
            this.$http.invalidBussinessListSave({
              companyIds: ids,
              bizNote: this.formValidate.invalidBussinessSelect === '黑名单' ? this.formValidate.invalidBussinessSelect + '-' + this.formValidate.invalidBussinessSelect1 : this.formValidate.invalidBussinessSelect,
              bizType: this.formValidate.note
            }).then((data) => {
              this.$Message.success('已添加到无效商机!')
              location.reload()
            })
          } else {
            this.$Message.error('请勾选工程商进行操作！！')
          }
        } else {
          this.$refs.formValidate.resetFields()
          this.$Message.error('添加失败!')
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
    getInstallerList () {
      this.searchOptionJoin.state = this.state ? this.state : ''
      this.searchOptionJoin.city = this.city ? this.city : ''
      this.searchOptionJoin.name = this.company ? this.company : ''
      this.searchOptionJoin.beginTime = this.dateValue[0] ? this.dateValue[0] : ''
      this.searchOptionJoin.endTime = this.dateValue[1] ? this.dateValue[1] : ''
      this.searchOptionJoin.type = this.type ? this.type : ''
      this.searchOptionJoin.industry = this.trade ? (this.trade === '0' ? this.trade + '-' + this.trade1 : this.trade) : ''
      this.searchOptionJoin.email = this.email ? this.email : ''
      this.$http.crmInstallerListData({
        state: this.state ? this.state : null,
        city: this.city ? this.city : null,
        name: this.company ? this.company : null,
        beginTime: new Date(this.dateValue[0]).getTime() ? new Date(this.dateValue[0]).getTime() : null,
        endTime: new Date(this.dateValue[1]).getTime() ? new Date(this.dateValue[1]).getTime() : null,
        type: this.type ? this.type : null,
        industryJoin: this.trade ? (this.trade === '视频监控' ? this.trade + '-' + this.trade1 : this.trade) : null,
        email: this.email ? this.email : null,
        page: this.page ? this.page : null,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          item.updateTime1 = this.timeFormat(item.createTime)
          if (item.contact && item.contact.length > 0) {
            item.firstName1 = item.contact[0].firstName
            item.lastName1 = item.contact[0].lastName
          }
        })
        this.installerdata = data.list
        this.total = data.total
      })
    },
    handleChange (date) {
      this.dateValue = date
      console.log(this.searchOptionJoin.beginTime)
    },
    batchCollectionInstaller () {
      if (this.selection.length > 0) {
        this.ids = []
        this.selection.forEach((item) => { this.ids.push(item.id) })
        this.$http.batchCollectionInstaller({
          ids: this.ids ? this.ids : []
        }).then((data) => {
          this.$Message.success('success！！！')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }, (error) => {
          this.$Message.error(error.err)
        })
      } else {
        this.$Message.error('请勾选工程商进行操作！！')
      }
    },
    collection (selection, row) {
      this.selection = selection
    },
    collectionAll (selection) {
      this.selection = selection
    },
    cancleCollection (selection) {
      this.selection = selection
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
      // this.imgList.push(file)
    },
    reportExportData () {
      console.log(this.searchOptionJoin.beginTime)
      if (this.searchOptionJoin.beginTime && this.searchOptionJoin.endTime) {
        let s = '/work/crm/export/pub/list?state=' + this.searchOptionJoin.state + '&city=' + this.searchOptionJoin.city + '&beginTime=' + this.searchOptionJoin.beginTime + '&endTime=' + this.searchOptionJoin.endTime +
            '&name=' + this.searchOptionJoin.name + '&type=' + this.searchOptionJoin.type + '&industryJoin=' + this.searchOptionJoin.industry + '&email=' + this.searchOptionJoin.email
        window.open(s)
      } else {
        let s = '/work/crm/export/pub/list?state=' + this.searchOptionJoin.state + '&city=' + this.searchOptionJoin.city + '&name=' + this.searchOptionJoin.name + '&type=' + this.searchOptionJoin.type + '&industryJoin=' + this.searchOptionJoin.industry + '&email=' + this.searchOptionJoin.email
        window.open(s)
      }
    },
    importInsatterData () {
      this.$http.crmInstallerListImport({
        fileUrl: 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/' + this.formData.key
      }).then((data) => {
        this.$Message.success('导入成功')
      }, (error) => {
        this.$Message.error(error.err)
      })
    },
    changeSize (row) {
      this.row = row
      this.getInstallerList()
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
