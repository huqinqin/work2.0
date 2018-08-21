<template>
  <div>
    <Row>
      <Col>
      <Table :columns="LogList" :data="Logdata"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total1" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
      </Col>
    </Row>
    <Button type="primary" @click="back">返回</Button>
  </div>
</template>

<script>
export default {
  name: 'crm-log',
  data () {
    return {
      LogList: [
        {
          title: '时间',
          key: 'updateTime1'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '登陆方式',
          key: 'loginSource'
        }
      ],
      Logdata: [],
      total1: 0,
      page: 1,
      row: 10
    }
  },
  methods: {
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = page
      this.crmLogList()
    },
    changeSize (row) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.row = row
      this.crmLogList()
    },
    back () {
      // this.$router.push('/crm/CrmPoolCheck')
      history.go(-1)
    },
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
    crmLogList () {
      this.$http.crmLog({
        companyId: parseInt(this.$route.params.id),
        page: this.page,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          item.updateTime1 = this.timeFormat(item.loginDate)
        })
        this.total1 = data.total
        this.Logdata = data.list
      })
    }
  },
  mounted () {
    this.crmLogList()
  }
}
</script>

<style scoped>

</style>
