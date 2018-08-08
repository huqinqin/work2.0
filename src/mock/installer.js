import Mock from 'mockjs'
const installerList = Mock.mock({ 'list|10': [{
  custId: '@id',
  account: '@id',
  companyName: '@name',
  grade: '@integer(1, 10)',
  historyMoney: '@float(1, 100000, 0, 2)',
  orderNum: '@integer(1, 100)',
  availableIntegral: '@integer(1, 100000)',
  'status|1': ['待审核', '已通过']
}] })
const installerAccountList = Mock.mock({
  'list|10': [{
    id: '@id',
    account: '@name',
    email: '@email',
    firstName: '@first',
    lastName: '@last',
    mobile: '@integer(1, 10)',
    installer: '@name',
    shop: '@name',
    'status|1': ['激活', '冻结']
  }] })
const addressList = Mock.mock({
  data: {
    'list|10': [
      {
        'id|+1': '@increment(10)',
        'status|1': ['default', 'enabled'],
        address: {
          receiver: '@name',
          detail: '@region' + '@province' + '@zip',
          street: '@region',
          city: '@province',
          state: '@province',
          zip: '@zip',
          country: 'US',
          telnum: '@integer(100000000,999999999)',
          lat: '1234567',
          lng: '8765431',
          company: '@clast'
        }
      }
    ]
  }
})
const addressDetail = Mock.mock({
  data: {
    'id|+1': '@increment(10)',
    'status|1': ['default', 'enabled'],
    address: {
      receiver: '@name',
      detail: '@region' + '@province' + '@zip',
      street: '@region',
      city: '@province',
      state: '@province',
      zip: '@zip',
      country: 'US',
      telnum: '@integer(100000000,999999999)',
      lat: '1234567',
      lng: '8765431',
      company: '@clast'
    }
  }
})
export default {
  getInstallerList: {
    list () {
      return {
        code: '000000',
        data: {
          total: 50,
          ...installerList
        },
        msg: ''
      }
    }
  },
  account: {
    list () {
      return {
        code: '000000',
        data: {
          total: 50,
          ...installerAccountList
        },
        msg: ''
      }
    }
  },
  address: {
    list () {
      return {
        code: '000000',
        total: 50,
        ...addressList,
        msg: ''
      }
    },
    get () {
      return {
        code: '000000',
        total: 50,
        ...addressDetail,
        msg: ''
      }
    },
    save () {
      return {
        code: '000000',
        total: 50,
        data: '保存地址成功',
        msg: ''
      }
    }
  }
}
/* export const getInstallerReviewList = req => {
  console.log('getInstallerReviewList')
  return {
    code: '000000',
    data: {
      ...installerReviewList
    },
    msg: ''
  }
}
export const getInstallerList = req => {
  return {
    code: '000000',
    ...installerList,
    msg: ''
  }
}
export const getInstallerAccountList = req => {
  return {
    code: '000000',
    ...installerAccountList,
    msg: ''
  }
}
export const getInstallerDetail = req => {
  return {
    code: '000000',
    msg: '',
    data: installerDetail
  }
} */
