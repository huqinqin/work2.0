import Mock from 'mockjs'
const list = Mock.mock({
  data: {
    'list|3-12': [
      {
        id: '@integer(100000, 999999)',
        account: '@last',
        sName: '@first',
        sales: '@name',
        'status|1': ['待财务审核', '待销售主管审核', '待提交'],
        cdate: '@datetime'
      }
    ],
    total: 32
  }
})

export default {
  list () {
    return {
      code: '000000',
      ...list,
      msg: ''
    }
  }
}
