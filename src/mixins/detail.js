export default {
  methods: {
    data () {
      return {
        id: null
      }
    },
    query () {
      this.$api.get(`${this.url}/detail`, {
        params: {
          id: this.id
        }
      }).then(data => {
        this.form = data
      })
    },
    submit () {
      this.$api.get(`${this.url}/edit`, {
        params: {
          form: this.form
        }
      }).then(data => {
        console.log(data.something)
      })
    }
  },
  beforeMount () {
    this.id = this.$route.params.id
    this.query()
  }
}
