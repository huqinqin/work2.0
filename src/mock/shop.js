import Mock from 'mockjs'
const shopList = Mock.mock({ 'data|10': [{
  'id|+1': '@id',
  name: '@name',
  account: '@name',
  address: '@id',
  contact: '@name',
  phone: '@integer(20000000,90000000)',
  'status|1': ['上线', '下线']
}] })
export const getShopList = req => {
  return {
    code: 200,
    ...shopList,
    msg: ''
  }
}
