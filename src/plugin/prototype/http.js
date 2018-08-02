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
  assignStore (params) {
    return axios.post('base/store/assignStore', params)
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
  saveProduct (params) {
    return axios.post('product/item/save', params)
  },
  getProduct (params) {
    return axios.post('product/item/get', params)
  },
  fetchProduct (params) {
    return axios.post('product/item/list', params)
  },
  updateProduct (params) {
    return axios.post('product/item/setStatus', params)
  },
  fetchCodeTable (params) {
    return axios.post('/base/common/getCodeTable', params)
  },
  fetchSkuProps (params) {
    return axios.post('/item/category/listSkuProp', params)
  },
  fetchSpuProps (params) {
    return axios.post('/item/category/listProp', params)
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
  fetchProp (catePropIds, categoryId) {
    return axios.post('item/category/listProp', {catePropIds, categoryId})
  },
  saveProp (params) {
    return axios.post('item/category/addProps', params)
  },
  delProp (ids) {
    return axios.post('item/category/deleteProps', {ids})
  },
  addPropValue (categoryId, catePropId, name) {
    return axios.post('item/category/addPropsTag', { categoryId, catePropId, name })
  },
  delPropValue (categoryId, catePropId, id) {
    return axios.post('item/category/deletePropsTag', { categoryId, catePropId, id })
  },
  fetchSku (cateSkuPropIds, categoryId) {
    return axios.post('item/category/listSkuProp', { cateSkuPropIds, categoryId })
  },
  saveSku (params) {
    return axios.post('item/category/addSkuProps', params)
  },
  delSku (ids) {
    return axios.post('item/category/deleteSkuProps', {ids})
  },
  addSkuValue (categoryId, catePropId, name) {
    return axios.post('item/category/addSkuPropsTag', { categoryId, catePropId, name })
  },
  delSkuValue (categoryId, catePropId, id) {
    return axios.post('item/category/deleteSkuPropsTag', { categoryId, catePropId, id })
  },
  getPolicy () {
    return axios.post('/base/common/getPolicy')
  },
  fetchCert (params) {
    return axios.post('base/store/cert/list', params)
  },
  getCert (params) {
    return axios.post('base/store/cert/get', params)
  },
  invalidCert (params) {
    return axios.post('base/store/cert/invalid', params)
  },
  refuseCert (params) {
    return axios.post('base/store/cert/refuse', params)
  },
  passCert (params) {
    return axios.post('base/store/cert/pass', params)
  },
  savePromo (params) {
    return axios.post('/base/setting/promo/save', params)
  },
  fetchPromo (params) {
    return axios.post('/base/setting/promo/list', params)
  },
  getPromo (params) {
    return axios.post('/base/setting/promo/get', params)
  },
  getHome () {
    return axios.post('/base/setting/home/get')
  },
  saveHome (params) {
    return axios.post('/base/setting/home/save', params)
  },
  fetchOrder (params) {
    return axios.post('/trade/orderSell/listOrderSeller', params)
  },
  getOrder (params) {
    return axios.post('/trade/orderSell/getOrderSellerDetail', params)
  },
  fetchInstaller (params) {
    return axios.post('/base/store/getInstallerList', params)
  },
  changeOrderPrice (params) {
    return axios.post('/trade/orderSell/updateOrderPrice', params)
  }
}
