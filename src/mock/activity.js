import Mock from 'mockjs'
const activityList = Mock.mock({
  'data|10': [{
    name: '@name'
  }]
})
export const getActivityList = req => {
  return {
    code: 200,
    ...activityList,
    msg: ''
  }
}
export const getActivityDetail = req => {
  return {
    code: 200,
    msg: ''
  }
}
