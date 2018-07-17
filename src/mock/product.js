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
    list () {
      return {
        code: '000000',
        data: [
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
        ],
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
