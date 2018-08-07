<template>
  <div class="crmContact">
    <h2>沟通纪录</h2>
    <Button type="primary" @click="back">返回</Button>
    <ul>
      <li v-for="(item,index) in contactInstallerList" :key="index">
        <span></span>
        <div><span>{{item.cdate}}</span><span>{{item.status}}</span><span>{{item.type}}</span></div>
        <div><span>{{item.storeName}}</span><span>{{item.salesName}}</span></div>
        <div><span>备注:</span></div>
        <div><p>{{item.note}}</p></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'crm-contact',
  data () {
    return {
      contactInstallerList: []
    }
  },
  methods: {
    back () {
      this.$router.push('/crm/CrmPoolCheck')
    },
    contactListRecode () {
      this.$http.contactList({}).then((data) => {
        this.contactInstallerList = data.data
      })
    }
  },
  mounted () {
    this.contactListRecode()
  }
}
</script>

<style scoped>

</style>
