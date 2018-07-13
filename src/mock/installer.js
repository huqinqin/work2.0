import Mock from 'mockjs'
const installerReviewList = Mock.mock({ 'list|10': [{
  'id|+1': '@id',
  email: '@email',
  company: '@name',
  custId: '@id',
  applyAt: '@date',
  waitTime: '@date',
  allotAt: '@date',
  reviewAt: '@date',
  'status|1': ['待审核', '已通过']
}] })
const installerList = Mock.mock({ 'data|10': [{
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
  'data|10': [{
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
export const getInstallerReviewList = req => {
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
  certAddress: {},
  certIsLong: '',
  certIndate: '',
  custId: '',
  saler: '',
  message: ''
})

export const getInstallerDetail = req => {
  return {
    code: '000000',
    msg: '',
    data: installerDetail
  }
}
