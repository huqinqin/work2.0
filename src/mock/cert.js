import Mock from 'mockjs'
const certList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      imgUrl: '@image(200x100)',
      'number': '@integer(20000000,90000000)',
      'status|1': ['enabled', 'refused', 'submitted'],
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
      }
    }]
  }
})
const certDetail = Mock.mock({
  data: {
    'id|+1': '@id',
    'imgUrl': '@image(200x100)',
    'number': '@integer(200000,900000)',
    'status|1': ['enabled', 'refused', 'submitted'],
    source: '@last',
    'store': {
      contact: [{
        fisrtName: '@first',
        lastName: '@last',
        phone: '@integer(2000000000,9000000000)',
        email: '@email'
      }],
      ext: {
        submitDate: '@date',
        assignDate: '@date',
        industry: '@name'
      },
      name: '@name',
      store: '@name',
      sales: '@name',
      code: '@last'
    },
    address: {
      company: '@name',
      detail: '@street' + '@city',
      street: '@street',
      city: '@city',
      state: '@state',
      zip: '@zip',
      country: '@country'
    },
    'reviewRecords|4': [
      {
        userName: '@name',
        cdate: '@date',
        content: '@name' + '@name' + '@name'
      }
    ]
  }
})
export default {
  list () {
    return {
      code: '000000',
      ...certList,
      msg: ''
    }
  },
  get () {
    return {
      code: '000000',
      ...certDetail,
      msg: ''
    }
  }
}
