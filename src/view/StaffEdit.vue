<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <div class="layout-column">
        <div class="layout-cell">
          <form-item label="名" prop="firstName">
            <i-input v-model="form.firstName" type="text" placeholder="名"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="姓" prop="lastName">
            <i-input v-model="form.lastName" type="text" placeholder="姓"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="账号" prop="account">
            <i-input v-model="form.account" type="text" placeholder="账号"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="邮箱" prop="email">
            <i-input v-model="form.email" type="text" placeholder="邮箱"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="公司电话" prop="mobile">
            <i-input v-model="form.mobile" type="text" placeholder="公司电话"></i-input>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="门店" prop="storeId">
            <Select v-model="form.storeId" style="width:100%" @on-change="fetchGroups">
              <Option v-for="item in $store.state.options.stores" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="部门" prop="groupId">
            <Select v-model="form.groupId" style="width:100%">
              <Option v-for="item in $store.state.options.groups" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="角色" prop="roleId">
            <CodeTable v-model="form.roleId" type="role"></CodeTable>
          </form-item>
        </div>
        <div class="layout-cell">
          <form-item label="状态" prop="status">
            <i-switch :value="form.status === 'enabled'" size="large">
              <span slot="open">激活</span>
              <span slot="close">冻结</span>
            </i-switch>
          </form-item>
        </div>
      </div>
      <div class="layout-column">
        <div class="layout-cell">
          <form-item>
            <i-button type="primary" @click="validForm">Submit</i-button>
            <i-button type="ghost" style="margin-left: 8px" @click="reset">Reset</i-button>
          </form-item>
        </div>
      </div>
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
        storeId: '',
        roleId: '',
        groupId: '',
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
        storeId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        roleId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        groupId: [{
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
    fetchGroups () {
      if (this.form.storeId) {
        this.form.groupId = ''
        this.$store.dispatch('fetchGroups', this.form.storeId)
      }
    },
    validForm () {
      this.$refs.form.validate(valid => {
        if (valid) this.submit()
      })
    }
  }
}
</script>
