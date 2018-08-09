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
                  <span>{{custId}}</span>
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
               <FormItem label="E-mail" prop="mail" span="8">
                 <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
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
                   <Option value="1000">1000人以上</Option>
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
             <Button type="primary" @click="validForm">Submit</Button>
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
        size: '',
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
          company: '',
          lat: 0,
          lng: 0
        }
      },
      addModal: false,
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
      custIdSelect: '',
      companySelect: '',
      firstNameSelect: '',
      lastNameSelect: '',
      custId: ''
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
      console.log('0000')
    },
    sureSelect () {},
    cancleSelect () {},
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
    selectInstaller () {
      this.addModal = true
    },
    validForm () {
      Promise.all([this.$refs.address.valid(), this.$refs.formValidate.validate()]).then(data => {
        if (data.every(valid => { return valid })) {
          this.$http.crmInstallerList({
            name: this.formValidate.companyName,
            source: this.formValidate.source,
            type: this.formValidate.type,
            staffNum: this.formValidate.size,
            subStoreNum: this.formValidate.num,
            shoppingNum: this.formValidate.amount,
            industry: this.formValidate.industry === '视频监控' ? this.formValidate.industry + '-' + this.formValidate.industryType : this.formValidate.industry,
            phone: this.formValidate.telephone,
            address: this.form.address,
            email: this.formValidate.mail,
            inPoolType: this.$route.params.crmFlag
          }).then((data) => {
            this.custId = data.data
          })
        } else {
        }
      })
    }
  },
  components: {
    MapAutoComplete: () => import('@/components/MapAutoComplete')
  }
}
</script>

<style scoped>

</style>
