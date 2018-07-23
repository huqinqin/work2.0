import Mock from 'mockjs'

const shopList = Mock.mock({
  'list|10': [{
    'id|+1': '@id',
    name: '@name',
    account: '@name',
    address: '@id',
    contact: '@name',
    phone: '@integer(20000000,90000000)',
    'status|1': ['上线', '下线']
  }]
})
const shopDetail = Mock.mock({
  'data': {
    'id|+1': '@id',
    name: '@name',
    account: '@name',
    state: '@province',
    country: '@region',
    city: '@city',
    zipcode: '@zip',
    address: '@county',
    contact: '@name',
    phone: '@integer(20000000,90000000)',
    mobile: '@integer(20000000,90000000)',
    'status|1': ['上线', '下线']
  }
})
const shopEditData = Mock.mock({
  data: {
    something: 'submit'
  }
})
export default {
  list () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...shopList
      },
      msg: ''
    }
  },
  get () {
    return {
      code: '000000',
      ...shopDetail,
      msg: ''
    }
  },
  sava () {
    return {
      code: '000000',
      ...shopEditData,
      msg: ''
    }
  }
}
