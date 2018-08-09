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
  Logout () {
    return axios.post('base/user/logout')
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
    return axios.post('base/common/getCodeTable', params)
  },
  fetchSkuProps (params) {
    return axios.post('item/category/listSkuProp', params)
  },
  fetchSpuProps (params) {
    return axios.post('item/category/listProp', params)
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
    return axios.post('base/common/getPolicy')
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
    return axios.post('base/setting/promo/save', params)
  },
  fetchPromo (params) {
    return axios.post('base/setting/promo/list', params)
  },
  getPromo (params) {
    return axios.post('base/setting/promo/get', params)
  },
  getHome () {
    return axios.post('base/setting/home/get')
  },
  saveHome (params) {
    return axios.post('base/setting/home/save', params)
  },
  fetchOrder (params) {
    return axios.post('trade/orderSell/listOrderSeller', params)
  },
  getOrder (params) {
    return axios.post('trade/orderSell/getOrderSellerDetail', params)
  },
  fetchInstaller (params) {
    return axios.post('base/store/getInstallerList', params)
  },
  changeOrderPrice (params) {
    return axios.post('trade/orderSell/updateOrderPrice', params)
  },
  handleOrder (params) {
    return axios.post('/trade/orderSell/updateOrderPrice', params)
  },
  /* crm接口 */
  /* 公海池工程商列表、编辑、新增 、无效商机 */
  crmInstallerList (params) {
    return axios.post('/crm/company/save', params)
  },
  /* 公海池批量领取 */
  batchCollectionInstaller (params) {
    return axios.post('/crm/company/batchGetCompany', params)
  },
  /* 公海池工程商查看 */
  installerCheck (params) {
    return axios.post('/crm/company/get', params)
  },
  /* 公海池沟通记录列表 */
  contactList (params) {
    return axios.post('/crm/company/listCommunicationRecord', params)
  },
  /* 临时池新增沟通纪录 */
  newContactList (params) {
    return axios.post('/crm/company/addCommunicationRecord', params)
  },
  /* 维护用户特点 */
  maintenanceList (params) {
    return axios.post('/crm/company/modifyExt', params)
  },
  /* 新增联系人 */
  createLinkman (params) {
    return axios.post('/crm/company/addContact', params)
  },
  /* 临时池工程商列表 */
  templatePoolInstallerList (params) {
    return axios.post('/crm/bupoll/formoment/page', params)
  },
  /* 临时池列表的导出 */
  templatePoolListExport (params) {
    return axios.post('/crm/export/formoment/page', params)
  },
  /* 私有池列表 */
  privatePoolInstallerList (params) {
    return axios.post('/crm/bupoll/priv/page', params)
  },
  /* 私有池列表的导出 */
  privatePoolListExport (params) {
    return axios.post('/crm/export/priv/page', params)
  },
  /* 无效商机导出 */
  invalidBussinessListExport (params) {
    return axios.post('/crm/export/invalid/business', params)
  },
  fetchGroupStore () {
    return axios.post('base/store/group')
  },
  fetchQuotation (params) {
    return axios.post('base/quotation/list', params)
  },
  getQuotation (params) {
    return axios.post('base/quotation/get', params)
  },
  saveQuotation (params) {
    console.log(params)
    return axios.post('order/quotation/save', params)
  },
  fetchQuotationAddress (params) {
    return axios.post('base/address/listStoreAddress', params)
  },
  saveQuotationAddress (params) {
    return axios.post('base/address/saveStoreAddress', params)
  },
  fetchQuotationProduct (params) {
    return axios.post('product/item/queryItem', params)
  },
  queryQuotationInstaller (params) {
    return axios.post('base/store/queryStore', params)
  },
  simulateTrade (params) {
    console.log(params)
    return axios.post('trade/trade/simulateTrade', params)
  },
  getSupplyAddress () {
    return axios.post('base/address/getSupplyAddress')
  }
}
