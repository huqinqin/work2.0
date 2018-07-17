// 弹窗混合
import cloneDeep from 'lodash.clonedeep'
let default$ = {}
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value: {
      handler () {
        this.default$ = cloneDeep(this.value)
        this.form = cloneDeep(this.value)
      },
      deep: true
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
        this.$emit('uploadList')
      })
    },
    reset () {
      this.$refs.form.resetFields()
      this.form = cloneDeep(default$)
    }
  }
}
