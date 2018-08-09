import cloneDeep from 'lodash.clonedeep'
let default$ = {}
export default {
  data () {
    return {
      id: '',
      loading: false
    }
  },
  methods: {
    query () {
      this.$http['get' + this.url]({
        id: this.id
      }).then(data => {
        this.form = data
        default$ = cloneDeep(data)
      })
    },
    submit () {
      return this.$http['save' + this.url]({
        ...this.form
      }).then(data => {
        this.loading = false
        this.$Notice.success({
          title: 'Edit success',
          desc: ''
        })
      })
    },
    reset () {
      this.$refs.form.resetFields()
      this.$refs.address.clearValid()
      this.form = cloneDeep(default$)
    }
  },
  beforeMount () {
    console.log('edit')
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.query()
    } else {
      default$ = cloneDeep(this.form)
    }
  }
}
