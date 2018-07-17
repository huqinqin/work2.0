import Mock from 'mockjs'
const personnelList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      firstName: '@name',
      lastName: '@name',
      role: '@name',
      account: '@name',
      email: '@email',
      phone: '@integer(20000000,90000000)',
      store: '@name',
      group: '@name',
      'status|1': ['上线', '下线']
    }]
  }
})
const personnelDetail = Mock.mock({
  'data': {
    'id|+1': '@id',
    firstName: '@name',
    lastName: '@name',
    role: '@name',
    account: '@name',
    email: '@email',
    phone: '@integer(20000000,90000000)',
    store: '@name',
    group: '@name',
    'status|1': ['上线', '下线'],
    address: '@region' + '@city',
    allocationDate: '@date'
  }
})
const personnelEditData = Mock.mock({
  data: {
    something: 'submit'
  }
})

export default {
  list () {
    console.log('list')
    return {
      code: '000000',
      ...personnelList,
      msg: ''
    }
  },
  save () {
    return {
      code: '000000',
      ...personnelEditData,
      msg: ''
    }
  },
  get () {
    return {
      code: '000000',
      ...personnelDetail,
      msg: ''
    }
  }
}
