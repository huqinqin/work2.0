<template>
  <card>
    <p>基础信息</p>
    <table border="1" class="baseDataTable">
      <tr>
        <td class="speTd">门店名</td>
        <td>{{form.name}}</td>
        <td class="speTd">门店电话</td>
        <td>{{form.phone}}</td>
      </tr>
      <tr>
        <td class="speTd">详细地址</td>
        <td>{{form.address}}</td>
        <td class="speTd">邮编</td>
        <td>{{form.zip}}</td>
      </tr>
    </table>
    <p>联系人</p>
    <table border="1" class="baseDataTable">
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
    </table>
  </card>
</template>
<script>
export default {
  data () {
    return {
      url: '/shop',
      form: {
        name: '', contact: '', address: '', city: '', state: '', country: '', zip: '', phone: '', mobile: '', status: ''
      }
    }
  },
  beforeMount () {
    this.$http.getShop({id: this.$route.params.id}).then(data => {
      this.form = data
    })
  }
}
</script>
