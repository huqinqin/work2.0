<template>
  <card>
    <p slot="title">人员列表</p>
    <table border="1" class="baseDataTable">

      <tr>

        <td class="speTd">编号</td>
        <td>{{form.id}}</td>

        <td class="speTd">名</td>
        <td>{{form.firstName}}</td>

      </tr>

      <tr>

        <td class="speTd">姓</td>
        <td>{{form.lastName}}</td>

        <td class="speTd">账号</td>
        <td>{{form.account}}</td>

      </tr>

      <tr>

        <td class="speTd">邮箱</td>
        <td>{{form.email}}</td>

        <td class="speTd">公司电话</td>
        <td>{{form.phone}}</td>

      </tr>

      <tr>

        <td class="speTd">门店</td>
        <td>{{form.store}}</td>

        <td class="speTd">角色</td>
        <td>{{form.role}}</td>

      </tr>

      <tr>

        <td class="speTd">部门</td>
        <td>{{form.group}}</td>

        <td class="speTd">状态</td>
        <td>{{form.status}}</td>

      </tr>

      <tr>

        <td class="speTd">地址</td>
        <td>{{form.address}}</td>

        <td class="speTd">创建时间</td>
        <td>{{form.allocationDate}}</td>

      </tr>

    </table>
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
        phone: '',
        store: '',
        role: '',
        group: '',
        status: '',
        address: '',
        allocationDate: ''
      }
    }
  }
}
</script>
