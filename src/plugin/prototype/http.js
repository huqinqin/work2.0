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
    return axios.post('base/user/login', {
      username: params.userName,
      password: md5(params.password)
    })
  },
  getShop (params) {
    return axios.post('base/store/getStore', params)
  },
  saveShop (params) {
    return axios.post('base/store/saveOrUpdate', params)
  },
  fetchShop (params) {
    return axios.post('base/store/listStore', params)
  },
  delShop (ids) {
    return axios.post('', ids)
  },
  getStaff (params) {
    return axios.post('base/user/personnel/get', params)
  },
  fetchStaff (params) {
    return axios.post('base/user/personnel/list', params)
  },
  saveStaff (params) {
    return axios.post('base/user/personnel/save', params)
  },
  delStaff (ids) {
    return axios.post('base/user/delUsers', ids)
  },
  resetStaffPw (id) {
    return axios.post('base/user/reset', {id})
  },
  getInstaller (params) {
    return axios.post('', params)
  },
  getReview (params) {
    return axios.post('base/store/getInstallerRegister', params)
  },
  fetchReview (params) {
    return axios.post('base/store/listInstallerRegister', params)
  },
  passReview (params) {
    return axios.post('base/store/passInstaller', params)
  },
  refuseReview (params) {
    return axios.post('base/store/refuseInstaller', params)
  },
  getBrand (params) {
    return axios.post('item/brand/getBrandDetail', params)
  },
  fetchBrand (params) {
    return axios.post('item/brand/listBrand', params)
  },
  delBrand (ids) {
    return axios.post('item/brand/brandDelete', ids)
  },
  saveBrand (params) {
    return axios.post('item/brand/saveOrUpdate', params)
  },
  fetchCategory () {
    return axios.post('item/category/listCategory')
  },
  getCategory (id) {
    return axios.post('item/category/get', {id})
  },
  delCategory (ids) {
    return axios.post('item/category/delete', {ids})
  },
  saveCategory (params) {
    return axios.post('item/category/saveOrUpdate', params)
  },
  fetchProp (categoryId) {
    return axios.post('item/category/listProp', {categoryId})
  },
  saveProp (params) {
    return axios.post('item/category/addProps', params)
  },
  delProp (ids) {
    return axios.post('item/category/deleteProps', {ids})
  },
  addPropValue (params) {
    return axios.post('item/category/addPropsTag', params)
  },
  delPropValue (params) {
    return axios.post('item/category/deletePropsTag', params)
  },
  fetchSku (categoryId) {
    return axios.post('item/category/listSkuProp', { categoryId })
  },
  saveSku (params) {
    return axios.post('item/category/addSkuProps', params)
  },
  delSku (ids) {
    return axios.post('item/category/deleteSkuProps', {ids})
  },
  addSkuValue (params) {
    return axios.post('item/category/addSkuPropsTag', params)
  },
  delSkuValue (params) {
    return axios.post('item/category/deleteSkuPropsTag', params)
  },
  fetchCert (params) {
    return axios.post('base/store/cert/list', params)
  },
  getCert (params) {
    return axios.post('base/store/cert/get', params)
  },
  invalidCert (id) {
    return axios.post('base/store/cert/invalid', {id})
  }
}
