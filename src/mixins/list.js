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
    }
  },
  beforeMount () {
    this.query()
  }
}
