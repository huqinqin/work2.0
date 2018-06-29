<template>
  <card>
    <p slot="title">人员详情</p>
<table border="1" class="baseDataTable">

  <tr>

      <td class="speTd">姓名</td>
      <td>{{form.name}}</td>

      <td class="speTd">角色</td>
      <td>{{form.role}}</td>

  </tr>

  <tr>

      <td class="speTd">公司电话</td>
      <td>{{form.phone}}</td>

      <td class="speTd">手机</td>
      <td>{{form.mobile}}</td>

  </tr>

  <tr>

      <td class="speTd">邮箱</td>
      <td>{{form.email}}</td>

      <td class="speTd">行业类型</td>
      <td>{{form.type}}</td>

  </tr>

  <tr>

      <td class="speTd">申请时间</td>
      <td>{{form.applicationDate}}</td>

      <td class="speTd">分配时间</td>
      <td>{{form.allocationDate}}</td>

  </tr>

  <tr>

      <td class="speTd">详细地址</td>
      <td>{{form.address}}</td>

  </tr>

</table>
  </card>
</template>
<script>
export default {
  data () {
    return {
      url: '人员详情',
      form: {
        name: '',
        role: '',
        phone: '',
        mobile: '',
        email: '',
        type: '',
        applicationDate: '',
        allocationDate: '',
        address: ''
      }
    }
  }
}
</script>
