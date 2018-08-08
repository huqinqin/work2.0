<template>
  <div>
    <Row>
      <Col>
      <Table :columns="LogList" :data="Logdata"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
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
          key: 'logTime'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '登陆方式',
          key: 'logMethod'
        }
      ],
      Logdata: [
        {
          logTime: '09-21-2018 10:09:09',
          account: '1984288545@qq.com',
          logMethod: 'pc端登陆'
        }
      ]
    }
  },
  methods: {
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    },
    mockTableData1 () {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Business' + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
          people: [
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        })
      }
      return data
    },
    back () {
      this.$router.push('/crm/CrmPoolCheck')
    }
  }
}
</script>

<style scoped>

</style>
