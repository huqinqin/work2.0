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
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '商品管理'
        },
        name: 'product_index',
        component: () => import('@/view/Product.vue')
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
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '门店管理'
        },
        name: 'shop_index',
        component: () => import('@/view/Shop.vue')
      }
    ]
  },
  {
    path: '/wholesaler',
    redirect: '/wholesaler/index',
    meta: {
      icon: 'lock-combination',
      title: '工程商管理'
    },
    name: 'wholesaler',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          icon: 'lock-combination',
          title: '工程商管理'
        },
        name: 'wholesaler_index',
        component: () => import('@/view/Wholesaler.vue')
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
