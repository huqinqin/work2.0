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
  fetchCategories () {
    return axios.post('/base/product/category/listCategory')
  },
  saveProduct (params) {
    return axios.post('product/item/save', params)
  },
  getProduct (params) {
    return axios.post('product/item/get', params)
  },
  diabledProduct (params) {
    return axios.post('product/item/disabled', params)
  },
  fetchProduct (params) {
    return axios.post('product/item/list', params)
  },
  updateProduct (params) {
    return axios.post('product/item/update', params)
  },
  delProduct (params) {
    return axios.post('product/item/del', params)
  },
  fetchCodeTable (params) {
    return axios.post('/base/common/getCodeTable', params)
  },
  fetchSkuProps (params) {
    return axios.post('/base/product/category/listSkuProp', params)
  },
  fetchSpuProps (params) {
    return axios.post('/base/product/category/listProp', params)
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
  },
  getCategory (id) {
    return axios.post('product/category/get', {id})
  },
  delCategory (ids) {
    return axios.post('product/category/delete', {ids})
  },
  saveCategory (params) {
    return axios.post('product/category/saveOrUpdate', params)
  },
  fetchProp (id) {
    return axios.post('product/category/listProp', {id})
  },
  saveProp (params) {
    return axios.post('product/category/addProps', params)
  },
  delProp (ids) {
    return axios.post('product/category/deleteProps', {ids})
  },
  addPropValue (params) {
    return axios.post('product/category/addPropsTag', params)
  },
  delPropValue (params) {
    return axios.post('product/category/deletePropsTag', params)
  },
  fetchSku (categoryId) {
    return axios.post('product/category/listSkuProp', { categoryId })
  },
  saveSku (params) {
    return axios.post('product/category/addSkuProps', params)
  },
  delSku (ids) {
    return axios.post('product/category/deleteSkuProps', {ids})
  },
  addSkuValue (params) {
    return axios.post('product/category/addSkuPropsTag', params)
  },
  delSkuValue (params) {
    return axios.post('product/category/deleteSkuPropsTag', params)
  },
  getPolicy () {
    return axios.post('/base/common/getPolicy')
  }
}
