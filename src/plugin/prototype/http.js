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
    return axios.post('', {ids})
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
    return axios.post('base/user/delUsers', {ids})
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
    return axios.post('item/brand/brandDelete', {ids})
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
  fetchProp (params) {
    return axios.post('item/category/listProp', params)
  },
  saveProp (params) {
    return axios.post('item/category/addProp', params)
  },
  delProp (params) {
    return axios.post('item/category/deleteProp', params)
  },
  addPropValue (propId, value) {
    return axios.post('item/category/addPropValue', { propId, value })
  },
  delPropValue (propId, values) {
    return axios.post('item/category/deletePropValue', { propId, values })
  },
  fetchSku (cateSkuPropIds, categoryId) {
    return axios.post('item/category/listSkuProp', { cateSkuPropIds, categoryId })
  },
  saveSku (params) {
    return axios.post('item/category/addSkuProps', params)
  },
  delSku (params) {
    return axios.post('item/category/deleteSkuProps', params)
  },
  addSkuValue (categoryId, catePropId, name) {
    return axios.post('item/category/addSkuPropsTag', { categoryId, catePropId, name })
  },
  delSkuValue (categoryId, catePropId, id) {
    return axios.post('item/category/deleteSkuPropsTag', { categoryId, catePropId, id })
  },
  getPolicy () {
    return axios.post('base/common/getPolicy').then((data) => {
      data.OSSAccessKeyId = data.accessid
      delete data.accessid
      return data
    })
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
    return axios.post('base/store/listInstallerStore', params)
  },
  changeOrderPrice (params) {
    return axios.post('trade/orderSell/updateOrderPrice', params)
  },
  handleOrder (params) {
    return axios.post('/trade/orderSell/updateOrderPrice', params)
  },
  /* crm接口 */
  /* 公海池工程商、编辑、新增 、无效商机 */
  crmInstallerList (params) {
    return axios.post('/crm/company/save', params)
  },
  /* 公海池列表 */
  crmInstallerListData (params) {
    return axios.post('/crm/bupool/pub/page', params)
  },
  /* 公有池导入 */
  crmInstallerListImport (params) {
    return axios.post('/crm/company/importData ', params)
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
  /* 公有池的导出 */
  commonPoolExport (params) {
    return axios.post('/crm/export/pub/list', params)
  },
  /* 创建账号 */
  createAccount (params) {
    return axios.post('/crm/company/newAccount', params)
  },
  /* 邮件列表的查询 */
  emailSelect (params) {
    return axios.post('/crm/company/listEmail', params)
  },
  /* 关联oms的id */
  omsId (params) {
    return axios.post('/crm/company/associatedCustCode', params)
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
    return axios.post('/crm/company/saveContact', params)
  },
  /* 删除联系人 */
  deleteLinkman (params) {
    return axios.post('/crm/company/deleteContact ', params)
  },
  /* 临时池工程商列表 */
  templatePoolInstallerList (params) {
    return axios.post('/crm/bupool/formoment/page', params)
  },
  /* 临时池列表的导出 */
  templatePoolListExport (params) {
    return axios.post('/crm/export/formoment/page', params)
  },
  /* 私有池列表 */
  privatePoolInstallerList (params) {
    return axios.post('/crm/bupool/priv/page', params)
  },
  /* 私有池列表的导出 */
  privatePoolListExport (params) {
    return axios.post('/crm/export/priv/page', params)
  },
  /* 私有池批量分配 */
  privatePoolBatch (params) {
    return axios.post('/crm/bupool/common/batch/allot', params)
  },
  /* 无效商机列表 */
  invalidBussinessList (params) {
    return axios.post('/crm/report/company/invalid/page', params)
  },
  /* 无效商机导出 */
  invalidBussinessListExport (params) {
    return axios.post('/crm/export/invalid/business', params)
  },
  /* 无效商机的保存 */
  invalidBussinessListSave (params) {
    return axios.post('/crm/company/batchSetCompanyInvalid', params)
  },
  /* 分销证列表 */
  cardList (params) {
    return axios.post('/crm/company/queryCompanyCertByCompanyId', params)
  },
  /* 分销证的保存 */
  cardSave (params) {
    return axios.post('/crm/company/companyCertSave', params)
  },
  /* 分销证的刪除 */
  delCard (params) {
    return axios.post('/crm/company/deleteCompanyCert', params)
  },
  /* 私有池sales查询 */
  salesCheck (params) {
    return axios.post('/crm/resource/sales/list', params)
  },
  /* 临时池批量分配sales */
  batchSales (params) {
    return axios.post('/crm/bupool/save', params)
  },
  /* 临时池批量分配确定 */
  batchSalesSure (params) {
    return axios.post('/crm/bupool/common/batch/allot', params)
  },
  /* 分配纪录点击进去后的列表 */
  allocationSales (params) {
    return axios.post('/crm/bupool/listBusinessPoolRecord', params)
  },
  /* 报表的列表 */
  reportList (params) {
    return axios.post('/crm/report/storesales/query', params)
  },
  /* 报表的导出 */
  reportExport (params) {
    return axios.post('/crm/export/storesales', params)
  },
  /* 采购等的接口 */
  purchase (params) {
    return axios.post('/crm/company/statistic/data', params)
  },
  /* 客户明细列表 */
  detailList (params) {
    return axios.post('/crm/company/listCustomer', params)
  },
  /* crm登陆日志 */
  crmLog (params) {
    return axios.post('/crm/statistic/listLoginRecord', params)
  },
  fetchGroupStore () {
    return axios.post('base/store/group')
  },
  saveQuotation (params) {
    return axios.post('order/quotation/saveOrUpdate', params)
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
  fetchQuotationProductHistory (params) {
    return axios.post('trade/order/getItemHisPrice', params)
  },
  getProductByIds (params) {
    return axios.post('product/item/getItems', params)
  },
  queryQuotationInstaller (params) {
    return axios.post('base/store/queryStore', params)
  },
  simulateTrade (params) {
    return axios.post('trade/trade/simulateTrade', params)
  },
  getSupplyInfo () {
    return axios.post('base/store/getSupply')
  },
  fetchQuotationTodo (params) {
    return axios.post('order/quotation/listToDo', params)
  },
  fetchQuotation (params) {
    return axios.post('order/quotation/list', params)
  },
  sendQuotation (params) {
    return axios.post('order/quotation/send', params)
  },
  saveCoupon ({ couponRule, offerCouponInclude, explains, selProducts, selCates, brandIds, validType }) {
    const type = offerCouponInclude.type
    if (type === '') {
      offerCouponInclude = null
    } else if (type === 'item') {
      offerCouponInclude.ids = selProducts.map(item => item.id)
    } else if (type === 'cate') {
      offerCouponInclude.ids = selCates.map(item => item.id)
    } else if (type === 'brand') {
      offerCouponInclude.ids = brandIds
    }
    if (validType === 'range') {
      couponRule.startTime = new Date(couponRule.startTime)
      couponRule.endTime = new Date(couponRule.endTime)
    } else {
      couponRule.effectiveTime = couponRule.effectiveTime * 1000 * 60 * 60 * 24
    }
    couponRule.amount = couponRule.amount * 100
    return axios.post('item/offer/coupon/add', { couponRule, explains, offerCouponInclude })
  },
  getQuotation (params) {
    return axios.post('order/quotation/get', params)
  },
  agreeQuotation (params) {
    return axios.post('order/quotation/agree', params)
  },
  refuseQuotation (params) {
    return axios.post('order/quotation/refuse', params)
  },
  fetchCoupon (params) {
    return axios.post('item/offer/coupon/list', params).then(data => {
      data.list = data.list.map(({id, include, rule}) => ({
        id,
        name: rule.name,
        couponType: rule.type,
        includeType: include && include.type ? include.type : '',
        standard: rule.standard,
        amount: rule.amount,
        isGive: rule.type === 'common',
        isDel: rule.effectiveTime !== 0 || new Date(rule.endTime).getTime() < new Date().getTime(),
        isExpire: rule.effectiveTime === 0 && new Date(rule.endTime).getTime() < new Date().getTime(),
        valid: rule.effectiveTime !== 0 ? `${rule.effectiveTime / 24 / 60 / 60 / 100}天` : `${new Date(rule.startTime)}至${new Date(rule.endTime)}`
      }))
      return data
    })
  },
  delCoupon (ids) {
    return axios.post('item/offer/coupon/del', { ids })
  },
  fetchCouponUse (params) {
    return axios.post('item/offer/coupon/useDetail', params)
  },
  sendCoupon (params) {
    return axios.post('item/offer/coupon/sendCoupon', params)
  },
  getCoupon (params) {
    return axios.post('item/offer/coupon/detail', params)
  }
}
