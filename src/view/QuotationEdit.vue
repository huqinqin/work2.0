<template>
  <div>
    <card class="installer-card">
      <div class="title">
        <p>选择工程商</p>
        <div class="divider"></div>
      </div>
      <Row>
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
          <td>{{store.account}}</td>
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
            <Input v-model="store.custNotes" type="textarea" :rows="4"/>
          </div>
        </i-col>
        <i-col span="12">
          <p>Account Notes</p>
          <Input v-model="store.accountNotes" type="textarea" :rows="4"/>
        </i-col>
      </Row>
    </card>
    <card class="ship-card">
      <div class="title">
        <p>物流方式</p>
        <div class="divider"></div>
        <i-form ref="shipping" :model="shipping" label-position="top">
          <form-item label="选择方式" prop="type">
            <RadioGroup v-model="shipping.methods">
              <Radio label="willCall">自提</Radio>
              <Radio label="express">快递</Radio>
            </RadioGroup>
          </form-item>
          <template v-if="shipping.methods === 'express'">
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
    <card class="address-card" v-if="shipping.methods === 'express'">
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
          title="编辑地址">
          <MapAutoComplete :googleAddress="editAddressForm.address" ref="address"></MapAutoComplete>
          <footer slot="footer">
            <Button type="primary" @click="cancelAddressForm">取消</Button>
            <Button type="primary" @click="submitAddressForm">确定</Button>
          </footer>
        </Modal>
      </div>
    </card>
    <card class="po-card" v-if="shipping.methods === 'express'">
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
                  <li v-for="product in productList" :key="product.skuid" @click="checkProduct(product)">
                    product - {{product.title}}
                  </li>
                </ul>
              </div>
            </Poptip>
          </i-col>
        </Row>
        <i-table
          :data="itemList"
          :columns="productColumns"
        ></i-table>
      </div>
    </card>
    <card class="pay-card">
      <div class="title">
        <p>支付信息</p>
        <div class="divider"></div>
        <i-form label-position="top">
          <form-item label="支付方式">
            <RadioGroup v-model="pay.payType">
              <Radio label="anet">信用卡</Radio>
              <Radio label="cash">现金</Radio>
              <Radio label="check">支票</Radio>
              <Radio label="cod">COD</Radio>
              <Radio label="creditmemo">Credit Memo</Radio>
              <Radio label="term">账期</Radio>
              <Radio label="other">Other</Radio>
            </RadioGroup>
          </form-item>
          <form-item label="Packing Type">
            <RadioGroup v-model="note.packingType">
              <Radio label="Pick List Only">Pick List Only</Radio>
              <Radio label="No Invoice No Pick List">No Invoice No Pick List</Radio>
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
            <div class="fee">{{pay.itemFee | formatPrice}}</div><div class="other">Gross Profit Margin : 100.00%</div>
          </form-item>
          <form-item label="满减优惠">
            <div class="fee">{{pay.orderDiscount | formatPrice}}</div><div class="other"><Checkbox v-model="orderDiscount">Whether to participate in sitewide promotion</Checkbox></div>
          </form-item>
          <form-item label="税费/税率">
            <div class="fee">{{pay.taxRate}} / {{pay.taxFee | formatPrice}}</div>
          </form-item>
          <form-item label="运费">
            <div class="fee"><Input v-model="shippingFee" @on-change="getFee" /></div><div class="other"><Checkbox v-model="shipping.dropShipping">Insufficient inventory/Dropship from other office</Checkbox></div>
          </form-item>
          <form-item label="减免">
            <div class="discount">
              <RadioGroup v-model="discountType">
                <Radio label="num"><Input v-model="discountNum" @on-change="getFee" />$</Radio>
                <Radio label="percent"><Input v-model="discountPercent" @on-change="getFee" />%</Radio>
              </RadioGroup>
            </div>
          </form-item>
          <form-item class="total" label="实付金额">
            <div class="fee">{{total | formatPrice}}</div>
          </form-item>
        </i-form>
      </div>
    </card>
    <card class="order-note-card">
      <div class="title">
        <p>订单备注</p>
        <div class="divider"></div>
        <Input placeholder="请输入备注" type="textarea" :rows="4" v-model="note.remark"/>
      </div>
    </card>
    <div class="buttons">
      <Button type="primary">保存并发送邮件</Button>
      <Button type="primary">保存并下载询价单</Button>
      <Button type="primary" @click="simuTrade">保存</Button>
      <Button type="success" @click="saveQuotation">提交审核</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quotation-edit',
  data () {
    return {
      note: {
        remark: '2333333333333333',
        packingType: 'Pick List Only'
      },
      installerValue: '',
      installerType: 'storeCode',
      installerList: [],
      queryInstallerClock: '',
      store: {},
      poNo: '',
      shipping: {
        methods: 'express',
        expressCompany: 'Fedex',
        expressService: '01',
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
      itemList: [],
      productColumns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '图片',
          render: (h, params) => {
            return (
              <img src={params.row.imgUrls[0]} alt="主图" width="26" height="26"/>
            )
          }
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
          key: 'diyPrice',
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
            if (params.row.diyPrice && params.row.amount) {
              content = <span>{(+params.row.diyPrice) * (+params.row.amount)}</span>
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
                <i-button type="error" size="small" on-click={(e) => { this.deleteProduct(params.index) }}>删除</i-button>
              </div>
            )
          }
        }
      ],
      pay: {
        payType: 'anet',
        itemFee: 98400,
        orderDiscount: 0,
        taxFee: 523,
        taxRate: 0.017,
        shippingFee: 3453,
        discountFee: 0,
        oversold: false
      },
      discountType: 'num',
      discountNum: '0.00',
      discountPercent: '0.00',
      shippingFee: 34.53,
      getFeeClock: null,
      orderDiscount: false
    }
  },
  computed: {
    total () {
      console.log(this.pay.itemFee, this.pay.taxFee, this.pay.discountFee, this.pay.shippingFee)
      return (+this.pay.itemFee) + (+this.pay.taxFee) + (+this.pay.discountFee) + (+this.pay.shippingFee)
    }
  },
  methods: {
    queryInstaller () {
      clearTimeout(this.queryInstallerClock)
      this.queryInstallerClock = setTimeout(() => {
        this.$http.queryQuotationInstaller({
          [this.installerType]: this.installerValue
        }).then(data => {
          this.installerList = data.map(t => {
            return {
              storeCode: t.code,
              storeName: t.address.company,
              address: t.address.detail,
              storeId: t.id,
              account: t.userResponses[0].account,
              userId: t.userResponses[0].id,
              userEmail: t.userResponses[0].email,
              userMobile: t.userResponses[0].mobile,
              name: t.userResponses[0].firstName + ' ' + t.userResponses[0].lastName,
              accountNotes: '',
              custNotes: ''
            }
          })
        })
      }, 800)
    },
    checkInstaller (installer) {
      this.store = installer
      console.log(installer)
      this.fetchAddress()
    },
    fetchAddress () {
      return this.$http.fetchQuotationAddress({
        // storeId: this.store.storeId
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
      if (this.$refs.address.valid()) {
        this.$http.saveQuotationAddress({
          ...this.editAddressForm
        }).then(() => {
          this.showAddressForm = false
          this.$Notice.success({
            title: '保存地址成功'
          })
        })
      }
    },
    cancelAddressForm () {
      this.fetchAddress().then(() => {
        this.showAddressForm = false
      })
    },
    queryProduct () {
      this.$http.fetchQuotationProduct({
        conditions: this.productValue
      }).then(data => {
        this.productList = data.data.map(t => {
          t.itemSku.skuid = t.itemSku.id
          let item = {
            ...t.itemSku,
            ...t,
            diyPrice: (t.itemSku.basePrice / 100).toFixed(),
            amount: 0,
            note: {
              remark: ''
            }
          }
          delete item.itemSku
          return item
        })
      }, msg => {
        let data = {'code': '000000', 'msg': '', 'err': '', 'data': [{'id': 6, 'brandId': 5, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['11', '222'], 'skuIds': [35, 36], 'skus': null, 'skuId': null, 'kind': 'kind2', 'title': '2121212', 'imgUrls': ['http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/twitter_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/MD.png'], 'detail': '<p>测试商品<img src="http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/seagate.png">数据06<img src="http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/twitter_icon.png"></p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100003, 'name': 'sku标签1', 'categoryId': null, 'catePropId': null}, {'id': 100004, 'name': 'sku标签2', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100014, 'name': '测试类目sku属性11', 'value': 'ddd', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 1111, 'status': 'onsale', 'upTime': '2018-07-30T08:51:26Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 35, 'cateId': 1, 'sin': '212121201', 'props': [{'nameId': 100003, 'valueId': 100003, 'name': '测试类目sku属性11', 'value': 'sku标签1', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 11, 'basePrice': 22900, 'vipPrice': 0, 'offerPrice': 18320, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}, {'id': 6, 'brandId': 5, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['11', '222'], 'skuIds': [35, 36], 'skus': null, 'skuId': null, 'kind': 'kind2', 'title': '2121212', 'imgUrls': ['http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/twitter_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/MD.png'], 'detail': '<p>测试商品<img src="http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/seagate.png">数据06<img src="http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/twitter_icon.png"></p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100003, 'name': 'sku标签1', 'categoryId': null, 'catePropId': null}, {'id': 100004, 'name': 'sku标签2', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100014, 'name': '测试类目sku属性11', 'value': 'ddd', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 1111, 'status': 'onsale', 'upTime': '2018-07-30T08:51:26Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 36, 'cateId': 1, 'sin': '212121202', 'props': [{'nameId': 100003, 'valueId': 100004, 'name': '测试类目sku属性11', 'value': 'sku标签2', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 12, 'basePrice': 10100, 'vipPrice': 0, 'offerPrice': 8080, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}, {'id': 7, 'brandId': 4, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['1123', '234234'], 'skuIds': [34], 'skus': null, 'skuId': null, 'kind': 'kind2', 'title': '20180802', 'imgUrls': ['http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/youtube_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/twitter_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/linkedin_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/facebook_icon.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/history.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/hikvision.png', 'http://chen0711.oss-cn-hangzhou.aliyuncs.com/item-pic/MD.png'], 'detail': '<p>12312312312321321321</p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100003, 'name': 'sku标签1', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100014, 'name': '测试类目sku属性11', 'value': 'ddd', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 111111, 'status': 'onsale', 'upTime': '2018-07-30T08:59:22Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 34, 'cateId': 1, 'sin': '201808021', 'props': [{'nameId': 100003, 'valueId': 100003, 'name': '测试类目sku属性11', 'value': 'sku标签1', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 1, 'basePrice': 111, 'vipPrice': 0, 'offerPrice': 88, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}, {'id': 8, 'brandId': 7, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['0802'], 'skuIds': [41], 'skus': null, 'skuId': null, 'kind': 'kind1', 'title': '测试商品0802·', 'imgUrls': ['https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'], 'detail': '<p><span class="ql-size-huge">测试商品08020000000000000000000000000</span></p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100015, 'name': 'cehis', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100014, 'name': '测试类目sku属性11', 'value': 'ddd', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 12, 'status': 'onsale', 'upTime': '2018-08-02T07:20:37Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 41, 'cateId': 1, 'sin': '0802001', 'props': [{'nameId': 100003, 'valueId': 100015, 'name': '测试类目sku属性11', 'value': 'cehis', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 1, 'basePrice': 80000, 'vipPrice': 0, 'offerPrice': 64000, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}, {'id': 9, 'brandId': 9, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['0803'], 'skuIds': [38, 39], 'skus': null, 'skuId': null, 'kind': 'kind1', 'title': '测试商品0803', 'imgUrls': ['https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar', 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'], 'detail': '<h1><span class="ql-size-huge">测试商品080300000000</span></h1><p>测试商品</p><p>测试商品</p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100003, 'name': 'sku标签1', 'categoryId': null, 'catePropId': null}, {'id': 100004, 'name': 'sku标签2', 'categoryId': null, 'catePropId': null}, {'id': 100015, 'name': 'cehis', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100003, 'name': '测试类目sku属性11', 'value': 'sku标签1', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 12, 'status': 'onsale', 'upTime': '2018-08-02T07:27:53Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 38, 'cateId': 1, 'sin': '080301', 'props': [{'nameId': 100003, 'valueId': 100003, 'name': '测试类目sku属性11', 'value': 'sku标签1', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 1, 'basePrice': 100, 'vipPrice': 0, 'offerPrice': 80, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}, {'id': 9, 'brandId': 9, 'brandName': 'brandName1', 'cateId': 1, 'cateName': null, 'keyword': ['0803'], 'skuIds': [38, 39], 'skus': null, 'skuId': null, 'kind': 'kind1', 'title': '测试商品0803', 'imgUrls': ['https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar', 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'], 'detail': '<h1><span class="ql-size-huge">测试商品080300000000</span></h1><p>测试商品</p><p>测试商品</p>', 'itemProps': [{'nameId': null, 'valueId': null, 'name': null, 'value': null, 'canSearch': null, 'canSee': null, 'skuProps': [{'id': 100003, 'name': '测试类目sku属性11', 'values': [{'id': 100003, 'name': 'sku标签1', 'categoryId': null, 'catePropId': null}, {'id': 100004, 'name': 'sku标签2', 'categoryId': null, 'catePropId': null}, {'id': 100015, 'name': 'cehis', 'categoryId': null, 'catePropId': null}], 'categoryId': null}], 'props': [{'nameId': 100003, 'valueId': 100003, 'name': '测试类目sku属性11', 'value': 'sku标签1', 'canSearch': true, 'canSee': true, 'skuProps': null, 'props': null}]}], 'attr': null, 'ext': null, 'onum': 12, 'status': 'onsale', 'upTime': '2018-08-02T07:27:53Z', 'downTime': null, 'cdate': null, 'edate': null, 'introduction': null, 'offerId': 1, 'offerKind': 'item', 'itemSku': {'id': 39, 'cateId': 1, 'sin': '080302', 'props': [{'nameId': 100003, 'valueId': 100004, 'name': '测试类目sku属性11', 'value': 'sku标签2', 'canSearch': null, 'canSee': null, 'skuProps': null, 'props': null}], 'attr': null, 'ext': null, 'name': null, 'spec': '1', 'vipPriceScript': null, 'unit': 'pc', 'size': null, 'weight': 1, 'onum': 2, 'basePrice': 101, 'vipPrice': 0, 'offerPrice': 80, 'priceStatus': 'enabled', 'status': 'enabled', 'num': null}}]}
        this.productList = data.data.map(t => {
          t.itemSku.skuid = t.itemSku.id
          let item = {
            ...t.itemSku,
            ...t,
            diyPrice: (t.itemSku.basePrice / 100).toFixed(),
            amount: 0,
            note: {
              remark: ''
            }
          }
          delete item.itemSku
          return item
        })
      })
    },
    checkProduct (product) {
      for (let item in this.itemList) {
        if ((item.id === product.id) && (item.skuid === product.skuid)) {
          this.$Message.error('已经选择了该商品')
          return false
        }
      }
      this.itemList.push(product)
    },
    deleteProduct (index) {
      this.itemList.splice(index, 1)
    },
    editCellRender (h, params) {
      const value = params.row[params.column.key]
      return (
        <i-input on-on-blur={(e) => this.editCell(params.index, params.column.key, e)} value={value} />
      )
    },
    editCell (rowIndex, key, event) {
      this.itemList[rowIndex][key] = event.target.value
    },
    getFee () {
      clearTimeout(this.getFeeClock)
      this.getFeeClock = setTimeout(() => {
        let itemAndShip = (+this.pay.itemFee) + (+this.pay.shippingFee)
        if (this.discountType === 'num') {
          this.pay.discountFee = -(+this.discountNum) * 100
          this.discountPercent = ((+this.discountNum) * 100 / itemAndShip * 100).toFixed(2)
          if (this.discountNum === '') this.discountNum = '0.00'
        } else if (this.discountType === 'percent') {
          this.pay.discountFee = -(this.discountPercent * itemAndShip / 100).toFixed()
          this.discountNum = (this.discountPercent * itemAndShip / 100 / 100).toFixed(2)
        }
        this.pay.taxFee = (this.pay.taxRate * (itemAndShip + this.pay.discountFee)).toFixed()
        this.pay.shippingFee = (+this.shippingFee * 100).toFixed()
      }, 800)
    },
    simuTrade () {
      let items = this.itemList.map(t => {
        return {
          id: t.id,
          num: t.amount,
          sku: { id: t.skuid },
          diyPrice: t.diyPrice,
          note: { remark: t.note.remark }
        }
      })
      this.$http.simulateTrade({
        items: items,
        buyer: { id: this.store.userId },
        buyerStore: { id: this.store.storeId },
        shipping: this.shipping,
        tax: { fee: false },
        pay: { payType: this.pay.payType, note: { remark: '' } },
        note: { remark: this.note.remark },
        source: 'work',
        type: 'quotation',
        orderDiscount: this.orderDiscount,
        toAddr: this.toAddr,
        fromAddr: this.toAddr
      }).then(data => {
        console.log(data)
      })
    },
    saveQuotation () {
      this.$http.saveQuotation({
        store: this.store,
        poNo: this.poNo,
        itemList: this.itemList,
        toAddr: this.toAddr,
        shipping: this.shipping,
        pay: this.pay,
        note: this.note,
        source: 'work',
        type: 'quotation',
        sendEmail: false
      }).then(data => {
        console.log(data)
      })
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
  .installer-card{
    /deep/ .ivu-col-span-20{
      padding-left: 0;
      input{
        border-radius: 0 4px 4px 0;
      }
    }
    /deep/ .ivu-col-span-4{
      padding-right: 0;
      /deep/ .ivu-select-selection{
        border-radius: 4px 0 0 4px;
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
      /deep/ .ivu-input-wrapper{
        width: 120px;
      }
      .fee,.other{
        display: inline-block;
      }
      .fee{
        width:140px;
      }
      .discount{
        /deep/ .ivu-radio-group{
          margin-left: -20px;
        }
      }
    }
  }
  .buttons{
    margin-bottom: 24px;
  }
</style>
