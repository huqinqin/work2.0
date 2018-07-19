import Main from '@/view/main'
// import parentView from '@/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      hideInMenu: true,
      notCache: true
    },
    name: 'home',
    component: Main,
    children: [
      {
        path: 'home',
        meta: {
          icon: 'lock-combination',
          title: '首页'
        },
        name: 'home',
        component: () => import('@/view/Home.vue')
      }
    ]
  },
  {
    path: '/config-page',
    meta: {
      icon: 'lock-combination',
      title: '配置页面'
    },
    name: 'config-page',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'config-page-home',
        meta: {
          icon: 'lock-combination',
          title: '配置首页'
        },
        component: () => import('@/view/ConfigPageHome.vue')
      },
      {
        path: 'activity/list',
        name: 'config-page-activity-list',
        meta: {
          icon: 'lock-combination',
          title: '活动列表'
        },
        component: () => import('@/view/ConfigPageActivityList.vue')
      },
      {
        path: 'activity/:id?',
        name: 'config-page-activity',
        meta: {
          icon: 'lock-combination',
          title: '配置活动'
        },
        component: () => import('@/view/ConfigPageActivity.vue')
      }
    ]
  },
  {
    path: '/allocation',
    redirect: '/allocation/index',
    meta: {
      icon: 'lock-combination',
      title: '调度管理'
    },
    name: 'allocation',
    component: Main,
    children: [
      {
        path: 'index',
        title: '调度管理',
        meta: {
          icon: 'lock-combination',
          title: '调度管理'
        },
        name: 'allocation_index',
        component: () => import('@/view/Allocation.vue')
      }
    ]
  },
  {
    path: '/income',
    redirect: '/income/index',
    meta: {
      icon: 'lock-combination',
      title: '应收管理'
    },
    name: 'income',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '应收管理'
        },
        name: 'income_index',
        component: () => import('@/view/Income.vue')
      }
    ]
  },
  {
    path: '/inventory',
    redirect: '/inventory/index',
    meta: {
      icon: 'lock-combination',
      title: '库存管理'
    },
    name: 'inventory',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '库存管理'
        },
        name: 'inventory_index',
        component: () => import('@/view/Inventory.vue')
      }
    ]
  },
  {
    path: '/operation',
    redirect: '/operation/index',
    meta: {
      icon: 'lock-combination',
      title: '操作中心'
    },
    name: 'operation',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '操作中心'
        },
        name: 'operation_index',
        component: () => import('@/view/OperationCenter.vue')
      }
    ]
  },
  {
    path: '/order',
    redirect: '/order/index',
    meta: {
      icon: 'lock-combination',
      title: '订单管理'
    },
    name: 'order',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '订单管理'
        },
        name: 'order_index',
        component: () => import('@/view/Order.vue')
      }
    ]
  },
  {
    path: '/pay',
    redirect: '/pay/index',
    meta: {
      icon: 'lock-combination',
      title: '应付管理'
    },
    name: 'pay',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '应付管理'
        },
        name: 'pay_index',
        component: () => import('@/view/Pay.vue')
      }
    ]
  },
  {
    path: '/procurement',
    redirect: '/procurement/index',
    meta: {
      icon: 'lock-combination',
      title: '采购管理'
    },
    name: 'procurement',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '采购管理'
        },
        name: 'procurement_index',
        component: () => import('@/view/Procurement.vue')
      }
    ]
  },
  {
    path: '/product',
    redirect: '/product/index',
    meta: {
      icon: 'lock-combination',
      title: '商品管理'
    },
    name: 'product',
    component: Main,
    children: [
      {
        path: 'product_brand',
        meta: {
          icon: 'lock-combination',
          title: '品牌管理'
        },
        name: 'product_brand',
        component: () => import('@/view/ProductBrand.vue')
      },
      {
        path: 'product_category',
        meta: {
          icon: 'lock-combination',
          title: '类目管理'
        },
        name: 'product_category',
        component: () => import('@/view/ProductCategory.vue')
      },
      {
        path: 'product_list',
        meta: {
          icon: 'lock-combination',
          title: '商品管理'
        },
        name: 'product_list',
        component: () => import('@/view/ProductList.vue')
      },
      {
        path: 'product_record',
        meta: {
          icon: 'lock-combination',
          title: '商品修改记录'
        },
        name: 'product_record',
        component: () => import('@/view/ProductRecord.vue')
      },
      {
        path: 'product_trash',
        meta: {
          icon: 'lock-combination',
          title: '商品回收站'
        },
        name: 'product_trash',
        component: () => import('@/view/ProductTrash.vue')
      },
      {
        path: 'product_edit/:id?',
        name: 'product_edit',
        meta: {
          title: '商品详情'
        },
        component: () => import('@/view/ProductEdit.vue')
      }
    ]
  },
  {
    path: '/report',
    redirect: '/report/index',
    meta: {
      icon: 'lock-combination',
      title: '数据报表'
    },
    name: 'report',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '数据报表'
        },
        name: 'report_index',
        component: () => import('@/view/Report.vue')
      }
    ]
  },
  {
    path: '/shop',
    redirect: '/shop/index',
    meta: {
      icon: 'lock-combination',
      title: '门店管理'
    },
    name: 'shop',
    component: Main,
    children: [
      {
        path: 'shop_list',
        meta: {
          icon: 'lock-combination',
          title: '门店列表'
        },
        name: 'shop_list',
        component: () => import('@/view/ShopList.vue')
      },
      {
        path: 'shop_add',
        meta: {
          icon: 'lock-combination',
          title: '新增门店'
        },
        name: 'shop_add',
        component: () => import('@/view/ShopEdit.vue')
      },
      {
        path: 'shop_edit/:id',
        meta: {
          hideInMenu: true,
          icon: 'lock-combination',
          title: '编辑门店'
        },
        name: 'shop_edit',
        component: () => import('@/view/ShopEdit.vue')
      },
      {
        path: 'shop_detail/:id',
        // meta: {
        //   icon: 'lock-combination',
        //   title: '门店详情'
        // },
        name: 'shop_detail',
        component: () => import('@/view/ShopDetail.vue')
      }
    ]
  },
  {
    path: '/personnel',
    redirect: '/personnel/index',
    meta: {
      icon: 'lock-combination',
      title: '人员管理'
    },
    name: 'personnel',
    component: Main,
    children: [
      {
        path: 'personnel_list',
        meta: {
          icon: 'lock-combination',
          title: '人员列表'
        },
        name: 'personnel_list',
        component: () => import('@/view/PersonnelList.vue')
      },
      {
        path: 'personnel_detail/:id',
        // meta: {
        //   icon: 'lock-combination',
        //   title: '人员详情'
        // },
        name: 'personnel_detail',
        component: () => import('@/view/PersonnelDetail.vue')
      },
      {
        path: 'personnel_edit/:id',
        // meta: {
        //   icon: 'lock-combination',
        //   title: '编辑人员'
        // },
        name: 'personnel_edit',
        component: () => import('@/view/PersonnelEdit.vue')
      },
      {
        path: 'personnel_edit',
        meta: {
          icon: 'lock-combination',
          title: '新增人员'
        },
        name: 'personnel_add',
        component: () => import('@/view/PersonnelEdit.vue')
      }
    ]
  },
  {
    path: '/installer',
    meta: {
      icon: 'lock-combination',
      title: '工程商管理'
    },
    name: 'installer',
    component: Main,
    children: [
      {
        path: 'installer_list',
        meta: {
          icon: 'lock-combination',
          title: '工程商列表'
        },
        name: 'installerList',
        component: () => import('@/view/InstallerList.vue')
      },
      {
        path: 'installer_account_list',
        meta: {
          icon: 'lock-combination',
          title: '账号列表'
        },
        name: 'installerAccountList',
        component: () => import('@/view/InstallerAccountList.vue')
      },
      {
        path: 'installer_edit',
        meta: {
          icon: 'lock-combination',
          title: '编辑资料'
        },
        name: 'installer_edit',
        component: () => import('@/view/InstallerEdit.vue')
      },
      {
        path: 'installer_details',
        meta: {
          hideInMenu: true,
          icon: 'lock-combination',
          title: '工程商详情'
        },
        name: 'installer_details',
        component: () => import('@/view/InstallerDetails.vue')
      },
      {
        path: 'installer_review_list',
        meta: {
          icon: 'lock-combination',
          title: '审核列表'
        },
        name: 'installer_review_list',
        component: () => import('@/view/InstallerReviewList.vue')
      },
      {
        path: 'installer_review_detail/:id',
        meta: {
          hideInMenu: true,
          icon: 'lock-combination',
          title: '审核详情'
        },
        name: 'installer_review_detail',
        component: () => import('@/view/InstallerReviewDetail.vue')
      },
      {
        path: 'cert_list',
        meta: {
          icon: 'lock-combination',
          title: '分销证列表'
        },
        name: 'cert_list',
        component: () => import('@/view/CertList.vue')
      },
      {
        path: 'cert_detail/:id',
        meta: {
          hideInMenu: true,
          icon: 'lock-combination',
          title: '分销证详情'
        },
        name: 'cert_detail',
        component: () => import('@/view/CertDetail.vue')
      },
      {
        path: 'cert_review/:id',
        meta: {
          hideInMenu: true,
          icon: 'lock-combination',
          title: '分销证审核'
        },
        name: 'cert_review',
        component: () => import('@/view/CertReview.vue')
      }
    ]
  },
  {
    path: '/login1',
    meta: {
      icon: 'lock-combination',
      title: '登录'
    },
    redirect: '/index',
    name: 'login1',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '登录'
        },
        name: 'login2',
        component: () => import('@/view/login1.vue')
      }
    ]
  },
  {
    path: '/register',
    meta: {
      icon: 'lock-combination',
      title: '注册'
    },
    redirect: '/index',
    name: 'register1',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '注册'
        },
        name: 'register2',
        component: () => import('@/view/register.vue')
      }
    ]
  },
  {
    path: '/permission',
    meta: {
      icon: 'lock-combination',
      title: '权限管理'
    },
    redirect: '/permission/menu',
    name: 'permission',
    component: Main,
    children: [
      {
        path: 'menu',
        name: 'menu',
        meta: {
          icon: 'lock-combination',
          title: '菜单管理'
        },
        component: () => import('@/view/register.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
