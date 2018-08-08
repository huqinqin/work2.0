<template>
    <div class="checkInstaller">
      <h2>查看工程商</h2>
      <span><span>到期时间:</span><span>{{checkDate.expireTime?checkDate.expireTime:"ppp"}}</span></span>
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
          <div>{{checkDate.name?checkDate.name:"ppp"}}</div>
          <div>商城账号:123456@qq.com</div>
        </div>
        <div class="topRight">
          <Row>
            <Col span="6">
              <span>cust id:</span><span>{{checkDate.custCode?checkDate.custCode:"ppppp"}}</span>
            </Col>
            <Col span="6">
            <span>公司名称:</span><span>{{checkDate.name?checkDate.name:'222333'}}</span>
            </Col>
            <Col span="6">
            <span>公司电话:</span><span>{{checkDate.telephone?checkDate.telephone:'44444'}}</span>
            </Col>
            <Col span="6">
            <span>网址:</span><span>{{checkDate.homeUrl?checkDate.homeUrl:'www.baidu.com'}}</span>
            </Col>
            <Col span="6">
            <span>客户来源:</span><span>{{checkDate.source?checkDate.source:'wertty'}}</span>
            </Col>
            <Col span="6">
            <span>类型:</span><span>{{checkDate.type?checkDate.type:'installer'}}</span>
            </Col>
            <Col span="6">
            <span>员工数量:</span><span>{{checkDate.staffNum?checkDate.staffNum:30}}</span>
            </Col>
            <Col span="6">
            <span>行业:</span><span>{{checkDate.industry?checkDate.industry:'34345'}}</span>
            </Col>
            <Col span="12">
            <span>公司地址:</span><span>{{checkDate.address?checkDate.address.detail:'2222'}}</span>
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
        <Form :model="formItem" :label-width="100">
          <FormItem label="用户分类">
            <Select v-model="formItem.select">
              <Option value="0">活跃</Option>
              <Option value="1">不活跃</Option>
              <Option value="2">潜在</Option>
              <Option value="3">内部测试</Option>
            </Select>
          </FormItem>
          <FormItem label="用户质量">
            <Select v-model="formItem.quality">
              <Option value="0">高质量用户</Option>
              <Option value="1">中质量用户</Option>
              <Option value="2">低质量用户</Option>
            </Select>
          </FormItem>
          <FormItem label="用户分层">
            <Select v-model="formItem.level">
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="2">3</Option>
              <Option value="2">4</Option>
              <Option value="2">5</Option>
            </Select>
          </FormItem>
          <FormItem label="促销属性">
            <CheckboxGroup v-model="formItem.checkbox">
              <Checkbox label="价格敏感" value="0"></Checkbox>
              <Checkbox label="服务敏感" value="1"></Checkbox>
              <Checkbox label="品牌敏感" value="2"></Checkbox>
              <Checkbox label="质量敏感" value="3"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="接受促销邮件">
            <RadioGroup v-model="formItem.radio">
              <Radio label="是" value="1">是</Radio>
              <Radio label="否" value="2">否</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Modal>
      <Modal ref="InstallerCardModal" :loading="loading"  v-model="InstallerCardModal" width="600" title="分销证信息" @on-ok="InstallerCardInfo" @on-cancel="handleReset">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="分销证信息" prop="cardInfo">
            <Upload
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="公司名" prop="companyName">
            <Input v-model="formValidate.companyName" placeholder="Enter your e-mail"></Input>
          </FormItem>
          <FormItem label="分销证号" prop="cardNum">
            <Input v-model="formValidate.cardNum" placeholder="Enter your e-mail"></Input>
          </FormItem>
          <FormItem>
            <i-col :span="24">
              <MapAutoComplete :googleAddress="form.address" ref="address"></MapAutoComplete>
            </i-col>
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
          <span>{{checkDate.ext?checkDate.ext.cate:"ppppp"}}</span>
        </Col>
        <Col span="6">
          <span>用户质量：</span>
          <span>{{checkDate.ext?checkDate.ext.quality:"ppppp"}}</span>
        </Col>
        <Col span="6">
          <span>用户分层：</span>
          <span>{{checkDate.ext?checkDate.ext.layer:"ppppp"}}</span>
        </Col>
        <Col span="6">
          <span>促销属性：</span>
          <span>{{checkDate.ext?checkDate.ext.promotionAttr:"ppppp"}}</span>
        </Col>
        <Col span="24">
          <Checkbox v-model="promotionEmail">是否接受促销邮件</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table :columns="installerInfo" :data="installerInfoData"></Table>
        <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
          <div style="float: right;">
            <Page @on-change="changePage" @on-page-size-change="changeSize" :total="100" size="small" show-elevator show-sizer></Page>
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
            <Page @on-change="changePage" @on-page-size-change="changeSize" :total="100" size="small" show-elevator show-sizer></Page>
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
            <li v-for="(item) in contactInstallerList" :key="item.id">
              <div span="24">
                <span>{{item.cdate}}</span>
                <span>{{item.status}}</span>
                <span>{{item.type}}</span>
              </div>
              <div span="24">
                <span>{{item.storeName}}</span>
                <span>{{item.salesName}}</span>
              </div>
              <div span="24" class="remark">
                <div>备注:</div>
                <p>{{item.note}}</p>
              </div>
            </li>
          </ul>
          <a href="/#/crm/CrmContact">More</a>
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
            <DatePicker  style="width: 200px" type="date" placeholder="Select date" :value="dateValue" @on-change="handleChange"></DatePicker>
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
          @on-ok="selectSellOk"
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
          key: 'post'
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
                onClick = {() => { this.del(params.index) }
                }>
                  删除 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [
        {
          firstName: 'xiao',
          lastName: 'qincai',
          post: '前端开发',
          phone: '8965236548',
          email: '4524563@qq.com',
          open: '已开通'
        }
      ],
      installerInfo: [
        {
          title: '采购总额',
          key: 'totalProcurement'
        },
        {
          title: '合作时长',
          key: 'duration'
        },
        {
          title: '首单成交时间',
          key: 'transaction'
        },
        {
          title: '首单金额',
          key: 'firstSingle'
        },
        {
          title: '首单来源',
          key: 'firstSource'
        },
        {
          title: '最近成交时间',
          key: 'lastTime'
        },
        {
          title: '最近一单金额',
          key: 'lastMoney'
        },
        {
          title: '订单数量',
          key: 'orderNum'
        },
        {
          title: '退货量',
          key: 'refund'
        },
        {
          title: '优惠券',
          key: 'coupon'
        }
      ],
      installerInfoData: [
        {
          totalProcurement: '11111',
          duration: '2222',
          firstSingle: '0',
          firstSource: '1',
          transaction: 'xiao',
          lastMoney: 'qincai',
          orderNum: 'No',
          refund: 'a',
          coupon: '11'
        }
      ],
      installerCard: [
        {
          title: '图片',
          render: (h, params) => {
            return (
              <div><img src="#" style="width:20px;height:20px"/></div>)
          }
        },
        {
          title: '分销证号',
          key: 'card'
        },
        {
          title: '详细地址',
          key: 'detailAddress'
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
          key: 'zipCode'
        },
        {
          title: '有效期',
          key: 'dateLine'
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
                onClick = {() => { this.del(params.index) }
                }>
            删除 </i-button>
              </div>)
          }
        }
      ],
      installerCardData: [
        {
          card: '11111',
          detailAddress: '2222',
          city: 'xiao',
          state: 'qincai',
          country: 'No',
          zipCode: '77034',
          dateLine: '09-20-2018',
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
        checked: ''
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
          company: '',
          lat: 0,
          lng: 0
        }
      },
      loading: true,
      newContactRecode: false,
      dateValue: '',
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
      createNewAccount: false,
      newAccount: '',
      newAccountList: [{
        value: '0',
        label: '896267787@qq.com'
      }],
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
      data: {}
    }
  },
  methods: {
    check (params) {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    del (index) {
      this.self.installerdata.splice(index, 1)
    },
    ceateNewInstaller () {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    submitNewInstaller () {
      this.$http.createLinkman({
        firstName: this.formInline.firstName,
        lastName: this.formInline.lastName,
        phone: this.formInline.mobile,
        position: this.formInline.job,
        email: this.formInline.email
      }).then((data) => {
        console.log(data)
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
      this.$refs.formInline.resetFields()
      this.maintenanceInstallerModal = true
    },
    modify (params) {
      // console.log(params);
      this.InstallerCardModal = true
    },
    maintenanceInstaller () {
      this.$http.maintenanceList({
        cate: this.formItem.select,
        quality: this.formItem.quality,
        layer: this.formItem.level,
        promotionAttr: this.formItem.checkbox,
        promotionEmail: this.formItem.radio
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
            this.InstallerCardModal = false
            this.$Message.success('done')
          }, 1000)
        } else {
          return this.changeLoading()
        }
      })
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
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
    editInstaller (params) {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    newCardInfo () {
      this.$refs.formValidate.resetFields()
      this.InstallerCardModal = true
    },
    log () {
      this.$router.push('/crm/CrmLog')
    },
    allocation () {
      this.$router.push('/crm/CrmAllocation')
    },
    newContactMethod () {
      this.newContactRecode = true
      console.log('00000')
    },
    cancel () {},
    selectSellOk () {},
    newRecordOk () {
      this.$http.newContactList({
        storeId: '111',
        saleId: '222',
        type: this.newType,
        status: this.newContact,
        note: this.contactNote,
        cdate: this.dateValue
      }).then((data) => {
        console.log(data)
      })
    },
    handleChange (date) {
      this.dateValue = date
    },
    associateOms () {
      this.createOmsCustId = true
    },
    createShopAccount () {
      this.createNewAccount = true
      console.log('1111')
    },
    contactListRecode () {
      this.$http.contactList({}).then((data) => {
        this.contactInstallerList = data.data
      })
    },
    editInstallerList () {
      this.$router.push({name: 'Crm Edit', params: this.data})
    },
    /* 通过id查询工程商列表 */
    getInstallerList () {
      this.$http.installerCheck({
        id: this.checkDate.id
      }).then((data) => {
        this.data = data.data
        this.installerdata = this.data.contact
      })
    }
  },
  mounted () {
    if (this.$route.params) {
      this.checkDate = this.$route.params
      // this.installerdata = this.checkDate.contact;
      // console.log(this.$route.params);
    };
    this.contactListRecode()
    this.getInstallerList()
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
