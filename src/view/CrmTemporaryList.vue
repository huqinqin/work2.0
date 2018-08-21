<template>
  <Tabs type="card" @on-click="tableChange">
    <TabPane label="未分配">
      <div class="temporaryPool">
        <Row>
          <Col span="4" style="padding-right:10px">
          <span>Associate store:</span>
          <Select v-model="noAssociateStore">
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
          <Col span="4" style="padding-right:10px">
          <span>联系状态:</span>
          <Select v-model="contact">
            <Option v-for="item in contactList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" style="padding-right:10px">
          <span>行业:</span>
          <Select v-model="trade">
            <Option v-for="item in tradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" style="padding-right:10px" v-if="trade === '视频监控'">
          <span style="color: #F0F0F0">111</span>
          <Select v-model="trade1">
            <Option v-for="item in tradeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4" style="padding-right:10px">
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
              <FormItem  prop="subInvalidBussinessSelect">
                <Select v-model="formValidate.subInvalidBussinessSelect" v-if="formValidate.invalidBussinessSelect === '黑名单'" style="width:200px">
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
            title="分配sales"
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
          <Col span="4" style="padding-right:10px">
          <div>Associate store:</div>
          <Select v-model="associateStore">
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
          <Col span="5" style="padding-right:10px" v-if="noAllocation === '视频监控'">
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
          <Button type="primary" @click="invalidBussiness1">无效商机</Button>
          <Button type="error" @click="exportInstallerList('1')">导出</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table :columns="installerList1" :data="installerdata1" @on-select="collection" @on-select-all="collectionAll" @on-selection-change="cancleCollection"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total1" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
            </div>
          </div>
          </Col>
        </Row>
        <!--<Row>
          <Modal v-model="importInstallerModal1" width="360" title="导入模板" @on-ok="importInsatterData">
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
        </Row>-->
        <!--<Row>
          <Modal v-model="invalidBussinessModal1" width="600" title="无效商机" @on-ok="handleSubmit1" @on-cancel="handleReset">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
              <FormItem label="类型" prop="invalidBussinessSelect1">
                <Select v-model="formValidate1.invalidBussinessSelect1" style="width:200px">
                  <Option v-for="item in invalidBussinessList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem  prop="subInvalidBussinessSelect1">
                <Select v-model="formValidate1.subInvalidBussinessSelect1" v-if="formValidate1.invalidBussinessSelect1 === '黑名单'" style="width:200px">
                  <Option v-for="item in subInvalidBussinessList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注" prop="note1">
                <Row>
                  <Col span="18">
                  <Input v-model="formValidate1.note1" type="textarea" placeholder="Enter something..." />
                  </Col>
                </Row>
              </FormItem>
              <div style="margin-left: 80px">注：如果已开通商城账号，加入无效商机名单后将冻结该工程商的账号</div>
            </Form>
          </Modal>
        </Row>-->
        <Row>
          <Modal v-model="invalidBussinessModal1" width="600" title="无效商机" @on-ok="handleSubmit" @on-cancel="handleReset">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="类型" prop="invalidBussinessSelect">
                <Select v-model="formValidate.invalidBussinessSelect" style="width:200px">
                  <Option v-for="item in invalidBussinessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem  prop="subInvalidBussinessSelect">
                <Select v-model="formValidate.subInvalidBussinessSelect" v-if="formValidate.invalidBussinessSelect === '黑名单'" style="width:200px">
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
            v-model="isSaller1"
            title="批量分配sales"
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
            @on-ok="newContactOk"
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
      noAllocation: '',
      noAllocationTradeList: [{
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
      noAllocation1: '',
      noAllocationTradeList1: [{
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
            if (params.row.address) {
              return (
                <div><span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.detail ? params.row.address.detail : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.state ? params.row.address.state : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.city ? params.row.address.city : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.country ? params.row.address.country : ''}</span>
                </div>
              )
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
          title: 'Base info',
          key: 'address',
          render: (h, params) => {
            if (params.row.address) {
              return (
                <div><span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.detail ? params.row.address.detail : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.state ? params.row.address.state : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.city ? params.row.address.city : ''}</span>
                  <span class= "ivu-icon ivu-icon-ios-checkmark">{params.row.address.country ? params.row.address.country : ''}</span>
                </div>
              )
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
      installerdata1: [],
      importInstallerModal: false,
      importInstallerModal1: false,
      invalidBussinessModal: false,
      invalidBussinessModal1: false,
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
      subInvalidBussinessList: [{
        value: '竞争对手',
        label: '竞争对手'
      }, {
        value: '坏账',
        label: '坏账'
      }, {
        value: '其它',
        label: '其它'
      }],
      /* invalidBussinessList1: [{
        value: '黑名单',
        label: '黑名单'
      }, {
        value: '终端用户',
        label: '终端用户'
      }, {
        value: '非安防行业',
        label: '非安防行业'
      }],
      subInvalidBussinessList1: [{
        value: '竞争对手',
        label: '竞争对手'
      }, {
        value: '坏账',
        label: '坏账'
      }, {
        value: '其它',
        label: '其它'
      }], */
      formValidate: {
        subInvalidBussinessSelect: '',
        invalidBussinessSelect: '',
        note: ''
      },
      /* formValidate1: {
        subInvalidBussinessSelect1: '',
        invalidBussinessSelect1: '',
        note1: ''
      }, */
      ruleValidate: {
        /* subInvalidBussinessSelect: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ], */
        invalidBussinessSelect: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],
        note: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ]
      },
      /* ruleValidate1: {
        /!*subInvalidBussinessSelect1: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],*!/
        invalidBussinessSelect1: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],
        note1: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ]
      }, */
      isSaller: false,
      isSaller1: false,
      allocationSells: '',
      sellsList: [],
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
      dateValue: '',
      ids: [],
      selection: [],
      total1: 0,
      page: 1,
      allot: 0,
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
      row: 0
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
    receive (params) {
      this.selection = []
      this.selection.push(params.row)
      this.batchCollectionInstaller()
    },
    changeSize (row) {
      this.row = row
      this.getTemplatePoolInstallerList(this.allot)
    },
    batchCollectionInstaller () {
      if (this.selection.length > 0) {
        this.ids = []
        this.selection.forEach((item) => { this.ids.push(item.id) })
        this.$http.batchCollectionInstaller({
          ids: this.ids ? this.ids : []
        }).then((data) => {
          this.$Message.success('success')
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
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.getTemplatePoolInstallerList(this.allot)
    },
    tableChange (name) {
      this.allot = name
      this.getTemplatePoolInstallerList(name)
    },
    importInstaller () {
      this.importInstallerModal = true
    },
    invalidBussiness () {
      this.$refs.formValidate.resetFields()
      this.invalidBussinessModal = true
    },
    invalidBussiness1 () {
      this.$refs.formValidate.resetFields()
      this.invalidBussinessModal1 = true
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
              bizNote: this.formValidate.invalidBussinessSelect === '黑名单' ? this.formValidate.invalidBussinessSelect + this.formValidate.subInvalidBussinessSelect : this.formValidate.invalidBussinessSelect,
              bizType: this.formValidate.note
            }).then((data) => {
              this.$Message.success('已添加到无效商机!')
              setTimeout(() => {
                location.reload()
              }, 2000)
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
    handleSubmit1 () {
      this.$refs.formValidate1.validate((valid) => {
        if (valid) {
          if (this.selection.length > 0) {
            let ids = []
            this.selection.forEach((item) => {
              ids.push(item.id)
            })
            this.$http.invalidBussinessListSave({
              companyIds: ids,
              bizNote: this.formValidate1.invalidBussinessSelect1 === '黑名单' ? this.formValidate1.invalidBussinessSelect1 + this.formValidate1.subInvalidBussinessSelect1 : this.formValidate1.invalidBussinessSelect1,
              bizType: this.formValidate1.note1
            }).then((data) => {
              this.$Message.success('已添加到无效商机!')
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
      this.$router.push({name: 'New crease', params: {crmFlag: 1}})
    },
    allocation () {
      this.isSaller = true
    },
    selectSellOk () {
      if (this.selection.length > 0) {
        this.ids = []
        this.selection.forEach((item) => { this.ids.push(item.id) })
        this.$http.batchSalesSure({
          userId: this.allocationSells,
          companyIds: this.ids
        }).then((data) => {
          this.$Message.success('批量分配成功')
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
      } else {
        this.$Message.error('您未选择客户，请选择分配客户')
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
      console.log(selection)
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
    getTemplatePoolInstallerList (val) {
      this.$http.templatePoolInstallerList({
        storeId: val === '0' ? (this.noAssociateStore ? this.noAssociateStore : null) : (this.associateStore ? this.associateStore : null),
        custCode: this.custId ? this.custId : null,
        email: this.email ? this.email : null,
        name: this.company ? this.company : null,
        industryJoin: val === '0' ? (this.trade === '视频监控' ? this.trade + '-' + this.trade1 : this.trade) : (this.noAllocation === '视频监控' ? this.noAllocation + '-' + this.noAllocation1 : this.noAllocation),
        contactStatus: this.contact ? this.contact : null,
        state: this.state ? this.state : null,
        city: this.city ? this.city : null,
        ltsUser: null,
        allotStatus: val,
        page: this.page ? this.page : null,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          item.updateTime1 = this.timeFormat(item.createTime)
        })
        this.installerdata = data.list
        this.installerdata1 = data.list
        this.total = data.total
        this.total1 = data.total
      })
    },
    check (params) {
      this.$router.push({name: 'Crm Check', params: {id: params.row.id}})
      /* this.$http.installerCheck({
            id: params.row.id
          }).then((data) => {
            this.$router.push({name: 'Crm Check', params: data.data})
            console.log(data)
          }) */
    },
    exportInstallerList (val) {
      let s = '/work/crm/export/formoment/list?storeId=' + (val === '0' ? (this.noAssociateStore ? this.noAssociateStore : '') : (this.associateStore ? this.associateStore : 0)) + '&city=' + this.city + '&name=' + this.company + '&custCode=' + this.custId + '&industryJoin=' + this.trade + '&email=' + this.email +
          '&contactStatus=' + this.contact + '&state=' + this.state + '&allotStatus=' + val
      window.open(s)
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
    newContactOk () {},
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
    },
    importInsatterData () {
      this.$http.crmInstallerListImport({
        fileUrl: 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/' + this.formData.key
      }).then((data) => {
        alert('导入成功')
      })
    }
  },
  mounted () {
    this.getStoreList()
    this.getTemplatePoolInstallerList('0')
    this.getSalesList()
  },
  beforeMount () {
    this.getPolicy()
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
