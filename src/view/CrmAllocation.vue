<template>
  <div>
    <Row>
      <Col>
      <Table :columns="AllocationList" :data="AllocationData"></Table>
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
      AllocationList: [
        {
          title: '时间',
          key: 'cdate'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '店铺',
          key: 'storeName'
        },
        {
          title: 'sales',
          key: 'salesName'
        },
        {
          title: '操作人',
          key: 'note'
        }
      ],
      AllocationData: [
        {
          allocationTime: '09-23-2018 10：00：00',
          type: '系统到期进入公海池',
          shop: 'GA',
          sales: 'qincai',
          handle: '系统自动'
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
    },
    allocationList () {
      this.$http.allocationSales({}).then((data) => {
        this.AllocationData = data.list
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
