<template>
  <div>
    <i-table
      :data="tableData"
      :columns="columnsList"
    ></i-table>
    <div class="plus-btn">添加</div>
    <Modal
      v-model="isShowSku"
      title="选择sku属性">
      <i-form label-position="top">
        <form-item label="属性">
          <RadioGroup>
            <Radio label="金斑蝶"></Radio>
            <Radio label="爪哇犀牛"></Radio>
            <Radio label="印度黑羚"></Radio>
          </RadioGroup>
        </form-item>
      </i-form>
    </Modal>
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
      isShowSku: false,
      table1: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        draggingRecord: []
      },
      columnsList: [
        {
          title: '编码',
          key: 'sin',
          align: 'center',
          render: this.editCellRender
        },
        {
          title: '排序',
          type: 'onum',
          width: 120,
          align: 'center',
          render: this.editCellRender
        },
        {
          title: '销售价格',
          align: 'center',
          key: 'price',
          width: 160,
          render: this.editCellRender
        },
        {
          title: '单位重量',
          align: 'center',
          key: 'weight',
          width: 160,
          render: (h, params) => {
            return (
              <i-input>
                <span slot="append">磅</span>
              </i-input>
            )
          }
        },
        {
          title: '属性值',
          align: 'center',
          key: 'props',
          render: (h, params) => {
            console.log(params)
            return (
              <span>{params.row.props}<icon class="edit-icon" type="compose" on-click={this.showSku}></icon></span>
            )
          }
        },
        {
          title: '操作',
          key: 'edit',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <i-button type="error" size="small" on-click={() => { this.delSku(params.index) }}>删除</i-button>
            )
          }
        }
      ],
      tableData: [
        {
          props: ['标签1', '标签2'],
          remarks: '估计得加班',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '可能没妹子',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '没钱就不去了',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '估计得加班',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '估计得加班',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '可能没票了',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: '一定要记得',
          price: 300,
          sin: 'tr'
        },
        {
          props: ['标签1', '标签2'],
          remarks: 'love',
          price: 300,
          sin: 'tr'
        }
      ]
    }
  },
  methods: {
    showSku () {
      this.isShowSku = true
    },
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
      return (
        <i-input on-input={(e) => this.editCell(params.index, params.column.key, e)} value={value}></i-input>
      )
    },
    editCell (rowIndex, key, value) {
      this.tableData[rowIndex][key] = value
      if (key === 'edit') {
        // 当点击按钮时，从新加载表格，触发表格刷新
        this.initColumnsList()
      }
    },
    delSku (index) {
      this.tableData.splice(index, 1)
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
.plus-btn{
  text-align: center;
  line-height: 40px;
  border: 1px dashed #dddee1;
  border-top: none;
  cursor: pointer;
}
.plus-btn:hover{
  border: 1px dashed #57a3f3;
  color: #57a3f3;
  border-top: none;
  outline: none;
}
/deep/ .edit-icon{
  margin-left: 8px;
  cursor: pointer;
}
</style>
