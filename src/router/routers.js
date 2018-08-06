import Main from '@/view/main'
// import parentView from '@/components/parent-view'

export default [
  { path: '/login', name: 'login', meta: { title: 'Login - 登录', hideInMenu: true }, component: () => import('@/view/login/login.vue') },
  {
    path: '/',
    redirect: '/home',
    meta: { hideInMenu: true, notCache: true },
    name: 'home',
    component: Main,
    children: [
      { path: 'home', meta: { icon: 'lock-combination', title: '首页' }, name: 'home', component: () => import('@/view/Home.vue') }
    ]
  },
  {
    path: '/shop',
    redirect: '/shop/list',
    meta: { icon: 'lock-combination', title: '门店管理' },
    name: 'shop',
    component: Main,
    children: [
      { path: 'list', meta: { icon: 'lock-combination', title: '门店列表' }, name: 'shop_list', component: () => import('@/view/ShopList.vue') },
      { path: 'add', meta: { icon: 'lock-combination', title: '新增门店' }, name: 'shop_add', component: () => import('@/view/ShopEdit.vue') },
      { path: 'edit/:id', meta: { hideInMenu: true, icon: 'lock-combination', title: '编辑门店' }, name: 'shop_edit', component: () => import('@/view/ShopEdit.vue') },
      { path: 'detail/:id', meta: { icon: 'lock-combination', hideInMenu: true, title: '门店详情' }, name: 'shop_detail', component: () => import('@/view/ShopDetail.vue') }
    ]
  },
  {
    path: '/staff',
    redirect: '/staff/index',
    meta: { icon: 'lock-combination', title: '人员管理' },
    name: 'staff',
    component: Main,
    children: [
      { path: 'list', meta: { icon: 'lock-combination', title: '人员列表' }, name: 'staff_list', component: () => import('@/view/StaffList.vue') },
      { path: 'detail/:id', meta: { icon: 'lock-combination', hideInMenu: true, title: '人员详情' }, name: 'staff_detail', component: () => import('@/view/StaffDetail.vue') },
      { path: 'edit/:id', meta: { icon: 'lock-combination', hideInMenu: true, title: '编辑人员' }, name: 'staff_edit', component: () => import('@/view/StaffEdit.vue') },
      { path: 'edit', meta: { icon: 'lock-combination', title: '新增人员' }, name: 'staff_add', component: () => import('@/view/StaffEdit.vue') }
    ]
  },
  {
    path: '/installer',
    meta: { icon: 'lock-combination', title: '工程商管理' },
    name: 'installer',
    component: Main,
    children: [
      { path: 'installer_list', meta: { icon: 'lock-combination', title: '工程商列表' }, name: 'installerList', component: () => import('@/view/InstallerList.vue') },
      { path: 'installer_account_list', meta: { icon: 'lock-combination', title: '账号列表' }, name: 'installerAccountList', component: () => import('@/view/InstallerAccountList.vue') },
      { path: 'installer_details', meta: { hideInMenu: true, icon: 'lock-combination', title: '工程商详情' }, name: 'installer_details', component: () => import('@/view/InstallerDetails.vue') },
      { path: 'installer_review_list', meta: { icon: 'lock-combination', title: '审核列表' }, name: 'installer_review_list', component: () => import('@/view/InstallerReviewList.vue') },
      { path: 'installer_review_detail/:id', meta: { hideInMenu: true, icon: 'lock-combination', title: '审核详情' }, name: 'installer_review_detail', component: () => import('@/view/InstallerReviewDetail.vue') },
      { path: 'cert_list', meta: { icon: 'lock-combination', title: '分销证列表' }, name: 'cert_list', component: () => import('@/view/CertList.vue') }, { path: 'cert_detail/:id', meta: { hideInMenu: true, icon: 'lock-combination', title: '分销证详情' }, name: 'cert_detail', component: () => import('@/view/CertDetail.vue') },
      { path: 'cert_review/:id', meta: { hideInMenu: true, icon: 'lock-combination', title: '分销证审核' }, name: 'cert_review', component: () => import('@/view/CertReview.vue') }
    ]
  },
  {
    path: '/config-page',
    meta: { icon: 'lock-combination', title: '配置页面' },
    name: 'config-page',
    component: Main,
    children: [
      { path: 'home', name: 'config-page-home', meta: { icon: 'lock-combination', title: '配置首页' }, component: () => import('@/view/ConfigPageHome.vue') },
      { path: 'activity/list', name: 'config-page-activity-list', meta: { icon: 'lock-combination', title: '活动列表' }, component: () => import('@/view/ConfigPageActivityList.vue') },
      { path: 'activity/:name?', name: 'config-page-activity', meta: { icon: 'lock-combination', title: '配置活动' }, component: () => import('@/view/ConfigPageActivity.vue') }
    ]
  },
  {
    path: '/allocation',
    redirect: '/allocation/index',
    meta: { icon: 'lock-combination', title: '调度管理', hideInMenu: true },
    name: 'allocation',
    component: Main,
    children: [
      { path: 'index', title: '调度管理', meta: { icon: 'lock-combination', title: '调度管理' }, name: 'allocation_index', component: () => import('@/view/Allocation.vue') } ]
  },
  {

    path: '/income',
    redirect: '/income/index',
    meta: { icon: 'lock-combination', title: '应收管理', hideInMenu: true },
    name: 'income',
    component: Main,
    children: [
      { path: 'index', meta: { icon: 'lock-combination', title: '应收管理' }, name: 'income_index', component: () => import('@/view/Income.vue') } ]
  },
  {
    path: '/inventory',
    redirect: '/inventory/index',
    meta: { icon: 'lock-combination', title: '库存管理', hideInMenu: true },
    name: 'inventory',
    component: Main,
    children: [{ path: 'index', meta: { icon: 'lock-combination', title: '库存管理' }, name: 'inventory_index', component: () => import('@/view/Inventory.vue')
    } ]
  },
  {
    path: '/operation',
    redirect: '/operation/index',
    meta: { icon: 'lock-combination', title: '操作中心', hideInMenu: true },
    name: 'operation',
    component: Main,
    children: [
      { path: 'index', meta: { icon: 'lock-combination', title: '操作中心' }, name: 'operation_index', component: () => import('@/view/OperationCenter.vue') }
    ]
  },
  {
    path: '/order',
    redirect: '/order/index',
    meta: { icon: 'lock-combination', title: '订单管理' },
    name: 'order',
    component: Main,
    children: [
      { path: 'order_list', meta: { icon: 'lock-combination', title: '订单列表' }, name: 'order_list', component: () => import('@/view/OrderList.vue') },
      { path: 'order_detail/:id', meta: { icon: 'lock-combination', title: '订单详情' }, name: 'order_detail', component: () => import('@/view/OrderDetail.vue') }
    ]
  },
  {
    path: '/pay',
    redirect: '/pay/index',
    meta: { icon: 'lock-combination', title: '应付管理', hideInMenu: true },
    name: 'pay',
    component: Main,
    children: [
      { path: 'index', meta: { icon: 'lock-combination', title: '应付管理' }, name: 'pay_index', component: () => import('@/view/Pay.vue') }
    ]
  },
  {
    path: '/procurement',
    redirect: '/procurement/index',
    meta: { icon: 'lock-combination', title: '采购管理', hideInMenu: true },
    name: 'procurement',
    component: Main,
    children: [
      { path: 'index', meta: { icon: 'lock-combination', title: '采购管理' }, name: 'procurement_index', component: () => import('@/view/Procurement.vue') }
    ]
  },
  {
    path: '/product',
    redirect: '/product/index',
    meta: { icon: 'lock-combination', title: '商品管理' },
    name: 'product',
    component: Main,
    children: [
      { path: 'product_brand', meta: { icon: 'lock-combination', title: '品牌管理' }, name: 'product_brand', component: () => import('@/view/ProductBrand.vue') },
      { path: 'product_category', meta: { icon: 'lock-combination', title: '类目管理' }, name: 'product_category', component: () => import('@/view/ProductCategory.vue') },
      { path: 'product_list', meta: { icon: 'lock-combination', title: '商品管理' }, name: 'product_list', component: () => import('@/view/ProductList.vue') },
      // { path: 'product_record', meta: { icon: 'lock-combination', title: '商品修改记录' }, name: 'product_record', component: () => import('@/view/ProductRecord.vue') },
      // { path: 'product_trash', meta: { icon: 'lock-combination', title: '商品回收站' }, name: 'product_trash', component: () => import('@/view/ProductTrash.vue') },
      { path: 'product_edit/:id?', name: 'product_edit', meta: { icon: 'lock-combination', title: '商品详情' }, component: () => import('@/view/ProductEdit.vue') }
    ]
  },
  {
    path: '/report',
    redirect: '/report/index',
    meta: { icon: 'lock-combination', title: '数据报表', hideInMenu: true },
    name: 'report',
    component: Main,
    children: [
      { path: 'index', meta: { icon: 'lock-combination', title: '数据报表' }, name: 'report_index', component: () => import('@/view/Report.vue') }
    ]
  },
  {
    path: '/permission',
    meta: { icon: 'lock-combination', title: '权限管理' },
    redirect: '/permission/role',
    name: 'permission',
    component: Main,
    children: [
      { path: 'menu', name: 'menu', meta: { icon: 'lock-combination', title: '菜单管理', hideInMenu: true }, component: () => import('@/view/PermissionMenu.vue') },
      { path: 'role', name: 'role', meta: { icon: 'lock-combination', title: '角色管理', hideInMenu: true }, component: () => import('@/view/PermissionRole.vue') }
    ]
  },
  {
    path: '/crm',
    redirect: '/crm/index',
    meta: { icon: 'lock-combination', title: '客户关系管理' },
    name: 'crm',
    component: Main,
    children: [
      { path: 'CrmCommonPool', meta: { icon: 'lock-combination', title: '公海池' }, name: 'crm_CommonPool', component: () => import('@/view/CrmCommonPool.vue') },
      { path: 'CrmPoolAdd', name: 'New crease', component: () => import('@/view/CrmPoolAdd.vue') },
      { path: 'CrmPoolEdit', name: 'Crm Edit', component: () => import('@/view/CrmPoolEdit.vue') },
      { path: 'CrmPoolCheck', name: 'Crm Check', component: () => import('@/view/CrmPoolCheck.vue') },
      { path: 'CrmLog', name: 'Crm Log', component: () => import('@/view/CrmLog.vue') },
      { path: 'CrmAllocation', name: 'Crm Allocation', component: () => import('@/view/CrmAllocation.vue') },
      { path: 'CrmTemporaryList', meta: { icon: 'lock-combination', title: '临时关系池' }, name: 'crm_Temporary_List', component: () => import('@/view/CrmTemporaryList.vue') },
      { path: 'CrmPrivatePool', meta: { icon: 'lock-combination', title: '私有关系池' }, name: 'crm_Private_Pool', component: () => import('@/view/CrmPrivatePool.vue') },
      { path: 'CrmInvalidChance', meta: { icon: 'lock-combination', title: '无效商机' }, name: 'crm_Invalid_Chance', component: () => import('@/view/CrmInvalidChance.vue') },
      { path: 'CrmReport', meta: { icon: 'lock-combination', title: '报表' }, name: 'crm_Report', component: () => import('@/view/CrmReport.vue') },
      { path: 'CrmContact', name: 'crm_Contact', component: () => import('@/view/CrmContact.vue') }
    ]
  },
  { path: '/401', name: 'error_401', component: () => import('@/view/error-page/401.vue') },
  { path: '/500', name: 'error_500', component: () => import('@/view/error-page/500.vue') },
  { path: '*', name: 'error_404', component: () => import('@/view/error-page/404.vue') }
]
