<template>
  <div>
    <card class="installer-card">
      <div class="title">
        <p>选择工程商</p>
        <div class="divider"></div>
      </div>
      <i-form>
        <form-item label="搜索工程商">
          <Select v-model="installerType" style="width: 120px">
            <Option value="custID">Cust ID</Option>
            <Option value="sName">公司名称</Option>
            <Option value="account">账号</Option>
            <Option value="phone">电话</Option>
            <Option value="email">邮箱</Option>
          </Select>
          <Poptip trigger="focus" placement="bottom" popper-class="installer-popover">
            <i-input v-model="installerValue" @on-change="queryInstaller"></i-input>
            <div slot="content">
              <ul class="installer-list">
                <li v-for="installer in installerList" :key="installer.id" @click="checkInstaller(installer)">
                  {{installer.company}} - {{installer.custId}}
                </li>
              </ul>
            </div>
          </Poptip>
        </form-item>
      </i-form>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">账号</td>
          <td>{{checkedInstaller.company}}</td>
          <td class="speTd">名字/电话</td>
          <td>{{checkedInstaller.company}}</td>
        </tr>
        <tr>
          <td class="speTd">Cust ID</td>
          <td>{{checkedInstaller.company}}</td>
          <td class="speTd">公司名称/邮编</td>
          <td>{{checkedInstaller.company}}</td>
        </tr>
        <tr>
          <td class="speTd">详细地址</td>
          <td colspan="3">{{checkedInstaller.company}}</td>
        </tr>
      </table>
    </card>
    <card class="note-card">
      <Row :gutter="16">
        <i-col span="12">
          <div>
            <p>Cust Notes</p>
            <Input v-model="note" type="textarea" :rows="4"/>
          </div>
        </i-col>
        <i-col span="12">
          <p>Account Notes</p>
          <Input v-model="note" type="textarea" :rows="4"/>
        </i-col>
      </Row>
    </card>
    <card class="ship-card">
      <div class="title">
        <p>物流方式</p>
        <div class="divider"></div>
        <i-form ref="shipForm" :model="shipForm" label-position="top">
          <form-item label="选择方式" prop="type">
            <RadioGroup v-model="shipForm.type">
              <Radio label="willCall">自提</Radio>
              <Radio label="express">快递</Radio>
            </RadioGroup>
          </form-item>
          <template v-if="shipForm.type === 'express'">
            <form-item label="快递公司" prop="company">
              <RadioGroup v-model="shipForm.company">
                <Radio label="UPS">UPS</Radio>
                <Radio label="Fedex">Fedex</Radio>
              </RadioGroup>
            </form-item>
            <form-item label="快递服务" prop="service">
              <RadioGroup v-model="shipForm.service" class="service-radio">
                <Radio v-for="item in expressOption" :label="item.value" :key="item.value">{{item.label}}</Radio>
              </RadioGroup>
            </form-item>
          </template>
        </i-form>
      </div>
    </card>
    <card class="address-card">
      <div class="title">
        <p>选择收货地址 <Button type="text">+添加地址</Button></p>
        <div class="divider"></div>
        <table border="1" class="addressTable">
          <tr>
            <th>收货人</th>
            <th>公司名称</th>
            <th>电话</th>
            <th>详细地址</th>
          </tr>
          <tr>
            <td>{{chechedAddress}}</td>
            <td>{{chechedAddress}}</td>
            <td>{{chechedAddress}}</td>
            <td>{{chechedAddress}}</td>
          </tr>
        </table>
        <Button type="primary">选择地址</Button>
      </div>
    </card>
    <card class="po-card">
      <div class="title">
        <p>P/O NO.</p>
        <div class="divider"></div>
        <Input />
      </div>
    </card>
    <card class="product-card">
      <div class="title">
        <p>选择商品</p>
        <div class="divider"></div>
      </div>
    </card>
    <card class="pay-card">
      <div class="title">
        <p>支付信息</p>
        <div class="divider"></div>
        <i-form ref="payForm" :model="payForm" label-position="top">
          <form-item label="支付方式" prop="type">
            <RadioGroup v-model="payForm.type">
              <Radio label="willCall">自提</Radio>
              <Radio label="express">快递</Radio>
              <Radio label="express">快递</Radio>
              <Radio label="express">快递</Radio>
              <Radio label="express">快递</Radio>
              <Radio label="express">快递</Radio>
              <Radio label="express">快递</Radio>
            </RadioGroup>
          </form-item>
          <form-item label="快递公司" prop="company">
            <RadioGroup v-model="payForm.company">
              <Radio label="UPS">UPSqeadasdwqe</Radio>
              <Radio label="Fedex">Fedewqeqeqwe</Radio>
            </RadioGroup>
          </form-item>
        </i-form>
      </div>
    </card>
    <card class="order-card">
      <div class="title">
        <p>订单金额</p>
        <div class="divider"></div>
      </div>
    </card>
    <card class="order-note-card">
      <div class="title">
        <p>订单备注</p>
        <div class="divider"></div>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  name: 'quotation-edit',
  data () {
    return {
      note: 'hbdkFHVSDOSNFYNC[SDMUBVDOCWEDOKSXONPBSEVDK',
      installerValue: '',
      installerType: 'custID',
      installerList: [],
      checkedInstaller: {},
      shipForm: {
        type: 'express',
        company: 'Fedex',
        service: ''
      },
      expressOption: [
        {value: '01', label: 'Next Day Air'},
        {value: '02', label: '2nd Day Air'},
        {value: '03', label: 'Ground'},
        {value: '12', label: '3 Day Select'},
        {value: '13', label: 'Next Day Air Saver'},
        {value: '14', label: 'UPS Next Day Air Early'},
        {value: '59', label: '2nd Day Air A.M.'},
        {value: '07', label: 'Worldwide Express'},
        {value: '08', label: 'Worldwide Expedited'},
        {value: '11', label: 'Standard'},
        {value: '54', label: 'Worldwide Express Plus'},
        {value: '65', label: 'Saver'},
        {value: '96', label: 'UPS Worldwide Express Freight'},
        {value: '71', label: 'UPS Worldwide Express Freight Midday'}
      ],
      chechedAddress: {},
      payForm: {
        type: '',
        company: ''
      }
    }
  },
  methods: {
    queryInstaller () {
      this.$http.fetchReview().then(data => {
        this.installerList = data.list
      })
    },
    checkInstaller (installer) {
      this.checkedInstaller = installer
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ivu-card{
    border: none;
    border-radius: 0;
    margin-bottom: 20px;
    .ivu-card-body{
      padding-top: 6px;
    }
  }
  /deep/ .ivu-card:hover{
    box-shadow: none;
  }
  p{
    line-height: 2;
  }
  .title{
    p{
      font-size: 16px;
      color: #666;
    }
    .divider{
      height: 1px;
      width: calc(~"100% + 32px");
      margin-left: -16px;
      background-color: #e0e0e0;
      margin-bottom: 16px;
    }
  }
  .installer-card{
    /deep/ .ivu-poptip{
      width: 100%;
      margin-bottom: 24px;
    }
    /deep/ .ivu-poptip-rel{
      width: 100%;
    }
  }

  .ship-card{
    form-item{
      width: 100%;
    }
    /deep/ .ivu-form-item-label{
      height: 12px !important;
    }
    .service-radio .ivu-radio-group-item{
      width: 19%;
    }
  }
  .address-card{
    /deep/ .ivu-btn-text{
      float: right;
      vertical-align: bottom;
      color: #2594FF;
    }
    .addressTable{
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #e9eaec;
      color: #495060;
      font-size: 12px;
      background-color: #fff;
      margin-bottom: 20px;
      td,th {
        min-width: 0;
        width: 25%;
        height: 48px;
        padding-left: 18px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
  }
  .ship-card{

  }
</style>
