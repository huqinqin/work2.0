export default {
  methods: {
    query () {
      this.$axios.post(`${this.url}/get`, {
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
