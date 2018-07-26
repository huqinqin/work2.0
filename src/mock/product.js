import Mock from 'mockjs'
const productAttributeList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': '@integer(1, 10)',
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
      brandName: '@first',
      price: '@integer(100, 350)',
      num: '@zip',
      'keyword|2-5': ['标签@integer(1, 10)'],
      sale: '@integer(60, 100)',
      'status|1': ['onsale', 'unabled']
    }]
  }
})
const cascader = [
  {
    id: '1-1',
    title: '类目 1-1',
    children: [
      {
        id: '1-1-1',
        title: '类目 1-1-1'
      },
      {
        id: '1-1-2',
        title: '类目 1-1-2'
      }
    ]
  },
  {
    id: '1-2',
    title: '类目 1-2',
    children: [
      {
        id: '1-2-1',
        title: '类目 1-2-1'
      },
      {
        id: '1-2-2',
        title: '类目 1-2-2'
      }
    ]
  }
]
// const cascader = [
//   {
//     value: '1-1',
//     label: '类目 1-1',
//     children: [
//       {
//         value: '1-1-1',
//         label: '类目 1-1-1'
//       },
//       {
//         value: '1-1-2',
//         label: '类目 1-1-2'
//       }
//     ]
//   },
//   {
//     value: '1-2',
//     label: '类目 1-2',
//     children: [
//       {
//         value: '1-2-1',
//         label: '类目 1-2-1'
//       },
//       {
//         value: '1-2-2',
//         label: '类目 1-2-2'
//       }
//     ]
//   }
// ]
export default {
  item: {
    list () {
      return {
        code: '000000',
        ...productList,
        msg: ''
      }
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
    }
  }
}
