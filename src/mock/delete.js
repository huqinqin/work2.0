export const mockDelete = req => {
  const data = JSON.parse(req.body)
  console.log('删除数据', data)
  return {
    'code': '000000',
    'msg': '错误提示',
    'stack': '错误栈',
    'data': null
  }
}
