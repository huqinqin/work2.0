<template>
  <div>
    <Row>
      <Col>
      <Table :columns="AllocationList" :data="AllocationData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-sizer></Page>
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
      AllocationList: [
        {
          title: '时间',
          key: 'updateTime1'
        },
        {
          title: '类型',
          key: 'recordNote'
        },
        {
          title: '店铺',
          key: 'operatorUid'
        },
        {
          title: 'sales',
          key: 'operatorName'
        },
        {
          title: '操作人',
          key: 'operatorName'
        }
      ],
      AllocationData: [],
      total: 0,
      page: 1,
      row: 10
    }
  },
  methods: {
    changePage (page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = page
      this.allocationList()
    },
    changeSize (row) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.row = row
      this.allocationList()
    },
    back () {
      console.log(this.$route.params)
      this.$router.push({name: 'Crm Check', params: this.$route.params})
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
    allocationList () {
      this.$http.allocationSales({
        page: this.page,
        rows: this.row
      }).then((data) => {
        data.list.forEach((item) => {
          item.updateTime1 = this.timeFormat(item.createTime)
        })
        this.AllocationData = data.list
        this.total = data.total
      })
    }
  },
  mounted () {
    this.allocationList()
  }
}
</script>

<style scoped>

</style>
