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
          <form-item label="联系人" prop="contact">
            <i-input v-model="form.contact" type="text" placeholder="联系人" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="详细地址" prop="address">
            <i-input v-model="form.address" type="text" placeholder="详细地址" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="城市" prop="city">
            <i-input v-model="form.city" type="text" placeholder="城市" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="州" prop="state">
            <i-input v-model="form.state" type="text" placeholder="州" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="国家" prop="country">
            <i-input v-model="form.country" type="text" placeholder="国家" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="邮编" prop="zipcode">
            <i-input v-model="form.zipcode" type="text" placeholder="邮编" ></i-input>
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
          <form-item label="账号" prop="account">
            <i-input v-model="form.account" type="text" placeholder="账号" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="权限" prop="role">
            <i-input v-model="form.role" type="text" placeholder="权限" ></i-input>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary" @click="submit">Submit</i-button>
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
        name: '', contact: '', address: '', city: '', state: '', country: '', zipcode: '', phone: '', mobile: '', account: '', role: ''
      },
      rules: {
        name: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        contact: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        state: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        country: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        zipcode: [{
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
        account: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
