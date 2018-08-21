<template>
  <div class="crmContact">
    <h2>沟通纪录</h2>
    <Button type="primary" @click="back">返回</Button>
    <ul>
      <li v-for="(item) in contactInstallerList" :key="item.id">
        <span></span>
        <div>
          <span>{{item.cdate1}}</span>
          <span class="status">{{item.status === 1 ? "未联系" : (item.status === 2 ? "联系中未询价" : (item.status === 3 ? "联系中询价中" : (item.status === 4 ? "激活已下单" : (item.status === 5 ? "拉新已下单" : "无效客人"))))}}</span>
          <span>{{item.type === 1 ? " 电话沟通" : (item.type === 2 ? "邮件沟通" : (item.type === 3 ? "当面拜访" : "其他"))}}</span></div>
        <div><span>{{item.storeName}}门店</span><span>{{item.salesName}}sales</span></div>
        <div><span>备注:</span></div>
        <div><p>{{item.note}}</p></div>
      </li>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
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
      total: 0,
      row: 10
    }
  },
  methods: {
    add0 (m) { return m < 10 ? '0' + m : m },
    timeFormat (timestamp) {
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds)
    },
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
        companyId: this.$route.params.id,
        page: this.page,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          item.cdate1 = this.timeFormat(item.cdate)
        })
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
    },
    changeSize (row) {
      this.row = row
      this.contactListRecode()
    }
  },
  mounted () {
    this.contactListRecode()
    this.contactListRecode()
  }
}
</script>

<style lang="less" scoped>
   .status{
     color: red;
     margin: 0 10px;
   }
</style>
