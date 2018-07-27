<template>
  <div>
    <i-table
      :data="tableData"
      :columns="columnsList"
    ></i-table>
    <div class="plus-btn" @click="addRow">添加</div>
    <Modal
      v-model="isShowSku"
      @on-ok="checkProps"
      @on-cancel="cancelChecked"
      title="选择sku属性">
      <i-form label-position="top" ref="propForm">
        <form-item v-for="item in sku" :key="item.id" :label="item.name">
          <RadioGroup v-model="item.checked">
            <Radio v-for="prop in item.values" :label="prop.name" :key="prop.id"></Radio>
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
  props: ['value', 'skuProps', 'spuProps'],
  data () {
    return {
      isShowSku: false,
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
          title: '销售价格',
          align: 'center',
          key: 'basePrice',
          width: 160,
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
          title: '属性值',
          align: 'center',
          key: 'props',
          render: (h, params) => {
            return (
              <span>
                {params.row.props.map(t => {
                  return <span>{t.value}</span>
                })}
                <icon class="edit-icon" type="compose" on-click={ () => { this.showSku(params) }}></icon>
              </span>
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
      ]
    }
  },
  computed: {
    tableData () {
      return this.value
    },
    sku () {
      return this.skuProps
    }
  },
  methods: {
    checkProps () {
      this.tableData[this.checkedIndex].props = []
      this.sku.forEach(t => {
        if (t.checked) {
          t.values.forEach(p => {
            if (p.name === t.checked) {
              this.tableData[this.checkedIndex].props.push({
                name: t.name,
                value: t.checked,
                nameId: p.catePropId,
                valueId: p.id
              })
            }
          })
        }
        t.checked = ''
      })
      this.$emit('input', this.tableData)
    },
    cancelChecked () {},
    showSku (params) {
      if (this.sku.length) {
        this.sku.forEach(t => {
          params.row.props.forEach(v => {
            if (t.name === v.name) {
              t.checked = v.value
            }
          })
        })
        this.checkedIndex = params.index
        this.isShowSku = true
      } else {
        this.$Modal.info({
          title: 'Info',
          content: '<p>请先选择类目</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
          }
        })
        return false
      }
    },
    addRow () {
      this.tableData.push({
        props: [],
        onum: '',
        baseprice: '',
        sin: '',
        unit: 'pc',
        spec: '1',
        size: '',
        weight: ''
      })
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
        <i-input on-on-blur={(e) => this.editCell(params.index, params.column.key, e)} value={value}></i-input>
      )
    },
    editCell (rowIndex, key, event) {
      this.tableData[rowIndex][key] = event.target.value
      // if (key === 'edit') {
      // 当点击按钮时，重新加载表格，触发表格刷新
      // this.initColumnsList()
      // }
    },
    delSku (index) {
      if (this.tableData.length === 1) {
        this.$Modal.info({
          title: 'Info',
          content: '<p>至少一条SKU属性</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
          }
        })
        return false
      }
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
