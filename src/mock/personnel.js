import Mock from 'mockjs'
const personnelList = Mock.mock({ 'data|10': [{
  'id|+1': '@id',
  name: '@name',
  account: '@name',
  address: '@id',
  contact: '@name',
  phone: '@integer(20000000,90000000)',
  'status|1': ['上线', '下线']
}] })
const personnelDetail = Mock.mock({
  'data': {
    name: '@name',
    role: '@name',
    type: '@name',
    phone: '@integer(20000000,90000000)',
    mobile: '@integer(20000000,90000000)',
    email: '@email',
    address: '@region' + '@city',
    allocationDate: '@date',
    applicationDate: '@date'
  }
})
const personnelEditData = Mock.mock({
  data: {
    something: 'submit'
  }
})
export const getPersonnelList = req => {
  return {
    code: 200,
    ...personnelList,
    msg: ''
  }
}
export const getPersonnelDetail = req => {
  return {
    code: 200,
    ...personnelDetail,
    msg: ''
  }
}
export const personnelEdit = req => {
  return {
    code: 200,
    ...personnelEditData,
    msg: ''
  }
}
