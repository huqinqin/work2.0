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
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'crm-contact',
  data () {
    return {
      contactInstallerList: [],
      page: 1,
      total: 0
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
        page: this.page,
        rows: 10
      }).then((data) => {
        this.contactInstallerList = data.list
        this.total = data.total
        console.log(this.contactInstallerList)
      })
    },
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1()
      this.page = page
      this.contactListRecode()
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
