<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="账号" prop="account">
            <i-input v-model="form.account" type="text" placeholder="账号" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="密码" prop="password">
            <i-input v-model="form.password" type="text" placeholder="密码" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="确认密码" prop="confirmPassword">
            <i-input v-model="form.confirmPassword" type="text" placeholder="确认密码" ></i-input>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px">Cancel</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
export default {
  data () {
    return {
      form: {
        account: '', password: '', confirmPassword: ''
      },
      rules: {
        account: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
