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
// const productAttributeDetail = Mock.mock({
//   'data': {
//     'id|+1': '@id',
//     name: '@name',
//     initial: '@string("upper", 1)',
//     'manufacturer': '@name',
//     'show': '@boolean'
//   }
// })
const productList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      name: '@name',
      image: '@image(200x100)',
      brand: '@brand',
      price: '@price',
      num: '@zip',
      label: ['标签@integer(1, 10)'],
      sale: '@integer(60, 100)',
      putaway: '@boolean'
    }]
  }
})
// const productBrandDetail = Mock.mock({
//   'data': {
//     'id|+1': '@id',
//     name: '@name',
//     initial: '@string("upper", 1)',
//     'manufacturer': '@name',
//     'show': '@boolean'
//   }
// })
// export const getProductBrandList = req => {
//   return {
//     code: '000000',
//     ...productBrandList,
//     msg: ''
//   }
// }
// export const getProductAttributeDetail = req => {
//   return {
//     code: '000000',
//     ...productAttributeDetail,
//     msg: ''
//   }
// }
// export const getProductList = req => {
//   return {
//     code: '000000',
//     ...productList,
//     msg: ''
//   }
// }
// const productTrashList = Mock.mock({
//   'data|10': [{
//     'id|+1': '@id',
//     name: '@name',
//     image: '@image(200x100)',
//     brand: '@name',
//     price: '@integer(99, 1000)',
//     sin: '@zip',
//     category: ['类目@integer(1, 10)']
//   }]
// })
// export const getProductTrashList = req => {
//   return {
//     code: '000000',
//     ...productTrashList,
//     msg: ''
//   }
// }
// export const getProductTrashRevert = req => {
//   return {
//     code: '000000',
//     data: 'revert',
//     msg: ''
//   }
// }
// export const getProductBrandDetail = req => {
//   return {
//     code: '000000',
//     ...productBrandDetail,
//     msg: ''
//   }
// }
const categories = [
  {
    id: '1-1',
    title: '类目 1-1',
    expand: true,
    children: [
      {
        id: '1-1-1',
        title: '类目 1-1-1',
        expand: true
      },
      {
        id: '1-1-2',
        title: '类目 1-1-2',
        expand: true
      }
    ]
  },
  {
    id: '1-2',
    title: '类目 1-2',
    expand: true,
    children: [
      {
        id: '1-2-1',
        title: '类目 1-2-1',
        expand: true
      },
      {
        id: '1-2-2',
        title: '类目 1-2-2',
        expand: true
      }
    ]
  }
]
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
        data: categories,
        msg: ''
      }
    },
    props: {
      list () {
        return {
          code: '000000',
          ...productAttributeList,
          msg: ''
        }
      }
    },
    sku: {
      list () {
        return {
          code: '000000',
          ...productAttributeList,
          msg: ''
        }
      }
    }
  }
}
