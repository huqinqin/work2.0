export default {
  props: {
    form: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
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
    },
    closeModal () {
      this.$emit('closeModal')
    }
  },
  beforeMount () {
    // this.query()
  }
}
