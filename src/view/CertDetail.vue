<template>
  <div>
    <card class="installer">
      <h2>工程商信息</h2>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">公司名</td>
          <td>{{form.cust.company}}</td>
          <td class="speTd">姓名</td>
          <td>{{form.cust.firstName}} {{form.cust.lastName}}</td>
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
      <h2>分销证信息</h2>
      <table border="1" class="baseDataTable address-table">
        <tr>
          <td class="speTd">分销证号</td>
          <td>{{form.number}}</td>
          <td class="speTd">公司名</td>
          <td>{{form.company}}</td>
        </tr>
        <tr>
          <td class="speTd">有效期</td>
          <td colspan="3">1984年6月22日 - 2017-07-24 17:25:38</td>
        </tr>
        <tr>
          <td class="speTd">地址</td>
          <td colspan="3">{{form.address.detail}}</td>
        </tr>
        <tr>
          <td class="speTd">街道</td>
          <td colspan="3">{{form.address.street}}</td>
        </tr>
        <tr>
          <td class="speTd">城市</td>
          <td>{{form.address.city}}</td>
          <td class="speTd">州</td>
          <td>{{form.address.state}}</td>
        </tr>
        <tr>
          <td class="speTd">邮编</td>
          <td>{{form.address.zip}}</td>
          <td class="speTd">国家</td>
          <td>{{form.address.country}}</td>
        </tr>
      </table>
      <h2>审核记录</h2>
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
          <Button @click="invalid">失效</Button>
        </i-col>
        <i-col span="12">
          <router-link to="/cert/cert_list"><Button>返回</Button></router-link>
        </i-col>
      </Row>
    </card>
  </div>
</template>

<script>
import mixin from '@/mixins/edit'
export default {
  mixins: [mixin],
  name: 'cert-detail',
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
    invalid () {
      this.$api.post(`${this.url}/invalid`, {
        id: this.$route.params.id
      }).then(resp => {
        this.$Notice.success({
          title: 'Handle success',
          desc: ''
        })
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
  .address-table{
    .address-td, .valid-td{
      width:90% !important;
    }
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
