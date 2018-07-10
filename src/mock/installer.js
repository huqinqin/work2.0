import Mock from 'mockjs'
const installerReviewList = Mock.mock({ 'data|10': [{
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
export const getInstallerReviewList = req => {
  return {
    code: '000000',
    ...installerReviewList,
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
