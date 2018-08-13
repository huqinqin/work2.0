<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店名称" prop="storeName">
            <i-input v-model="form.storeName" type="text" placeholder="门店名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="门店编码" prop="storeCode">
            <i-input v-model="form.storeCode" type="text" placeholder="门店编码" ></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="公司电话" prop="storeExt.mobile">
            <i-input v-model="form.storeExt.mobile" type="text" placeholder="公司电话" ></i-input>
          </form-item>
        </i-col>
      </row>
      <row>
        <i-col :span="24">
          <MapAutoComplete :googleAddress="form.address" ref="address"></MapAutoComplete>
        </i-col>
      </row>
      <row v-for="(contact, index) in form.contact" :key="index">
        <i-col :span="5">
          <form-item label="first name" :prop="'contact.' + index + '.firstName'" :rules="rule">
            <i-input v-model="contact.firstName" type="text" placeholder="联系人" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="5" offset="1">
          <form-item label="last name" :prop="'contact.' + index + '.lastName'" :rules="rule">
            <i-input v-model="contact.lastName" type="text" placeholder="联系人" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="5" offset="1">
          <form-item label="手机" :prop="'contact.' + index + '.phone'" :rules="rule">
            <i-input v-model="contact.phone" type="text" placeholder="手机" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="5" offset="1">
          <form-item label="邮箱" :prop="'contact.' + index + '.email'" :rules="rule">
            <i-input v-model="contact.email" type="text" placeholder="邮箱" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="1">
          <form-item label=" " style="text-align: center;">
            <Icon type="ios-close" color="red" @click="delContact(index)"></Icon>
          </form-item>
        </i-col>
      </row>
      <row>
         <i-col :span="5">
          <i-button @click="addContact">新增联系人</i-button>
        </i-col>
      </row>
      <form-item>
        <Button type="primary" @click="submit" :loading="loading">Submit</Button>
        <i-button type="ghost" style="margin-left: 8px" @click="reset">Reset</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
import md5 from 'md5'
import mixin from '@/mixins/edit'
export default {
  mixins: [mixin],
  data () {
    return {
      url: 'Shop',
      form: {
        storeName: '',
        storeCode: '',
        storeExt: {
          mobile: ''
        },
        userAccount: '',
        userPassword: md5(12345678),
        contact: [{firstName: '', lastName: '', phone: '', email: ''}],
        address: {
          detail: '',
          country: '',
          state: '',
          city: '',
          street: '',
          zip: '',
          company: '',
          lat: 0,
          lng: 0
        }
      },
      rule: {required: true, message: 'The input cannot be empty', trigger: 'blur'},
      rules: {
        storeName: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        storeCode: [{
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
        'storeExt.mobile': [{
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
  },
  methods: {
    validForm () {
      Promise.all([this.$refs.address.valid(), this.$refs.form.validate()]).then(data => {
        if (data.every(valid => { return valid })) {
          this.form.userAccount = this.form.storeCode + '001'
          this.loading = true
          this.submit().then(() => {
            this.$router.push({name: 'shop_list'})
          })
        }
      })
    },
    addContact () {
      this.form.contact.push({firstName: '', lastName: '', phone: '', email: ''})
    },
    delContact (index) {
      if (this.form.contact.length > 1) {
        this.form.contact.splice(index, 1)
      }
    }
  }
}
</script>
