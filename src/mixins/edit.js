export default {
  methods: {
    data () {
      return {
        id: ''
      }
    },
    query () {
      this.$api.post(`${this.url}/get`, {
        id: this.id
      }).then(data => {
        this.form = data
      })
    },
    submit () {
      this.$api.post(`${this.url}/save`, {
        ...this.form
      }).then(data => {
        this.$Notice.success({
          title: 'Edit success',
          desc: ''
        })
      })
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.query()
    }
  }
}
