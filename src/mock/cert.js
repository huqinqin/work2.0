import Mock from 'mockjs'
const certList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      url: '@image(200x100)',
      'number': '@integer(20000000,90000000)',
      company: '@name',
      custId: '@integer(20000000,90000000)',
      address: '@region' + '@province' + '@city',
      uploadAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
      validate: '@datetime("MM-dd-yyyy HH:mm:ss")',
      reviewAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
      'status|1': ['已通过', '已拒绝', '待审核']
    }]
  }
})
const certDetail = Mock.mock({
  'data': {
    url: '@image(200x100)',
    'number': '@integer(20000000,90000000)',
    company: '@name',
    custId: '@integer(20000000,90000000)',
    address: '@region' + '@province' + '@city',
    uploadAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    validate: '@datetime("MM-dd-yyyy HH:mm:ss")',
    reviewAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    'status|1': ['已通过', '已拒绝', '待审核']
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
