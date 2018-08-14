import Mock from 'mockjs'
const productAttributeList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': '@id',
      name: '@name',
      category: '@name',
      'values|3-6': [{
        name: '属性@integer(1, 10)',
        id: '@id'
      }]
    }]
  }
})
const productBrandList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': '@id',
      name: '@name',
      initial: '@string("upper", 1)',
      'manufacturer': '@name',
      'show': '@boolean'
    }]
  }
})
const productList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      title: '@name',
      'imgUrls|3': ['@image(200x100)'],
      'skus|1-5': [{
        id: '@id',
        basePrice: '@integer(100, 1000)'
      }],
      brandName: '@first',
      price: '@integer(100, 350)',
      sin: '@zip',
      'keyword|2-5': ['标签@integer(1, 10)'],
      sale: '@integer(60, 100)',
      'status|1': ['onsale', 'enabled']
    }]
  }
})
const product = Mock.mock({
  'data': {
    'id': '@id',
    'cateId': '@id',
    title: '@name',
    'imgUrls|3': ['@image(100x100)'],
    brandName: '@first',
    detail: '@cparagraph',
    price: '@integer(100, 350)',
    num: '@zip',
    'keyword|2-5': ['标签@integer(1, 10)'],
    sale: '@integer(60, 100)',
    'status|1': ['onsale', 'enabled'],
    'props': {
      'skuProps|2-6': [
        {
          name: '@name',
          id: '@id',
          'values|2-6': [
            {
              name: '属性@integer(1, 10)',
              id: '@id'
            }
          ]
        }
      ],
      'props|2-5': [
        {
          name: '@name',
          value: '属性@integer(1, 10)'
        }
      ]
    },
    'skus|2-5': [
      {
        unit: 'pc',
        size: null,
        spec: 1,
        weight: 2,
        sin: 20182928,
        onum: 100,
        basePrice: 201,
        id: '@id',
        'props|1-2': [
          {
            name: '@name',
            nameId: '@id',
            value: '属性@integer(1, 10)',
            valueId: '@id'
          }
        ]
      }
    ],
    storage: '@integer(60, 100)'
  }
})
const qProductList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      title: '@name',
      'imgUrls|3': ['@image(200x100)'],
      offerId: '@integer(100, 350)',
      offerKind: '@last',
      cateId: '12',
      status: true,
      keyword: ['ip', 'ipp', 'iop'],
      onum: '12',
      kind: '主商品',
      itemSku: {
        id: '@id',
        offerPrice: '@integer(100, 1000)',
        vipPrice: '@integer(100, 1000)',
        basePrice: '@integer(100, 1000)',
        num: '@integer(100, 1000)',
        unit: 'pc',
        size: null,
        spec: '1',
        weight: '1',
        sin: '@last',
        onum: '12',
        props: [{
          name: 'n',
          value: 'v'
        }]
      }
    }]
  }
})
// const cascader = [
//   {
//     id: '1-1',
//     title: '类目 1-1',
//     children: [
//       {
//         id: '1-1-1',
//         title: '类目 1-1-1'
//       },
//       {
//         id: '1-1-2',
//         title: '类目 1-1-2'
//       }
//     ]
//   },
//   {
//     id: '1-2',
//     title: '类目 1-2',
//     children: [
//       {
//         id: '1-2-1',
//         title: '类目 1-2-1'
//       },
//       {
//         id: '1-2-2',
//         title: '类目 1-2-2'
//       }
//     ]
//   }
// ]
const cascader = [
  {
    value: '1-1',
    label: '类目 1-1',
    children: [
      {
        value: '1-1-1',
        label: '类目 1-1-1'
      },
      {
        value: '1-1-2',
        label: '类目 1-1-2'
      }
    ]
  },
  {
    value: '1-2',
    label: '类目 1-2',
    children: [
      {
        value: '1-2-1',
        label: '类目 1-2-1'
      },
      {
        value: '1-2-2',
        label: '类目 1-2-2'
      }
    ]
  }
]
export default {
  list () {
    return {
      code: '000000',
      ...productList,
      msg: ''
    }
  },
  get () {
    return {
      code: '000000',
      ...product,
      msg: ''
    }
  },
  queryItem () {
    return {
      code: '000000',
      ...qProductList,
      msg: ''
    }
  },
  brand: {
    list () {
      return {
        code: '000000',
        ...productBrandList,
        msg: ''
      }
    }
  },
  category: {
    get (req) {
      const data = JSON.parse(req.body)
      console.log(data)
      return {
        code: '000000',
        data: {
          'id': data.id,
          'parentId': 0,
          'name': '类目1',
          'parentName': '类目1',
          'imgUrl': 'null',
          'onum': 99
        },
        msg: ''
      }
    },
    cascader () {
      return {
        code: '000000',
        data: cascader,
        msg: ''
      }
    },
    listCategory () {
      return {
        code: '000000',
        data: cascader,
        msg: ''
      }
    },
    listProp () {
      return {
        code: '000000',
        ...productAttributeList,
        msg: ''
      }
    },
    listSkuProp () {
      return {
        code: '000000',
        ...productAttributeList,
        msg: ''
      }
    },
    addPropsTag (req) {
      const data = JSON.parse(req.body)
      return {
        code: '000000',
        data: {
          id: 9999,
          name: data.name
        },
        msg: ''
      }
    }
  }
}
