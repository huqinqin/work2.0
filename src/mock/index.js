import Mock from 'mockjs'

import { mapMock, mockSave, mockDelete } from './utils'

import login from './login'
import personnel from './personnel'
import product from './product'
import cert from './cert'
import installer from './installer'
import store from './store'
import order from './order'
import setting from './setting'
import quotation from './quotation'
import coupon from './coupon'

const options = Mock.mock({
  'data|9': [
    {
      'key|+1': '@increment(10)',
      value: '@name'
    }
  ]
})

mapMock('/item/offer/coupon', coupon)
mapMock('/personnel', personnel)
mapMock('/user', login)
mapMock('/item', product)
mapMock('/cert', cert)
mapMock('/installer', installer)
mapMock('/orderSell', order)
mapMock('/store', store)
mapMock('/setting', setting)
mapMock('/quotation', quotation)

Mock.mock(/\/common\/getCodeTable/, 'post', req => {
  const data = JSON.parse(req.body)
  console.log('请求数据', data)
  return {
    code: '000000',
    msg: '错误提示',
    stack: '错误栈',
    ...options
  }
})
Mock.mock(/\/activity\/del/, 'post', mockDelete)
Mock.mock(/\/activity\/del/, 'post', mockDelete)

Mock.mock(/\/*/, 'post', mockSave)

export default Mock
