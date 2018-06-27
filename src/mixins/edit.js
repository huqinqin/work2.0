export default {
  methods: {
    submit () {
      this.$api.get(`${this.url}/edit`, {
        params: {
          form: this.form
        }
      }).then(data => {
        console.log(data.something)
      })
    }
  }

}
