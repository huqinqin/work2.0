<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="编号" ></i-input>
      </form-item>
      <form-item prop="name">
        <i-input v-model="filter.name" type="text" placeholder="姓名" ></i-input>
      </form-item>
      <form-item prop="account">
        <i-input v-model="filter.account" type="text" placeholder="账号" ></i-input>
      </form-item>
      <form-item prop="address">
        <i-input v-model="filter.address" type="text" placeholder="地址" ></i-input>
      </form-item>
      <form-item prop="role">
        <i-input v-model="filter.role" type="text" placeholder="角色" ></i-input>
      </form-item>
      <form-item prop="phone">
        <i-input v-model="filter.phone" type="text" placeholder="联系方式" ></i-input>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="状态" ></i-input>
      </form-item>

      <form-item>
        <i-button type="primary">查询</i-button>
        <i-button type="error">删除所选</i-button>
        <i-button type="primary" @click="$router.push('personnel_edit')">新增人员</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
    <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
      <div style="float:right;">
        <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      delmod: false,
      account: '',
      url: 'Staff',
      filter: {
        id: '',
        name: '',
        account: '',
        address: '',
        role: '',
        phone: '',
        status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '联系方式',
          key: 'phone'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            console.log('params', params)
            return (
              <i-switch value={params.row.status === '上线'} size="large">
                <span slot="open">激活</span>
                <span slot="close">冻结</span>
              </i-switch>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: `detail/${params.row.id}` })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: `edit/${params.row.id}` })
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log(`删除${params.row.id}`)
                    }
                  }
                },
                '删除'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.warning({
                        title: '重置密码',
                        content: '是否重置' + params.row.account + '的密码'
                      })
                    }
                  }
                },
                '重置密码'
              )
            ])
          }
        }
      ]
    }
  },
  beforeMount () {
    this.query()
  }
}
</script>
