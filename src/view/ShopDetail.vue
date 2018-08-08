<template>
  <card>
    <p>基础信息</p>
    <table border="1" class="baseDataTable">
      <tr>
        <td class="speTd">门店名</td>
        <td>{{form.storeName}}</td>
        <td class="speTd">门店电话</td>
        <td>{{form.phone}}</td>
      </tr>
      <tr>
        <td class="speTd">详细地址</td>
        <td>{{form.address.detail}}</td>
        <td class="speTd">邮编</td>
        <td>{{form.address.zip}}</td>
      </tr>
    </table>
    <p>联系人</p>
    <table border="1" class="baseDataTable" v-for="(contact, index) in form.contact" :key="index">
      <tr>
        <td class="speTd">First Name</td>
        <td>{{contact.firstName}}</td>
        <td class="speTd">Last Name</td>
        <td>{{contact.lastName}}</td>
      </tr>
      <tr>
        <td class="speTd">邮箱</td>
        <td>{{contact.email}}</td>
        <td class="speTd">手机</td>
        <td>{{contact.phone}}</td>
      </tr>
    </table>
  </card>
</template>
<script>
export default {
  name: 'ShopDetail',
  data () {
    return {
      form: {
        storeName: '', contact: [], address: {}, phone: ''
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
