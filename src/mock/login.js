export default {
  login (req) {
    req = JSON.parse(req.body)
    console.log('req', req)
    return {
      code: '000000',
      data: null,
      msg: ''
    }
  },
  logout (req) {
    return {
      code: '000000',
      data: {
        account: 'Mock',
        email: '',
        avatar: ''
      },
      msg: ''
    }
  }
}
