<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="名" prop="firstName">
            <i-input v-model="form.firstName" type="text" placeholder="名"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="姓" prop="lastName">
            <i-input v-model="form.lastName" type="text" placeholder="姓"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="账号" prop="account">
            <i-input v-model="form.account" type="text" placeholder="账号"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="邮箱" prop="email">
            <i-input v-model="form.email" type="text" placeholder="邮箱"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="公司电话" prop="mobile">
            <i-input v-model="form.mobile" type="text" placeholder="公司电话"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店" prop="store">
            <CodeTable v-model="form.store" type="store"></CodeTable>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="部门" prop="group">
            <CodeTable v-model="form.group" type="group"></CodeTable>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="角色" prop="role">
            <CodeTable v-model="form.role" type="role"></CodeTable>
            <!-- <i-input v-model="form.role" type="text" placeholder="角色"></i-input> -->
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="状态" prop="status">
            <i-switch :value="form.status === 'enabled'" size="large">
              <span slot="open">激活</span>
              <span slot="close">冻结</span>
            </i-switch>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary" @click="validForm">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="reset">Reset</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
import mixin from '@/mixins/edit'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Staff',
      form: {
        id: '',
        firstName: '',
        lastName: '',
        account: '',
        email: '',
        mobile: '',
        store: '',
        role: '',
        group: '',
        status: 'enabled',
        address: '',
        allocationDate: ''
      },
      rules: {
        id: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        firstName: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        lastName: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        account: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        store: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        group: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        allocationDate: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs.form.validate(valid => {
        if (valid) this.submit()
      })
    }
  }
}
</script>
