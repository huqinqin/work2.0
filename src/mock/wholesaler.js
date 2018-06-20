import Mock from 'mockjs'
const wholesalerReviewList = Mock.mock({ 'data|10': [{
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
export const getWholesalerReviewList = req => {
  return {
    code: 200,
    ...wholesalerReviewList,
    msg: ''
  }
}
