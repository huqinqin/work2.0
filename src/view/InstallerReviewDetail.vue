<template>
<div class="details">
  <card>
    <p slot="title">审核列表</p>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">公司名</td>
          <td>{{form.storeName}}</td>
          <td class="speTd">公司电话</td>
          <td>{{form.phone}}</td>
        </tr>
        <tr>
          <td class="speTd">First Name</td>
          <td>{{form.userFirstName}}</td>
          <td class="speTd">Last Name</td>
          <td>{{form.userLastName}}</td>
        </tr>
        <tr>
          <td class="speTd">邮箱</td>
          <td>{{form.email}}</td>
          <td class="speTd">手机</td>
          <td>{{form.phone}}</td>
        </tr>
        <tr>
          <td class="speTd">申请时间</td>
          <td>{{form.appleAt}}</td>
          <td class="speTd">分配时间</td>
          <td>{{form.allotAt}}</td>
        </tr>
        <tr>
          <td class="speTd">行业类型</td>
          <td>{{form.industry}}</td>
          <td class="speTd">详细地址</td>
          <td>{{form.address}}</td>
        </tr>
      </table>
  </card>
  <card>
    <p slot="title">分销证信息</p>
    <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/517fb939633a317caf7bb2da5fb23a70.png" alt="">
    <MapAutoComplete :googleAddress="form.certAddress" ref="address"></MapAutoComplete>
    <Form label-position="top" ref="certInfo" :rules="rules">
      <FormItem label="有效期" prop="">
          <RadioGroup vertical>
              <Radio label="长期">
                  <span>长期</span>
              </Radio>
              <Radio label="有效期">
                  <span>有效期</span>
                  <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
              </Radio>
          </RadioGroup>
      </FormItem>
      <FormItem label="Cust ID" prop="custId">
        <Input v-model="form.custId"/>
      </FormItem>
    </Form>
  </card>
  <card>
    <p slot="title">审核信息</p>
    <Form ref="reviewInfo" :rules="rules">
      <FormItem label="选择销售" prop="masterSaleId">
        <Select v-model="form.masterSaleId">
            <Option value="beijing">New York</Option>
            <Option value="shanghai" disabled>London</Option>
            <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="审核信息" prop="message">
        <Input type="textarea" :rows="10" v-model="form.message"/>
      </FormItem>
    </Form>
  </card>
  <footer class="footer-tools">
    <i-button type="primary" @click="pass">通过</i-button>
    <i-button type="primary" @click="refuse">打回</i-button>
  </footer>
</div>
</template>
<script>
export default {
  name: 'InstallerReviewDetail',
  components: {
    MapAutoComplete: () => import('@/components/MapAutoComplete.vue')
  },
  data () {
    return {
      url: '/store',
      form: {
        id: '',
        storeName: '',
        userFirstName: '',
        userLastName: '',
        phone: '',
        email: '',
        appleAt: '',
        allotAt: '',
        industry: '',
        address: '',
        storeCertImgUrl: '',
        certAddress: '',
        certIsLong: '',
        certIndate: '',
        custId: '',
        saler: '',
        message: '',
        masterSaleId: ''
      },
      rules: {
        custId: [{required: true, message: 'The input cannot be empty', trigger: 'blur'}],
        masterSaleId: [{required: true, message: 'The input cannot be empty', trigger: 'blur'}],
        message: [{required: true, message: 'The input cannot be empty', trigger: 'blur'}]
      }
    }
  },
  methods: {
    pass () {
      // Promise.all([this.$refs.address.valid(), this.$refs.certInfo.validate(), this.$refs.reviewInfo.validate()]).then(data => {
      Promise.all([this.$refs.address.valid()]).then(data => {
        if (data.every(valid => { return valid })) {
          this.$http.passReview({
            id: this.form.id,
            code: this.form.custId,
            storeCert: {
              imgUrl: this.form.storeCertImgUrl,
              code: this.form.custId,
              address: this.form.certAddress,
              ext: {}
            },
            masterSaleId: this.form.masterSaleId,
            content: this.form.message
          }).then(data => {
            this.$Message.success('成功通过审核')
            this.$router.push({name: 'installer_review_list'})
          })
        }
      })
    },
    refuse () {
      this.$refs.reviewInfo.validate(valid => {
        if (valid) {
          this.$http.refuseReview({id: this.form.id, content: this.form.message}).then(data => {
            this.$Message.error('已拒绝')
            this.$router.push({name: 'installer_review_list'})
          })
        }
      })
    }
  },
  beforeMount () {
    this.$http.getReview({ id: this.$route.params.id }).then(data => {
      this.form = data
    })
    console.log(this.$route)
  }
}
</script>
<style lang="css" scoped>
</style>
