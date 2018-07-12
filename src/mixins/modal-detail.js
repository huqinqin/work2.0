export default {
  props: {
    form: {
      type: Object,
      default: null
    }
  },
  methods: {
    submit () {
      if (this.form) {
        this.$Notice.warning({
          title: '数据不完整',
          desc: ''
        })
        return
      }
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
