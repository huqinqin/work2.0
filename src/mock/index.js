import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'

import { getInstallerList, getInstallerReviewList } from './installer'
import { getProductAttributeList, getProductBrandList, getProductList, getProductBrandDetail, getProductTrashList } from './product'
import { getShopList, getShopDetail, shopEdit } from './shop'
import { getPersonnelList, getPersonnelDetail } from './personnel'

// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)

Mock.mock(/\/installer\/review/, 'get', getInstallerReviewList)
Mock.mock(/\/installer\/getInstallerList/, 'get', getInstallerList)
Mock.mock(/\/product\/attribute/, 'get', getProductAttributeList)
Mock.mock(/\/product\/brand\/detail/, 'get', getProductBrandDetail)
Mock.mock(/\/product\/brand\/list/, 'get', getProductBrandList)
Mock.mock(/\/product\/trash/, 'get', getProductTrashList)
Mock.mock(/\/product/, 'get', getProductList)
Mock.mock(/\/shop\/list/, 'get', getShopList)
Mock.mock(/\/shop\/detail/, 'get', getShopDetail)
Mock.mock(/\/shop\/edit/, 'get', shopEdit)
Mock.mock(/\/personnel\/list/, 'get', getPersonnelList)
Mock.mock(/\/personnel\/detail/, 'get', getPersonnelDetail)

export default Mock
