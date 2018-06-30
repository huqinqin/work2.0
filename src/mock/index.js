import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'

import { getInstallerList, getInstallerReviewList } from './installer'
import { getProductAttributeList, getProductBrandList, getProductAttributeDetail, getProductList, getProductBrandDetail, getProductTrashList, getProductTrashRevert } from './product'
import { getShopList, getShopDetail, shopEdit } from './shop'
import { getPersonnelList, getPersonnelDetail } from './personnel'
import { getActivityList } from './activity'
import { mockDelete } from './delete'
import { mockSave } from './save'
// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)

Mock.mock(/\/installer\/review/, 'post', getInstallerReviewList)
Mock.mock(/\/installer\/getInstallerList/, 'post', getInstallerList)
Mock.mock(/\/product\/attribute\/list/, 'post', getProductAttributeList)
Mock.mock(/\/product\/attribute\/detail/, 'post', getProductAttributeDetail)
Mock.mock(/\/product\/brand\/detail/, 'post', getProductBrandDetail)
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
Mock.mock(/\/personnel\/detail/, 'post', getPersonnelDetail)
Mock.mock(/\/activity\/list/, 'post', getActivityList)

export default Mock
