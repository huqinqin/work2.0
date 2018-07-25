export default {
  data () {
    return {
      selections: [],
      list: [],
      rows: 10,
      total: 40,
      page: 1
    }
  },
  methods: {
    query () {
      this.$http[ 'fetch' + this.url ]({
        rows: this.rows,
        page: this.page,
        ...this.filter
      }).then(data => {
        console.log(data)
        this.list = data.list
        this.total = data.total
      })
    },
    changeSelection (val) {
      this.selections = val
    },
    changePage (page) {
      this.page = page
      this.query()
    },
    changeSize (rows) {
      this.rows = rows
      this.query()
    },
    deleteItem (id) {
      this.$Modal.confirm({
        title: '删除操作',
        content: `<p>确认删除id为${id}的数据？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http['del' + this.url]({
            ids: [id]
          }).then(() => {
            this.query()
            this.$Modal.remove()
            this.$Notice.success({
              title: '删除成功',
              desc: ''
            })
          })
        }
      })
    },
    removeSelections () {
      this.$Modal.confirm({
        title: 'Title',
        content: `<p>确认删除选中的${this.selections.length}条数据？</p>`,
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$http['del' + this.url]({
            ids: this.selections.map(selection => selection.id)
          }).then(() => {
            this.query()
            this.$Modal.remove()
            this.$Notice.success({
              title: '删除成功',
              desc: ''
            })
          })
        }
      })
    }
  }
}
