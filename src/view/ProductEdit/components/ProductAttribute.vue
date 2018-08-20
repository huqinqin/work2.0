<template>
  <div>
    <i-table
      :data="tableData"
      :columns="columnsList"
    ></i-table>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      table1: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        draggingRecord: []
      },
      checkedProps: {},
      columnsList: [
        {
          title: '编码',
          key: 'sin',
          align: 'center',
          render: this.editCellRender
        },
        {
          title: '排序',
          key: 'onum',
          width: 120,
          align: 'center',
          render: this.editCellRender
        },
        {
          title: '单位重量',
          align: 'center',
          key: 'weight',
          width: 160,
          render: this.editCellRender
        },
        {
          title: '销售价格',
          align: 'center',
          key: 'basePrice',
          width: 160,
          render: this.editCellRender
        },
        {
          title: '是否默认价格',
          align: 'center',
          key: 'priceStatus',
          width: 160,
          render: this.changePriceStatusRender
        },
        {
          title: '属性值',
          align: 'center',
          key: 'props',
          render: (h, params) => {
            return (
              <span>
                {params.row.props.map(t => {
                  return <span>{t.value}|</span>
                })}
              </span>
            )
          }
        }
      ]
    }
  },
  computed: {
    tableData () {
      return this.value
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
      return (
        <i-input on-on-blur={(e) => this.editCell(params.index, params.column.key, e)} value={value}></i-input>
      )
    },
    changePriceStatusRender (h, params) {
      const value = params.row[params.column.key]
      return (
        <i-switch true-value="default" false-value="enabled" on-on-change={e => this.changePriceStatus(params.index, params.column.key, e)} value={value}></i-switch>
      )
    },
    editCell (rowIndex, key, event) {
      this.tableData[rowIndex][key] = event.target.value
      this.$emit('input', this.tableData)
    },
    changePriceStatus (rowIndex, key, value) {
      this.tableData[rowIndex][key] = value
      this.tableData.forEach((t, index) => {
        if (index !== rowIndex) {
          this.tableData[index][key] = 'enabled'
        }
      })
      this.$emit('input', this.tableData)
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
