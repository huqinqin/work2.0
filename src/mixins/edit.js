import cloneDeep from 'lodash.clonedeep'
let default$ = {}
export default {
  methods: {
    data () {
      return {
        id: ''
      }
    },
    query () {
      console.log(this.url)
      this.$http['get' + this.url]({
        id: this.id
      }).then(data => {
        this.form = data
        default$ = cloneDeep(data)
      })
    },
    submit () {
      let validArr = this.$refs.address ? [this.$refs.address.valid(), this.$refs.form.validate()] : [this.$refs.form.validate()]
      Promise.all(validArr).then(data => {
        if (data.every(valid => { return valid })) {
          this.$http['save' + this.url]({
            ...this.form
          }).then(data => {
            this.$Notice.success({
              title: 'Edit success',
              desc: ''
            })
          })
        }
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
