<template>
  <div class="crmPoolAdd">
    <h2>编辑工程商</h2>
    <div>
      <h4>基础信息</h4>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Row>
            <i-col span="8">
              <FormItem label="cust id" prop="custId" >
                <span>{{formValidate.custCode}}</span>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="公司名称" prop="companyName" span="8">
                <Input v-model="formValidate.companyName" placeholder="Enter your name"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="公司电话" prop="telephone" span="8">
                <Input v-model="formValidate.telephone" placeholder="Enter your name"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="网址" prop="mail" span="8">
                <Input v-model="formValidate.mail" placeholder="Enter your"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="类型" prop="type" span="8">
                <Select v-model="formValidate.type" placeholder="Select your city">
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
                <Select v-model="formValidate.size" placeholder="Select your city">
                  <Option value="0-20">0-20人</Option>
                  <Option value="20-100">20-100人</Option>
                  <Option value="100-500">100-500人</Option>
                  <Option value="500-1000">500-1000人</Option>
                  <Option value="1000人以上">1000人以上</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="分店数量" prop="num" span="8">
                <Input v-model="formValidate.num" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="行业" prop="industry" span="8">
                <Select v-model="formValidate.industry" placeholder="Select your city">
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
                <Select v-model="formValidate.industryType" placeholder="Select your city">
                  <Option value="IP">IP</Option>
                  <Option value="HD-TVI">HD-TVI</Option>
                  <Option value="Both">Both</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="年采购量" prop="amount" span="8">
                <Input v-model="formValidate.amount" placeholder="Enter your name"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="客户来源" prop="source" span="8">
                <Select v-model="formValidate.source" placeholder="Select your city">
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
            <Button style="margin-left: 8px" @click="cancleBack">Cancel</Button>
          </i-col>
        </Row>
      </Form>
    </div>
    <Row>
      <Modal v-model="addModal" width="1200" title="选择客户" @on-ok="sureSelect" @on-cancel="cancleSelect">
        <Row>
          <Col span="8" style="padding-right:10px">
          <span>cust id:</span>
          <Input v-model="custIdSelect" placeholder="Enter city" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>company:</span>
          <Input v-model="companySelect" placeholder="Enter company" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>First name</span>
          <Input v-model="firstNameSelect" placeholder="Enter company" />
          </Col>
          <Col span="8" style="padding-right:10px">
          <span>Last name:</span>
          <Input v-model="lastNameSelect" placeholder="Enter company" />
          </Col>
          <Col span="6" style="padding-right:10px">
          <div style="color: white">1</div>
          <Button @click="search" type="primary">搜索</Button>
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
        size: [],
        total1: 0,
        num: '',
        industry: '',
        industryType: '',
        amount: '',
        source: ''
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
      data: {},
      loading: false,
      page: 1
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
      console.log(this.selection)
      this.ids = []
      this.selection.forEach((item) => { this.ids.push(item.id) })
      this.$http.crmInstallerList({
        recCid: this.ids.id,
        email: this.formValidate.mail,
        staffNum: this.formValidate.size,
        subStoreNum: this.formValidate.num,
        type: this.formValidate.type,
        source: this.formValidate.source,
        name: this.formValidate.companyName,
        telphone: this.formValidate.telephone,
        industry: this.formValidate.industry === '视频监控' ? this.formValidate.industry + '-' + this.formValidate.industryType : this.formValidate.industry,
        shoppingNum: this.formValidate.amount
      }).then((data) => { console.log(data) })
    },
    cancleSelect () {},
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = page
      this.selectInstallerEvent()
    },
    selectInstaller () {
      this.addModal = true
    },
    validForm () {
      this.loading = true
      Promise.all([this.$refs.address.valid(), this.$refs.formValidate.validate()]).then(data => {
        if (data.every(valid => { return valid })) {
          this.$http.crmInstallerList({
            id: this.$route.params.id,
            name: this.formValidate.companyName,
            source: this.formValidate.source,
            type: this.formValidate.type,
            staffNum: this.formValidate.size,
            subStoreNum: this.formValidate.num,
            shoppingNum: this.formValidate.amount,
            industry: this.formValidate.industry === '视频监控' ? this.formValidate.industry + '-' + this.formValidate.industryType : this.formValidate.industry,
            phone: this.formValidate.telephone,
            address: this.form.address,
            homeUrl: this.formValidate.mail,
            inPoolType: this.$route.params.crmFlag
          }).then((data) => {
            // this.custId = data.data
            this.loading = false
            this.$router.push({name: 'Crm Check', params: data})
          }, (error) => {
            setTimeout(() => {
              this.loading = false
              this.$Message.error(error.err)
            }, 2000)
          }
          )
        } else {
          setTimeout(() => {
            this.loading = false
            this.$Message.error('分配错误')
          }, 2000)
        }
      })
    },
    getInstallerList () {
      this.$http.installerCheck({
        id: parseInt(this.$route.params.id)
      }).then((data) => {
        this.formValidate.custCode = data.custCode
        this.formValidate.companyName = data.name
        this.formValidate.telephone = data.phone
        this.formValidate.mail = data.homeUrl
        this.formValidate.type = data.type
        this.formValidate.size = data.staffNum
        this.formValidate.num = data.subStoreNum
        this.formValidate.industry = data.industry.indexOf('视频监控') > -1 ? data.industry.split('-')[0] : data.industry
        this.formValidate.industryType = data.industry.indexOf('视频监控') > -1 ? data.industry.split('-')[1] : ''
        this.formValidate.amount = data.shoppingNum
        this.formValidate.source = data.source
        this.formValidate.industry = data.industry
        this.form.address.detail = data.address.detail
        this.form.address.state = data.address.state
        this.form.address.city = data.address.city
        this.form.address.street = data.address.street
        this.form.address.zip = data.address.zip
        this.form.address.country = data.address.country
        console.log(data.industry.indexOf('视频监控') > -1 ? (data.industry.split('-')[0] || data.industry.split('-')[1]) : data.industry)
      })
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
        /* this.total1 = data.total */
      })
    },
    cancleBack () {
      history.back()
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
    this.getInstallerList()
    this.selectInstallerEvent()
  }
}
</script>

<style scoped>

</style>
