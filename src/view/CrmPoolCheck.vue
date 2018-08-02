<template>
    <div class="checkInstaller">
      <h2>查看工程商</h2>
      <div class="top">
        <div class="topLeft">
          <div class="imgLeft"><img src="../assets/images/logo-min.jpg" alt=""></div>
          <div>XXXX公司</div>
          <div>商城账号:123456@qq.com</div>
        </div>
        <div class="topRight">
          <Row>
            <Col span="6">
              <span>cust id:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>公司名称:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>公司电话:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>网址:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>客户来源:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>类型:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>员工数量:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <span>行业:</span><span>XXXXXX</span>
            </Col>
            <Col span="12">
            <span>公司地址:</span><span>XXXXXX</span>
            </Col>
            <Col span="6">
            <Button type="primary">登陆日志</Button>
            </Col>
            <Col span="6">
            <Button>分配纪录</Button>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <h2>新增联系人</h2>
        <Button type="primary" @click="ceateNewInstaller">新增联系人</Button>
        <Table :columns="installerList" :data="installerdata"></Table>
      </div>
      <Modal v-model="createInstallerModal" width="360" title="新增联系人" @on-ok="submitNewInstaller" @on-cancel="handleReset">
        <Form ref="formInline" :model="formInline"  inline>
          <FormItem prop="firstName" label="First name">
            <Input type="text" v-model="formInline.firstName" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="lastName" label="Last name">
            <Input type="text" v-model="formInline.lastName" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="job" label="职位">
            <Input type="text" v-model="formInline.job" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="mobile" label="联系电话">
            <Input type="text" v-model="formInline.mobile" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="email" label="email">
            <Input type="text" v-model="formInline.email" placeholder="Username"></Input>
          </FormItem>
          <FormItem prop="checked" label="00">
            <Checkbox v-model="formInline.checked">已验证</Checkbox>
          </FormItem>
        </Form>
      </Modal>
    <!--做到查看->用户特点-->
    </div>
</template>

<script>
export default {
  name: 'crm-pool-check',
  data () {
    return {
      installerList: [
        {
          title: 'cust id',
          key: 'custId'
        },
        {
          title: 'company',
          key: 'company'
        },
        {
          title: 'First name',
          key: 'firstName'
        },
        {
          title: 'Last name',
          key: 'lastName'
        },
        {
          title: 'isCount',
          key: 'isCount'
        },
        {
          title: 'time',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return (
              <div><i-button
                type = "primary"
                onClick = {() => { this.check(params.index) }}>
                  编辑 </i-button>
              <i-button
                type = "primary"
                onClick = {() => { this.del(params.index) }
                }>
                  删除 </i-button>
              </div>)
          }
        }
      ],
      installerdata: [
        {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }, {
          custId: '11111',
          company: '2222',
          firstName: 'xiao',
          lastName: 'qincai',
          isCount: 'No',
          time: '2016-10-03'
        }
      ],
      self: '',
      createInstallerModal: false,
      formInline: {
        firstName: '',
        lastName: '',
        job: '',
        mobile: '',
        email: '',
        checked: ''
      }
    }
  },
  methods: {
    check (index) {
      console.log(index)
    },
    del (index) {
      this.self.installerdata.splice(index, 1)
    },
    ceateNewInstaller () {
      this.$refs.formInline.resetFields()
      this.createInstallerModal = true
    },
    submitNewInstaller () {
      console.log('9999')
    },
    handleReset () {
      console.log('77777')
      this.$refs.formInline.resetFields()
    }
  }
}
</script>

<style lang="less">
  .checkInstaller{
    .top{
      display: flex;
      .topLeft{
        flex: 0 0 200px;
        width: 200px;
        height: 200px;
        text-align: center;
        .imgLeft{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        span{
        }
      }
      .topRight{
        margin-left:20px;
        flex: 1;
      }
    }
  }
</style>
