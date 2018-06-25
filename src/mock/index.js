import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getInstallerList, getInstallerReviewList } from './installer'
import { getProductAttributeList, getProductBrandList, getProductList, getProductTrashList } from './product'

// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)
Mock.mock(/\/installer\/review/, 'get', getInstallerReviewList)
Mock.mock(/\/installer\/getInstallerList/, 'get', getInstallerList)
Mock.mock(/\/product\/attribute/, 'get', getProductAttributeList)
Mock.mock(/\/product\/brand/, 'get', getProductBrandList)
Mock.mock(/\/product\/trash/, 'get', getProductTrashList)
Mock.mock(/\/product/, 'get', getProductList)

export default Mock
