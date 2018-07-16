export default {
  props: {
    form: {
      type: Object,
      default: null
    }
  },
  methods: {
    submit () {
      this.$axios.post(`${this.url}/save`, {
        ...this.form
      }).then(data => {
        this.$Notice.success({
          title: 'Edit success',
          desc: ''
        })
        this.$emit('closeModal')
      })
    },
    closeModal () {
      this.$Notice.info({
        title: 'Edit cancel',
        desc: ''
      })
      this.$emit('closeModal')
    }
  }
}
