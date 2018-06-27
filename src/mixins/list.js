export default {
  data () {
    return {
      selections: [],
      list: [],
      pageSum: 10,
      total: 40,
      page: 1
    }
  },
  methods: {
    query () {
      this.$api.get(`${this.url}/list`, {
        params: {
          pageSum: this.pageSum,
          page: this.page,
          filter: this.filter
        }
      }).then(data => {
        this.list = data
      })
    },
    changeSelection (val) {
      this.selections = val
    },
    changePage (page) {
      this.page = page
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
          this.$api.get(`${this.url}/list`, {
            params: {
              id: id
            }
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
  },
  beforeMount () {
    this.query()
  }
}
