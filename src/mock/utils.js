import Mock from 'mockjs'
export const mapMock = (rootUrl, mockObj) => {
  if (typeof mockObj === 'object') {
    Object.keys(mockObj).forEach(item => {
      const curUrl = `${rootUrl}/${item}`
      const curOj = mockObj[item]
      if (typeof curOj === 'object') {
        mapMock(curUrl, curOj)
      } else if (typeof curOj === 'function') {
        Mock.mock(new RegExp(curUrl), 'post', (req) => {
          const data = JSON.parse(req.body)
          console.log(curUrl, data)
          return curOj(req)
        })
      }
    })
  } else {
    throw new Error('type error')
  }
}

export const mockSave = req => {
  const data = JSON.parse(req.body)
  console.log('保存数据', data)
  return {
    'code': '000000',
    'msg': '错误提示',
    'stack': '错误栈',
    'data': {
      id: '1'
    }
  }
}

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
