<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="门店名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="公司电话" prop="phone">
            <i-input v-model="form.phone" type="text" placeholder="公司电话" ></i-input>
          </form-item>
        </i-col>
      </row>
      <row>
        <i-col :span="24">
          <MapAutoComplete v-model="form.certAddress"></MapAutoComplete>
        </i-col>
      </row>
      <row>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="first name" prop="contact">
            <i-input v-model="form.contact" type="text" placeholder="联系人" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="last name" prop="contact">
            <i-input v-model="form.contact" type="text" placeholder="联系人" ></i-input>
          </form-item>
        </i-col>

        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="手机" prop="mobile">
            <i-input v-model="form.mobile" type="text" placeholder="手机" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="email" prop="mobile">
            <i-input v-model="form.mobile" type="text" placeholder="手机" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <i-button>新增联系人</i-button>
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
      url: 'Shop',
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
