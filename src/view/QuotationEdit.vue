<template>
  <div id="store">
    <card class="installer-card" :class="{'empty': !validForm.store}">
      <div class="title">
        <p>选择工程商</p>
        <div class="divider"></div>
      </div>
      <Row>
        <i-col span="4">
          <Select v-model="installerType" :disabled="!canEdit">
            <Option value="storeCode">Cust ID</Option>
            <Option value="storeName">公司名称</Option>
            <Option value="account">账号</Option>
            <Option value="mobile">电话</Option>
            <Option value="contactEmail">邮箱</Option>
          </Select>
        </i-col>
        <i-col span="20">
          <QueryInput :remote="queryInstaller" @change="checkInstaller" :value="installerValue">
            <template slot-scope="props">
              {{props.item.storeName}} - {{props.item.storeCode}}
            </template>
          </QueryInput>
        </i-col>
      </Row>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">账号</td>
          <td>{{store.userAccount}}</td>
          <td class="speTd">名字/电话</td>
          <td>{{store.name}} / {{store.userMobile}}</td>
        </tr>
        <tr>
          <td class="speTd">Cust ID</td>
          <td>{{store.storeCode}}</td>
          <td class="speTd">公司名称/邮箱</td>
          <td>{{store.storeName}} / {{store.userEmail}}</td>
        </tr>
        <tr>
          <td class="speTd">详细地址</td>
          <td colspan="3">{{store.address.detail}}</td>
        </tr>
      </table>
    </card>
    <card class="note-card">
      <Row :gutter="16">
        <i-col span="12">
          <div>
            <p>Cust Notes</p>
            <Input v-model="store.custNotes" type="textarea" :rows="4" readonly/>
          </div>
        </i-col>
        <i-col span="12">
          <p>Account Notes</p>
          <Input v-model="store.accountNotes" type="textarea" :rows="4" readonly/>
        </i-col>
      </Row>
    </card>
    <card class="ship-card">
      <div class="title">
        <p>物流方式</p>
        <div class="divider"></div>
        <i-form ref="shipping" :model="shipping" label-position="top" id="address">
          <form-item label="选择方式" prop="type">
            <div v-if="!canEdit">
              <span v-if="shipping.methods === 'willCall'">自提</span>
              <span v-else>快递</span>
            </div>
            <RadioGroup v-model="shipping.methods" v-else @on-change="simuTrade">
              <Radio label="willCall">自提</Radio>
              <Radio label="shipping">快递</Radio>
            </RadioGroup>
          </form-item>
          <template v-if="shipping.methods === 'shipping'">
            <form-item label="快递公司" prop="company">
              <div v-if="!canEdit">
                <span>{{shipping.expressCompany}}</span>
              </div>
              <RadioGroup v-model="shipping.expressCompany" v-else @on-change="simuTrade">
                <Radio label="UPS">UPS</Radio>
                <Radio label="Fedex">Fedex</Radio>
              </RadioGroup>
            </form-item>
            <form-item label="快递服务" prop="service">
              <div v-if="!canEdit">
                <span v-for="item in expressOption" v-if="item.value === shipping.expressService" :key="item.value">{{item.label}}</span>
              </div>
              <RadioGroup v-model="shipping.expressService" class="service-radio" v-else @on-change="simuTrade">
                <Radio v-for="item in expressOption" :label="item.value" :key="item.value">{{item.label}}</Radio>
              </RadioGroup>
            </form-item>
            <form-item>
              <Checkbox v-model="shipping.expressSignature" :disabled="!canEdit" @on-change="simuTrade">本人签收</Checkbox>
              <Checkbox v-model="shipping.ownExpense" :disabled="!canEdit" @on-change="simuTrade">Use customer's shipping account</Checkbox>
            </form-item>
          </template>
        </i-form>
      </div>
    </card>
    <card class="address-card" v-if="shipping.methods === 'shipping'" id="po" :class="{'empty': !validForm.address}">
      <div class="title">
        <p>选择收货地址 <Button type="text" @click="showAddAddressForm" :disabled="!canEdit">+添加地址</Button></p>
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
        <Button type="primary" @click="showAddressTable = true" :disabled="!canEdit">选择地址</Button>
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
            <Button type="primary" @click="submitAddressForm" :loading="addressLoading">确定</Button>
          </footer>
        </Modal>
      </div>
    </card>
    <card class="po-card" v-if="shipping.methods === 'shipping'" id="product" :class="{'empty': !validForm.po}">
      <div class="title">
        <p>P/O NO.</p>
        <div class="divider"></div>
        <Input placeholder="请输入P/O NO." v-model="poNo" :readonly="!canEdit" @on-change="inputPO"/>
      </div>
    </card>
    <card class="product-card" :class="{'empty': !validForm.items}">
      <div class="title">
        <p>选择商品</p>
        <div class="divider"></div>
        <Row>
          <i-col span="24">
            <QueryInput :value="productValue" :remote="queryProduct" @change="checkProduct">
              <template slot-scope="props">
                product - {{props.item.title}}
              </template>
            </QueryInput>
          </i-col>
        </Row>
        <i-table
          :data="itemList"
          :columns="productColumns"
        ></i-table>
      </div>
    </card >
    <card class="pay-card">
      <div class="title">
        <p>支付信息</p>
        <div class="divider"></div>
        <i-form label-position="top">
          <form-item label="支付方式">
            <div v-if="!canEdit">
              <span v-for="item in payMethodOption" :key="item.value" v-if="item.value === payMethod">{{item.name}}</span>
            </div>
            <RadioGroup v-model="payMethod" v-else>
              <Radio v-for="item in payMethodOption" :key="item.value" :label="item.value">{{item.name}}</Radio>
            </RadioGroup>
          </form-item>
          <form-item label="Packing Type">
            <div v-if="!canEdit">
              <span>{{packingType}}</span>
            </div>
            <RadioGroup v-model="packingType" v-else>
              <Radio label="Pick List Only">Pick List Only</Radio>
              <Radio label="No Invoice No Pick List">No Invoice No Pick List</Radio>
            </RadioGroup>
          </form-item>
          <form-item label="备注">
            <Input v-model="payRemark" :readonly="!canEdit"/>
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
            <div class="fee">{{pay.rebateFee | formatPrice}}</div>
            <div class="other"><Checkbox :disabled="!canEdit" v-model="pay.orderDiscount" @on-change="getFee">Whether to participate in sitewide promotion</Checkbox></div>
          </form-item>
          <form-item label="税率/税费">
            <div class="fee" v-if="['','init','salesManager', 'enabled'].indexOf(status) !== -1">{{pay.taxRate}} / {{pay.taxFee | formatPrice}}</div>
            <div class="fee" v-if="status === 'financial'" style="width: 200px;"><Input v-model="pay.taxRate" @on-change="getFee" />&nbsp;&nbsp;&nbsp;/&nbsp;{{pay.taxFee | formatPrice}}</div>
          </form-item>
          <form-item label="运费">
            <div class="fee">
              <template v-if="!canEdit">{{pay.shippingFee | formatPrice}}</template>
              <template v-else><Input v-model="shippingFee" @on-change="getFee" /></template>
            </div>
            <div class="other">
              <Checkbox v-model="dropShipping" :disabled="!canEdit">Dropship from other office</Checkbox>
              <Checkbox v-model="overSell" :disabled="!canEdit">Insufficient inventory/</Checkbox>
            </div>
          </form-item>
          <form-item label="手续费">
            <div class="fee">
              <template v-if="!canEdit">{{pay.fee.handleFee | formatPrice}}</template>
              <template v-else><Input v-model="handleFee" @on-change="getFee" /></template>
            </div>
          </form-item>
          <form-item label="减免">
            <div class="discount">
              <div class="fee" v-if="!canEdit">
                {{ pay.fee.reduceFee | formatPrice}}
              </div>
              <RadioGroup v-model="discountType" v-else>
                <Radio label="num">$<Input v-model="discountNum" @on-change="getFee" /></Radio>
                <Radio label="percent"><Input v-model="discountPercent" @on-change="getFee" />%</Radio>
              </RadioGroup>
            </div>
          </form-item>
          <form-item class="total" label="实付金额">
            <div class="fee"><span v-if="computing">计算中...</span><span v-else>{{pay.amount | formatPrice}}</span></div>
          </form-item>
        </i-form>
      </div>
    </card>
    <card class="order-note-card">
      <div class="title">
        <p>订单备注</p>
        <div class="divider"></div>
        <Input placeholder="请输入备注" type="textarea" :rows="4" v-model="orderNote" :readonly="!canEdit"/>
      </div>
    </card>
    <card class="order-card">
      <div class="title">
        <p>审核记录</p>
        <div class="divider"></div>
        <i-table :data="reviewRecords" :columns="recordColumns"></i-table>
      </div>
    </card>
    <div class="buttons">
      <template v-if="(status === 'init') || (status === '')">
        <Button type="primary">保存并发送邮件</Button>
        <Button type="primary">保存并下载询价单</Button>
        <Button type="primary" @click="saveQuotation('save')">保存</Button>
        <Button type="success" @click="saveQuotation('send')">提交审核</Button>
      </template>
      <template v-if="(status === 'salesManager') || (status === 'financial')">
        <Button type="success" @click="agree">通过</Button>
        <Button type="error" @click="refuse">打回</Button>
      </template>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import formatPrice from '../plugin/filter/formatPrice'
export default {
  name: 'quotation-edit',
  data () {
    return {
      orderNote: '',
      packingType: '',
      installerValue: '',
      installerType: 'storeCode',
      installerList: [],
      queryInstallerClock: '',
      gotInstaller: false,
      store: {
        address: {}
      },
      poNo: '',
      shipping: {
        methods: 'shipping',
        expressCompany: 'Fedex',
        expressService: '01',
        expressSignature: true,
        ownExpense: false
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
      payMethodOption: [
        {value: 'anet', name: '信用卡'},
        {value: 'cash', name: '现金'},
        {value: 'check', name: '支票'},
        {value: 'C.O.D Cashier Check', name: 'C.O.D Cashier Check'},
        {value: 'C.O.D Company Check', name: 'C.O.D Company Check'},
        {value: 'creditmemo', name: 'Credit Memo'},
        {value: 'term', name: '账期'},
        {value: 'other', name: 'Other'}
      ],
      toAddr: {},
      fromAddr: {},
      supplierId: '',
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
        status: 'enabled'
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
                <i-button type="error" size="small" onClick={() => {
                  this.checkAddress(params.row)
                }}>选择
                </i-button>
                <i-button type="primary" size="small" onClick={() => {
                  this.editAddress(params.row)
                }}>编辑
                </i-button>
              </div>
            )
          }
        }
      ],
      addressLoading: false,
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
              <img src={params.row.imgUrl} alt="主图" width="26" height="26" />
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
          render: (h, params) => {
            return (
              <div>{formatPrice.formatPrice(params.row.basePrice)}</div>
            )
          }
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
              <span>{formatPrice.formatPrice(params.row.avgCost)} / {((params.row.diyPrice - params.row.avgCost / 100) / params.row.diyPrice).toFixed(2) * 100} %</span>
            )
          }
        },
        {
          title: '总价',
          render: (h, params) => {
            let content = null
            if (params.row.diyPrice && params.row.amount) {
              content = <span>${(+params.row.diyPrice) * (+params.row.amount)}</span>
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
            let content = null
            if (this.productHistory.length) {
              content = this.productHistory.map(t => {
                return (
                  <tr>
                    <td>{t.edate}</td>
                    <td>{t.price}</td>
                  </tr>
                )
              })
            } else {
              content = (
                <tr>
                  <td>/</td>
                  <td>/</td>
                </tr>
              )
            }
            return (
              <div>
                <poptip class="history-poptip" width="300" trigger="hover" title="历史成交价" popper-class="history-pop" placement="bottom-end" on-on-popper-show={e => this.queryHistory(params.row)}>
                  <div slot="content">
                    <table border="1" class="history-table">
                      <tr>
                        <th>时间</th>
                        <th>价格</th>
                      </tr>
                      {content}
                    </table>
                  </div>
                  <i-button type="primary" size="small">more</i-button>
                </poptip>
                <i-button disabled={!this.canEdit} type="error" size="small" on-click={(e) => {
                  this.deleteProduct(params.index)
                }}>删除
                </i-button>
              </div>
            )
          }
        }
      ],
      payMethod: 'anet', // 支付方式
      payRemark: '', // 支付方式
      overSell: false, // 是否超卖
      dropShipping: false,
      pay: {
        amount: '', // 总金额
        itemFee: '', // 商品金额
        taxFee: '', // 税费
        taxRate: '', // 税率
        shippingFee: '', // 运费
        rebateFee: '', // 满减优惠
        fee: {
          handleFee: '',
          reduceFee: ''
        }, // 手动减免
        orderDiscount: false // 是否参与满减
      },
      handleFee: '0.00',
      discountType: 'num',
      discountNum: '0.00',
      discountPercent: '0.00',
      shippingFee: 0,
      reduceFee: '',
      getFeeClock: null,
      simuClock: null,
      validForm: {
        store: true,
        address: true,
        items: true,
        po: true
      },
      mid: '',
      id: '',
      status: '',
      cdate: '',
      reviewRecords: [],
      recordColumns: [
        {
          title: '审核人',
          width: 150,
          render: (h, params) => {
            return (
              <div>{params.row.reviewPoint === 'salesManager' ? '销售主管' : '财务'}{params.row.recordStatus === 'refuse' ? '打回' : '通过'}</div>
            )
          }
        }, {
          title: '时间',
          width: 150,
          render: (h, params) => {
            return (
              <div>{params.row.cdate}</div>
            )
          }
        }, {
          title: '备注',
          key: 'content'
        }
      ],
      productHistory: [],
      canEdit: true,
      computing: false
    }
  },
  methods: {
    queryInstaller (query) {
      return this.$http.queryQuotationInstaller({
        [this.installerType]: query
      }).then(data => {
        return data.reduce((list, item) => {
          const array = item.userResponses.map(({id, account, email, mobile, firstName, lastName}) => ({
            storeCode: item.code,
            storeName: item.name,
            address: item.address,
            storeId: item.id,
            userAccount: account,
            userId: id,
            userEmail: email,
            userMobile: mobile,
            name: firstName + ' ' + lastName,
            userFirstName: firstName,
            userLastName: lastName,
            accountNotes: '',
            custNotes: ''
          }))
          return list.concat(array)
        }, [])
      })
    },
    checkInstaller (installer) {
      this.validForm.store = true
      this.store = installer
      this.fetchAddress()
    },
    fetchAddress () {
      return this.$http.fetchQuotationAddress({
        storeId: this.store.storeId
      }).then(data => {
        this.addressList = data.list
      })
    },
    checkAddress (row) {
      this.validForm.address = true
      this.toAddr = row.address
      this.toAddr.zipCode = this.toAddr.zip
      this.showAddressTable = false
      this.simuTrade()
    },
    editAddress (row) {
      this.showAddressForm = true
      this.editAddressForm = row
    },
    showAddAddressForm () {
      // 新增地址打开弹框时首先清空表单
      for (let item in this.editAddressForm.address) {
        this.editAddressForm.address[item] = ''
      }
      this.showAddressForm = true
    },
    submitAddressForm () {
      this.$refs.address.valid().then(valid => {
        if (valid) {
          this.addressLoading = true
          this.$http.saveQuotationAddress({
            objId: this.store.storeId,
            ...this.editAddressForm
          }).then(() => {
            this.addressLoading = false
            this.showAddressForm = false
            this.$Notice.success({
              title: '保存地址成功'
            })
            this.fetchAddress()
          })
        }
      })
    },
    cancelAddressForm () {
      this.fetchAddress().then(() => {
        this.showAddressForm = false
      })
    },
    inputPO () {
      this.validForm.po = true
    },
    queryProduct (query) {
      return this.$http.fetchQuotationProduct({
        conditions: query
      }).then(data => {
        return data.map(t => {
          t.itemSku.sku = {id: t.itemSku.id}
          let item = {
            ...t.itemSku,
            ...t,
            diyPrice: (t.itemSku.basePrice / 100).toFixed(),
            amount: 1,
            imgUrl: t.imgUrls[0],
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
      this.validForm.items = true
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
    queryHistory (row) {
      this.$http.fetchQuotationProductHistory({
        itemId: row.id,
        storeId: this.store.storeId,
        skuId: row.sku.id
      }).then(data => {
        this.productHistory = data
      })
    },
    editCellRender (h, params) {
      let value
      if (params.column.key === 'remark') {
        value = params.row.note.remark
      } else {
        value = params.row[params.column.key]
      }
      return (
        <i-input on-on-blur={(e) => this.editCell(params.index, params.column.key, e)} value={value} readonly={!this.canEdit}/>
      )
    },
    editCell (rowIndex, key, event) {
      if (key === 'remark') {
        this.itemList[rowIndex].note.remark = event.target.value
      } else {
        this.itemList[rowIndex][key] = event.target.value
      }
      this.simuTrade()
    },
    getFee () {
      if (this.discountType === 'num') {
        this.pay.fee.reduceFee = -(+this.discountNum) * 100
        this.discountPercent = ((-this.pay.fee.reduceFee) / (+this.pay.itemFee)).toFixed(2)
        // if (this.discountNum === '') this.discountNum = '0.00'
      } else if (this.discountType === 'percent') {
        this.pay.fee.reduceFee = -(this.discountPercent * (+this.pay.itemFee) / 100).toFixed()
        this.discountNum = ((-this.pay.fee.reduceFee) / 100).toFixed(2)
      }
      if (this.shippingFee || (+this.shippingFee === 0)) {
        this.pay.shippingFee = (+this.shippingFee * 100).toFixed()
      } else {
        this.pay.shippingFee = ''
      }
      this.pay.fee.handleFee = (+this.handleFee * 100).toFixed()
      this.simuTrade()
    },
    simuTrade: debounce(function () {
      if (this.validateForm()) {
        if (!this.canEdit && (this.status !== 'financial')) {
          return false
        }
        let items = this.itemList.map(t => {
          return {
            id: t.id,
            num: t.amount,
            sku: t.sku,
            // offerId: t.offerId,
            diyPrice: t.diyPrice * 100,
            note: {remark: t.note.remark}
          }
        })
        let pay = JSON.parse(JSON.stringify(this.pay))
        if (['', 'init', 'salesManager'].indexOf(this.status) !== -1) {
          delete pay.taxRate
          delete pay.taxFee
          // delete pay.shippingFee
        }
        let shipping = JSON.parse(JSON.stringify(this.shipping))
        if (this.shippingFee || (this.shippingFee === 0)) {
          shipping.fee = +this.shippingFee * 100
        }
        let params = {
          items: items,
          buyer: {id: this.store.userId},
          buyerStore: {id: this.store.storeId},
          shipping: shipping,
          tax: {rate: pay.taxRate},
          pay: {payType: 'offline'},
          // pay: Object.assign({}, {payType: 'offline'}, pay),
          note: {remark: this.orderNote},
          source: 'work',
          type: 'quotation',
          orderDiscount: pay.orderDiscount ? pay.orderDiscount : false,
          toAddr: this.toAddr,
          fromAddr: this.fromAddr,
          fee: this.pay.fee,
          ext: {
            poNo: this.poNo,
            offlinePayType: 'offline',
            packingType: this.packingType,
            offlinePayRemark: this.payRemark
          }
        }
        for (let key in params) {
          if (params[key] === '') {
            delete params[key]
          }
        }
        this.computing = true
        this.$http.simulateTrade(params).then(data => {
          this.computing = false
          this.pay.itemFee = data.itemFee
          this.pay.shippingFee = data.shippingFee
          this.shippingFee = (data.shippingFee / 100).toFixed(2)
          this.pay.taxFee = data.taxFee
          if (data.taxRate || (data.taxRate === 0)) {
            this.pay.taxRate = data.taxRate
          }
          this.pay.fee.handleFee = data.handleFee
          this.pay.fee.reduceFee = data.reduceFee
          this.pay.rebateFee = data.rebateFee
          this.pay.amount = this.pay.itemFee + this.pay.shippingFee + this.pay.taxFee + this.pay.rebateFee + this.pay.fee.handleFee + this.pay.fee.reduceFee
        })
      }
    }, 800),
    saveQuotation (key) {
      if (this.validateForm()) {
        this.itemList.forEach(t => {
          t.diyPrice = t.diyPrice * 100
          t.num = t.amount
        })
        let params = {
          store: this.store,
          poNo: this.poNo,
          itemList: this.itemList,
          toAddr: this.toAddr,
          shipping: this.shipping,
          pay: this.pay,
          orderNote: this.orderNote,
          packingType: this.packingType,
          source: 'work',
          type: 'quotation',
          fromAddr: this.fromAddr,
          sendEmail: false,
          reviewRecords: this.reviewRecords,
          payMethod: this.payMethod,
          payRemark: this.payRemark,
          overSell: this.overSell,
          dropShipping: this.dropShipping,
          supplierId: this.supplierId
        }
        if (this.id) {
          params = Object.assign({}, {id: this.id, mid: this.mid, cdate: this.cdate}, params)
        }
        if (key === 'save') {
          this.$http.saveQuotation(params).then(data => {
            this.$Notice.success({
              title: '保存询价单成功'
            })
            this.$router.push({ name: 'quotation_review_list' })
          })
        } else if (key === 'send') {
          this.$http.sendQuotation(params).then(data => {
            this.$Notice.success({
              title: '提交审核成功'
            })
            this.$router.push({ name: 'quotation_review_list' })
          })
        } else if (key === 'email') {
          params.sendEmail = true
          console.log('email')
        } else if (key === 'download') {
          console.log('download')
        }
      }
    },
    getFromAddr () {
      this.$http.getSupplyInfo().then(data => {
        this.fromAddr = data[0].address
        this.supplierId = data[0].id
      })
    },
    validateForm () {
      if (this.poNo === '') {
        this.validForm.po = false
        location.href = '#po'
      }
      if (this.itemList.length === 0) {
        this.validForm.items = false
        location.href = '#product'
      }
      if (JSON.stringify(this.toAddr) === '{}') {
        this.validForm.address = false
        location.href = '#address'
      }
      if (JSON.stringify(this.store) === '{}') {
        this.validForm.store = false
        location.href = '#store'
      }
      if (Object.keys(this.validForm).some(key => this.validForm[key] === false)) {
        return false
      } else {
        return true
      }
    },
    getDetail (id) {
      this.$http.getQuotation({
        id: id
      }).then(data => {
        this.fromAddr = data.fromAddr
        this.supplierId = data.supplierId
        this.store = data.store
        this.poNo = data.poNo
        this.itemList = data.itemList
        this.toAddr = data.toAddr
        this.shipping = data.shipping
        this.sendEmail = data.sendEmail
        this.orderNote = data.orderNote
        this.mid = data.mid
        this.packingType = data.packingType
        this.status = data.status
        this.id = data.id
        this.cdate = data.cdate
        this.payMethod = data.payMethod
        this.payRemark = data.payRemark
        this.pay = data.pay
        this.pay.orderDiscount = data.orderDiscount
        this.discountNum = -(data.pay.fee.reduceFee / 100).toFixed(2)
        this.handleFee = (data.pay.fee.handleFee / 100).toFixed(2)
        this.reviewRecords = data.reviewRecords
        this.shippingFee = (data.pay.shippingFee / 100).toFixed(2)
        this.pay.amount = (+this.pay.itemFee) + (+this.pay.shippingFee) + (+this.pay.taxFee) + (+this.pay.rebateFee) + (+this.pay.fee.handleFee) + (+this.pay.fee.reduceFee)
        if (['salesManager', 'financial', 'enabled'].indexOf(this.status) !== -1) {
          this.canEdit = false
        }
        this.itemList.forEach(t => {
          t.diyPrice = (t.diyPrice / 100).toFixed(2)
        })
        let ids = this.itemList.map(t => {
          return {
            itemId: t.id,
            skuId: t.sku.id
          }
        })
        this.$http.getProductByIds({
          ids: ids,
          supplierId: this.supplierId
        }).then(data => {
          this.itemList.forEach(t => {
            data.forEach(v => {
              if ((t.id === v.id) && (t.sku.id === v.itemSku.id)) {
                t.avgCost = v.itemSku.avgCost
                t.basePrice = v.itemSku.basePrice
                t.offerPrice = v.itemSku.offerPrice
                t.num = v.itemSku.num
                t.vipPrice = v.itemSku.vipPrice
              }
            })
          })
        })
      })
    },
    agree () {
      let content = ''
      this.$Modal.confirm({
        title: '通过备注',
        render: (h) => {
          return <i-input style="margin-top: 12px;" type="textarea" rows={2} value={content} autofocus={true} placeholder="Please enter note..." on-input={val => { content = val }}></i-input>
        },
        onOk: () => {
          let params = {
            id: this.id,
            status: this.status,
            content: content
          }
          if (this.status === 'financial') {
            params.pay = this.pay
          }
          this.$http.agreeQuotation(params).then(() => {
            this.$Notice.success({
              title: '操作成功'
            })
            this.$router.push({name: 'quotation_review_list'})
          })
        }
      })
    },
    refuse () {
      let content = ''
      this.$Modal.confirm({
        title: '打回备注',
        render: (h) => {
          return <i-input style="margin-top: 12px;" type="textarea" rows={2} value={content} autofocus={true} placeholder="Please enter note..." on-input={val => { content = val }}></i-input>
        },
        onOk: () => {
          if (content) {
            this.$http.refuseQuotation({
              id: this.id,
              status: this.status,
              content: content,
              reviewStatus: 'refuse'
            }).then(() => {
              this.$Notice.success({
                title: '操作成功'
              })
              this.$router.push({name: 'quotation_review_list'})
            })
          } else {
            this.$Modal.error({
              title: '请输入备注'
            })
          }
        }
      })
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    } else {
      this.getFromAddr()
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
  .installer-card, .product-card{
    /deep/ .ivu-poptip.select-pop{
      width: 100%;
      margin-bottom: 24px;
      /deep/ .ivu-poptip-rel{
        width: 100%;
      }
    }
  }
  /deep/ .installer-popover{
    .ivu-poptip-body{
      padding: 0 !important;
      .content{
        padding: 8px 16px;
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
    .fee{
      color: #FF3B41;
    }
    .total .fee{
      font-weight: bold;
      font-size: 14px;
    }
  }
  .buttons{
    margin-bottom: 24px;
  }
  .empty{
    border: 1px solid #FF3B41;
    position: relative;
    margin-bottom: 32px;
  }
  .empty::after{
    position: absolute;
    top: 100%;
    left: 0;
    color: #FF3B41;
  }
  .installer-card.empty::after{
    content: '请选择工程商';
  }
  .address-card.empty::after{
    content: '请选择收货地址';
  }
  .product-card.empty::after{
    content: '请选择商品';
  }
  .po-card.empty::after{
    content: '请输入P/O NO.';
  }
</style>
