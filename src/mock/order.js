import Mock from 'mockjs'
const orderList = Mock.mock({
  'list|10': [{
    id: 'ID',
    address: {
      receiver: '收货人',
      detail: '详细地址',
      company: '公司名',
      zip: '邮编',
      telnum: '收货人电话'
    },
    buyerStoreId: '所属门店',
    cdate: '创建时间',
    pStatus: '支付状态',
    source: '来源',
    uEmail: '用户邮箱',
    sCode: '用户ID',
    sName: '公司名',
    payAmount: '总金额',
    salesName: '销售'
  }]
})
const orderDetail = Mock.mock({
  data: {
    id: 'ID',
    address: {
      receiver: '收货人',
      detail: '详细地址',
      company: '公司名',
      zip: '邮编',
      telnum: '收货人电话'
    },
    buyerStoreId: '所属门店',
    cdate: '创建时间',
    pStatus: '支付状态',
    source: '来源',
    uEmail: '用户邮箱',
    sCode: '用户ID',
    sName: '公司名',
    payAmount: '总金额',
    taxFee: '税费',
    shippingFee: '运费',
    itemFee: '应付金额',
    salesName: '销售',
    pTime: '支付时间',
    'itemList|3-9': [{
      id: '商品ID',
      title: '@cparagraph',
      'imgUrls|1-3': ['@image(100x100)'],
      weight: '@integer(1, 3)',
      unit: 'pc',
      price: '@integer(600, 900)',
      realPrice: '@integer(200, 600)',
      num: '@integer(1, 10)',
      amount: '@integer(1000, 5000)',
      sin: '@first'
    }]
  }
})

export default {
  list () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...orderList
      },
      msg: ''
    }
  },
  get () {
    return {
      code: '000000',
      ...orderDetail,
      msg: ''
    }
  }
}
