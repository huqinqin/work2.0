<template>
    <div class="checkInstaller">
      <h2>查看工程商</h2>
      <div class="btn">
        <Button type="primary" @click="log">登陆日志</Button>
        <Button type="primary" @click="allocation">分配纪录</Button>
      </div>
      <div class="top">
        <div class="topLeft">
          <div class="imgLeft"><img src="../assets/images/logo-min.jpg" alt=""></div>
          <div>XXXX公司</div>
          <div>商城账号:123456@qq.com</div>
        </div>
        <div class="topRight">
          <Row>
            <Col span="6">
              <span>cust id:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>公司名称:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>公司电话:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>网址:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>客户来源:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>类型:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>员工数量:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>行业:</span><span>XXXXXX</span>
            </Col>
            <Col span="12">
            <span>公司地址:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <Button type="primary">登陆日志</Button>
            </Col>
            <Col span="6">
            <Button>分配纪录</Button>
            </Col>
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
          <span>XX</span>
        </Col>
        <Col span="6">
          <span>用户质量：</span>
          <span>XX</span>
        </Col>
        <Col span="6">
          <span>用户分层：</span>
          <span>XX</span>
        </Col>
        <Col span="6">
          <span>促销属性：</span>
          <span>XX</span>
        </Col>
        <Col span="24">
          <Checkbox v-model="promotionEmail">是否接受促销邮件</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table :columns="installerInfo" :data="installerInfoData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
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
            <Page :total="100" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
        </Col>
      </Row>
      <h2>沟通纪录</h2>
      <div class="record">
        <Row class="recordContent">
          <div span="24">
            <span>08-20-2018 10:09:09</span>
            <span>未联系</span>
            <span>电话沟通</span>
          </div>
          <div span="24">
            <span>XX门店</span>
            <span>XXSales</span>
          </div>
          <div span="24" class="remark">
            <div>备注:</div>
            <p>WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</p>
          </div>
        </Row>
      </div>
    </div>
</template>

<script>
export default {
  name: 'crm-pool-check',
  data () {
    return {
      installerList: [
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
                onClick = {() => { this.check(params.index) }}>
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
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }
      ],
      installerInfo: [
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
                onClick = {() => { this.editInstaller(params) }}>
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
      installerInfoData: [
        {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }
      ],
      installerCard: [
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
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
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
      loading: true
    }
  },
  methods: {
    check (index) {
      console.log(index)
    },
    del (index) {
      this.self.installerdata.splice(index, 1)
    },
    ceateNewInstaller () {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    submitNewInstaller () {
      console.log('9999')
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
    maintenance () {
      this.$refs.formInline.resetFields()
      this.maintenanceInstallerModal = true
    },
    modify (params) {
      // console.log(params);
      this.InstallerCardModal = true
    },
    maintenanceInstaller () {
      console.log('hfjdsk')
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
    }
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
