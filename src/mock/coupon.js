import Mock from 'mockjs'
const list = Mock.mock({
  'list|10': [{
    'id|+1': '@id',
    'include|1': [{
      type: 'item',
      itemIds: [1, 2]
    }, {
      type: 'cate',
      cateIds: [1, 2]
    }, {
      type: 'brand',
      brandIds: [1, 2]
    }],
    rule: {
      name: '@name',
      'type|1': ['common', 'register'],
      standard: 100,
      amount: 10,
      startTime: 10000,
      endTime: 100000,
      'amountType|1': ['reduce', 'off'],
      effectiveTime: 100879
    }
  }]
})
const useDetail = Mock.mock({
  'list|10': [{
    orderNo: '@id',
    'couponStatus|1': ['enabled', 'used'],
    useTime: 10000,
    storeName: '@name',
    storeId: '@id',
    receiveTime: new Date()
  }]
})
export default {
  list () {
    return {
      code: '000000',
      msg: '',
      data: {
        ...list
      }
    }
  },
  useDetail () {
    return {
      code: '000000',
      msg: '',
      ...useDetail
    }
  }
}
