<template>
<div class="details">
  <card>
    <p slot="title">审核列表</p>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">邮箱</td>
          <td>{{form.email}}</td>
          <td class="speTd">公司名</td>
          <td>{{form.company}}</td>
        </tr>
        <tr>
          <td class="speTd">Cust ID</td>
          <td>{{form.custId}}</td>
          <td class="speTd">申请时间</td>
          <td>{{form.applyAt}}</td>
        </tr>
        <tr>
          <td class="speTd">未处理时间</td>
          <td>{{form.waitTime}}</td>
          <td class="speTd">分配时间</td>
          <td>{{form.allotAt}}</td>
        </tr>
        <tr>
          <td class="speTd">审核时间</td>
          <td>{{form.reviewAt}}</td>
          <td class="speTd">状态</td>
          <td>{{form.status}}</td>
        </tr>
      </table>
  </card>
  <card>
    <p slot="title">分销证信息</p>
    <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/517fb939633a317caf7bb2da5fb23a70.png" alt="">
    <MapAutoComplete></MapAutoComplete>
    <Form label-position="top">
      <FormItem label="有效期">
          <RadioGroup v-model="vertical" vertical>
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
        <Input type="textarea" :rows="10"></Input>
      </FormItem>
    </Form>
  </card>
  <footer class="footer-tools">
    <i-button type="primary">保存</i-button>
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
      url: null
    }
  }
}
</script>
<style lang="css" scoped>
</style>
