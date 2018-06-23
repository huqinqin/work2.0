<template>
  <div>
    <Row>
        <Col span="1" offset="1">属性1：</Col>
        <Col span="8">
          <Tag v-for="item in count" checkable color="blue" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
          <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAdd">
        </Col>
    </Row>
    <DragableTable
      v-model="tableData"
      :columns-list="columnsList"
      @on-start="handleOnstart1"
      @on-end="handleOnend1"
    ></DragableTable>
  </div>
</template>
<script>
export default {
  components: {
    DragableTable: () => import('@/components/DragableTable.vue')
  },
  data () {
    return {
      count: [0, 1, 2],
      table1: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        draggingRecord: []
      },
      columnsList: [
        {
          title: '',
          key: 'drag',
          width: 90,
          align: 'center',
          render: (h) => {
            return h(
              'Icon',
              {
                props: {
                  type: 'arrow-move',
                  size: 24
                }
              }
            )
          }
        },
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '属性1',
          key: 'todoItem'
        },
        {
          title: '属性2',
          key: 'remarks'
        },
        {
          title: '销售价格',
          key: 'price',
          render: this.editCellRender
        },
        {
          title: 'SKU编码',
          key: 'sku',
          render: this.editCellRender
        },
        {
          title: '操作',
          key: 'edit',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <i-button type={this.tableData[params.index].edit ? 'success' : 'primary'} size="small" style={{marginRight: '5px'}} on-click={() => this.editCell(params.index, 'edit', !this.tableData[params.index].edit)}>{params.row.edit ? '保存' : '编辑'}</i-button>
            )
          }
        }
      ],
      tableData: [
        {
          todoItem: '明天去后海玩',
          remarks: '估计得加班',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '后天去和妹子看电影',
          remarks: '可能没妹子',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '大后天去吃海天盛筵',
          remarks: '没钱就不去了',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '周末去看电影',
          remarks: '估计得加班',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '下个月准备回家看父母',
          remarks: '估计得加班',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '该买回家的票了',
          remarks: '可能没票了',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '过年不回家和父母视频聊天',
          remarks: '一定要记得',
          price: 300,
          sku: 'tr'
        },
        {
          todoItem: '去车站接父母一起在北京过年',
          remarks: 'love',
          price: 300,
          sku: 'tr'
        }
      ]
    }
  },
  methods: {
    initColumnsList () {
      this.columnsList.forEach(column => {
        if (column.key === 'edit') {
          this.$set(column, 'render', (h, params) => {
            return (
              <i-button type={this.tableData[params.index].edit ? 'success' : 'primary'} size="small" style={{marginRight: '5px'}} on-click={() => this.editCell(params.index, 'edit', !this.tableData[params.index].edit)}>{params.row.edit ? '保存' : '编辑'}</i-button>
            )
          })
        }
      })
    },
    editCellRender (h, params) {
      const value = params.row[params.column.key]
      if (params.row.edit) {
        return (
          <i-input on-input={(e) => this.editCell(params.index, params.column.key, e)} value={value}></i-input>
        )
      } else {
        return (<span>{value}</span>)
      }
    },
    editCell (rowIndex, key, value) {
      this.tableData[rowIndex][key] = value
      if (key === 'edit') {
        // 当点击按钮时，从新加载表格，触发表格刷新
        this.initColumnsList()
      }
    },
    handleOnstart1 (from) {
      this.table1.oldIndex = from
      this.table1.hasDragged = true
      this.table1.isDragging = true
    },
    handleOnend1 (e) {
      this.table1.isDragging = false
      this.table1.draggingRecord.unshift({
        from: e.from + 1,
        to: e.to + 1
      })
    },
    handleAdd () {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1)
      } else {
        this.count.push(0)
      }
    },
    handleClose2 (event, name) {
      const index = this.count.indexOf(name)
      this.count.splice(index, 1)
    }
  },
  beforeMount () {
    this.tableData.forEach(item => { item.edit = false })
  }
}
</script>
<style scoped>
.btn-add{
  width: 80px;
  height: 24px;
  line-height: 24px;
  padding: 2px 7px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px dashed #dddee1;
}
.btn-add:focus{
  border: 1px dashed #57a3f3;
  outline: none;
}
</style>
