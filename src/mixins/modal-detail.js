export default {
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      editModal: false
    }
  },
  methods: {
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
        console.log('submit success')
      })
    }
  },
  beforeMount () {
    this.query()
  },
  watch: {
    id (newId) {
      this.editModal = true
      this.query()
    }
  }
}
