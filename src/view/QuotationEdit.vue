<template>
  <div>
    <card class="installer-card">
      <div class="title">
        <p>选择工程商</p>
        <div class="divider"></div>
      </div>
      <Row :gutter="12">
        <i-col span="4">
          <Select v-model="installerType">
            <Option value="storeCode">Cust ID</Option>
            <Option value="storeName">公司名称</Option>
            <Option value="account">账号</Option>
            <Option value="mobile">电话</Option>
            <Option value="contactEmail">邮箱</Option>
          </Select>
        </i-col>
        <i-col span="20">
          <Poptip trigger="focus" class="select-pop" placement="bottom" popper-class="installer-popover">
            <i-input v-model="installerValue" @on-change="queryInstaller"></i-input>
            <div slot="content">
              <ul class="installer-list">
                <li v-for="installer in installerList" :key="installer.id" @click="checkInstaller(installer)">
                  {{installer.storeName}} - {{installer.storeCode}}
                </li>
              </ul>
            </div>
          </Poptip>
        </i-col>
      </Row>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">账号</td>
          <td>{{store.company}}</td>
          <td class="speTd">名字/电话</td>
          <td>{{store.name}} / {{store.userMobile}}</td>
        </tr>
        <tr>
          <td class="speTd">Cust ID</td>
          <td>{{store.storeCode}}</td>
          <td class="speTd">公司名称/邮编</td>
          <td>{{store.storeName}} / {{store.userEmail}}</td>
        </tr>
        <tr>
          <td class="speTd">详细地址</td>
          <td colspan="3">{{store.address}}</td>
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
        <i-form ref="shipping" :model="shipping" label-position="top">
          <form-item label="选择方式" prop="type">
            <RadioGroup v-model="shipping.method">
              <Radio label="willCall">自提</Radio>
              <Radio label="express">快递</Radio>
            </RadioGroup>
          </form-item>
          <template v-if="shipping.method === 'express'">
            <form-item label="快递公司" prop="company">
              <RadioGroup v-model="shipping.expressCompany">
                <Radio label="UPS">UPS</Radio>
                <Radio label="Fedex">Fedex</Radio>
              </RadioGroup>
            </form-item>
            <form-item label="快递服务" prop="service">
              <RadioGroup v-model="shipping.expressService" class="service-radio">
                <Radio v-for="item in expressOption" :label="item.value" :key="item.value">{{item.label}}</Radio>
              </RadioGroup>
            </form-item>
            <form-item>
              <Checkbox v-model="shipping.expressSignature">本人签收</Checkbox>
              <Checkbox v-model="shipping.UCSA">Use customer's shipping account</Checkbox>
            </form-item>
          </template>
        </i-form>
      </div>
    </card>
    <card class="address-card" v-if="shipping.method === 'express'">
      <div class="title">
        <p>选择收货地址 <Button type="text" @click="showAddAddressForm">+添加地址</Button></p>
        <div class="divider"></div>
        <table border="1" class="addressTable">
          <tr>
            <th width="160">收货人</th>
            <th width="140">公司名称</th>
            <th width="120">电话</th>
            <th>详细地址</th>
          </tr>
          <tr>
            <td>{{toAddr.receiver}}</td>
            <td>{{toAddr.company}}</td>
            <td>{{toAddr.telnum}}</td>
            <td>{{toAddr.detail}}</td>
          </tr>
        </table>
        <Button type="primary" @click="showAddressTable = true">选择地址</Button>
        <Modal
          v-model="showAddressTable"
          width="920"
          title="地址信息">
          <footer slot="footer"><Button type="primary" @click="showAddAddressForm">新增地址</Button></footer>
          <i-table :columns="addressColumns" :data="addressList" size="small" ref="addressTable"></i-table>
        </Modal>
        <Modal
          v-model="showAddressForm"
          title="新增地址">
          <MapAutoComplete :googleAddress="editAddressForm.address" ref="address"></MapAutoComplete>
          <footer slot="footer">
            <Button type="primary" @click="showAddressForm = false">取消</Button>
            <Button type="primary" @click="submitAddressForm">确定</Button>
          </footer>
        </Modal>
      </div>
    </card>
    <card class="po-card" v-if="shipping.method === 'express'">
      <div class="title">
        <p>P/O NO.</p>
        <div class="divider"></div>
        <Input placeholder="请输入P/O NO." v-model="poNo"/>
      </div>
    </card>
    <card class="product-card">
      <div class="title">
        <p>选择商品</p>
        <div class="divider"></div>
        <Row>
          <i-col span="24">
            <Poptip trigger="focus" class="select-pop" placement="bottom" popper-class="product-popover">
              <i-input v-model="productValue" @on-change="queryProduct"></i-input>
              <div slot="content">
                <ul class="installer-list">
                  <li v-for="product in productList" :key="product.id" @click="checkProduct(product)">
                    product - {{product.title}}
                  </li>
                </ul>
              </div>
            </Poptip>
          </i-col>
        </Row>
        <i-table
          :data="checkedProducts"
          :columns="productColumns"
        ></i-table>
      </div>
    </card>
    <card class="pay-card">
      <div class="title">
        <p>支付信息</p>
        <div class="divider"></div>
        <i-form ref="payForm" :model="payForm" label-position="top">
          <form-item label="支付方式" prop="payType">
            <RadioGroup v-model="payForm.payType">
              <Radio label="willCall">信用卡</Radio>
              <Radio label="express">现金</Radio>
              <Radio label="express">支票</Radio>
              <Radio label="express">COD</Radio>
              <Radio label="express">Credit Memo</Radio>
              <Radio label="express">账期</Radio>
              <Radio label="express">Other</Radio>
            </RadioGroup>
          </form-item>
          <form-item label="Packing Type" prop="packingType">
            <RadioGroup v-model="payForm.packingType">
              <Radio label="UPS">Pick List Only</Radio>
              <Radio label="Fedex">No Invoice No Pick List</Radio>
            </RadioGroup>
          </form-item>
        </i-form>
      </div>
    </card>
    <card class="order-card">
      <div class="title">
        <p>订单金额</p>
        <div class="divider"></div>
        <i-form label-position="left">
          <form-item label="商品金额">
            <div class="fee">{{pay.itemFee}}</div><div class="other">Gross Profit Margin : 100.00%</div>
          </form-item>
          <form-item label="满减优惠">
            <div class="fee">{{pay.itemFee}}</div><div class="other"><Checkbox>Whether to participate in sitewide promotion</Checkbox></div>
          </form-item>
          <form-item label="税费/税率">
            <div class="fee">{{pay.taxRate}}/{{pay.taxFee}}</div>
          </form-item>
          <form-item label="运费">
            <div class="fee">{{pay.shippingFee}}</div><div class="other"><Checkbox v-model="shipping.dropShipping">Insufficient inventory/Dropship from other office</Checkbox></div>
          </form-item>
          <form-item label="减免">
            <div class="fee">{{pay.discountFee}}</div><div class="other">{{pay.discountFee}}</div>
          </form-item>
        </i-form>
      </div>
    </card>
    <card class="order-note-card">
      <div class="title">
        <p>订单备注</p>
        <div class="divider"></div>
        <Input placeholder="请输入备注" type="textarea" :rows="4"/>
      </div>
    </card>
    <div class="buttons">
      <Button type="primary">保存并发送邮件</Button>
      <Button type="primary">保存并下载询价单</Button>
      <Button type="primary">保存</Button>
      <Button type="success">提交审核</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quotation-edit',
  data () {
    return {
      note: 'hbdkFHVSDOSNFYNC[SDMUBVDOCWEDOKSXONPBSEVDK',
      installerValue: '',
      installerType: 'storeCode',
      installerList: [],
      queryInstallerDebounce: '',
      store: {},
      poNo: '',
      shipping: {
        method: 'express',
        expressCompany: 'Fedex',
        expressService: '',
        dropShipping: false,
        expressSignature: true,
        UCSA: false
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
      toAddr: {},
      payForm: {
        payType: '',
        packingType: ''
      },
      showAddressTable: false,
      showAddressForm: false,
      addressList: [],
      editAddressForm: {
        address: {
          receiver: '',
          detail: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          telnum: '',
          lat: '',
          lng: '',
          company: ''
        },
        status: ''
      },
      addressColumns: [
        {
          title: '收货人',
          render: (h, params) => {
            return (
              <div>{params.row.address.receiver}</div>
            )
          }
        }, {
          title: '公司名称',
          render: (h, params) => {
            return (
              <div>{params.row.address.company}</div>
            )
          }
        }, {
          title: '电话',
          render: (h, params) => {
            return (
              <div>{params.row.address.telnum}</div>
            )
          }
        }, {
          title: '详细地址',
          width: 180,
          render: (h, params) => {
            return (
              <div>{params.row.address.detail}</div>
            )
          }
        }, {
          title: ' ',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <i-button type="error" size="small" onClick={ () => { this.checkAddress(params.row) }}>选择</i-button>
                <i-button type="primary" size="small" onClick={ () => { this.editAddress(params.row) }}>编辑</i-button>
              </div>
            )
          }
        }
      ],
      productValue: '',
      productList: [],
      checkedProducts: [
        {'id': '810000198611162592', 'offerPrice': 427, 'vipPrice': 753, 'basePrice': 142, 'num': 809, 'unit': 'pc', 'size': null, 'spec': '1', 'weight': '1', 'sin': 'Moore', 'onum': '12', 'props': [{'name': 'n', 'value': 'v'}], 'skuid': '650000198004182583', 'title': 'Carol Anderson', 'imgUrls': ['http://dummyimage.com/200x100', 'http://dummyimage.com/200x100', 'http://dummyimage.com/200x100'], 'offerId': 340, 'offerKind': 'Thompson', 'cateId': '12', 'status': true, 'keyword': ['ip', 'ipp', 'iop'], 'kind': '主商品', 'currentPrice': 142, 'amount': '1', 'remark': ''}
      ],
      productColumns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'title'
        },
        {
          title: '库存',
          key: 'num'
        },
        {
          title: '指导价',
          key: 'basePrice'
        },
        {
          title: '单价',
          align: 'center',
          key: 'currentPrice',
          render: this.editCellRender
        },
        {
          title: '数量',
          align: 'center',
          key: 'amount',
          render: this.editCellRender
        },
        {
          title: '成本/毛利率',
          render: (h, params) => {
            return (
              <span>233333</span>
            )
          }
        },
        {
          title: '总价',
          render: (h, params) => {
            let content = null
            if (params.row.currentPrice && params.row.amount) {
              content = <span>{(+params.row.currentPrice) * (+params.row.amount)}</span>
            }
            return content
          }
        },
        {
          title: '备注',
          align: 'center',
          key: 'remark',
          render: this.editCellRender
        },
        {
          title: ' ',
          render: (h, params) => {
            return (
              <div>
                <poptip class="history-poptip" width="300" trigger="hover" title="历史成交价" popper-class="history-pop" placement="bottom-end">
                  <div slot="content">
                    <table border="1" class="history-table">
                      <tr>
                        <th>Version</th>
                        <th>Update Time</th>
                      </tr>
                      <tr>
                        <td>0.9.5</td>
                        <td>2016-10-26</td>
                      </tr>
                    </table>
                  </div>
                  <i-button type="primary" size="small">more</i-button>
                </poptip>
                <i-button type="error" size="small">删除</i-button>
              </div>
            )
          }
        }
      ],
      pay: {
        payType: '',
        itemFee: 5234,
        taxFee: 523,
        taxRate: 3,
        shippingFee: 5424,
        discountFee: 5324,
        oversold: false
      }
    }
  },
  methods: {
    queryInstaller () {
      clearTimeout(this.queryInstallerDebounce)
      this.queryInstallerDebounce = setTimeout(() => {
        this.$http.queryQuotationInstaller({
          [this.installerType]: this.installerValue
        }).then(data => {
          this.installerList = data.map(t => {
            return {
              contactEmail: t.userResponses[0].email,
              storeCode: t.code,
              storeName: t.address.company,
              userMobile: t.userResponses[0].mobile,
              account: t.userResponses[0].account,
              storeId: t.id,
              name: t.userResponses[0].firstName + ' ' + t.userResponses[0].lastName,
              address: t.address.detail
            }
          })
        })
      }, 800)
    },
    checkInstaller (installer) {
      this.store = installer
      console.log(installer)
      this.fetchAddress(installer.storeId)
    },
    fetchAddress (id) {
      this.$http.fetchQuotationAddress({
        // storeId: id
        storeId: 10004
      }).then(data => {
        this.addressList = data.list
      })
    },
    checkAddress (row) {
      this.toAddr = row.address
      this.toAddr.zipCode = this.toAddr.zip
      this.showAddressTable = false
    },
    editAddress (row) {
      this.showAddressForm = true
      this.editAddressForm = row
    },
    showAddAddressForm () {
      // 新增地址打开弹框时首先清空表单
      for (let key in this.editAddressForm) {
        if (typeof this.editAddressForm[key] === 'object') {
          for (let address in this.editAddressForm[key]) {
            this.editAddressForm[key][address] = ''
          }
        } else {
          this.editAddressForm[key] = ''
        }
      }
      this.showAddressForm = true
    },
    submitAddressForm () {
      this.$refs.address.valid(valid => {
        if (valid) {
          this.$http.saveInstallerAddress({
            ...this.editAddressForm
          }).then(() => {
            this.submitAddressForm = false
            this.$Notice.success({
              title: '保存地址成功'
            })
          })
        }
      })
    },
    queryProduct () {
      this.$http.fetchQuotationProduct({
        conditions: this.productValue
      }).then(data => {
        this.productList = data.list.map(t => {
          t.itemSku.skuid = t.itemSku.id
          let item = {
            ...t.itemSku,
            ...t,
            currentPrice: t.itemSku.basePrice,
            amount: 0,
            remark: ''
          }
          delete item.itemSku
          return item
        })
      })
    },
    checkProduct (product) {
      console.log(product)
      this.checkedProducts.push(product)
    },
    editCellRender (h, params) {
      const value = params.row[params.column.key]
      return (
        <i-input on-on-blur={(e) => this.editCell(params.index, params.column.key, e)} value={value}></i-input>
      )
    },
    editCell (rowIndex, key, event) {
      this.checkedProducts[rowIndex][key] = event.target.value
    }
  },
  beforeMount () {
    this.fetchAddress()
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
  .installer-card, .product-card{
    /deep/ .ivu-poptip.select-pop{
      width: 100%;
      margin-bottom: 24px;
      /deep/ .ivu-poptip-rel{
        width: 100%;
      }
    }
  }
  .ship-card{
    .ivu-form-item{
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
      background-color: #fff;
      margin-bottom: 20px;
      th{
        background-color: #F6F6F6;
        font-weight: normal;
        color: #333333;
      }
      td,th {
        height: 30px;
        padding-left: 18px;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
  }
  .ship-card{

  }
  .product-card{
    /deep/ .history-poptip{
      .history-table{
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e9eaec;
        color: #495060;
        background-color: #fff;
        td,th {
          width: 50%;
          height: 30px;
          padding-left: 12px;
          box-sizing: border-box;
          text-align: left;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }
    }
  }
  .order-card{
    /deep/ .ivu-form-item{
      /deep/ .ivu-form-item-label{
        width: 120px;
      }
    }
    /deep/ .ivu-form-item-content{
      .fee,.other{
        display: inline-block;
      }
      .fee{
        width:136px;
      }
    }
  }
  .buttons{
    margin-bottom: 24px;
  }
</style>
