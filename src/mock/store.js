import Mock from 'mockjs'
const installerReviewList = Mock.mock({
  'list|10': [{
    'id|+1': '@id',
    email: '@email',
    company: '@name',
    custId: '@id',
    applyAt: '@date',
    waitTime: '@date',
    allotAt: '@date',
    reviewAt: '@date',
    'status|1': ['待审核', '已通过']
  }]
})
const installerDetail = Mock.mock({
  id: '@id',
  storeName: '@name',
  userFirstName: '@first',
  userLastName: '@last',
  phone: '@integer(1, 10)',
  email: '@email',
  appleAt: '@date',
  allotAt: '@date',
  industry: '@name',
  address: '@county(true)',
  storeCertImgUrl: '@image(200x100)',
  certAddress: {
    company: '@first',
    detail: '@city',
    street: '@city',
    city: '@city',
    state: '@state',
    zip: '@zip',
    country: '@country'
  },
  certIsLong: '',
  certIndate: '',
  custId: '@integer(20000000000000,90000000000000)',
  saler: '',
  message: ''
})
const certList = Mock.mock({
  'list|10': [{
    'id|+1': '@id',
    imgUrl: '@image(200x100)',
    'number': '@integer(20000000,90000000)',

    'status|1': ['已通过', '已拒绝', '待审核'],
    address: {
      company: '@name',
      detail: '@region' + '@province' + '@city'
    },
    store: {
      code: '@integer(20000,90000)'
    },
    ext: {
      submitDate: '@date',
      expiryDate: '@date',
      reviewDate: '@date'
    },
    custId: '@integer(20000,90000)'
  }]
})
const certDetail = Mock.mock({
  'list|10': {
    id: '@integer(20000,90000)',
    url: '@image(200x100)',
    'number': '@integer(20000000,90000000)',
    company: '@name',
    address: {
      detail: '@region' + '@province' + '@city',
      city: '@city',
      state: '@state',
      zip: '@zipcode',
      country: '@country',
      street: '@region'
    },
    uploadAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    validTime: '@datetime("MM-dd-yyyy HH:mm:ss")',
    reviewAt: '@datetime("MM-dd-yyyy HH:mm:ss")',
    'status|1': ['已通过', '已拒绝', '待审核'],
    cust: {
      company: '@name',
      fisrtName: '@fisrt',
      lastName: '@last',
      phone: '@integer(20000000,90000000)',
      mobile: '@integer(20000000,90000000)',
      email: '@email',
      detail: '@region' + '@province' + '@city',
      custId: '@integer(20000,90000)',
      industry: '@name',
      allotAt: '@date',
      appleAt: '@date',
      saler: '@first',
      store: '@last',
      source: '@clast'
    }
  }
})
const shopList = Mock.mock({
  'list|2': [{
    'id|+1': '@id',
    name: '@name',
    account: '@name',
    address: '@id',
    'contact|2': [{
      firstName: '@first',
      lastName: '@last',
      email: '@email',
      phone: '@integer(20000000,90000000)'
    }],
    phone: '@integer(20000000,90000000)',
    'userResponses|2': [{
      'id|+1': '@id',
      firstName: '@first',
      lastName: '@last',
      email: '@email',
      phone: '@integer(20000000,90000000)'
    }]
  }]
})
const shopDetail = Mock.mock({
  'data': {
    'id|+1': '@id',
    storeName: '@name',
    account: '@name',
    address: {
      detail: '@city',
      zip: '@zip'
    },
    'contact|2': [{
      firstName: '@first',
      lastName: '@last',
      email: '@email',
      phone: '@integer(20000000,90000000)'
    }],
    phone: '@integer(20000000,90000000)'
  }
})
const installerList = Mock.mock({
  'list|10': [{
    'id|+1': '@id',
    name: '@name',
    account: '@name',
    address: '@id',
    'status|1': ['待审核', '已通过'],
    'account|2': [{
      account: '@name',
      firstName: '@first',
      lastName: '@last',
      email: '@email',
      mobile: '@integer(20000000,90000000)'
    }]
  }]
})
export default {
  queryStore () {
    const data = shopList.list
    console.log(data)
    return {
      code: '000000',
      data,
      msg: ''
    }
  },
  listStore () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...shopList
      },
      msg: ''
    }
  },
  getStore (req) {
    return {
      code: '000000',
      ...shopDetail
    }
  },
  saveStore () {
    return {
      code: '000000',
      data: {}
    }
  },
  listInstallerStore () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...installerList
      },
      msg: ''
    }
  },
  listInstallerRegister () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...installerReviewList
      },
      msg: ''
    }
  },
  getInstallerRegister () {
    return {
      code: '000000',
      data: {
        total: 50,
        ...installerDetail
      },
      msg: ''
    }
  },
  cert: {
    list () {
      return {
        code: '000000',
        data: {
          total: 50,
          ...certList
        },
        msg: ''
      }
    },
    get () {
      return {
        code: '000000',
        data: {
          total: 50,
          ...certDetail
        },
        msg: ''
      }
    },
    invalid () {
      return {
        code: '000000',
        data: {
          total: 50,
          ...certDetail
        },
        msg: ''
      }
    }
  }
}
