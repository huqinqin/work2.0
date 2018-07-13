<template>
<div class="details">
  <card>
    <p slot="title">审核列表</p>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">公司名</td>
          <td>8447466</td>
          <td class="speTd">公司电话</td>
          <td>Windir</td>
        </tr>
        <tr>
          <td class="speTd">First Name</td>
          <td>full name</td>
          <td class="speTd">Last Name</td>
          <td>2543222</td>
        </tr>
        <tr>
          <td class="speTd">邮箱</td>
          <td>eeeeee@</td>
          <td class="speTd">手机</td>
          <td>eeee</td>
        </tr>
        <tr>
          <td class="speTd">申请时间</td>
          <td>1984年6月22日</td>
          <td class="speTd">分配时间</td>
          <td>2017-07-24 17:25:38</td>
        </tr>
        <tr>
          <td class="speTd">行业类型</td>
          <td></td>
          <td class="speTd">详细地址</td>
          <td>详细地址+城市+州+ 国家， zip code</td>
        </tr>
      </table>
  </card>
  <card>
    <p slot="title">分销证信息</p>
    <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/517fb939633a317caf7bb2da5fb23a70.png" alt="">
    <MapAutoComplete></MapAutoComplete>
    <Form label-position="top">
      <FormItem label="有效期">
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
      <FormItem label="Cust ID">
        <Input></Input>
      </FormItem>
    </Form>
  </card>
  <card>
    <p slot="title">审核信息</p>
    <Form>
      <FormItem label="选择销售">
        <Select>
            <Option value="beijing">New York</Option>
            <Option value="shanghai" disabled>London</Option>
            <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="审核信息">
        <Input type="textarea" :rows="10" v-model="review.content"></Input>
      </FormItem>
    </Form>
  </card>
  <footer class="footer-tools">
    <i-button type="primary" @click="pass">通过</i-button>
    <i-button type="primary" @click="refuse">打回</i-button>
    <i-button type="primary">分配</i-button>
    <i-button type="primary">保存</i-button>
  </footer>
</div>
</template>
<script>
import mixin from '@/mixins/edit.js'
export default {
  name: 'InstallerReviewDetail',
  mixins: [mixin],
  components: {
    MapAutoComplete: () => import('@/components/MapAutoComplete.vue')
  },
  data () {
    return {
      url: '/store',
      form: {
        email: '',
        company: '',
        custId: '',
        applyAt: '',
        waitTime: '',
        allotAt: '',
        reviewAt: '',
        status: ''
      },
      storeCert: {
        address: {}
      },
      review: {
        content: ''
      }
    }
  },
  methods: {
    pass () {
      this.$api.post('store/refuseStore', {id: this.form.id, content: this.review.content}).then(data => {

      })
    },
    refuse () {
      this.$api.post('store/refuseStore', {id: this.form.id, content: this.review.content}).then(data => {

      })
    }
  },
  beforeMount () {
    console.log(this.$route)
  }
}
</script>
<style lang="css" scoped>
</style>
