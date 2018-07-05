<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="编号" prop="id">
            <i-input v-model="form.id" type="text" placeholder="编号"></i-input>
          </form-item>
        </i-col>
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
          <form-item label="公司电话" prop="phone">
            <i-input v-model="form.phone" type="text" placeholder="公司电话"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店" prop="store">
            <i-input v-model="form.store" type="text" placeholder="门店"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="角色" prop="role">
            <i-input v-model="form.role" type="text" placeholder="角色"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="部门" prop="group">
            <i-input v-model="form.group" type="text" placeholder="部门"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="状态" prop="status">
            <i-input v-model="form.status" type="text" placeholder="状态"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="地址" prop="address">
            <i-input v-model="form.address" type="text" placeholder="地址"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="创建时间" prop="allocationDate">
            <i-input v-model="form.allocationDate" type="text" placeholder="创建时间"></i-input>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary" @click="submit">Submit</i-button>
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
      url: 'personnel',
      form: {
        id: '',
        firstName: '',
        lastName: '',
        account: '',
        email: '',
        phone: '',
        store: '',
        role: '',
        group: '',
        status: '',
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
        phone: [{
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
  }
}
</script>
