import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getWholesalerReviewList } from './wholesaler'

// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)
Mock.mock(/\/wholesaler\/review/, 'get', getWholesalerReviewList)

export default Mock
