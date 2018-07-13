<template>
  <div>
    <card class="installer">
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">公司名</td>
          <td>{{form.cust.company}}</td>
          <td class="speTd">姓名</td>
          <td>{{form.cust.fisrtName}}{{form.cust.lastName}}</td>
        </tr>
        <tr>
          <td class="speTd">公司电话</td>
          <td>{{form.cust.phone}}</td>
          <td class="speTd">手机</td>
          <td>{{form.cust.mobile}}</td>
        </tr>
        <tr>
          <td class="speTd">邮箱</td>
          <td>{{form.cust.email}}</td>
          <td class="speTd">行业类型</td>
          <td>{{form.cust.industry}}</td>
        </tr>
        <tr>
          <td class="speTd">申请时间</td>
          <td>{{form.cust.appleAt}}</td>
          <td class="speTd">分配时间</td>
          <td>{{form.cust.allotAt}}</td>
        </tr>
        <tr>
          <td class="speTd">详细地址</td>
          <td>{{form.cust.detail}}</td>
          <td class="speTd">来源</td>
          <td>{{form.cust.source}}</td>
        </tr>
        <tr>
          <td class="speTd">门店/销售</td>
          <td>{{form.cust.store}}{{form.cust.sales}}</td>
          <td class="speTd">Cust id</td>
          <td>{{form.cust.custId}}</td>
        </tr>
      </table>
    </card>
    <card class="cert">
      <Form :model="form" label-position="top">
        <Row>
          <i-col span="24" class="img">
            <img :src="form.url" alt="">
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="分销证号">
              <Input v-model="form.number" type="text" />
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="公司名">
              <Input v-model="form.company" type="text" />
            </FormItem>
          </i-col>
          <i-col span="12">
          <FormItem label="有效期">
            <DatePicker type="datetimerange" placeholder="Select date and time"></DatePicker>
          </FormItem>
          </i-col>
        </Row>
      </Form>
      <MapAutoComplete v-model="form.address"></MapAutoComplete>
      <table border="1" class="remark-table baseDataTable">
        <tr>
          <th>编号</th>
          <th>审核人</th>
          <th>审核时间</th>
          <th>审核内容</th>
        </tr>
        <tr>
          <td>1</td>
          <td>name</td>
          <td>MM-dd-yyyy hh:mm:ss</td>
          <td>remark</td>
        </tr>
        <tr>
          <td>1</td>
          <td>name</td>
          <td>MM-dd-yyyy hh:mm:ss</td>
          <td>remark</td>
        </tr>
        <tr>
          <td>1</td>
          <td>name</td>
          <td>MM-dd-yyyy hh:mm:ss</td>
          <td>remark</td>
        </tr>
      </table>
      <Row class="buttons">
        <i-col span="12">
        <Button @click="review(1)">通过</Button>
        </i-col>
        <i-col span="12">
        <Button @click="review(2)">打回</Button>
        </i-col>
      </Row>
    </card>
  </div>
</template>

<script>
import mixin from '@/mixins/edit'
export default {
  mixins: [mixin],
  name: 'cert-review',
  components: {
    MapAutoComplete: () => import('@/components/MapAutoComplete')
  },
  data () {
    return {
      url: 'cert',
      form: {}
    }
  },
  methods: {
    review (status) {
      console.log('review')
    }
  }
}
</script>

<style scoped lang="less">
  .cert .img{
    text-align: center;
    img{
      height: 256px;
    }
  }
  .buttons .ivu-col{
    text-align: center;
  }
  .remark-table{
    th,td{
      width:30% !important;
    }
    th:nth-child(1),td:nth-child(1){
      width:10% !important;
    }
    th:nth-child(2n-1),td:nth-child(2n-1){
      background-color: #f8f8f9 !important;
    }
  }
</style>
