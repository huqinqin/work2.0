import Mock from 'mockjs'
const orderList = Mock.mock({
  'list|10': [{
    id: '@id',
    address: {
      receiver: '@name',
      detail: '@county(true)',
      company: '@first',
      zip: '@zip',
      telnum: '@integer(10000000, 90000000)'
    },
    buyerStoreId: '@last',
    cdate: '@datetime',
    'pStatus|1': ['unpaid', 'paid', 'accept', 'ship', 'finish', 'close'],
    'source|1': ['XXX', 'YYY', 'ZZZ'],
    uEmail: 'email',
    sCode: '@integer(100000, 900000)',
    sName: '@first',
    payAmount: '@integer(1000, 9000)',
    salesName: '@last',
    taxFee: '@integer(100, 900)',
    shippingFee: '@integer(100, 900)',
    itemFee: '@integer(1000, 9000)',
    discountFee: '-@integer(100, 500)',
    otherFee: '0',
    taxFeeInfo: {
      value: {
        rate: '0.1'
      }
    },
    'itemList|3-9': [{
      id: '@id',
      title: '@paragraph(1)',
      'imgUrls|1-3': ['@image(100x100)'],
      weight: '@integer(1, 3)',
      unit: 'pc',
      price: '@integer(600, 900)',
      realPrice: '@integer(200, 600)',
      num: '@integer(1, 10)',
      amount: '@integer(1000, 5000)',
      sin: '@first',
      type: '@last'
    }]
  }]
})
const orderDetail = Mock.mock({
  data: {
    id: '@id',
    address: {
      receiver: '@name',
      detail: '@county(true)',
      company: '@first',
      zip: '@zip',
      telnum: '@integer(10000000, 90000000)'
    },
    buyerStoreId: '@last',
    cdate: '@date',
    'pStatus|1': ['unpaid', 'paid', 'accept', 'ship', 'finish', 'close'],
    source: '@last',
    uEmail: 'email',
    sCode: '@integer(100000, 900000)',
    sName: '@first',
    payAmount: '@integer(1000, 9000)',
    taxFee: '@integer(100, 900)',
    shippingFee: '@integer(100, 900)',
    itemFee: '@integer(1000, 9000)',
    discountFee: '-@integer(100, 500)',
    otherFee: '0',
    taxFeeInfo: {
      value: {
        rate: '0.1'
      }
    },
    salesName: '@name',
    pTime: '@date',
    'itemList|3-9': [{
      id: '@id',
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
