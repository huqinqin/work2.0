<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="账号" prop="customerId">
            <i-input v-model="form.customerId" type="text" placeholder="账号" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="会员等级" prop="id">
            <Select v-model="form.grade">
              <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="新密码" prop="account">
            <i-input v-model="form.account" type="text" placeholder="新密码" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="确认密码:" prop="companyName">
            <i-input v-model="form.companyName" type="text" placeholder="确认密码:" ></i-input>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px">Go back</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
export default {
  data () {
    return {
      form: {
        customerId: '', grade: '', account: '', companyName: ''
      },
      gradeList: [
        {
          value: '白银会员',
          label: '白银会员'
        },
        {
          value: '黄金会员',
          label: '黄金会员'
        }
      ],
      rules: {
        customerId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        grade: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        account: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        companyName: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
