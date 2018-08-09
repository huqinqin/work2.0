<template>
  <div class="crmContact">
    <h2>沟通纪录</h2>
    <Button type="primary" @click="back">返回</Button>
    <ul>
      <li v-for="(item) in contactInstallerList" :key="item.id">
        <span></span>
        <div><span>{{item.cdate}}</span><span>{{item.status}}</span><span>{{item.type}}</span></div>
        <div><span>{{item.storeName}}门店</span><span>{{item.salesName}}sales</span></div>
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
      // this.$router.push('/crm/CrmPoolCheck')；
      history.back()
    },
    /* contactListRecode () {
      this.$http.contactList({}).then((data) => {
        this.contactInstallerList = data.data
      })
    }, */
    contactListRecode () {
      this.$http.contactList({
      }).then((data) => {
        this.contactInstallerList = data.list
        console.log(this.contactInstallerList)
      })
    }
  },
  mounted () {
    this.contactListRecode()
    this.contactListRecode()
  }
}
</script>

<style scoped>

</style>
