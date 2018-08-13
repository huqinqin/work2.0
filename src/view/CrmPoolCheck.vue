<template>
    <div class="checkInstaller">
      <h2>查看工程商</h2>
      <span><span>到期时间:</span><span>{{checkDate.expireTime}}</span></span>
      <div class="btn">
        <Button type="primary" @click="log">登陆日志</Button>
        <Button type="primary" @click="allocation">分配纪录</Button>
        <Button type="primary" @click="associateOms">关联oms的cust id</Button>
        <Button type="primary" @click="createShopAccount">创建商城账号</Button>
        <Button type="primary" @click="editInstallerList">编辑</Button>
        <!--<a href="/#/crm/CrmPoolEdit" style="float: right;margin-right:150px">编辑</a>-->
      </div>
      <div class="top">
        <div class="topLeft">
          <div class="imgLeft"><img src="../assets/images/logo-min.jpg" alt=""></div>
          <div>{{checkDate.name}}</div>
          <div>商城账号:{{checkDate.account}}</div>
        </div>
        <div class="topRight">
          <Row>
            <Col span="6">
              <span>cust id:</span><span>{{checkDate.custCode}}</span>
            </Col>
            <Col span="6">
            <span>公司名称:</span><span>{{checkDate.name}}</span>
            </Col>
            <Col span="6">
            <span>公司电话:</span><span>{{checkDate.phone}}</span>
            </Col>
            <Col span="6">
            <span>网址:</span><span>{{checkDate.homeUrl}}</span>
            </Col>
            <Col span="6">
            <span>客户来源:</span><span>{{checkDate.source}}</span>
            </Col>
            <Col span="6">
            <span>类型:</span><span>{{checkDate.type}}</span>
            </Col>
            <Col span="6">
            <span>员工数量:</span><span>{{checkDate.staffNum}}</span>
            </Col>
            <Col span="6">
            <span>行业:</span><span>{{checkDate.industry}}</span>
            </Col>
            <Col span="24">
            <span>公司地址:</span>
            <span><span>详细地址：</span><span>{{checkDate.address.detail}}</span></span>
            <span><span>国家：</span><span>{{checkDate.address.country}}</span></span>
            <span><span>城市：</span><span>{{checkDate.address.city}}</span></span>
            <span><span>州：</span><span>{{checkDate.address.state}}</span></span>
            </Col>
            <!--<Col span="6">
            <Button type="primary">登陆日志</Button>
            </Col>
            <Col span="6">
            <Button>分配纪录</Button>
            </Col>-->
          </Row>
        </div>
      </div>
      <div>
        <h2>新增联系人</h2>
        <Button type="primary" @click="ceateNewInstaller" class="btn">新增联系人</Button>
        <Table :columns="installerList" :data="installerdata"></Table>
      </div>
      <Modal v-model="createInstallerModal" width="360" title="新增联系人" @on-ok="submitNewInstaller" @on-cancel="handleReset">
        <Form ref="formInline" :model="formInline"  inline>
          <FormItem prop="firstName" label="First name">
            <Input type="text" v-model="formInline.firstName" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="lastName" label="Last name">
            <Input type="text" v-model="formInline.lastName" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="job" label="职位">
            <Input type="text" v-model="formInline.job" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="mobile" label="联系电话">
            <Input type="text" v-model="formInline.mobile" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="email" label="email">
            <Input type="text" v-model="formInline.email" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="checked" label="00">
            <Checkbox v-model="formInline.checked">已验证</Checkbox>
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="maintenanceInstallerModal" width="360" title="维护用户特点" @on-ok="maintenanceInstaller" @on-cancel="handleReset">
        <Form :model="formItem" :label-width="100" ref="maintenanceForm">
          <FormItem label="用户分类">
            <Select v-model="formItem.select">
              <Option value="1">活跃</Option>
              <Option value="2">不活跃</Option>
              <Option value="3">潜在</Option>
              <Option value="4">内部测试</Option>
            </Select>
          </FormItem>
          <FormItem label="用户质量">
            <Select v-model="formItem.quality">
              <Option value="1">高质量用户</Option>
              <Option value="2">中质量用户</Option>
              <Option value="3">低质量用户</Option>
            </Select>
          </FormItem>
          <FormItem label="用户分层">
            <Select v-model="formItem.level">
              <Option value="1">0</Option>
              <Option value="2">1</Option>
              <Option value="3">2</Option>
              <Option value="4">3</Option>
              <Option value="5">4</Option>
              <Option value="6">5</Option>
            </Select>
          </FormItem>
          <FormItem label="促销属性">
            <CheckboxGroup v-model="formItem.checkbox">
              <Checkbox label="1" value="1">价格敏感</Checkbox>
              <Checkbox label="2" value="2">服务敏感</Checkbox>
              <Checkbox label="3" value="3">品牌敏感</Checkbox>
              <Checkbox label="4" value="4">质量敏感</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="接受促销邮件">
            <RadioGroup v-model="formItem.radio">
              <Radio label="true" value="1">是</Radio>
              <Radio label="false" value="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
      <Modal ref="InstallerCardModal" :loading="loading"  v-model="InstallerCardModal" width="600" title="分销证信息" @on-ok="InstallerCardInfo" @on-cancel="handleReset">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="分销证信息" prop="cardInfo">
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
          </FormItem>
          <!--<FormItem label="公司名" prop="companyName">
            <Input v-model="formValidate.companyName" placeholder="Enter your e-mail"></Input>
          </FormItem>-->
          <FormItem label="分销证号" prop="cardNum">
            <Input v-model="formValidate.cardNum" placeholder="Enter "></Input>
          </FormItem>
          <FormItem label="公司名" prop="companyName">
            <Input v-model="formValidate.companyName" placeholder="Enter "></Input>
          </FormItem>
          <FormItem>
            <i-col :span="24">
              <MapAutoComplete :googleAddress="form.address" ref="address"></MapAutoComplete>
            </i-col>
          </FormItem>
          <FormItem label="有效期时间" prop="expireTime">
            <DatePicker style="width: 200px" type="datetimerange" placeholder="Select date" :value="dateValue" @on-change="handleChange" ></DatePicker>
          </FormItem>
        </Form>
      </Modal>
      <!--做到查看->用户特点-->
      <Row>
        <Col span="24">
          <h2>用户特点</h2>
          <Button type="primary" @click="maintenance" class="btn">维护</Button>
        </Col>
        <Col span="6">
          <span>用户分类：</span>
          <span>{{checkDate.ext ? (checkDate.ext.cate === 1 ? '活跃' : (checkDate.ext.cate === 2 ? '不活跃' : (checkDate.ext.cate === 3) ? '潜在': '内部测试')) : ''}}</span>
        </Col>
        <Col span="6">
          <span>用户质量：</span>
          <span>{{checkDate.ext ? (checkDate.ext.quality === 1 ? '高质量' : (checkDate.ext.quality === 2 ? '中质量' :  '低质量')) : ''}}</span>
        </Col>
        <Col span="6">
          <span>用户分层：</span>
          <span>{{checkDate.ext ? parseInt(checkDate.ext.layer) - 1 : ''}}</span>
        </Col>
        <Col span="6">
          <span>促销属性：</span>
          <span>{{checkDate.ext ? (checkDate.ext.promotionAttr === 1 ? '价格敏感' : (checkDate.ext.promotionAttr === 2 ? '服务敏感' : (checkDate.ext.promotionAttr === 3 ? '品牌敏感' : '质量敏感'))) : ''}}</span>
        </Col>
        <Col span="24">
          <Checkbox v-if='checkDate.ext' v-model="checkDate.ext.promotionEmail">是否接受促销邮件</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table :columns="installerInfo" :data="installerInfoData"></Table>
        <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
          <div style="float: right;">
            <Page @on-change="changePage" @on-page-size-change="changeSize" :total="total1" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
        </Col>
      </Row>
      <h2>分销证管理</h2>
      <Button type="primary" @click="newCardInfo" class="btn">新增</Button>
      <Row>
        <Col>
        <Table :columns="installerCard" :data="installerCardData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page @on-change="changePage" @on-page-size-change="changeSize" :total="total2" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
        </Col>
      </Row>
      <h2>沟通纪录</h2>
      <!--有权限的按钮-->
      <Button type="primary" @click="newContactMethod" class="btn">增加沟通纪录</Button>
      <div class="record">
        <Row class="recordContent">
          <ul>
            <li v-for="(item,index) in contactInstallerList" :key="item.id" v-if="index < 3">
              <div span="24">
                <span>{{item.cdate}}</span>
                <span>{{item.status}}</span>
                <span>{{item.type}}</span>
              </div>
              <div span="24">
                <span>{{item.storeName}}门店</span>
                <span>{{item.salesName}}sales</span>
              </div>
              <div span="24" class="remark">
                <div>备注:</div>
                <p>{{item.note}}</p>
              </div>
            </li>
          </ul>
          <a @click="jumpContactPage">More</a>
        </Row>
      </div>
      <Row>
        <Modal
          v-model="newContactRecode"
          title="新增沟通纪录"
          @on-ok="newRecordOk"
          @on-cancel="cancel">
          <div>
            <span>时间:</span>
            <DatePicker  style="width: 200px" type="date" placeholder="Select date" :value="dateValue1" @on-change="handleChange1"></DatePicker>
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
      <Row>
        <Modal
          v-model="createNewAccount"
          title="创建商城账号"
          @on-ok="selectSellOk"
          @on-cancel="cancel">
            <span>商城账号:</span>
            <Select v-model="newAccount" style="width:200px">
              <Option v-for="item in newAccountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Modal>
      </Row>
      <Row>
        <Modal
          v-model="createOmsCustId"
          title="创建cust id"
          @on-ok="createCustIdOk"
          @on-cancel="cancel">
          <span>cust id:</span>
          <Input v-model="createCustId"  placeholder="Enter something..." />
        </Modal>
      </Row>
    </div>
</template>

<script>
export default {
  name: 'crm-pool-check',
  data () {
    return {
      installerList: [
        {
          title: 'First name',
          key: 'firstName'
        },
        {
          title: 'Last name',
          key: 'lastName'
        },
        {
          title: '职位',
          key: 'position'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: 'Email',
          key: 'email'
        },
        {
          title: '账号',
          key: 'open'
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
                onClick = {() => { this.check(params) }}>
                  编辑 </i-button>
              <i-button
                type = "primary"
                onClick = {() => { this.del(params) }
                }>
                  删除 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [],
      installerInfo: [
        {
          title: '采购总额',
          key: 'totalPayAmount'
        },
        {
          title: '合作时长',
          key: 'inDays'
        },
        {
          title: '首单成交时间',
          key: 'firstOrderDate'
        },
        {
          title: '首单金额',
          key: 'firstOrderPayAmount'
        },
        {
          title: '首单来源',
          key: 'firstOrderSource'
        },
        {
          title: '最近成交时间',
          key: 'lastOrderDate'
        },
        {
          title: '最近一单金额',
          key: 'lastOrderPayAmount'
        },
        {
          title: '订单数量',
          key: 'totalPayAmount'
        },
        {
          title: '退货量',
          key: 'refundNum'
        },
        {
          title: '优惠券',
          key: 'enabledCouponNum'
        }
      ],
      installerInfoData: [],
      installerCard: [
        {
          title: '图片',
          render: (h, params) => {
            return (
              <div><img src={params.row.imgUrl} style="width:20px;height:20px"/></div>)
          }
        },
        {
          title: '分销证号',
          key: 'number'
        },
        {
          title: '详细地址',
          key: 'detail'
        },
        {
          title: '城市',
          key: 'city'
        },
        {
          title: '州',
          key: 'state'
        },
        {
          title: '国家',
          key: 'country'
        },
        {
          title: '邮编',
          key: 'zip'
        },
        {
          title: '有效结束时间',
          key: 'expireEndTime'
        },
        {
          title: '审核状态',
          key: 'status'
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
                onClick = {() => { this.modify(params) }}>
            修改 </i-button>
              <i-button
                type = "primary"
                onClick = {() => { this.del(params) }
                }>
            删除 </i-button>
              </div>)
          }
        }
      ],
      installerCardData: [
        {
          card: '11111',
          detail: '2222',
          city: 'xiao',
          state: 'qincai',
          country: 'No',
          zip: '77034',
          expireEndTime: '09-20-2018',
          status: '已通过'
        }
      ],
      self: '',
      createInstallerModal: false,
      formInline: {
        firstName: '',
        lastName: '',
        job: '',
        mobile: '',
        email: '',
        checked: false
      },
      promotionEmail: '',
      maintenanceInstallerModal: false,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: '',
        quality: '',
        level: ''
      },
      formValidate: {
        companyName: '',
        cardNum: '',
        cardInfo: ''
      },
      ruleValidate: {
        /* cardInfo: [
          { required: true, message: 'The cardInfo cannot be empty', trigger: 'blur' }
        ], */
        cardNum: [
          { required: true, message: 'cardNum cannot be empty', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: 'cardNum cannot be empty', trigger: 'blur' }
        ]
      },
      InstallerCardModal: false,
      cardInfo: '',
      uploadList: [],
      form: {
        address: {
          detail: '',
          country: '',
          state: '',
          city: '',
          street: '',
          zip: '',
          /* company: '', */
          lat: 0,
          lng: 0
        }
      },
      loading: true,
      newContactRecode: false,
      dateValue: [],
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
      createNewAccount: false,
      newAccount: '',
      newAccountList: [],
      createCustId: '',
      contactNote: '',
      createOmsCustId: false,
      checkDate: {
        address: {
          detail: ''
        },
        contact: [],
        ext: {}
      },
      contactInstallerList: [],
      data: {},
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
      total1: 0,
      total2: 0
    }
  },
  methods: {
    check (params) {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
      this.formInline.firstName = params.row.firstName
      this.formInline.lastName = params.row.lastName
      this.formInline.job = params.row.position
      this.formInline.email = params.row.email
      this.formInline.mobile = params.row.phone
      // this.formInline.checked = params.row.open
    },
    del (params) {
      this.$http.delCard({
        id: params.row.id
      }).then((data) => {
        this.self.installerdata.splice(params.index, 1)
      })
    },
    ceateNewInstaller () {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    submitNewInstaller () {
      this.$http.createLinkman({
        companyId: parseInt(this.$route.params.id),
        firstName: this.formInline.firstName,
        lastName: this.formInline.lastName,
        phone: this.formInline.mobile,
        position: this.formInline.job,
        email: this.formInline.email
      }).then((data) => {
        location.reload()
        // console.log(data)
      })
    },
    handleReset () {
      console.log('77777')
      this.$refs.formInline.resetFields()
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
    changeSize (row) {
      console.log(row)
    },
    maintenance () {
      this.$refs.maintenanceForm.resetFields()
      this.maintenanceInstallerModal = true
    },
    modify (params) {
      console.log(params)
      this.InstallerCardModal = true
      this.formValidate.cardNum = params.row.number
      // this.formValidate.companyName = params.row.number;
      this.form.address = params.row.address
    },
    maintenanceInstaller () {
      this.$http.maintenanceList({
        cate: this.formItem.select,
        quality: this.formItem.quality,
        layer: this.formItem.level,
        promotionAttr: this.formItem.checkbox.join(),
        promotionEmail: this.formItem.radio,
        companyId: this.$route.params.id
      }).then((data) => {
        console.log(data)
      })
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    InstallerCardInfo () {
      Promise.all([this.$refs.address.valid(), this.$refs.formValidate.validate()]).then(data => {
        if (data.every(valid => { return valid })) {
          setTimeout(() => {
            this.changeLoading()
            this.$http.cardSave({
              // companyName: this.formValidate.companyName ? this.formValidate.companyName : null,
              imgUrl: 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/' + this.formData.key,
              number: this.formValidate.cardNum ? this.formValidate.cardNum : null,
              address: this.form.address ? this.form.address : null,
              companyId: this.$route.params.id,
              companyName: this.formValidate.companyName ? this.formValidate.companyName : null,
              expireStartTime: new Date(this.dateValue[0]).getTime() ? new Date(this.dateValue[0]).getTime() : null,
              expireEndTime: new Date(this.dateValue[1]).getTime() ? new Date(this.dateValue[1]).getTime() : null
            }).then((data) => {
              this.InstallerCardModal = false
              this.$Message.success('done')
              location.reload()
            })
          }, 1000)
        } else {
          return this.changeLoading()
        }
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    editInstaller (params) {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    newCardInfo () {
      this.$refs.formValidate.resetFields()
      this.InstallerCardModal = true
    },
    log () {
      this.$router.push({name: 'Crm Log', params: this.$route.params.id})
    },
    allocation () {
      this.$router.push('/crm/CrmAllocation')
    },
    newContactMethod () {
      this.newContactRecode = true
      console.log('00000')
    },
    cancel () {},
    selectSellOk () {
      this.$http.createAccount({
        companyId: parseInt(this.$route.params.id),
        email: this.newAccount
      }).then((data) => {})
    },
    createCustIdOk () {
      this.$http.omsId({
        companyId: parseInt(this.$route.params.id),
        custCode: this.createCustId
      }).then((data) => {})
    },
    newRecordOk () {
      this.$http.newContactList({
        companyId: parseInt(this.$route.params.id),
        type: this.newType,
        status: this.newContact,
        note: this.contactNote,
        cdate: this.dateValue1
      }).then((data) => {
        console.log(data)
      })
    },
    handleChange (date) {
      this.dateValue = date
    },
    handleChange1 (date) {
      this.dateValue1 = date
    },
    associateOms () {
      this.createOmsCustId = true
    },
    createShopAccount () {
      this.createNewAccount = true
      console.log('1111')
    },
    contactListRecode () {
      this.$http.contactList({
      }).then((data) => {
        this.contactInstallerList = data.list
        console.log(this.contactInstallerList)
      })
    },
    editInstallerList () {
      this.$router.push({name: 'Crm Edit', params: this.$route.params.id})
    },
    /* 通过id查询工程商列表 */
    getInstallerList () {
      this.$http.installerCheck({
        id: parseInt(this.$route.params.id)
      }).then((data) => {
        this.checkDate = data
        this.installerdata = (data.contact ? data.contact : [])
      })
    },
    /* 分销证列表 */
    cardNumList () {
      this.$http.cardList({
        companyId: parseInt(this.$route.params.id)
      }).then((data) => {
        if (data.length > 0) {
          data.forEach((item) => {
            item.detail = item.address.detail
            item.city = item.address.city
            item.state = item.address.state
            item.zip = item.address.zip
            item.country = item.address.country
            console.log(item.detail)
          })
        }
        this.installerCardData = data
        this.total2 = data.total
      })
    },
    /* 上传图片 */
    handleSuccess (res, file) {
      file.url = this.formUp.host + '/' + this.formUp.dir + '/' + file.name
      file.status = 'finished'
      // this.imgList.push(file)
    },
    /* 得到签名 */
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
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
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
    emailCheck () {
      this.$http.emailSelect({
        companyId: parseInt(this.$route.params.id)
      }).then((data) => {
        if (data.length > 0) {
          data.forEach((item) => {
            let obj = {}
            obj.label = item
            obj.value = item
            this.newAccountList.push(obj)
            console.log(obj)
          })
        }
      })
    },
    purchase () {
      this.$http.purchase({
        companyId: parseInt(this.$route.params.id)
      }).then((data) => {
        this.total1 = data.total
        this.installerInfoData = [data]
      })
    },
    jumpContactPage () {
      this.$router.push({name: 'crm_Contact'})
    }
  },
  mounted () {
    if (this.$route.params) {
      // this.checkDate = this.$route.params;
      // console.log(this.checkDate);
      // this.installerdata = this.checkDate.contact;
      // console.log(this.$route.params);
    };
    this.contactListRecode()
    this.getInstallerList()
    this.cardNumList()
    this.getPolicy()
    this.emailCheck()
    this.purchase()
  }
}
</script>

<style lang="less">
  .checkInstaller{
    .top{
      display: flex;
      .topLeft{
        flex: 0 0 200px;
        width: 200px;
        height: 200px;
        text-align: center;
        .imgLeft{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        span{
        }
      }
      .topRight{
        margin-left:20px;
        flex: 1;
      }
    }
    .record{
      width: 50%;
      border: 1px solid black;
      padding: 10px;
      box-sizing: border-box;
      div{
        margin-bottom: 5px;
      }
      .remark{
        word-break: break-all;
      }
      .recordContent{
        border-bottom: 1px solid #aaa;
      }
    }
    .btn{
      margin: 24px 0;
    }
  }
</style>
