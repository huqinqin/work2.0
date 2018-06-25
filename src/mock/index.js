import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getWholesalerReviewList } from './wholesaler'
import { getShopList, getShopDetail, shopEdit } from './shop'
import { getPersonnelList, getPersonnelDetail } from './personnel'

// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)
Mock.mock(/\/wholesaler\/review/, 'get', getWholesalerReviewList)
Mock.mock(/\/shop\/list/, 'get', getShopList)
Mock.mock(/\/shop\/detail/, 'get', getShopDetail)
Mock.mock(/\/shop\/edit/, 'get', shopEdit)
Mock.mock(/\/personnel\/list/, 'get', getPersonnelList)
Mock.mock(/\/personnel\/detail/, 'get', getPersonnelDetail)

export default Mock
