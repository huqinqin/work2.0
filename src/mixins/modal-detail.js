export default {
  props: {
    form: {
      type: Object,
      default: null
    }
  },
  methods: {
    submit () {
      this.$api.post(`${this.url}/save`, {
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
      this.$Notice.success({
        title: 'Edit cancel',
        desc: ''
      })
      this.$emit('closeModal')
    }
  }
}
