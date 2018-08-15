<template>
  <div>
    <Row>
      <Col>
      <Table :columns="LogList" :data="Logdata"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total1" :current="1" @on-change="changePage"></Page>
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
          key: 'loginDate'
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
      Logdata: [
        {
          logTime: '09-21-2018 10:09:09',
          account: '1984288545@qq.com',
          logMethod: 'pc端登陆'
        }
      ],
      total1: 0,
      page: 1
    }
  },
  methods: {
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = page
      this.crmLogList()
    },
    back () {
      // this.$router.push('/crm/CrmPoolCheck')
      history.go(-1)
    },
    crmLogList () {
      this.$http.crmLog({
        companyId: parseInt(this.$route.params.id),
        page: this.page,
        rows: 10
      }).then((data) => {
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
