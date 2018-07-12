import Mock from 'mockjs'
const certList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      url: '@image(200x100)',
      'number': '@integer(20000000,90000000)',
      company: '@name',
      detail: '@region' + '@province' + '@city',
      custId: '@integer(20000,90000)',
      uploadAt: '@date',
      validTime: '@date',
      reviewAt: '@date',
      'status|1': ['已通过', '已拒绝', '待审核']
    }]
  }
})
const certDetail = Mock.mock({
  'data': {
    id: '@integer(20000,90000)',
    url: '@image(200x100)',
    'number': '@integer(20000000,90000000)',
    company: '@name',
    address: {
      detail: '@region' + '@province' + '@city',
      city: '@city',
      state: '@state',
      zip: '@zipcode',
      country: '@country',
      street: '@region'
    },
    uploadAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    validTime: '@datetime("MM-dd-yyyy HH:mm:ss")',
    reviewAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    'status|1': ['已通过', '已拒绝', '待审核'],
    cust: {
      company: '@name',
      fisrtName: '@fisrt',
      lastName: '@last',
      phone: '@integer(20000000,90000000)',
      mobile: '@integer(20000000,90000000)',
      email: '@email',
      detail: '@region' + '@province' + '@city',
      custId: '@integer(20000,90000)',
      industry: '@name',
      allotAt: '@date',
      appleAt: '@date',
      saler: '@first',
      store: '@last',
      source: '@clast'
    }
  }
})
const personnelEditData = Mock.mock({
  data: {
    something: 'submit'
  }
})
export const getCertList = req => {
  return {
    code: '000000',
    ...certList,
    msg: ''
  }
}
export const getCertDetail = req => {
  return {
    code: '000000',
    ...certDetail,
    msg: ''
  }
}
export const certEdit = req => {
  return {
    code: '000000',
    ...personnelEditData,
    msg: ''
  }
}
