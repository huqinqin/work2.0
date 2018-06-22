import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getInstallerList, getInstallerReviewList } from './installer'

// 登录相关和获取用户信息
Mock.mock(/\/tokens/, 'post', login)
Mock.mock(/\/user_infos/, 'get', getUserInfo)
Mock.mock(/\/tokens/, 'delete', logout)
Mock.mock(/\/installer\/review/, 'get', getInstallerReviewList)
Mock.mock(/\/installer\/getInstallerList/, 'get', getInstallerList)
export default Mock
