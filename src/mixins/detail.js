export default {
  methods: {
    query () {
      this.$api.post(`${this.url}/get`, {
        id: this.$route.params.id
      }).then(data => {
        this.form = data
      })
    }
  },
  beforeMount () {
    this.query()
  }
}
