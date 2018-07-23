/**
 * 命名规则
 * get[Name] => 获取详情
 * fetch[Name] => 获取列表
 * save[Name] => 保存信息，传id为编辑保存，更新数据，不传为新增数据
 * del[Name] => 删除信息，传ids，对象数组列表
 */
import axios from '~libs/axios'
export default {
  getShop (params) {
    return axios.post('base/store/getStore', params)
  },
  saveShop (params) {
    return axios.post('base/store/save', params)
  },
  fetchShop (params) {
    return axios.post('base/store/listStore', params)
  },
  delShop (ids) {
    return axios.post('', ids)
  },
  getStaff (params) {
    return axios.post('base/personnel/get', params)
  },
  fetchStaff (params) {
    return axios.post('base/personnel/list', params)
  },
  saveStaff (params) {
    return axios.post('base/personnel/save', params)
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
  fetchProduct (params) {
    return axios.post('product/item/list', params)
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
  }
}
