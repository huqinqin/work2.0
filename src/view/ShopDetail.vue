<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="门店名称" ></i-input>
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
          <form-item label="状态" prop="status">
            <i-input v-model="form.status" type="text" placeholder="状态" ></i-input>
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
        name: '', contact: '', address: '', city: '', state: '', country: '', zipcode: '', phone: '', mobile: '', status: ''
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
        status: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
