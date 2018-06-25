<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="姓名" prop="name">
            <i-input v-model="form.name" type="text" placeholder="姓名" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="角色" prop="role">
            <i-input v-model="form.role" type="text" placeholder="角色" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="公司电话" prop="phone">
            <i-input v-model="form.phone" type="text" placeholder="公司电话" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="手机" prop="mobile">
            <i-input v-model="form.mobile" type="text" placeholder="手机" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="邮箱" prop="email">
            <i-input v-model="form.email" type="text" placeholder="邮箱" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="行业类型" prop="type">
            <i-input v-model="form.type" type="text" placeholder="行业类型" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="申请时间" prop="applicationDate">
            <i-input v-model="form.applicationDate" type="text" placeholder="申请时间" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="分配时间" prop="allocationDate">
            <i-input v-model="form.allocationDate" type="text" placeholder="分配时间" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="详细地址" prop="address">
            <i-input v-model="form.address" type="text" placeholder="详细地址" ></i-input>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="$router.push({name:'pensernel_list'})">Cancel</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
import mixin from '@/mixins/detail'
export default {
  mixins: [mixin],
  data () {
    return {
      url: '/personnel',
      form: {
        name: '', role: '', phone: '', mobile: '', email: '', type: '', applicationDate: '', allocationDate: '', address: ''
      },
      rules: {
        name: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        applicationDate: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        allocationDate: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
