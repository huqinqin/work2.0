<template>
  <div>
    <template v-if="form">
      <card class="installer">
        <h2>工程商信息</h2>
        <table border="1" class="baseDataTable">
          <tr>
            <td class="speTd">公司名</td>
            <td>{{form.store.name}}</td>
            <td class="speTd">姓名</td>
            <td>{{form.store.contact[0].firstName}} {{form.store.contact[0].lastName}}</td>
          </tr>
          <tr>
            <td class="speTd">公司电话</td>
            <td>{{form.store.contact[0].phone}}</td>
            <td class="speTd">手机</td>
            <td>{{form.store.contact[0].phone}}</td>
          </tr>
          <tr>
            <td class="speTd">邮箱</td>
            <td>{{form.store.contact[0].email}}</td>
            <td class="speTd">行业类型</td>
            <td>{{form.store.ext.industry}}</td>
          </tr>
          <tr>
            <td class="speTd">申请时间</td>
            <td>{{form.store.ext.submitDate}}</td>
            <td class="speTd">分配时间</td>
            <td>{{form.store.ext.assignDate}}</td>
          </tr>
          <tr>
            <td class="speTd">详细地址</td>
            <td>{{form.address.detail}}</td>
            <td class="speTd">来源</td>
            <td>{{form.source}}</td>
          </tr>
          <tr>
            <td class="speTd">门店/销售</td>
            <td>{{form.store.store}}{{form.store.sales}}</td>
            <td class="speTd">Cust id</td>
            <td>{{form.store.code}}</td>
          </tr>
        </table>
      </card>
      <card class="cert">
      <Form :model="form" label-position="top" ref="form" :rules="rules">
        <Row>
          <i-col span="24" class="img">
            <img :src="form.imgUrl" alt="">
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="分销证号" prop="number">
              <Input v-model="form.number" type="text" />
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="公司名" prop="company">
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
      <MapAutoComplete v-model="form.address" ref="address"></MapAutoComplete>
      <table border="1" class="remark-table baseDataTable">
        <tr>
          <th>编号</th>
          <th>审核人</th>
          <th>审核时间</th>
          <th>审核内容</th>
        </tr>
        <tr v-for="(record, index) in form.reviewRecords" :key="record.cdate">
          <td>{{index + 1}}</td>
          <td>{{record.userName}}</td>
          <td>{{new Date(record.cdate)}}</td>
          <td>{{record.content}}</td>
        </tr>
      </table>
      <Row class="buttons">
        <i-col span="12">
        <Button @click="pass">通过</Button>
        </i-col>
        <i-col span="12">
        <Button @click="refuse">打回</Button>
        </i-col>
      </Row>
    </card>
    </template>
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
      url: 'Cert',
      form: null,
      rules: {
        number: [{required: true, message: 'The input cannot be empty', trigger: 'blur'}],
        company: [{required: true, message: 'The input cannot be empty', trigger: 'blur'}]
      }
    }
  },
  methods: {
    refuse () {
      this.$http.refuseCert({
        id: this.$route.params.id
      }).then(() => {
        this.$Notice.success({
          title: '操作成功',
          desc: ''
        })
        this.$router.push({name: 'cert_list'})
      })
    },
    pass () {
      this.$refs.address.valid().then(valid => {
        if (valid) {
          this.$http.passCert({id: this.$route.params.id}).then(() => {
            this.$Notice.success({
              title: '操作成功',
              desc: ''
            })
            this.$router.push({name: 'cert_list'})
          })
        }
      })
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
