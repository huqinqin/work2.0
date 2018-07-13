import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'

import { getInstallerList, getInstallerReviewList, getInstallerAccountList, getInstallerDetail } from './installer'
import { getProductAttributeList, getProductBrandList, getProductAttributeDetail, getProductList, getProductBrandDetail, getProductTrashList, getProductTrashRevert } from './product'
import { getShopList, getShopDetail, shopEdit } from './shop'
import { getPersonnelList, getPersonnelDetail } from './personnel'
import { getCertList, getCertDetail } from './cert'
// import { getActivityList } from './activity'
import { mockDelete } from './delete'
import { mockSave } from './save'

const options = Mock.mock({
  'data|9': [
    {
      'key|+1': '@increment(10)',
      value: '@name'
    }
  ]
})

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
// 登录相关和获取用户信息
Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/logout/, 'post', logout)
Mock.mock(/\/user\/infos/, 'post', getUserInfo)
Mock.mock(/\/installer\/account\/list/, 'post', getInstallerAccountList)
Mock.mock(/\/store\/list/, 'post', getInstallerReviewList)
Mock.mock(/\/store\/get/, 'post', getInstallerDetail)
Mock.mock(/\/installer\/getInstallerList/, 'post', getInstallerList)
Mock.mock(/\/product\/attribute\/list/, 'post', getProductAttributeList)
Mock.mock(/\/product\/attribute\/get/, 'post', getProductAttributeDetail)
Mock.mock(/\/product\/brand\/get/, 'post', getProductBrandDetail)
Mock.mock(/\/product\/brand\/list/, 'post', getProductBrandList)
Mock.mock(/\/product\/brand\/del/, 'post', mockDelete)
Mock.mock(/\/product\/brand\/save/, 'post', mockSave)
Mock.mock(/\/product\/trash\/list/, 'post', getProductTrashList)
Mock.mock(/\/product\/trash\/revert/, 'post', getProductTrashRevert)
Mock.mock(/\/product/, 'post', getProductList)
Mock.mock(/\/shop\/list/, 'post', getShopList)
Mock.mock(/\/shop\/get/, 'post', getShopDetail)
Mock.mock(/\/shop\/save/, 'post', shopEdit)
Mock.mock(/\/personnel\/list/, 'post', getPersonnelList)
Mock.mock(/\/personnel\/get/, 'post', getPersonnelDetail)
Mock.mock(/\/personnel\/save/, 'post', mockSave)
// Mock.mock(/\/config\/promo\/list/, 'post', getActivityList)
Mock.mock(/\/activity\/del/, 'post', mockDelete)
Mock.mock(/\/cert\/list/, 'post', getCertList)
Mock.mock(/\/cert\/get/, 'post', getCertDetail)
Mock.mock(/\/activity\/del/, 'post', mockDelete)

Mock.mock(/\/*/, 'post', mockSave)

export default Mock
