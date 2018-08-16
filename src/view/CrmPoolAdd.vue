<template>
  <div class="crmPoolAdd">
    <h2>新增工程商</h2>
    <div>
      <h4>基础信息</h4>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Row>
            <i-col span="8">
              <FormItem label="cust id" prop="custId" >
                <Input v-model="formValidate.custId" placeholder="Enter your cust id"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="公司名称" prop="companyName" span="8">
                <Input v-model="formValidate.companyName" placeholder="Enter your company name"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="公司电话" prop="telephone" span="8">
                <Input v-model="formValidate.telephone" placeholder="Enter your telephone"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="网址" prop="mail" span="8">
                <Input v-model="formValidate.mail" placeholder="Enter"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="类型" prop="type" span="8">
                <Select v-model="formValidate.type" placeholder="Select your type">
                  <Option value="Installer">Installer</Option>
                  <Option value="Integrator"> Integrator</Option>
                  <Option value="Wholesale">Wholesale</Option>
                  <Option value="Distributor">Distributor</Option>
                  <Option value="Retailer">Retailer</Option>
                  <Option value="Onlinestore">Onlinestore</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="员工规模" prop="size" span="8">
                <Select v-model="formValidate.size" placeholder="Select your size">
                  <Option value="0-20">0-20人</Option>
                  <Option value="20-100">20-100人</Option>
                  <Option value="100-500">100-500人</Option>
                  <Option value="500-1000">500-1000人</Option>
                  <Option value="1000">1000人以上</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="分店数量" prop="num" span="8">
                <Input v-model="formValidate.num" placeholder="Enter"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="行业" prop="industry" span="8">
                <Select v-model="formValidate.industry" placeholder="Select">
                  <Option value="视频监控">视频监控</Option>
                  <Option value="门禁">门禁</Option>
                  <Option value="报警">报警</Option>
                  <Option value="音视频">音视频</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8" v-if="formValidate.industry === '视频监控'">
              <FormItem  prop="industryType" span="8">
                <Select v-model="formValidate.industryType" placeholder="Select">
                  <Option value="IP">IP</Option>
                  <Option value="HD-TVI">HD-TVI</Option>
                  <Option value="Both">Both</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="年采购量" prop="amount" span="8">
                <Input v-model="formValidate.amount" placeholder="Enter"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="客户来源" prop="source" span="8">
                <Select v-model="formValidate.source" placeholder="Select">
                  <Option value="搜索">搜索</Option>
                  <Option value="展会">展会</Option>
                  <Option value="偶遇">偶遇</Option>
                  <Option value="客户推荐">客户推荐</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8" v-if="formValidate.source === '客户推荐'">
              <FormItem   span="8">
                <Button type="primary" @click="selectInstaller">选择客户</Button>
              </FormItem>
            </i-col>
          </Row>
          <h5>地址信息</h5>
          <i-col :span="24">
            <MapAutoComplete :googleAddress="form.address" ref="address"></MapAutoComplete>
          </i-col>
          <i-col :span="24">
            <Button type="primary" @click="validForm" :loading="loading">Submit</Button>
            <Button style="margin-left: 8px">Cancel</Button>
          </i-col>
        </Row>
      </Form>
    </div>
    <Row>
      <Modal v-model="addModal" width="1200" title="选择客户" @on-ok="sureSelect" @on-cancel="cancleSelect">
        <Row>
          <Col span="8" style="padding-right:10px">
          <span>cust id:</span>
          <Input v-model="custIdSelect" placeholder="Enter" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>company:</span>
          <Input v-model="companySelect" placeholder="Enter" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>First name</span>
          <Input v-model="firstNameSelect" placeholder="Enter" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>Last name:</span>
          <Input v-model="lastNameSelect" placeholder="Enter" />
          </Col>
          <Col span="6" style="padding-right:10px">
          <div style="color: white">1</div>
          <Button @click="search" type="primary">搜索</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table :columns="installerList" :data="installerdata" @on-select="collection1" @on-select-all="collectionAll" @on-selection-change="cancleCollection"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total1" :current="1" @on-change="changePage"></Page>
            </div>
          </div>
          </Col>
        </Row>
        <!--<Row>
          <Button type="primary" @click="sureSelect">确定</Button>
          <Button @click="cancleSelect">取消</Button>
        </Row>-->
      </Modal>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'crm-pool-add',
  data () {
    return {
      formValidate: {
        companyName: '',
        telephone: '',
        mail: '',
        type: '',
        size: '',
        num: '',
        industry: '',
        industryType: '',
        amount: '',
        source: '',
        custId: ''
      },
      ruleValidate: {
        companyName: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        source: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ]
      },
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
      addModal: false,
      installerList: [
        {
          type: '',
          width: 60,
          align: 'center',
          key: 'raido',
          render: (h, params) => {
            return (
              <div>
                <input type="radio" name="radio" onClick= {() => { this.radio(params.row) } }></input>
              </div>
            )
          }
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
          title: 'email',
          key: 'email'
        },
        {
          title: '联系电话',
          key: 'telephone'
        }
      ],
      installerdata: [],
      custIdSelect: '',
      companySelect: '',
      firstNameSelect: '',
      lastNameSelect: '',
      custId: '',
      selection: [],
      selection1: {},
      ids: [],
      loading: false,
      total1: 0,
      page: 1,
      checked: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    search () {
      this.selectInstallerEvent()
    },
    sureSelect () {
    },
    cancleSelect () {},
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.selectInstallerEvent()
    },
    selectInstallerEvent () {
      this.$http.crmInstallerListData({
        custCode: this.custIdSelect ? this.custIdSelect : null,
        fisrtName: this.firstName ? this.firstName : null,
        lastName: this.lastName ? this.lastName : null,
        name: this.companySelect ? this.companySelect : null,
        page: this.page,
        rows: 10
      }).then((data) => {
        this.installerdata = data.list
        this.total1 = data.total
      })
    },
    selectInstaller () {
      this.addModal = true
      this.checked = false
    },
    validForm () {
      this.loading = true
      Promise.all([this.$refs.address.valid(), this.$refs.formValidate.validate()]).then(data => {
        if (data.every(valid => { return valid })) {
          this.$http.crmInstallerList({
            name: this.formValidate.companyName ? this.formValidate.companyName : null,
            source: this.formValidate.source ? this.formValidate.source : null,
            type: this.formValidate.type ? this.formValidate.type : null,
            staffNum: this.formValidate.size ? this.formValidate.size : '',
            subStoreNum: this.formValidate.num ? this.formValidate.num : '',
            shoppingNum: this.formValidate.amount ? this.formValidate.amount : '',
            industry: this.formValidate.industry ? (this.formValidate.industry === '视频监控' ? this.formValidate.industry + '-' + this.formValidate.industryType : this.formValidate.industry) : null,
            phone: this.formValidate.telephone ? this.formValidate.telephone : '',
            address: this.form.address ? this.form.address : null,
            homeUrl: this.formValidate.mail ? this.formValidate.mail : null,
            inPoolType: this.$route.params.crmFlag,
            custCode: this.formValidate.custId ? this.formValidate.custId : null,
            recCid: this.selection1.id ? this.selection1.id : null
          }).then((data) => {
            this.loading = false
            this.$router.push({name: 'Crm Check', params: {id: data}})
          }, (error) => {
            setTimeout(() => {
              this.loading = false
            }, 2000)
            console.log(error)
          }
          )
        } else {
          setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      })
    },
    collection (selection, row) {
      this.selection = selection
    },
    collection1 (selection, row) {
    },
    collectionAll (selection) {
      this.selection = selection
    },
    cancleCollection (selection) {
      this.selection = selection
    },
    radio (value) {
      this.selection1 = value
      // console.log(this.selection1);
    }
  },
  components: {
    MapAutoComplete: () => import('@/components/MapAutoComplete')
  },
  mounted () {
    this.selectInstallerEvent()
  }
}
</script>

<style  lang="less">
  .crmPoolAdd {
    .layout-column{
      margin: 0;
    }
  }
</style>
