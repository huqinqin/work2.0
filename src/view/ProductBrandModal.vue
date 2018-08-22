<template>
  <card>
    <i-form v-if="form" :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <!--<p style="padding-left: 12px;margin-bottom: 20px;" v-if="id">编号：{{form.id}}</p>-->
        <i-col :span="24">
          <form-item label="品牌名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="品牌名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="品牌首字母" prop="shortName">
            <i-input v-model="form.shortName" type="text" placeholder="品牌首字母" ></i-input>
          </form-item>
        </i-col>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </row>
      <form-item>
        <i-button type="primary" @click="submit" :loading="loading">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="closeModal">Cancel</i-button>
      </form-item>
    </i-form>
  </card>
</template>

<script>
export default {
  name: 'product-brand-modal',
  props: ['id'],
  data () {
    return {
      form: {},
      spinShow: true,
      loading: false,
      rules: {
        id: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        shortName: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        manufacturer: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        show: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    id (id) {
      if (id) {
        this.spinShow = true
        this.$http.getBrand({id}).then(data => {
          this.form = data
          this.spinShow = false
        })
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('update')
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.saveBrand({
            ...this.form
          }).then(data => {
            this.loading = false
            this.$emit('update')
            this.$Notice.success({
              title: 'Edit success',
              desc: ''
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
