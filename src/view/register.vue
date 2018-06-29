<template>
  <div>
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <Steps :current="current">
      <Step title="步骤1"></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>
    <Row>
      <Form  :model="formInline" :rules="ruleInline" inline ref="formInline">
        <Col span="24">
       <FormItem prop="email" label="Email">
        <Input type="text" v-model="formInline.email" placeholder="email"></Input>
      </FormItem>
        </Col>
        <Col span="24">
       <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Valid Email</Button>
      </FormItem>
        </Col>
    </Form>
    </Row>
    <Row>
      <Form ref="formDetailInfo" :model="formDetailInfo" :rules="ruleInline" inline class="detailForm">
        <h2>Company Information</h2>
        <Col span="24">
      <FormItem prop="companyName" label="company name">
        <Input type="text" v-model="formDetailInfo.companyName" placeholder="companyName">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="firstName" label="first name">
        <Input type="text" v-model="formDetailInfo.firstName" placeholder="firstName">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="lastName" label="last name">
        <Input type="text" v-model="formDetailInfo.lastName" placeholder="lastName">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="bussinessPhone" label="bussiness phone">
        <Input type="text" v-model="formDetailInfo.bussinessPhone" placeholder="bussinessPhone">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="mobilePhone" label="mobile phone">
        <Input type="text" v-model="formDetailInfo.mobilePhone" placeholder="mobilePhone">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="office" label="office">
        <Select v-model="formDetailInfo.office" clearable style="width:200px">
          <Option v-for="item in formDetailInfo.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="customerId" label="customer id">
        <Input type="text" v-model="formDetailInfo.customerId" placeholder="customerId">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="typeOfBussiness" label="type of bussiness">
        <Input type="text" v-model="formDetailInfo.typeOfBussiness" placeholder="typeOfBussiness">
        </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="pic" label="Upload Resale Certificate Photo：">
        <Upload
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
      </FormItem>
        </Col>
        <Col span="24" style="margin-top: 100px">
      <h2>Address Information</h2>
        </Col>
        <div>
          <MapAutoComplete></MapAutoComplete>
        </div>
      <h2>Login Information</h2>
        <Col span="24">
      <FormItem prop="pwd" label="password">
          <Input type="text" v-model="formDetailInfo.pwd" placeholder="password">
          </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem prop="confirmpwd" label="confirm password">
          <Input type="text" v-model="formDetailInfo.confirmpwd" placeholder="confirmpwd">
          </Input>
      </FormItem>
        </Col>
        <Col span="24">
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Valid Email</Button>
      </FormItem>
        </Col>
    </Form>
    </Row>
  </div>
</template>

<script>
import MapAutoComplete from '@/components/MapAutoComplete'
export default {
  name: 'register',
  data () {
    return {
      current: 0,
      formInline: {
        email: ''
      },
      formDetailInfo: {
        companyName: '',
        firstName: '',
        lastName: '',
        bussinessPhone: '',
        mobilePhone: '',
        office: '',
        customerId: '',
        typeOfBussiness: '',
        pic: '',
        cityList: [
          {
            value: 'City of Industry,CA',
            label: 'City of Industry,CA'
          },
          {
            value: 'Newark,CA',
            label: 'Newark,CA'
          },
          {
            value: 'Mount Laurel,NJ',
            label: 'Mount Laurel,NJ'
          },
          {
            value: 'Dallas,TX',
            label: 'Dallas,TX'
          },
          {
            value: 'Houston,TX',
            label: 'Houston,TX'
          },
          {
            value: 'Elk Grove Village,IL',
            label: 'Elk Grove Village,IL'
          },
          {
            value: 'Port Washington,NY',
            label: 'Port Washington,NY'
          }, {
            value: 'Lanham,MD',
            label: 'Lanham,MD'
          }, {
            value: 'Miami,FL',
            label: 'Miami,FL'
          }, {
            value: 'Phoenix,AZ',
            label: 'Phoenix,AZ'
          }, {
            value: 'Norcross,GA',
            label: 'Norcross,GA'
          }
        ],
        pwd: '',
        confirmpwd: ''
      },
      ruleInline: {
        email: [
          { required: true, message: 'required filed', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      if (this.current === 3) {
        this.current = 0
      } else {
        this.current += 1
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    isEmailFormShow () {
      this.$refs.formInline.$el.style.display = 'block'
      this.$refs.formDetailInfo.$el.style.display = 'none'
    }
  },
  components: {
    MapAutoComplete
  },
  mounted () {
    this.isEmailFormShow()
  }
}
</script>

<style lang="less">

</style>
