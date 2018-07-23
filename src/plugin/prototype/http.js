/**
 * 命名规则
 * get[Name] => 获取详情
 * fetch[Name] => 获取列表
 * save[Name] => 保存信息，传id为编辑保存，更新数据，不传为新增数据
 * del[Name] => 删除信息，传ids，对象数组列表
 */
import md5 from 'md5'
import axios from '~libs/axios'
export default {
  Login (params) {
    return axios.post('user/login', {
      username: params.userName,
      password: md5(params.password)
    })
  },
  getShop (params) {
    return axios.post('store/getStore', params)
  },
  saveShop (params) {
    return axios.post('store/saveOrUpdate', params)
  },
  fetchShop (params) {
    return axios.post('store/listStore', params)
  },
  delShop (ids) {
    return axios.post('', ids)
  },
  getStaff (params) {
    return axios.post('user/personnel/get', params)
  },
  fetchStaff (params) {
    return axios.post('user/personnel/list', params)
  },
  saveStaff (params) {
    return axios.post('user/personnel/save', params)
  },
  delStaff (ids) {
    return axios.post('user/delUsers', ids)
  },
  resetStaffPw (id) {
    return axios.post('user/reset', {id})
  },
  getInstaller (params) {
    return axios.post('', params)
  },
  getReview (params) {
    return axios.post('store/getInstallerRegister', params)
  },
  fetchReview (params) {
    return axios.post('store/listInstallerRegister', params)
  },
  passReview (params) {
    return axios.post('store/passInstaller', params)
  },
  refuseReview (params) {
    return axios.post('store/refuseInstaller', params)
  },
  getBrand (params) {
    return axios.post('product/brand/getBrandDetail', params)
  },
  fetchBrand (params) {
    return axios.post('product/brand/listBrand', params)
  },
  delBrand (ids) {
    return axios.post('product/brand/brandDelete', ids)
  },
  saveBrand (params) {
    return axios.post('product/brand/saveOrUpdate', params)
  }
}
