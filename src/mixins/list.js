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
      this.$axios.post(`${this.url}/list`, {
        rows: this.rows,
        page: this.page,
        ...this.filter
      }).then(data => {
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
        title: 'Title',
        content: '<p>确认删除？</p>',
        loading: true,
        onCancel: () => {
          this.$Notice.success({
            title: '删除取消',
            desc: ''
          })
        },
        onOk: () => {
          this.$axios.post(`${this.url}/del`, {
            ids: [id]
          }).then(() => {
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
          this.$axios.post(`${this.url}/del`, {
            ids: this.selections.map(selection => selection.id)
          }).then(() => {
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
